const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await userModel.findOne({
      email,
    });

    if (isUserExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error,
    });
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging out user",
    });
  }
}

async function getMe(req, res) {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user: {
        name: req.user.name,
        email: req.user.email,
        _id: req.user._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};
