const JournalEntry = require("../models/JournalEntry");

class JournalService {
  //ambil semua entri milik user (termasuk filter & pagination)
  static async getAllEntries(userId) {
    return await JournalEntry.find({ userId }).sort({ entryDate: -1 });
  }

  //buat entri jurnal baru
  static async createEntry(userId, entryData) {
    const dateToSave = entryData.entryDate
      ? new Date(entryData.entryDate)
      : new Date();

    const newEntry = await JournalEntry.create({
      userId,
      title: entryData.title || "Untitled",
      contentMarkdown: entryData.contentMarkdown,
      contentHTML: entryData.contentMarkdown,
      mood: entryData.mood,
      moodScore: entryData.moodScore,
      weather: entryData.weather,
      entryDate: dateToSave,
      isPrivate: entryData.isPrivate || false,
      isPinned: entryData.isPinned || false,
    });

    return newEntry;
  }

  // update entri jurnal
  static async updateEntry(userId, entryId, updateData) {
    const updatedEntry = await JournalEntry.findOneAndUpdate(
      { _id: entryId, userId: userId },
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedEntry) {
      throw new Error(
        "Jurnal tidak ditemukan atau Anda tidak memiliki hak akses",
      );
    }
    return updatedEntry;
  }

  //hapus entri jurnal
  static async deleteEntry(userId, entryId) {
    const deletedEntry = await JournalEntry.findOneAndDelete({
      _id: entryId,
      userId: userId,
    });

    if (!deletedEntry) {
      throw new Error(
        "Jurnal tidak ditemukan atau Anda tidak memiliki hak akses",
      );
    }
    return true;
  }
}

module.exports = JournalService;
