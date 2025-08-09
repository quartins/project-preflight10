
// import { useEffect, useState } from "react";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import TodoApp from "./components/TodoApp";

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
//     <div className="container" style={{ position: "relative", minHeight: "vh", paddingTop: "4rem" }}>

//       {/* Header */}
//       <header
//         style={{
//           position: "absolute",
//           top: "1rem",
//           left: 0,
//           right: 0,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           fontSize: "1.5rem",
//           fontWeight: "bold",
//         }}
//       >
//         <div style={{ position: "relative", width: "100%", textAlign: "center" }}>
//           <h1 style={{ margin: 0 }}>Study Plan</h1>
//           {page === "todo" && (
//             <button
//               onClick={logout}
//               style={{
//                 position: "absolute",
//                 right: "1rem",
//                 top: "0",
//                 padding: "0.4rem 0.8rem",
//                 fontSize: "1rem",
//               }}
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </header>

//       {/* Main content */}
//       <main style={{ marginTop: "20px", padding: "1rem" }}>
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
//         {page === "todo" && <TodoApp />}
//       </main>
//     </div>
//   );
// }


// export default App;


// import { useEffect, useState } from "react";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import TodoApp from "./components/TodoApp";

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
//     <div className="container" style={{ paddingTop: "60px", minHeight: "100vh" }}>
      
//       {/* Navbar */}
//       <nav
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: "60px",
//           backgroundColor: "#f5f5f5",
//           borderBottom: "1px solid #ccc",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "0 1rem",
//           zIndex: 1000,
//         }}
//       >
//         <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Study Plan</div>

//         {page === "todo" && (
//           <button
//             onClick={logout}
//             style={{
//               padding: "0.4rem 0.8rem",
//               fontSize: "1rem",
//               border: "none",
//               backgroundColor: "#e74c3c",
//               color: "#fff",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Logout
//           </button>
//         )}
//       </nav>

//       {/* Main content */}
//       <main style={{ padding: "1rem" }}>
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
//         {page === "todo" && <TodoApp />}
//       </main>
//     </div>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import TodoApp from "./components/TodoApp";
// import "./css/Navbar.css"; // 👉 นำเข้าไฟล์ CSS ที่สร้าง

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
//     <div className="container" style={{ paddingTop: "60px", minHeight: "100vh" }}>
      
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="navbar-logo">
//           <img src="/iconweb.png" alt="Logo" />
//           <span className="navbar-title">Study Plan</span>
//         </div>

//         {page === "todo" && (
//           <button onClick={logout} className="logout-button">
//             Logout
//           </button>
//         )}
//       </nav>

//       {/* Main content */}
//       <main style={{ padding: "1rem" }}>
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
//         {page === "todo" && <TodoApp />}
//       </main>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoApp from "./components/TodoApp";
import "./css/Navbar.css"; // 👉 นำเข้าไฟล์ CSS ที่สร้าง

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
    <div className="container" style={{ paddingTop: "60px", minHeight: "100vh" }}>
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/iconweb.png" alt="Logo" />
          <span className="navbar-title">Study Plan</span>
        </div>

        {page === "todo" && (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        )}
      </nav>

      {/* Main content */}
      <main style={{ padding: "1rem" }}>
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
