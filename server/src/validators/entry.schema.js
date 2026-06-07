const { z } = require("zod");

const createEntrySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    contentMarkdown: z.string().min(1, "Konten jurnal tidak boleh kosong"),
    mood: z.string().min(1, "Mood utama wajib dipilih"),
    moodScore: z.number().min(1, "Skor minimal 1").max(10, "Skor maksimal 10"),
    weather: z.string().optional(),
    entryDate: z.string().optional(), // Menerima tanggal custom (backfill)
    isPrivate: z.boolean().optional(),
    isPinned: z.boolean().optional(),
  }),
});

const updateEntrySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    contentMarkdown: z.string().optional(),
    mood: z.string().optional(),
    moodScore: z.number().min(1).max(10).optional(),
    weather: z.string().optional(),
    isPrivate: z.boolean().optional(),
    isPinned: z.boolean().optional(),
  }),
});

module.exports = {
  createEntrySchema,
  updateEntrySchema,
};
