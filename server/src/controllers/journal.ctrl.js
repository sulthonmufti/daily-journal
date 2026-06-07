const JournalService = require("../services/JournalService");

const getEntries = async (req, res) => {
  try {
    const entries = await JournalService.getAllEntries(req.user._id); // req.user._id dapet dari middleware auth (protect)
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createEntry = async (req, res) => {
  try {
    const entry = await JournalService.createEntry(req.user._id, req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getEntries, createEntry };
