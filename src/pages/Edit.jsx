
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Edit({ user }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return navigate("/");
      const data = docSnap.data();
      if (data.userId !== user.uid) return navigate("/"); // protección
      setName(data.name);
      setDescription(data.description);
    };
    fetchTask();
  }, [id, user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "tasks", id), { name, description });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Editar Tarea</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-blue-400"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-2xl border border-blue-400"
        />
        <button className="w-full bg-blue-500 hover:bg-green-400 text-white font-semibold py-3 rounded-full">
          Actualizar
        </button>
      </form>
    </div>
  );
}
