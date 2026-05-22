export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("demoUser"));

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl">Dashboard</h1>

      <p className="mt-4">
        Welcome: {user?.name || "Guest"}
      </p>

      <p className="text-white/60 mt-2">
        Mode: {user?.type}
      </p>
    </div>
  );
}