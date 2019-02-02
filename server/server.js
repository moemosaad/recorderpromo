const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const router = require("./routes.js");
const io = require("socket.io")(server);
const path = require("path");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/api", router);
// io.on("connection", client => {
//   console.log("New client connected");
//   client.on("event", data => {});
//   client.on("disconnect", () => {});
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
