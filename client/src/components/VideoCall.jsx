import React, { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import MeetingButtons from "./MeetingButtons";
import Notifications from "./Notifications";

import "../styles/videocall.css";

const VideoCall = () => {
    const { callAccepted, callDetails, myVideo, recieverVideo } = useContext(SocketContext);

    useEffect(() => {
        console.log(callDetails)
    }, [callDetails])

    return (
        <div className="container-fluid" style={{ height: '100vh' }}>
            <div className="row">
                {
                    !callAccepted && (
                        <>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" style={{backgroundColor: 'yellow'}}>
                            <div className="inner-col">
                                <video ref={myVideo} autoPlay muted />
                                <br />
                                <MeetingButtons />
                                {
                                    (callDetails == {}) ? <Notifications /> : <></>
                                }
                            </div>
                        </div>
                        </>
                    )
                }
                {
                    callAccepted && (
                        <>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" style={{backgroundColor: 'yellow'}}>
                                <div className="inner-col">
                                    <video ref={myVideo} autoPlay muted />
                                    <br />
                                    <MeetingButtons />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                <video ref={recieverVideo} autoPlay muted />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default VideoCall;