import React from "react";

const RecordList = ({ audios }) => {
  console.log(audios);
  return (
    <ul>
      {audios.map(audio => (
        <li>
          <div>Name: {audio[0]}</div>
          <div>Link: {audio[1]}</div>
        </li>
      ))}
    </ul>
  );
};

module.exports = RecordList;
