/*import { useEffect, useState } from "react";
import axios from "axios";
import { type TodoItem } from "./types";
import dayjs from "dayjs";
function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
  const [curTodoId, setCurTodoId] = useState("");

  async function fetchData() {
    const res = await axios.get<TodoItem[]>("api/todo");
    setTodos(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function handleSubmit() {
    if (!inputText) return;
    if (mode === "ADD") {
      axios
        .request({
          url: "/api/todo",
          method: "put",
          data: { todoText: inputText },
        })
        .then(() => {
          setInputText("");
        })
        .then(fetchData)
        .catch((err) => alert(err));
    } else {
      axios
        .request({
          url: "/api/todo",
          method: "patch",
          data: { id: curTodoId, todoText: inputText },
        })
        .then(() => {
          setInputText("");
          setMode("ADD");
          setCurTodoId("");
        })
        .then(fetchData)
        .catch((err) => alert(err));
    }
  }

  function handleDelete(id: string) {
    axios
      .delete("/api/todo", { data: { id } })
      .then(fetchData)
      .then(() => {
        setMode("ADD");
        setInputText("");
      })
      .catch((err) => alert(err));
  }

  function handleCancel() {
    setMode("ADD");
    setInputText("");
    setCurTodoId("");
  }
  return (
    <div className="container">
      <header>
        <h1>Todo App</h1>
      </header>
      <main>
        <div style={{ display: "flex", alignItems: "start" }}>
          <input
            type="text"
            onChange={handleChange}
            value={inputText}
            data-cy="input-text"
          />
          <button onClick={handleSubmit} data-cy="submit">
            {mode === "ADD" ? "Submit" : "Update"}
          </button>
          {mode === "EDIT" && (
            <button onClick={handleCancel} className="secondary">
              Cancel
            </button>
          )}
        </div>
        <div data-cy="todo-item-wrapper">
          {todos.sort(compareDate).map((item, idx) => {
            const { date, time } = formatDateTime(item.createdAt);
            const text = item.todoText;
            return (
              <article
                key={item.id}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <div>({idx + 1})</div>
                <div>📅{date}</div>
                <div>⏰{time}</div>
                <div data-cy="todo-item-text">📰{text}</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMode("EDIT");
                    setCurTodoId(item.id);
                    setInputText(item.todoText);
                  }}
                  data-cy="todo-item-update"
                >
                  {curTodoId !== item.id ? "🖊️" : "✍🏻"}
                </div>

                {mode === "ADD" && (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item.id)}
                    data-cy="todo-item-delete"
                  >
                    🗑️
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;

function formatDateTime(dateStr: string) {
  if (!dayjs(dateStr).isValid()) {
    return { date: "N/A", time: "N/A" };
  }
  const dt = dayjs(dateStr);
  const date = dt.format("D/MM/YY");
  const time = dt.format("HH:mm");
  return { date, time };
}

function compareDate(a: TodoItem, b: TodoItem) {
  const da = dayjs(a.createdAt);
  const db = dayjs(b.createdAt);
  return da.isBefore(db) ? -1 : 1;
} */

  // TodoAPI Thanchanok
//  // src/App.tsx
// import MyInformation from "./components/MyInformation";
// import TodoApp from "./components/TodoApp";

// function App() {
//   return (
//     <div className="container" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      
      
//       <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "10px", background: "#f9f9f9" }}>
//         <MyInformation />
//       </section>

//       <section style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "10px", background: "#fff" }}>
//         <TodoApp />
//       </section>
//     </div>
//   );
// }

// export default App; 

// Project Preflight //
/*import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

type Page = "login" | "signup" | "todo";

function App() {
  const [page, setPage] = useState<Page>("login");
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setPage("todo");
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setPage("login");
  }

  function handleAdd() {
    if (input.trim()) {
      setTodos((prev) => [...prev, input]);
      setInput("");
    }
  }

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Study Plan</h1>
        {page === "todo" && <button onClick={logout}>Logout</button>}
      </header>

      <main>
        {page === "login" && (
          <Login
            goToSignup={() => setPage("signup")}
            onLogin={() => setPage("todo")}
          />
        )}
        {page === "signup" && (
          <Signup
            goToLogin={() => setPage("login")}
            onSignup={() => setPage("todo")}
          />
        )}
        {page === "todo" && (
          <>
            <h2>Welcome to your Study Plan</h2>
            <input
              placeholder="Add todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
            <ul>
              {todos.map((todo, i) => (
                <li key={i}>{todo}</li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default App;*/

import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoApp from "./components/TodoApp";

type Page = "login" | "signup" | "todo";

function App() {
  const [page, setPage] = useState<Page>("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setPage("todo");
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setPage("login");
  }

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Study Plan</h1>
        {page === "todo" && <button onClick={logout}>Logout</button>}
      </header>

      <main>
        {page === "login" && (
          <Login
            goToSignup={() => setPage("signup")}
            onLogin={() => setPage("todo")}
          />
        )}
        {page === "signup" && (
          <Signup
            goToLogin={() => setPage("login")}
            onSignup={() => setPage("todo")}
          />
        )}
        {page === "todo" && <TodoApp />}
      </main>
    </div>
  );
}

export default App;


// import { useEffect, useState } from "react";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import StudyPlanApp from "./components/StudyPlanApp"; // ✅ เปลี่ยนชื่อ import

// type Page = "login" | "signup" | "todo";

// function App() {
//   const [page, setPage] = useState<Page>("login");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setPage("todo");
//   }, []);

//   function logout() {
//     localStorage.removeItem("token");
//     setPage("login");
//   }

//   return (
//     <div className="container">
//       <header style={{ display: "flex", justifyContent: "space-between" }}>
//         <h1>Study Plan</h1>
//         {page === "todo" && <button onClick={logout}>Logout</button>}
//       </header>

//       <main>
//         {page === "login" && (
//           <Login
//             goToSignup={() => setPage("signup")}
//             onLogin={() => setPage("todo")}
//           />
//         )}
//         {page === "signup" && (
//           <Signup
//             goToLogin={() => setPage("login")}
//             onSignup={() => setPage("todo")}
//           />
//         )}
//         {page === "todo" && <StudyPlanApp />} {/* ✅ เปลี่ยนตรงนี้ */}
//       </main>
//     </div>
//   );
// }

// export default App;
