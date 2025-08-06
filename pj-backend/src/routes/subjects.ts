import express from "express";
import { dbClient } from "../../db/client.js";
import { subjects } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /subjects - เอาทุก subject ของ user
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId!;
    const result = await dbClient.query.subjects.findMany({
      where: eq(subjects.userId, userId),
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /subjects - เพิ่ม subject ใหม่
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId!;
    const { name } = req.body;

    const result = await dbClient
      .insert(subjects)
      .values({ name, userId })
      .returning();
    res.json(result[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
