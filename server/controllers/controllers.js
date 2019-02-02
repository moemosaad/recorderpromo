const ffmpeg = require("ffmpeg");

module.exports = {
  getAll: (req, res) => {},
  createAudio: (req, res) => {
    console.log("ok");
    console.log(req.file);

    console.log(req.params, req.body.data, req.query);
    res.send("hello");
    // console.log(req);
    // let process = new ffmpeg();
  }
};
