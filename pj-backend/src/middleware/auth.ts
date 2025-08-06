// src/middleware/auth.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret") as {
      userId: string;
    };
    req.userId = decoded.userId; // ✅ ปักหมุดตรงนี้!
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
