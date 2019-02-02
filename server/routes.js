const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const routeHandler = require("./controllers/controllers.js");

router.get("/getAll", routeHandler.getAll);
router.post("/createAudio", upload.single("audio"), routeHandler.saveOne);

module.exports = router;
