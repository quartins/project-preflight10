// // src/components/TodoApp.tsx
// import { useState, useEffect } from "react";
// import axios from "axios";
// import type { TodoItem } from "../types";
// import dayjs from "dayjs";


// const TodoApp = () => {
//   const [todos, setTodos] = useState<TodoItem[]>([]);
//   const [inputText, setInputText] = useState("");
//   const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
//   const [curTodoId, setCurTodoId] = useState("");

//   const fetchData = async () => {
//     const res = await axios.get<TodoItem[]>("/api/todo");
//     setTodos(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSubmit = () => {
//     if (!inputText) return;
//     if (mode === "ADD") {
//       axios.put("/api/todo", { todoText: inputText })
//         .then(() => {
//           setInputText("");
//           fetchData();
//         });
//     } else {
//       axios.patch("/api/todo", { id: curTodoId, todoText: inputText })
//         .then(() => {
//           setInputText("");
//           setMode("ADD");
//           setCurTodoId("");
//           fetchData();
//         });
//     }
//   };

//   const handleDelete = (id: string) => {
//     axios.delete("/api/todo", { data: { id } }).then(fetchData);
//   };

//   const handleCancel = () => {
//     setMode("ADD");
//     setInputText("");
//     setCurTodoId("");
//   };

//   const formatDateTime = (dateStr: string) => {
//     const dt = dayjs(dateStr);
//     return {
//       date: dt.format("D/MM/YY"),
//       time: dt.format("HH:mm")
//     };
//   };

//   return (
//     <div>
//       <h1>Study Plan</h1>

      

//       <div style={{ display: "flex", alignItems: "start" }}>
//         <input
//           type="text"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button onClick={handleSubmit}>{mode === "ADD" ? "Submit" : "Update"}</button>
//         {mode === "EDIT" && <button onClick={handleCancel}>Cancel</button>}
//       </div>

//       {todos.map((item, idx) => {
//         const { date, time } = formatDateTime(item.createdAt);
//         return (
//           <article key={item.id} style={{ display: "flex", gap: "0.5rem" }}>
//             <div>({idx + 1})</div>
//             <div>📅 {date}</div>
//             <div>⏰ {time}</div>
//             <div>📰 {item.todoText}</div>
//             <div
//               style={{ cursor: "pointer" }}
//               onClick={() => {
//                 setMode("EDIT");
//                 setInputText(item.todoText);
//                 setCurTodoId(item.id);
//               }}
//             >
//               ✏️
//             </div>
//             {mode === "ADD" && (
//               <div
//                 style={{ cursor: "pointer" }}
//                 onClick={() => handleDelete(item.id)}
//               >
//                 🗑️
//               </div>
//             )}
//           </article>
//         );
//       })}
//     </div>
//   );
// };

// export default TodoApp;

//อันนี้ ok อยู่ 
// import { useState, useEffect } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import type { TodoItem } from "../types";

// import AddSubject from "./AddSubject";
// import SubjectList from "./SubjectList";

// const TodoApp = () => {
//   const [todos, setTodos] = useState<TodoItem[]>([]);
//   const [inputText, setInputText] = useState("");
//   const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
//   const [curTodoId, setCurTodoId] = useState("");

//   const fetchData = async () => {
//     const res = await axios.get<TodoItem[]>("/api/todo");
//     setTodos(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSubmit = () => {
//     if (!inputText) return;
//     if (mode === "ADD") {
//       axios.put("/api/todo", { todoText: inputText }).then(() => {
//         setInputText("");
//         fetchData();
//       });
//     } else {
//       axios.patch("/api/todo", { id: curTodoId, todoText: inputText }).then(() => {
//         setInputText("");
//         setMode("ADD");
//         setCurTodoId("");
//         fetchData();
//       });
//     }
//   };

//   const handleDelete = (id: string) => {
//     axios.delete("/api/todo", { data: { id } }).then(fetchData);
//   };

//   const handleCancel = () => {
//     setMode("ADD");
//     setInputText("");
//     setCurTodoId("");
//   };

//   const formatDateTime = (dateStr: string) => {
//     const dt = dayjs(dateStr);
//     return {
//       date: dt.format("D/MM/YY"),
//       time: dt.format("HH:mm"),
//     };
//   };

