import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-blue-600">Tus Tareas</h2>
        <Link to="/create" className="bg-blue-500 hover:bg-green-400 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition">+ Nueva</Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-600 mt-4">Aún no tienes tareas registradas.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold">{task.name}</h3>
            <p className="text-gray-700 mt-2">{task.description}</p>
            <div className="mt-4 space-x-2">
              <Link to={`/edit/${task.id}`} className="px-4 py-1 bg-yellow-200 text-gray-800 rounded-full hover:scale-105 transition">Editar</Link>
              <button onClick={() => handleDelete(task.id)} className="px-4 py-1 bg-red-400 text-white rounded-full hover:scale-105 transition">Eliminar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
