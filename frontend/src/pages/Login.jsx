import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState("demo");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (mode === "demo") {
      const demoUser = {
        name: name || "Demo User",
        type: "demo",
        createdAt: Date.now(),
      };

      localStorage.setItem("demoUser", JSON.stringify(demoUser));

      navigate("/app");
    } else {
      alert("Trial system will connect to backend next step");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[400px] p-8 rounded-2xl bg-white/5 border border-white/10">

        <h1 className="text-3xl font-bold mb-6">Login / Demo</h1>

        {/* MODE SWITCH */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("demo")}
            className={`px-4 py-2 rounded-xl ${
              mode === "demo" ? "bg-blue-500" : "bg-white/10"
            }`}
          >
            Demo
          </button>

          <button
            onClick={() => setMode("trial")}
            className={`px-4 py-2 rounded-xl ${
              mode === "trial" ? "bg-purple-500" : "bg-white/10"
            }`}
          >
            Trial
          </button>
        </div>

        {/* INPUT */}
        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 mb-6"
        />

        {/* BUTTON */}
        <button
          onClick={handleStart}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold"
        >
          Start Now
        </button>

        <p className="text-xs text-white/50 mt-4">
          Demo resets automatically. Trial requires verification.
        </p>
      </div>
    </div>
  );
}