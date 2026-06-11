const MoodTag = require("../models/MoodTag");

class MoodService {
  // Ambil semua mood tag milik user (ditambah mood default sistem)
  static async getMoodTags(userId) {
    const moods = await MoodTag.find({
      $or: [{ userId: userId }, { isDefault: true }],
    }).sort({ order: 1, createdAt: -1 });

    return moods;
  }

  // Buat mood tag baru custom
  static async createMoodTag(userId, moodData) {
    const newMood = await MoodTag.create({
      userId,
      name: moodData.name,
      emoji: moodData.emoji,
      color: moodData.color,
      isDefault: false,
      order: moodData.order || 0,
    });
    return newMood;
  }

  // Update mood tag custom
  static async updateMoodTag(userId, moodId, updateData) {
    const mood = await MoodTag.findOneAndUpdate(
      { _id: moodId, userId: userId, isDefault: false },
      updateData,
      { new: true, runValidators: true },
    );

    if (!mood)
      throw new Error("Mood tag tidak ditemukan atau tidak dapat diedit");
    return mood;
  }

  // Hapus mood tag custom
  static async deleteMoodTag(userId, moodId) {
    const deletedMood = await MoodTag.findOneAndDelete({
      _id: moodId,
      userId: userId,
      isDefault: false,
    });

    if (!deletedMood)
      throw new Error("Mood tag tidak ditemukan atau tidak dapat dihapus");
    return true;
  }
}

module.exports = MoodService;
