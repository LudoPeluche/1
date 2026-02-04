import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFunctions, httpsCallable } from 'firebase/functions';
import {
    UserPlus,
    Loader,
    AlertCircle,
    Users,
    Mail,
    Lock,
    Shield,
    CheckCircle,
    User,
    Crown,
    Wrench,
} from 'lucide-react';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Create User Form Component
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
            onUserCreated();
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-panel"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                    <UserPlus className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Crear Nuevo Usuario</h2>
                    <p className="text-xs text-gray-500">Agrega un usuario al sistema</p>
                </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Correo Electronico
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="usuario@ejemplo.com"
                                required
                                className="form-input pl-12"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Contrasena
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="form-input pl-12"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Rol del Usuario
                        </label>
                        <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="form-select pl-12"
                            >
                                <option value="tecnico">Tecnico</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-success w-full flex items-center justify-center gap-2 py-3"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Crear Usuario
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                    >
                        <div className="p-2 rounded-lg bg-red-500/20">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                        </div>
                        <p className="text-sm text-red-400">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// User Card Component
const UserCard = ({ user, onRoleChange, index }) => {
    const isAdmin = user.role === 'admin';

    return (
        <motion.div
            variants={itemVariants}
            className="list-item group"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${isAdmin ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                        {isAdmin ? <Crown className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-white">
                                {user.displayName || user.email?.split('@')[0] || 'Usuario'}
                            </p>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                isAdmin
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                                {isAdmin ? 'Admin' : 'Tecnico'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Mail className="w-3.5 h-3.5" />
                            {user.email || user.id}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-400">Cambiar rol:</label>
                    <select
                        value={user.role}
                        onChange={(e) => onRoleChange(user.id, e.target.value)}
                        className="form-select py-2 px-4 w-40"
                    >
                        <option value="admin">Administrador</option>
                        <option value="tecnico">Tecnico</option>
                    </select>
                </div>
            </div>
        </motion.div>
    );
};

// Main UserManagement Component
const UserManagement = ({ users, onRoleChange, onUserCreated }) => {
    const adminCount = users.filter(u => u.role === 'admin').length;
    const techCount = users.filter(u => u.role === 'tecnico').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        Gestion de Usuarios
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Administra los usuarios y sus permisos
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-400">{adminCount} Admins</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <Wrench className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-400">{techCount} Tecnicos</span>
                    </div>
                </div>
            </motion.div>

            {/* Create User Form */}
            <CreateUserForm onUserCreated={onUserCreated} />

            {/* User List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="dashboard-panel"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                        <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Lista de Usuarios</h2>
                        <p className="text-xs text-gray-500">{users.length} usuarios registrados</p>
                    </div>
                </div>

                {users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <div className="w-20 h-20 mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                            <User className="w-10 h-10 text-gray-600" />
                        </div>
                        <p className="text-lg font-medium">No hay usuarios</p>
                        <p className="text-sm text-gray-600 mt-1">
                            Crea el primer usuario para comenzar
                        </p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                    >
                        {users.map((user, index) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onRoleChange={onRoleChange}
                                index={index}
                            />
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default UserManagement;
