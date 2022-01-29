import React, { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";

const VideoCall = () => {
    const { connectionId } = useContext(SocketContext);

    return (
        <>
        {
            connectionId && (
                <p>{connectionId}</p>
            )
        }
        </>
    );
}

export default VideoCall;