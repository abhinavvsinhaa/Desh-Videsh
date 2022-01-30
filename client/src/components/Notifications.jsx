import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Notifications = () => {
    const { callDetails, acceptCall } = useContext(SocketContext);

    return (
        <>
            <p>               
                <span style={{fontSize: '18px', fontWeight: '500'}}>{callDetails.from}</span>
                <span> is calling you.</span>
            </p>
            <p>
                <CheckIcon style={{color: 'green'}} onClick={acceptCall}/>
                &nbsp;&nbsp;
                <ClearIcon style={{color: 'red'}}/>
            </p>
        </>
    );
}

export default Notifications;