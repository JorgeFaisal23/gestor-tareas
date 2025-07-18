
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Create({ user }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !user) return;
    await addDoc(collection(db, "tasks"), {
      name,
      description,
      userId: user.uid
    });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre de la tarea"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-blue-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-2xl border border-blue-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        />
        <button className="w-full bg-blue-500 hover:bg-green-400 text-white font-semibold py-3 rounded-full shadow-lg hover:scale-105 transition">
          Guardar
        </button>
      </form>
    </div>
  );
}
