const AnalyticsService = require("../services/AnalyticsService");

const getMoodDistribution = async (req, res) => {
  try {
    const data = await AnalyticsService.getMoodDistribution(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMoodTrend = async (req, res) => {
  try {
    const data = await AnalyticsService.getMoodTrend(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const data = await AnalyticsService.getSummaryStats(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMoodDistribution, getMoodTrend, getSummary };
