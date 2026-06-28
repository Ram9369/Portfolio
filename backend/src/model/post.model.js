const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("post", postSchema);
