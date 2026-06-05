const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

class AuthService {
  static async register(userData) {
    const { username, email, password } = userData;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error("Email atau Username sudah digunakan");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  static async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Kredensial tidak valid (Email tidak ditemukan)");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Kredensial tidak valid (Password salah)");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  }

  static async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Tidak ada akun dengan email tersebut");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 menit
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `Halo,\n\nAnda menerima email ini karena ada permintaan reset password untuk akun Daily Journal Anda.\n\nSilakan klik link berikut untuk membuat password baru:\n${resetUrl}\n\nJika Anda tidak merasa meminta reset password, abaikan email ini. Link akan hangus dalam 15 menit.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password - Daily Journal",
        message,
      });

      return {
        success: true,
        message: "Email instruksi reset password telah dikirim",
      };
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      throw new Error(
        "Email gagal dikirim. Periksa koneksi atau kredensial email.",
      );
    }
  }

  static async resetPassword(resetToken, newPassword) {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Token tidak valid atau sudah kedaluwarsa");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return {
      success: true,
      message: "Password berhasil diubah. Silakan login dengan password baru.",
    };
  }
}

module.exports = AuthService;
