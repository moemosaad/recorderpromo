import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Record from "./components/record.jsx";
import RecordList from "./components/recordList.jsx";
import AudioPlayer from "./components/audioplayer.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audios: [],
      beats: [],
      name: "",
      recording: false
    };
    this.mediaRecorder;
    this.chunks;
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.handleNameSave = this.handleNameSave.bind(this);
    this.saveAudio = this.saveAudio.bind(this);
  }

  async componentDidMount() {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    // this.audio.src = window.URL.createObjectURL(stream);
    // this.audio.play();
    // this.mediaRecorder = new MediaRecorder(stream);
    // this.chunks = [];
    // this.mediaRecorder.ondataavailable = e => {
    //   if (e.data && e.data.size > 0) {
    //     this.chunks.push(e.data);
    //   }
    // };
  }

  startRecording(event) {
    event.preventDefault();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.chunks = [];
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start(10);
      this.setState({ recording: true });
      this.mediaRecorder.addEventListener("dataavailable", event => {
        this.chunks.push(event.data);
        console.log(this.chunks);
      });
    });
  }

  stopRecording(event, mediaRecorder) {
    event.preventDefault();
    console.log(mediaRecorder);
    mediaRecorder.stop();
    this.setState({ recording: false });
    this.saveAudio();
  }

  handleNameSave(name) {
    console.log(this.state.name);
    this.setState({ name: name });
  }

  saveAudio() {
    event.preventDefault();
    const blob = new Blob(this.chunks, { type: "audio/mpeg-3" });
    const audioUrl = window.URL.createObjectURL(blob);
    const audio = [this.state.name, audioUrl];
    this.setState({ audios: [...this.state.audios, audio] });
    const fd = new FormData();
    fd.append("audio", blob);
    console.log(blob, fd);
    fd.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    });
    // axios
    //   .post("/api/format", {
    //     "content-type": "multipart/form-data",
    //     data: fd
    //   })
    //   .then(data => {
    //     console.log("data");
    //   });
    fetch("/api/createAudio", {
      headers: { Accept: "application/json" },
      method: "POST",
      body: fd
    }).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <div>Welcome to RapperProMo</div>
        <Record
          start={this.startRecording}
          stop={this.stopRecording}
          mediaRecorder={this.mediaRecorder}
          saveName={this.handleNameSave}
        />
        <RecordList audios={this.state.audios} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
