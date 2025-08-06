import { useState } from "react";
import axios from "axios";

export default function Signup({
  onSignup,
  goToLogin,
}: {
  onSignup: () => void;
  goToLogin: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup() {
    try {
      await axios.post("/api/auth/signup", { name, email, password });
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onSignup();
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <button onClick={goToLogin}>Login</button>
      </p>
    </div>
  );
}
