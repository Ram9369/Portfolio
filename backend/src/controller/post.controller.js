const postModel = require("../model/post.model");
const imagekit = require("../service/storage.service");

exports.uploadImage = async (req, res) => {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload image to ImageKit

    const imageUpload = await imagekit.upload({
      file: imageFile.buffer,
      fileName: imageFile.originalname,
      folder: "/Portfolio/images",
    });

    // Save in DB
    const post = await postModel.create({
      imageUrl: imageUpload.url,
    });

    

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};