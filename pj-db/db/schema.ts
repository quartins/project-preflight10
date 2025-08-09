/*import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const todoTable = pgTable("todo", {
  id: uuid("id").primaryKey().defaultRandom(),
  todoText: varchar("todo_text", { length: 255 }).notNull(),
  isDone: boolean("is_done").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
});*/
// db/schema.ts

// import {
//   pgTable,
//   serial,
//   text,
//   timestamp,
//   varchar,
//   date,
//   integer,
// } from "drizzle-orm/pg-core";

// // USERS TABLE
// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   email: text("email").notNull().unique(),
//   password: text("password").notNull(),
//   role: text("role").default("user"),
//   createdAt: timestamp("created_at").defaultNow(),
// });

// // SUBJECTS TABLE
// export const subjects = pgTable("subjects", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
//   color: text("color"), // ลบได้ถ้าไม่ใช้
//   createdAt: timestamp("created_at").defaultNow(),
// });

// // TASKS TABLE (แทน todo)
// export const tasks = pgTable("tasks", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   description: text("description"),
//   dueDate: date("due_date").notNull(),
//   status: text("status").notNull(), // ควรมี validation ภายนอก (เช่น Zod)
//   subjectId: integer("subject_id").references(() => subjects.id, { onDelete: "cascade" }),
//   userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
//   createdAt: timestamp("created_at").defaultNow(),
// });

import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
  date,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

// ✅ USERS TABLE (ใช้ uuid)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).default("student"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ✅ SUBJECTS TABLE (userId เป็น uuid)
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  //color: text("color"),
  createdAt: timestamp("created_at").defaultNow(),
});

//✅ TASKS TABLE (userId เป็น uuid)
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: date("due_date").notNull(),
  status: text("status").notNull(),
  subjectId: integer("subject_id").references(() => subjects.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   description: text("description"),
//   dueDate: date("due_date").notNull(),
//   status: text("status").notNull(),
//   subjectId: integer("subject_id").references(() => subjects.id, { onDelete: "cascade" }),
//   userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
//   createdAt: timestamp("created_at").defaultNow(),
// });




