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

// ✅ ต้องอยู่ข้างนอกและใช้งาน
type Props = {
  onAdded?: () => void;
};

export default function AddSubject({ onAdded }: Props) {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return;

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

      // ✅ call onAdded after adding
      if (onAdded) onAdded();
    } catch (err) {
      console.error("Failed to add subject", err);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>Add Subject</h3>
      <input
        placeholder="Subject name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
