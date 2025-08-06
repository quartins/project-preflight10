import { useEffect, useState } from "react";
import axios from "axios";

type Subject = {
  id: number;
  name: string;
  createdAt: string;
};

export default function SubjectList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await axios.get("/api/subjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubjects(res.data);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <h3>Subject List</h3>
      <ul>
        {subjects.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}

// SubjectList.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import AddSubject from "./AddSubject";

// type Subject = {
//   id: number;
//   name: string;
//   createdAt: string;
// };

// export default function SubjectList() {
//   const [subjects, setSubjects] = useState<Subject[]>([]);

//   const fetchSubjects = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("No token found");
//       return;
//     }

//     try {
//       const res = await axios.get("/api/subjects", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSubjects(res.data);
//     } catch (err) {
//       console.error("Failed to fetch subjects", err);
//     }
//   };

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   return (
//     <div>
//       <h3>Subject List</h3>
//       <AddSubject onAdded={fetchSubjects} />
//       <ul>
//         {subjects.map((s) => (
//           <li key={s.id}>{s.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
