// import { useState } from "react";
// import axios from "axios";

// export default function AddSubject() {
//   const [name, setName] = useState("");

//   const handleAdd = async () => {
//     if (!name.trim()) return;

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("No token found");
//       return;
//     }

//     try {
//       await axios.post(
//         "/api/subjects",
//         { name },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setName("");
//     } catch (err) {
//       console.error("Failed to add subject", err);
//     }
//   };

//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <h3>Add Subject</h3>
//       <input
//         placeholder="Subject name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button onClick={handleAdd}>Add</button>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import "../css/AddSubject.css"; // อย่าลืม import ไฟล์ CSS ด้วย

type Props = {
  onAdded?: () => void;
};

export default function AddSubject({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // ✅ เก็บสถานะ error


  const handleAdd = async () => {
    if (!name.trim()) {
      setError("* Please enter a subject name."); // ตั้งข้อความ error
      return;
    }
    setError(""); // ล้าง error ถ้ากรอกแล้ว

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.post(
        "/api/subjects",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      if (onAdded) onAdded();
    } catch (err) {
      console.error("Failed to add subject", err);
    }
  };

  return (
    <div className="add-subject-container">
      <h3 className="add-subject-title">Add Subject</h3>
      <div className="add-subject-form">
        <input
          className="add-subject-input"
          placeholder="Subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="add-subject-button"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
            {error && <p className="error-message">{error}</p>}

    </div>
  );
}
