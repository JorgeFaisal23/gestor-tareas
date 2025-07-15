import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Perfil</h2>
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user.photoURL}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full shadow-md"
        />
        <p className="text-xl font-semibold">{user.displayName}</p>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
