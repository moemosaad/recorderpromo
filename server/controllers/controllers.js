const ffmpeg = require("ffmpeg");
const fs = require("fs");
const path = require("path");

module.exports = {
  streamAudio: (req, res) => {
    console.log(req.body, req.params, req.query);
    let id = req.params.id;
    let file = path.join(__dirname, `../audioMP3/${id}.mp3`);
    fs.createReadStream(file).pipe(res);
  },
  createAudio: (req, res) => {
    let { filename } = req.file;
    // console.log(req.params, req.body, req.query);
    console.log(req.file);
    try {
      let input = path.join(__dirname, `../uploads/${filename}`);
      let output = path.join(__dirname, `../audioMP3/${filename}.mp3`);
      console.log(input, output);
      let process = new ffmpeg(input);
      process.then(audio => {
        audio.fnExtractSoundToMP3(
          output,
          (err, file) => {
            if (!err) {
              console.log("Audio file: " + file);
              console.log(typeof filename);
              res.send(filename);
            } else {
              console.log("Error", err);
            }
          },
          err => {
            console.log("Error: ", err);
          }
        );
      });
    } catch (err) {
      console.log("err");
      console.log(err.code);
      console.log(err.msg);
    }
  }
};
