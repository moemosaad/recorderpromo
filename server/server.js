const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes.js");
const path = require("path");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/api", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
