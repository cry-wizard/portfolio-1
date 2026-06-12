import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-28 py-6 border-b border-white/10">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl sm:text-3xl font-black">
            Centennial
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Portfolio
            </span>
          </h1>
        </div>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        <div className="hidden lg:flex items-center gap-5">
          <button
            onClick={() => navigate("/")}
            className="text-white/70 hover:text-white"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/login?type=demo")}
            className="text-white/70 hover:text-white"
          >
            Try Demo
          </button>

          <button
            onClick={() => navigate("/login?type=register")}
            className="text-white/70 hover:text-white"
          >
            Use Trial
          </button>

          <button
            onClick={() => navigate("/features")}
            className="text-white/70 hover:text-white"
          >
            Features
          </button>

          <button
            onClick={() => navigate("/faq")}
            className="text-white/70 hover:text-white"
          >
            FAQ
          </button>

          <button
            onClick={() => navigate("/support")}
            className="text-white/70 hover:text-white"
          >
            Support
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 px-6 py-6 border-b border-white/10 bg-black">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/login?type=demo")}>Try Demo</button>
          <button onClick={() => navigate("/login?type=register")}>
            Use Trial
          </button>
          <button onClick={() => navigate("/features")}>Feature</button>
          <button onClick={() => navigate("/faq")}>FAQ</button>
          <button onClick={() => navigate("/support")}>Support</button>
        </div>
      )}
    </>
  );
}
