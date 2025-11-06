import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Iniciar Sesión</h1>
        <p className="text-gray-400 mb-6">
          Por favor, inicia sesión con tu cuenta de Google para continuar.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-150"
        >
          Iniciar Sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Login;
