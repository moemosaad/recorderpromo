import React from "react";

const RecordList = ({ audios, current, handleChange }) => {
  console.log(audios);
  return (
    <ul>
      {audios.map(audio => (
        <li
          key={audio[1]}
          onClick={() => {
            current = audio[1];
            handleChange();
            console.log(current);
          }}
        >
          <div>Name: {audio[0]}</div>
          <div>Link: {audio[1]}</div>
        </li>
      ))}
    </ul>
  );
};

module.exports = RecordList;
