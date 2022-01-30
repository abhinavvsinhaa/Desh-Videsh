import React, { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import MeetingButtons from "./MeetingButtons";
import Notifications from "./Notifications";
import Dictaphone from "./Dictaphone";

import "../styles/videocall.css";

const VideoCall = () => {
    const { callAccepted, callDetails, myVideo, recieverVideo, media, callEnded } = useContext(SocketContext);

    useEffect(() => {
        console.log(callDetails);
    }, [callDetails])

    useEffect(() => {
        console.log("sender", myVideo);
        console.log("reciever", recieverVideo);
    }, [recieverVideo, myVideo])

    return (
        <div className="container-fluid" style={{ height: '100vh' }}>
            <div className="row">
                {
                    media && (
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="inner-col">
                                <video ref={myVideo} autoPlay muted />
                                <br />
                                <MeetingButtons />
                                <br />
                                {
                                    ('isRecieving' in callDetails && !callAccepted) ? <Notifications /> :  <></>
                                }
                            </div>
                        </div>                    
                    )
                }
                {
                    callAccepted && !callEnded && (
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="inner-col">
                                <video ref={recieverVideo} autoPlay muted />
                                <br />
                                <Dictaphone />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default VideoCall;