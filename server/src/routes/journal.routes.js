const express = require("express");
const router = express.Router();
const {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/journal.ctrl");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const { createEntrySchema } = require("../validators/entry.schema");

// Semua rute jurnal di bawah wajib pake token JWT
router.use(protect);

router
  .route("/")
  .get(getEntries) //ambil data, gak pake Zod
  .post(validate(createEntrySchema), createEntry); // Zod dicegat sebelum masuk createEntry

router
  .route("/:id")
  .put(validate(createEntrySchema), updateEntry)
  .delete(deleteEntry);

module.exports = router;
