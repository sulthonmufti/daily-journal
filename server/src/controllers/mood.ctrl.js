const MoodService = require("../services/MoodService");

const getMoods = async (req, res) => {
  try {
    const moods = await MoodService.getMoodTags(req.user._id);
    res.status(200).json({ success: true, data: moods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createMood = async (req, res) => {
  try {
    const mood = await MoodService.createMoodTag(req.user._id, req.body);
    res.status(201).json({ success: true, data: mood });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMood = async (req, res) => {
  try {
    const mood = await MoodService.updateMoodTag(
      req.user._id,
      req.params.id,
      req.body,
    );
    res.status(200).json({ success: true, data: mood });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

const deleteMood = async (req, res) => {
  try {
    await MoodService.deleteMoodTag(req.user._id, req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Mood tag berhasil dihapus" });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

module.exports = { getMoods, createMood, updateMood, deleteMood };
