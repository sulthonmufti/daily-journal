const express = require("express");
const router = express.Router();
const {
  getMoodDistribution,
  getMoodTrend,
  getSummary,
} = require("../controllers/analytics.ctrl");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/mood-distribution", getMoodDistribution);
router.get("/mood-trend", getMoodTrend);
router.get("/summary", getSummary);

module.exports = router;
