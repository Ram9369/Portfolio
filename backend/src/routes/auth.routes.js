const express = require('express');
const userModel = require('../model/user.model');
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const jwt = require("jsonwebtoken");

const router = express.Router();


router.post("/register", authController.registerUser);    
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
