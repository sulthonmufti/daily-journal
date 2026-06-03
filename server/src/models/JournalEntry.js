const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String },
    contentMarkdown: { type: String, required: true },
    contentHTML: { type: String, required: true },
    mood: { type: String },
    moodScore: { type: Number, min: 1, max: 10 },
    weather: { type: String },
    entryDate: { type: Date, required: true, index: true },
    isPrivate: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

journalEntrySchema.index({ userId: 1, entryDate: -1 });
journalEntrySchema.index({ userId: 1, mood: 1 });
journalEntrySchema.index({ userId: 1, title: "text", contentMarkdown: "text" });

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
