import express from "express";
import { dbClient } from "../../db/client.js";
import { tasks } from "../../db/schema.js";
import { eq } from "drizzle-orm";
//import { authMiddleware } from "../middleware/auth";
import { authMiddleware } from "../middleware/auth.js";


const router = express.Router();

// GET /tasks - แสดง tasks ของ user
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId!;
    const result = await dbClient.query.tasks.findMany({
      where: eq(tasks.userId, userId),
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /tasks - เพิ่ม task ใหม่
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId!;
    const { title, description, dueDate, status, subjectId } = req.body;

    const result = await dbClient
      .insert(tasks)
      .values({ title, description, dueDate, status, subjectId, userId })
      .returning();
    res.json(result[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
