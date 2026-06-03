const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username wajib diisi"],
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password wajib diisi"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