//   return (
//     <div>
      
//       <AddSubject />
//       <SubjectList />

//       <div style={{ display: "flex", alignItems: "start" }}>
//         <input
//           type="text"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button onClick={handleSubmit}>{mode === "ADD" ? "Submit" : "Update"}</button>
//         {mode === "EDIT" && <button onClick={handleCancel}>Cancel</button>}
//       </div>

//       {todos.map((item, idx) => {
//         const { date, time } = formatDateTime(item.createdAt);
//         return (
//           <article key={item.id} style={{ display: "flex", gap: "0.5rem" }}>
//             <div>({idx + 1})</div>
//             <div>📅 {date}</div>
//             <div>⏰ {time}</div>
//             <div>📰 {item.todoText}</div>
//             <div
//               style={{ cursor: "pointer" }}
//               onClick={() => {
//                 setMode("EDIT");
//                 setInputText(item.todoText);
//                 setCurTodoId(item.id);
//               }}
//             >
//               ✏️
//             </div>
//             {mode === "ADD" && (
//               <div
//                 style={{ cursor: "pointer" }}
//                 onClick={() => handleDelete(item.id)}
//               >
//                 🗑️
//               </div>
//             )}
//           </article>
//         );
//       })}
//     </div>
//   );
// };

// export default TodoApp;


// อันนี้ยัง งงๆ 
// import { useState } from "react";
// import AddSubject from "./AddSubject";
// import SubjectList from "./SubjectList";

// // 🆕 เปลี่ยนชื่อจาก TodoApp เป็น StudyPlanApp
// const StudyPlanApp = () => {
//   // 🔹 state สำหรับกรอก task (ไว้ต่อยอด)
//   const [inputText, setInputText] = useState("");
//   const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
//   const [curTaskId, setCurTaskId] = useState("");

//   // 🔜 handleSubmit จะเอาไว้ใส่ task จริงในอนาคต
//   const handleSubmit = () => {
//     if (!inputText.trim()) return;
//     alert(`You entered: ${inputText} (ยังไม่ส่งเข้า DB รอเชื่อม API tasks)`);
//     setInputText("");
//   };

//   const handleCancel = () => {
//     setMode("ADD");
//     setInputText("");
//     setCurTaskId("");
//   };

//   return (
//     <div>
//       <h2>📚 Study Plan</h2>

//       {/* ส่วนเพิ่มวิชา */}
//       <AddSubject />

//       {/* รายชื่อวิชา */}
//       <SubjectList />

//       {/* 🔜 ส่วนเพิ่ม task (placeholder รอเชื่อม API) */}
//       <div style={{ display: "flex", alignItems: "start", gap: "0.5rem", marginTop: "1rem" }}>
//         <input
//           type="text"
//           placeholder="New task..."
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button onClick={handleSubmit}>
//           {mode === "ADD" ? "Add Task" : "Update Task"}
//         </button>
//         {mode === "EDIT" && (
//           <button onClick={handleCancel}>Cancel</button>
//         )}
//       </div>

//       {/* 🔜 ยังไม่แสดงรายการ task จริง */}
//       <p style={{ marginTop: "1rem" }}><i>Task list will appear here soon...</i></p>
//     </div>
//   );
// };

// export default StudyPlanApp;


// // อันใหม่ 
// src/components/TodoApp.ts
import { useState } from "react";
import AddSubject from "./AddSubject";
import SubjectList from "./SubjectList";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

export default function TodoApp() {
  const [refreshSubject, setRefreshSubject] = useState(false);
  const [refreshTask, setRefreshTask] = useState(false);

  return (
    <div>
       {/* <h2>Add Subject</h2> */}
      <AddSubject onAdded={() => setRefreshSubject(!refreshSubject)} />

      <h3>Subject List</h3>
      {/* <SubjectList key={refreshSubject.toString()} /> */}
      <SubjectList refreshTrigger={refreshSubject} />

      <hr />

      <h2>📝 Tasks</h2>
      <AddTask
        onAdded={() => setRefreshTask(!refreshTask)}
        refreshTrigger={refreshSubject} 
      />
      <TaskList key={refreshTask.toString()} />
    </div>
  );
}

