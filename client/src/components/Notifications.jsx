import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";

const Notifications = () => {
    const { callDetails } = useContext(SocketContext);

    return (
        <>
            <p>
                <span>{callDetails.from}</span>
                <span> is calling you.</span> 
            </p>
        </>
    );

}

export default Notifications;