// import { eq } from "drizzle-orm";
// import { dbClient, dbConn } from "@db/client.js";
// import { todoTable } from "@db/schema.js";

// async function insertData() {
//   await dbClient.insert(todoTable).values({
//     todoText: "Finish reading",
//   });
//   dbConn.end();
// }

// async function queryData() {
//   const results = await dbClient.query.todoTable.findMany();
//   console.log(results);
//   dbConn.end();
// }

// async function updateData() {
//   const results = await dbClient.query.todoTable.findMany();
//   if (results.length === 0) dbConn.end();

//   const id = results[0].id;
//   await dbClient
//     .update(todoTable)
//     .set({
//       todoText: "AAA",
//     })
//     .where(eq(todoTable.id, id));
//   dbConn.end();
// }

// async function deleteData() {
//   const results = await dbClient.query.todoTable.findMany();
//   if (results.length === 0) dbConn.end();

//   const id = results[0].id;
//   await dbClient.delete(todoTable).where(eq(todoTable.id, id));
//   dbConn.end();
// }

// insertData();
// //queryData();
// // updateData();
// // deleteData();


import { eq } from "drizzle-orm";
import { dbClient, dbConn } from "@db/client.js";
import { todos } from "@db/schema.js";

async function insertData() {
  await dbClient.insert(todos).values({
    title: "Finish reading",
    description: "Read Chapter 5 of textbook",
    dueDate: new Date("2025-08-10"),
    status: "pending",
    subjectId: 1, // ต้องมี subject id จริงใน DB
    userId: "7bfb7a54-1234-5678-9101-abcde1234567", // ต้องเป็น UUID จริงใน users
  });
  dbConn.end();
}


async function queryData() {
  const results = await dbClient.query.todoTable.findMany();
  console.log(results);
  dbConn.end();
}

async function updateData() {
  const results = await dbClient.query.todoTable.findMany();
  if (results.length === 0) dbConn.end();

  const id = results[0].id;
  await dbClient
    .update(todoTable)
    .set({
      todoText: "AAA",
    })
    .where(eq(todoTable.id, id));
  dbConn.end();
}

async function deleteData() {
  const results = await dbClient.query.todoTable.findMany();
  if (results.length === 0) dbConn.end();

  const id = results[0].id;
  await dbClient.delete(todoTable).where(eq(todoTable.id, id));
  dbConn.end();
}

insertData();
//queryData();
// updateData();
// deleteData();