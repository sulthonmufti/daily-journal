const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
}

module.exports = AuthService;
