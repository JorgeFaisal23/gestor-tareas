import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <BrowserRouter>
      <nav className="bg-blue-500 text-white px-6 py-4 shadow-md flex justify-between items-center rounded-b-2xl">
        <div className="flex space-x-4 font-semibold">
          <Link to="/" className="hover:underline hover:text-green-200 transition">Inicio</Link>
          <Link to="/create" className="hover:underline hover:text-green-200 transition">Nueva Tarea</Link>
          <Link to="/profile" className="hover:underline hover:text-green-200 transition">Perfil</Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">{user.displayName}</span>
          <button
            onClick={() => signOut(auth)}
            className="bg-white text-blue-500 px-4 py-2 rounded-full shadow hover:bg-green-200 hover:text-blue-800 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-green-100 to-yellow-100 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
