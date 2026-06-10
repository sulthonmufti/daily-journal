const express = require("express");
const router = express.Router();
const {
  getEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/journal.ctrl");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const {
  createEntrySchema,
  updateEntrySchema,
} = require("../validators/entry.schema");

router.use(protect);

router
  .route("/")
  .get(getEntries)
  .post(validate(createEntrySchema), createEntry);

router
  .route("/:id")
  .get(getEntryById)
  .put(validate(updateEntrySchema), updateEntry)
  .delete(deleteEntry);

module.exports = router;
