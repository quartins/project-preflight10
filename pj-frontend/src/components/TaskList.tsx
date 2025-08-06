// src/components/TaskList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

type Task = {
  id: number;
  title: string;
  dueDate: string;
  status: string;
  subjectId: number;
  createdAt: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get<Task[]>("/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task, idx) => (
            <li key={task.id}>
              <strong>{idx + 1}. {task.title}</strong> | 
              Due: {dayjs(task.dueDate).format("DD/MM/YYYY")} | 
              Status: {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
