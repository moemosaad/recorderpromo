import React from "react";

const AudioPlayer = ({ audio, handleChange }) => {
  console.log(audio);
  return (
    <audio controls ref="audio">
      <source
        src={`http://localhost:3000/api/getAudio/${audio}`}
        type="audio/mpeg"
      />
    </audio>
  );
};

module.exports = AudioPlayer;
