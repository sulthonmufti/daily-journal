const JournalEntry = require("../models/JournalEntry");

class JournalService {
  //ambil semua entri milik user (termasuk filter & pagination)
  static async getAllEntries(userId, queryParams = {}) {
    const {
      page = 1,
      limit = 10,
      mood,
      startDate,
      endDate,
      search,
    } = queryParams;

    const query = { userId };

    if (mood) {
      query.mood = mood;
    }

    if (startDate || endDate) {
      query.entryDate = {};
      if (startDate) query.entryDate.$gte = new Date(startDate);
      if (endDate) query.entryDate.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { contentMarkdown: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const entries = await JournalEntry.find(query)
      .sort({ entryDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalEntries = await JournalEntry.countDocuments(query);

    return {
      entries,
      pagination: {
        totalEntries,
        totalPages: Math.ceil(totalEntries / Number(limit)),
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  }

  //ambil satu entri berdasarkan ID (milik user yang login)
  static async getEntryById(entryId, userId) {
    const entry = await JournalEntry.findOne({
      _id: entryId,
      userId: userId,
    });

    return entry;
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
    if (updateData.contentMarkdown !== undefined) {
      updateData.contentHTML = updateData.contentMarkdown;
    }
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
