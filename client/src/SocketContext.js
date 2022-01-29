import React, { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";

// connecting with the server
const socket = io("http://localhost:8080");

// creating a socket context 
const SocketContext = createContext();

const Context = ({ children }) => {
    const [media, setMedia] = useState();
    const [connectionId, setConnectionId] = useState(null);

    useEffect(() => {
        // access client's video and audio devices & store the stream in state on getting access
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        .then(stream => {
            setMedia(stream);
        })
        .catch(err => console.log(err))

        // on establishing connection with server, store socket id in state
        socket.on("established", (id) => {
            setConnectionId(id);
        })
    }, []);

    return (
        <SocketContext.Provider value={{media, connectionId}}>
            {children}
        </SocketContext.Provider>
    );
}

export { SocketContext, Context };