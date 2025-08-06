// src/components/AddTask.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Subject = {
  id: number;
  name: string;
};

export default function AddTask({ onAdded }: { onAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get<Subject[]>("/api/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(res.data);
    };
    fetchSubjects();
  }, []);

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.post(
        "/api/tasks",
        { title, subjectId: Number(subjectId), dueDate, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setSubjectId("");
      setDueDate("");
      setStatus("pending");
      onAdded(); // รีเฟรช TaskList
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  return (
    <div>
      <h3>Add Task</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      >
        <option value="">-- Select Subject --</option>
        {subjects.map((subj) => (
          <option key={subj.id} value={subj.id}>
            {subj.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </select>

      <button onClick={handleAddTask}>Submit</button>
    </div>
  );
}
