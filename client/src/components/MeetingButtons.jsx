import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import "../styles/meetingbuttons.css";
import CopyToClipboard from "react-copy-to-clipboard";
import CallEndIcon from '@mui/icons-material/CallEnd';

const MeetingButtons = () => {
    const { callAccepted, callEnded, callUser, connectionId, declineCall } = useContext(SocketContext);

    const [reciever, setReciever] = useState('');

    useEffect(() => { 
        console.log(reciever)
    }, [reciever])

    if (!callAccepted || callEnded) {
        return (
            <div className="btn-div">
                <form>
                    <input type="text" value={reciever} onChange={(e) => setReciever(e.target.value)} placeholder="Enter meeting code"/>
                    &nbsp;&nbsp;
                </form>
                <button 
                style={{backgroundColor: '#1A73E8', color: 'white'}}
                onClick={() => callUser({
                    recieverId: reciever
                })}
                >
                    Make a call
                </button>
                &nbsp;&nbsp;
                <CopyToClipboard text={connectionId}>
                    <button style={{backgroundColor: '#1A73E8', color: 'white'}}>Copy your ID</button>
                </CopyToClipboard>
            </div>
        );
    }

    if (callAccepted) {
        return (
            <button style={{backgroundColor: '#E54D04'}}> 
                <span style={{fontSize: '16px', color: 'white', fontWeight: "500"}}>Decline</span>
                <CallEndIcon style={{color: 'white', fontSize: "26px", marginLeft: '20px'}} onClick={declineCall}/>
            </button>
        );
    }
}

export default MeetingButtons;