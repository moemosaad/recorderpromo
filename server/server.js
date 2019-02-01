const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const port = 3000;

app.use("/", express.static(path.join(__dirname, "../public")));

// io.on("connection", client => {
//   console.log("New client connected");
//   client.on("event", data => {});
//   client.on("disconnect", () => {});
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
