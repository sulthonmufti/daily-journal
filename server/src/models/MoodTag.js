const mongoose = require("mongoose");

const moodTagSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  emoji: { type: String, required: true },
  color: { type: String, required: true },
  order: { type: Number, default: 0 },
  isDefault: { type: Boolean, default: false },
});

module.exports = mongoose.model("MoodTag", moodTagSchema);
