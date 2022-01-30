import React, { useState, useEffect, createContext, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

// connecting with the server
const socket = io("http://localhost:8080");

// creating a socket context 
const SocketContext = createContext();

const Context = ({ children }) => {
    const [media, setMedia] = useState();
    const [connectionId, setConnectionId] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callDetails, setCallDetails] = useState({});
    const [callEnded, setCallEnded] = useState(false);
    const [message, setMessage] = useState('');

    const myVideo = useRef();
    const recieverVideo = useRef();
    const connRef = useRef();

    useEffect(() => {
        // access client's video and audio devices & store the stream in state on getting access
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        .then(stream => {
            setMedia(stream);
            myVideo.current.srcObject = stream;
        })
        .catch(err => console.log(err))

        // on establishing connection with server, store socket id in state
        socket.on("established", (id) => {
            setConnectionId(id);
        })

        socket.on("callUser", ({ from, signal }) => {
            setCallDetails({ isRecieving: true, from, signal });
        })
        
        socket.on("recieve-message", ({ message }) => {
            setMessage(message)
        })
    }, []);


    const callUser = ({ recieverId }) => {
        let peer = new Peer({ initiator: true, stream: media, trickle: false })

        console.log("trying to call", recieverId);

        peer.on("signal", data => {
            socket.emit("callUser", {
                signal: data,
                from: connectionId,
                to: recieverId
            })
        })

        peer.on("stream", stream => {
            recieverVideo.current.srcObject = stream;
        })

        socket.on("acceptCall", signal => {
            peer.signal(signal);
            setCallAccepted(true);
        })

        connRef.current = peer;
    }

    const acceptCall = () => {
        setCallAccepted(true);
        console.log("accept call");

        let peer = new Peer({ initiator: false, stream: media, trickle: false })

        peer.on("signal", data => {
            socket.emit("callAccepted", { to: callDetails.from, signal: data })
        })

        peer.on("stream", stream => {
            recieverVideo.current.srcObject = stream;
        })

        peer.signal(callDetails.signal);

        connRef.current = peer;
    }

    const declinCall = () => {
        setCallEnded(true);
        connRef.current.destroy();
        window.location.reload();
    }

    const sendMessage = (id, message) => {
        socket.emit("message", { 
            to: id,
            message
        })
    }

    return (
        <SocketContext.Provider value={{
            media, 
            connectionId,
            callAccepted,
            callDetails,
            myVideo,
            recieverVideo,
            callEnded,
            message,
            callUser,
            acceptCall,
            declinCall,
            sendMessage
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export { SocketContext, Context };