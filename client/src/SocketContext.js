import React, { createContext, useRef, useEffect, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io('http://localhost:8000');

const ContextProvider = ({children}) => {
    const [stream, setStream] = useState(null);
    const [connectionId, setConnectionId] = useState('');
    const [callDetails, setCallDetails] = useState(null)

    const senderVideo = useRef();
    const recieverVideo = useRef();
    const connectionRef = useRef();
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        .then(stream => {
            setStream(stream);

            senderVideo.current.srcObject = stream;
        })

        socket.on('connectionId', id => setConnectionId(id))
        socket.on('callUser', ({signal, from, name}) => {
            setCallDetails({
                callRecieved: true,
                signal,
                from,
                callerName: name
            })
        })
    }, [])
}