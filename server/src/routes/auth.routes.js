const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.ctrl.js");

// Rute registrasi: POST /api/auth/register
router.post("/register", authController.registerUser);

// Rute login: POST /api/auth/login
router.post("/login", authController.loginUser);

// Rute logout: GET /api/auth/logout
router.get("/logout", authController.logoutUser);

// Rute forgot password: POST /api/auth/forgot-password
router.post("/forgot-password", authController.forgotPasswordUser);

module.exports = router;
