const JournalEntry = require('../models/JournalEntry');

class JournalService {
  
  //ambil semua entri milik user (termasuk filter & pagination)
  static async getAllEntries(userId) {
    return await JournalEntry.find({ userId }).sort({ entryDate: -1 });
  }

  //buat entri jurnal baru
  static async createEntry(userId, entryData) {
    const dateToSave = entryData.entryDate ? new Date(entryData.entryDate) : new Date();

    const newEntry = await JournalEntry.create({
      userId,
      title: entryData.title || 'Untitled',
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
}

module.exports = JournalService;