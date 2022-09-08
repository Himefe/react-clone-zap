import { Close, Mic } from "@mui/icons-material";
import React from "react";

const MicrophoneComponent = ({
  listening,
  setListening,
  messsage,
  setMessage,
}) => {
  const Microphone = {
    recognition: null,
    speechRecognition:
      window.SpeechRecognition || window.webkitSpeechRecognition,
    words: "",
    initializerRecognition() {
      if (Microphone.speechRecognition) {
        Microphone.recognition = new Microphone.speechRecognition();
      }

      Microphone.recognition.onstart = () => {
        setListening(true);
      };

      Microphone.recognition.onend = () => {
        setMessage(messsage + Microphone.words);
        setListening(false);
      };

      Microphone.recognition.onresult = ({ results }) => {
        for (let i = 0; i < results.length; i++) {
          Microphone.words = Microphone.words + results[i][0].transcript;
        }
      };
    },
    handleMicClick() {
      if (Microphone.recognition) {
        Microphone.recognition.start();
      }
    },
    handleStopMic() {
      if (Microphone.recognition) {
        Microphone.recognition.abort();
        setListening(false);
      }
    },
  };

  Microphone.initializerRecognition();

  return (
    <div>
      <Mic
        onClick={Microphone.handleMicClick}
        style={listening ? { fill: "#00a884" } : {}}
      />
    </div>
  );
};

export default MicrophoneComponent;
