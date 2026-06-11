const express = require("express");
const router = express.Router();
const {
  getMoods,
  createMood,
  updateMood,
  deleteMood,
} = require("../controllers/mood.ctrl");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.route("/").get(getMoods).post(createMood);

router.route("/:id").put(updateMood).delete(deleteMood);

module.exports = router;
