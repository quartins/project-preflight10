//  // อันนี้เพิ่ม navbar ซ้าย โอเคอยู่
// import { useState } from "react";
// import AddSubject from "./AddSubject";
// import SubjectList from "./SubjectList";
// import AddTask from "./AddTask";
// import TaskList from "./TaskList";
// import axios from "axios";
// import "../css/TodoApp.css";


// export default function TodoApp() {
//   const [refreshSubject, setRefreshSubject] = useState(false);
//   const [refreshTask, setRefreshTask] = useState(false);

//   return (
//     <div style={{ display: "flex" }}>
//       {/* Sidebar Fixed */}
//       <nav className="sidebar">
//         <AddSubject onAdded={() => setRefreshSubject(!refreshSubject)} />
//         <h3 style={{ marginTop: 0 }}>🗐 Subjects</h3>
//         <div style={{ marginTop: "rem", flex: 1 }}>
//           <SubjectList refreshTrigger={refreshSubject} />
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main
//         style={{
//           marginLeft: "280px", }}
//       >
//         <h2>📝 Tasks</h2>
//         <AddTask
//           onAdded={() => setRefreshTask(!refreshTask)}
//           refreshTrigger={refreshSubject}
//         />
//         <div style={{ marginTop: "1rem" }}>
//           <TaskList key={refreshTask.toString()} />
//         </div>
//       </main>
//     </div>
//   );
// }


// import { useState } from "react";
// import AddSubject from "./AddSubject";
// import SubjectList from "./SubjectList";
// import AddTask from "./AddTask";
// import TaskList from "./TaskList";
// import "../css/TodoApp.css";

// export default function TodoApp() {
//   const [refreshSubject, setRefreshSubject] = useState(false);
//   const [refreshTask, setRefreshTask] = useState(false);
//   const [showAddTask, setShowAddTask] = useState(false);

//   const handleTaskAdded = () => {
//     setRefreshTask(!refreshTask);
//     setShowAddTask(false);
//   };

//   const handleCancelAddTask = () => {
//     setShowAddTask(false);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       {/* Sidebar */}
//       <nav className="sidebar">
//         <AddSubject onAdded={() => setRefreshSubject(!refreshSubject)} />
//         <h3 style={{ marginTop: 0 }}>🗐 Subjects</h3>
//         <div style={{ flex: 1 }}>
//           <SubjectList refreshTrigger={refreshSubject} />
//         </div>
//       </nav>

//       {/* Main */}
//       <main style={{ marginLeft: "280px", flex: 1 }}>
//         <div className="task-header">
//           <h2 className="task-title">📝 Tasks</h2>

//           {!showAddTask && (
//             <button
//               className="add-task-button"
//               onClick={() => setShowAddTask(true)}
//             >
//               Add Task
//             </button>
//           )}
//         </div>

//         {showAddTask && (
//           <div>
//             <AddTask
//               onAdded={handleTaskAdded}
//               onCancel={handleCancelAddTask}
//               refreshTrigger={refreshSubject}
//             />
//           </div>
//         )}

//         <div style={{ marginTop: "1rem" }}>
//           <TaskList key={refreshTask.toString()} />
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

import AddSubject from "./AddSubject";
import SubjectList from "./SubjectList";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "../css/TodoApp.css";
interface Subject {
  id: number;
  name: string;
}

export default function TodoApp() {
  const [refreshSubject, setRefreshSubject] = useState(false);
  const [refreshTask, setRefreshTask] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);


    useEffect(() => {
    document.body.classList.add("todo-page");
    return () => {
      document.body.classList.remove("todo-page");
    };
  }, []);
  
  useEffect(() => {
    axios.get("/api/subjects").then((res) => {
      setSubjects(res.data);
    });
  }, [refreshSubject]);

  const handleTaskAdded = () => {
    setRefreshTask(!refreshTask);
    setShowAddTask(false);
  };

  const handleCancelAddTask = () => {
    setShowAddTask(false);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <nav className="sidebar">
        <AddSubject onAdded={() => setRefreshSubject(!refreshSubject)} />
        <h3 style={{ marginTop: 0 }}>🗐 Subjects</h3>
        <div style={{ flex: 1 }}>
          <SubjectList refreshTrigger={refreshSubject} />
        </div>
      </nav>

      {/* Main */}
      <main style={{ marginLeft: "280px", flex: 1 }}>
        <div className="task-header">
          <h2 className="task-title">📝 Tasks</h2>

          {!showAddTask && (
            <button
              className="add-task-button"
              onClick={() => setShowAddTask(true)}
            >
              Add Task
            </button>
          )}
        </div>

        {showAddTask && (
          <div>
            <AddTask
              onAdded={handleTaskAdded}
              onCancel={handleCancelAddTask}
              refreshTrigger={refreshSubject}
            />
          </div>
        )}

        {/* รายการ Tasks แยกตาม Subject */}
        <div style={{ marginTop: "1rem" }}>
          <TaskList key={refreshTask.toString()} />
        </div>
       </main>
     
    
    </div>
  );
}
