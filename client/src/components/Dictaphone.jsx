import React, { useEffect, useContext, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SocketContext } from '../SocketContext';

const Dictaphone = () => {
  const {
    finalTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { sendMessage, message, callDetails } = useContext(SocketContext);

  const [prevMsg, setPrevMsg] = useState('');

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  useEffect(() => {
    let newStr = finalTranscript.slice(prevMsg.length)
    console.log(newStr)
    sendMessage(callDetails.from, newStr);
    setPrevMsg(finalTranscript);
  }, [finalTranscript])

//   useEffect(() => {
//     console.log(finalTranscript);
//     sendMessage({ reciever: recieverID, message: finalTranscript });
//   }, [finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  return (
    <>
        {message}
        <br/>
    </>
  );
};

export default Dictaphone;