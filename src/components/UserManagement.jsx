import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Iconos
import { PlusCircle, Loader, AlertTriangle } from 'lucide-react';

function CreateUserForm({ onUserCreated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('tecnico');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const functions = getFunctions();
        const createUser = httpsCallable(functions, 'createUser');

        try {
            await createUser({ email, password, role });
            onUserCreated(); // Notify parent component
            setEmail('');
            setPassword('');
            setRole('tecnico');
        } catch (error) {
            console.error("Error creating user:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-teal-300">
                <PlusCircle className="w-6 h-6 mr-2" /> Crear Nuevo Usuario
            </h2>
            <form onSubmit={handleCreateUser} className="grid md:grid-cols-3 gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email del usuario"
                    required
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
                />
                <div className="flex gap-4">
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600">
                        <option value="tecnico">Técnico</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800">
                        {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Crear'}
                    </button>
                </div>
            </form>
            {error && (
                <div className="mt-4 p-3 bg-red-800 rounded-lg flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span className="text-sm">{error}</span>
                </div>
            )}
        </div>
    );
}


const UserManagement = ({ users, onRoleChange, onUserCreated }) => {
    return (
        <div className="space-y-8">
            <CreateUserForm onUserCreated={onUserCreated} />

            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-semibold text-teal-300 mb-4">Lista de Usuarios</h2>
                <div className="space-y-4">
                    {users.length > 0 ? users.map(user => (
                        <div key={user.id} className="p-4 bg-gray-700 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-bold text-lg">{user.displayName || user.email}</p>
                                <p className="text-sm text-gray-400">UID: {user.id}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-300">Rol:</span>
                                <select
                                    value={user.role}
                                    onChange={(e) => onRoleChange(user.id, e.target.value)}
                                    className="px-3 py-1 rounded bg-gray-600 border border-gray-500"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="tecnico">Técnico</option>
                                </select>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-400 italic">No hay usuarios para mostrar.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;