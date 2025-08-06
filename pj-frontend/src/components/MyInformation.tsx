// src/components/MyInformation.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import type { Owner } from "../types";

const MyInformation = () => {
  const [owner, setOwner] = useState<Owner | null>(null);

  async function fetchOwner() {
     
      const res = await axios.get("/api/todo/owner");
      setOwner(res.data);
  }
  useEffect(() => {
    fetchOwner();
  }, []);

  return (
    <div>
      <h1>My Information</h1>
      {owner ? (
        <div>
          <p>ID: {owner?.id}</p>
          <p>Name: {owner.name}</p>
          <p>Course ID: {owner.course_id}</p>
          <p>Section: {owner.section}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyInformation;

