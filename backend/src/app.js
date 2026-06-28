const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const contactRoutes = require("./routes/contact.routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/contact", contactRoutes);

module.exports = app;
