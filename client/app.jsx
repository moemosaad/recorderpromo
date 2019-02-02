import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
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
      currentAudio: "5e5bb8afb8ccaa3a3231fe19b383cf98",
      recording: false
    };
    this.mediaRecorder;
    this.chunks;
    this.device;
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.handleNameSave = this.handleNameSave.bind(this);
    this.saveAudio = this.saveAudio.bind(this);
    this.handleRecordPlay = this.handleRecordPlay.bind(this);
  }

  async componentDidMount() {
    this.device = navigator.mediaDevices.getUserMedia({ audio: true });
  }

  startRecording(event) {
    event.preventDefault();
    this.device.then(stream => {
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
    mediaRecorder.stop();
    this.setState({ recording: false });
    this.saveAudio(this.state.name);
  }

  handleNameSave(name) {
    this.setState({ name: name });
  }

  saveAudio(name) {
    event.preventDefault();
    const blob = new Blob(this.chunks, { type: "audio/mpeg-3" });
    const audioUrl = window.URL.createObjectURL(blob);
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
    })
      .then(data => {
        const audio = [this.state.name, audioUrl];
        return data.text();
      })
      .then(fileName => {
        console.log(fileName);
        this.setState({
          audios: [...this.state.audios, [this.state.name, fileName]]
        });
      });
  }

  handleRecordPlay() {
    this.refs.audio.pause();
    this.refs.audio.load();
    this.refs.audio.play();
  }

  render() {
    return (
      <div>
        <div>Welcome to ProRecorderMo © Property of C.E.Mo</div>
        <AudioPlayer
          audio={this.state.currentAudio}
          handleChange={this.handleRecordPlay}
        />
        <Record
          start={this.startRecording}
          stop={this.stopRecording}
          mediaRecorder={this.mediaRecorder}
          saveName={this.handleNameSave}
        />
        <RecordList
          audios={this.state.audios}
          current={this.state.currentAudio}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
