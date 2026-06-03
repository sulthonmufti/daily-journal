const mongoose = require("mongoose");

const entryTagSchema = new mongoose.Schema({
  entryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JournalEntry",
    required: true,
    index: true,
  },
  moodTagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MoodTag",
    required: true,
  },
});

module.exports = mongoose.model("EntryTag", entryTagSchema);
