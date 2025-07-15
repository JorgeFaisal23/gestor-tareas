import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from "firebase/auth";

export default function Login({ onLogin }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin(result.user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-green-200 to-yellow-100">
      <h1 className="text-5xl font-bold mb-8 text-blue-600 drop-shadow">Gestor de Tareas</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-green-400 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}