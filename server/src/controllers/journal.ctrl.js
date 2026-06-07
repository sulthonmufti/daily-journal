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

const updateEntry = async (req, res) => {
  try {
    const entry = await JournalService.updateEntry(
      req.user._id,
      req.params.id,
      req.body,
    );
    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const deleteEntry = async (req, res) => {
  try {
    await JournalService.deleteEntry(req.user._id, req.params.id);
    res
      .status(200)
      .json({
        success: true,
        message: "Jurnal berhasil dihapus secara permanen",
      });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = { getEntries, createEntry, updateEntry, deleteEntry };
