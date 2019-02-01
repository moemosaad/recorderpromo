import React from "react";

const record = ({ start, stop, mediaRecorder, saveName }) => {
  return (
    <form>
      <button
        onClick={e => {
          start(e);
        }}
      >
        Record
      </button>
      <input
        type="text"
        name="name"
        onChange={e => {
          saveName(e.target.value);
        }}
      />
      <button
        onClick={e => {
          stop(e, mediaRecorder);
        }}
      >
        Save
      </button>
    </form>
  );
};

module.exports = record;
