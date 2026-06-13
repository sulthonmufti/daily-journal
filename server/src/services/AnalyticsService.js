const mongoose = require("mongoose");
const JournalEntry = require("../models/JournalEntry");

class AnalyticsService {
  //distribusi Frekuensi Tiap Mood (Pie/Donut Chart)
  static async getMoodDistribution(userId) {
    const distribution = await JournalEntry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return distribution;
  }

  //tren Mood (Line Chart - Rata-rata score per hari)
  static async getMoodTrend(userId) {
    const trend = await JournalEntry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$entryDate" } },
          averageScore: { $avg: "$moodScore" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return trend;
  }

  //ringkasan Statistik Dasar
  static async getSummaryStats(userId) {
    const totalEntries = await JournalEntry.countDocuments({ userId });

    const topMoodResult = await JournalEntry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const favoriteMood =
      topMoodResult.length > 0 ? topMoodResult[0]._id : "Belum ada";

    return { totalEntries, favoriteMood };
  }
}

module.exports = AnalyticsService;
