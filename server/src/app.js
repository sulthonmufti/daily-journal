const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const journalRoutes = require("./routes/journal.routes");
const moodRoutes = require("./routes/mood.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/entries", journalRoutes);
app.use("/api/moods", moodRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: "API Daily Journal berjalan dengan baik!" });
});

module.exports = app;
