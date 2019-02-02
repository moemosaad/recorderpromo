const AudioPlayer = ({ audio }) => {
  <audio controls>
    <source src={audio} type="audio/mpeg" />
  </audio>;
};

module.exports = AudioPlayer;
