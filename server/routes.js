const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: path.join(__dirname, "./uploads/") });
const routeHandler = require("./controllers/controllers.js");

router.get("/getAudio/:id", routeHandler.streamAudio);
router.post("/createAudio", upload.single("audio"), routeHandler.createAudio);

module.exports = router;
