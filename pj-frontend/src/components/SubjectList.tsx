// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../css/SubjectList.css"; 

// type Subject = {
//   id: number;
//   name: string;
// };

// interface Props {
//   refreshTrigger: boolean;
// }

// export default function SubjectList({ refreshTrigger }: Props) {
//   const [subjects, setSubjects] = useState<Subject[]>([]);

//   const fetchSubjects = async () => {
//     const token = localStorage.getItem("token");
//     const res = await axios.get("/api/subjects", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setSubjects(res.data);
//   };

//     const handleDelete = async (id: number) => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(`/api/subjects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // หลังลบสำเร็จ ให้โหลดข้อมูลใหม่
//       fetchSubjects();
//     } catch (error) {
//       console.error("Failed to delete subject", error);
//     }
//   };

//   useEffect(() => {
//     fetchSubjects();
//   }, [refreshTrigger]); // 👈 ทำงานเฉพาะตอน refreshTrigger เปลี่ยน

//   return (
//     <ul className="subject-list">
//       {subjects.map((subject) => (
//         <li key={subject.id}>{subject.name}
//           <button onClick={() => handleDelete(subject.id)} className="delete-button">
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import "../css/SubjectList.css";

type Subject = {
  id: number;
  name: string;
};

interface Props {
  refreshTrigger: boolean;
}

export default function SubjectList({ refreshTrigger }: Props) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const fetchSubjects = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/subjects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSubjects(res.data);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubjects();
    } catch (error) {
      console.error("Failed to delete subject", error);
    }
  };

  // เริ่มแก้ไข กำหนด id ที่จะแก้ไข และชื่อเดิมไว้ใน state
  const startEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  // ยกเลิกการแก้ไข ล้าง state
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  // บันทึกชื่อที่แก้ไข ส่งไป backend
  const saveEdit = async (id: number) => {
    if (!editName.trim()) {
      alert("Name can't be empty");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `/api/subjects/${id}`,
        { name: editName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditName("");
      fetchSubjects();
    } catch (error) {
      console.error("Failed to edit subject", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [refreshTrigger]);

  return (
    <ul className="subject-list">
      {subjects.map((subject) => (
        <li key={subject.id} className="subject-item">
          {editingId === subject.id ? (
            <>
              <input
                type="text"
                className="input-field"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
              />
              <button
              onClick={() => saveEdit(subject.id)}
              className="icon-button save-button"
              title="Save"
            >
              <img src="/save.png" alt="Save" style={{ width: 20, height: 20 }} />
            
            </button>

              <button
                onClick={cancelEdit}
                className="icon-button cancel-button"
                title="Cancel"
              >
                <img src="/cancel.png" alt="Cancel" style={{ width: 20, height: 20 }} />
              </button>

            
            </>
          ) : (
            <>
              <span className="subject-name">{subject.name}</span>
              <div className="button-group">
                <button
                  onClick={() => startEdit(subject.id, subject.name)}
                  className="icon-button edit-button"
                  aria-label="Edit subject"
                  title="Edit"
                >
                  <img src="/edit.png" alt="Edit" />
                </button>
                <button
                  onClick={() => handleDelete(subject.id)}
                  className="icon-button delete-button"
                  aria-label="Delete subject"
                  title="Delete"
                >
                  <img src="/delete.png" alt="Delete" />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
