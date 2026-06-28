const express = require("express");
const contactController = require("../controller/conatct.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, contactController.sendMessage);

module.exports = router;
