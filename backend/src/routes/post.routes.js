const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const postController = require("../controller/post.controller");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  postController.uploadImage,
);

module.exports = router;
