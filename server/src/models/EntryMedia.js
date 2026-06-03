const mongoose = require("mongoose");

const entryMediaSchema = new mongoose.Schema({
  entryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JournalEntry",
    required: true,
  },
  url: { type: String, required: true },
  type: { type: String, enum: ["image", "video"], required: true },
  filename: { type: String },
  sizeBytes: { type: Number },
});

module.exports = mongoose.model("EntryMedia", entryMediaSchema);
