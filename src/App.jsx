import { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { collection, onSnapshot, addDoc, query, serverTimestamp, doc, updateDoc, orderBy, limit, setLogLevel, getDoc } from 'firebase/firestore';
import {
    Loader,
    List,
    LogOut,
    BarChart2,
    AlertTriangle,
    Users,
    Menu,
    X,
    ChevronRight,
    Settings,
    Bell,
} from 'lucide-react';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import AssetList from './components/AssetList';
import Dashboard from './components/Dashboard';
import AssetHistory from './components/AssetHistory';
import InspectionForm from './components/InspectionForm';
import { APP_ID } from './config';
import { useAuth } from './context/AuthContext';
import InstallPrompt from './components/InstallPrompt';
import logo from './assets/logo.png';

// Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const AssetHistoryPage = ({ assets, db, appId, userRole }) => {
    const navigate = useNavigate();
    const { assetId } = useParams();
    const asset = assets.find(a => a.id === assetId);

    if (!asset) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader className="w-10 h-10 animate-spin text-indigo-500 mx-auto mb-4" />
                    <p className="text-gray-400">Cargando activo...</p>
                </div>
            </div>
        );
    }

    return (
        <AssetHistory
            db={db}
            appId={appId}
            asset={asset}
            onBack={() => navigate(userRole === 'admin' ? '/dashboard' : '/')}
            onInspect={(asset) => navigate(`/asset/${asset.id}/inspect`)}
        />
    );
};

const InspectionPage = ({ assets, onSave, loading }) => {
    const navigate = useNavigate();
    const { assetId } = useParams();
    const [fetchedAsset, setFetchedAsset] = useState(null);
    const existingAsset = assets.find(a => a.id === assetId);
    const asset = existingAsset || fetchedAsset;

    useEffect(() => {
        if (!existingAsset && assetId) {
            const fetchAsset = async () => {
                try {
                    const docRef = doc(db, `artifacts/${APP_ID}/assets`, assetId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setFetchedAsset({ id: docSnap.id, ...docSnap.data() });
                    }
                } catch (error) {
                    console.error("Error fetching inspection asset:", error);
                }
            };
            fetchAsset();
        }
    }, [existingAsset, assetId]);

    if (!asset) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader className="w-10 h-10 animate-spin text-indigo-500 mx-auto mb-4" />
                    <p className="text-gray-400">Cargando activo...</p>
                </div>
            </div>
        );
    }

    return (
        <InspectionForm
            asset={asset}
            onBack={() => navigate(-1)}
            onSave={(results, notes, overallStatus, photoURLs) => onSave(asset, results, notes, overallStatus, photoURLs)}
            loading={loading}
        />
    );
};

// Navigation Link Component
const NavLink = ({ to, icon: Icon, label, isActive, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`nav-link ${isActive ? 'active' : ''}`}
    >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </Link>
);

// Mobile Menu
const MobileMenu = ({ isOpen, onClose, userRole, location, logout }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-0 bottom-0 w-72 bg-dashboard-card border-l border-white/5 z-50 lg:hidden"
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-semibold text-white">Menu</h2>
                            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <nav className="space-y-2">
                            <NavLink
                                to="/"
                                icon={List}
                                label="Activos"
                                isActive={location.pathname === '/'}
                                onClick={onClose}
                            />
                            {userRole === 'admin' && (
                                <>
                                    <NavLink
                                        to="/dashboard"
                                        icon={BarChart2}
                                        label="Dashboard"
                                        isActive={location.pathname === '/dashboard'}
                                        onClick={onClose}
                                    />
                                    <NavLink
                                        to="/users"
                                        icon={Users}
                                        label="Usuarios"
                                        isActive={location.pathname === '/users'}
                                        onClick={onClose}
                                    />
                                </>
                            )}
                        </nav>
                        <div className="absolute bottom-6 left-6 right-6">
                            <button
                                onClick={() => { logout(); onClose(); }}
                                className="btn-danger w-full flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Cerrar Sesion
                            </button>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

// Header Component
const Header = ({ user, userRole, logout, location }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl mb-8 p-4 sm:p-6"
            >
                {/* Main Header Content */}
                <div className="flex items-center justify-between">
                    {/* Logo & Title */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-50" />
                            <img
                                src={logo}
                                alt="PIA App"
                                className="relative w-12 h-12 rounded-xl bg-white object-contain p-1.5 shadow-lg"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl sm:text-2xl font-bold text-gradient">
                                PIA App
                            </h1>
                            <p className="text-xs text-gray-500">Predictive Inspection App</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2">
                        <NavLink
                            to="/"
                            icon={List}
                            label="Activos"
                            isActive={location.pathname === '/'}
                        />
                        {userRole === 'admin' && (
                            <>
                                <NavLink
                                    to="/dashboard"
                                    icon={BarChart2}
                                    label="Dashboard"
                                    isActive={location.pathname === '/dashboard'}
                                />
                                <NavLink
                                    to="/users"
                                    icon={Users}
                                    label="Usuarios"
                                    isActive={location.pathname === '/users'}
                                />
                            </>
                        )}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        <InstallPrompt />

                        {/* User Info (Desktop) */}
                        <div className="hidden md:flex items-center gap-3 pl-3 border-l border-white/10">
                            <div className="text-right">
                                <p className="text-sm font-medium text-white truncate max-w-[150px]">
                                    {user.displayName || user.email?.split('@')[0]}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                title="Cerrar sesion"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Menu className="w-5 h-5 text-gray-300" />
                        </button>
                    </div>
                </div>

                {/* Breadcrumb / Context */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-sm text-gray-500">
                    <span>Entorno:</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono">
                        {APP_ID}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-400">
                        {location.pathname === '/' && 'Lista de Activos'}
                        {location.pathname === '/dashboard' && 'Dashboard'}
                        {location.pathname === '/users' && 'Gestion de Usuarios'}
                        {location.pathname.includes('/asset/') && !location.pathname.includes('/inspect') && 'Historial de Activo'}
                        {location.pathname.includes('/inspect') && 'Nueva Inspeccion'}
                    </span>
                </div>
            </motion.header>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                userRole={userRole}
                location={location}
                logout={logout}
            />
        </>
    );
};

// Error Alert Component
const ErrorAlert = ({ error, onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            error.startsWith('✓')
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}
    >
        {error.startsWith('✓') ? (
            <div className="p-2 rounded-lg bg-emerald-500/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
        ) : (
            <div className="p-2 rounded-lg bg-red-500/20">
                <AlertTriangle className="w-5 h-5" />
            </div>
        )}
        <span className="flex-1">{error}</span>
    </motion.div>
);

// Main App Component
const App = () => {
    const { user, userRole, logout } = useAuth();
    const [assets, setAssets] = useState([]);
    const [latestInspections, setLatestInspections] = useState([]);
    const [allInspections, setAllInspections] = useState([]);
    const [newAssetName, setNewAssetName] = useState('');
    const [newAssetLocation, setNewAssetLocation] = useState('');
    const [newAssetTag, setNewAssetTag] = useState('');
    const [newAssetDescription, setNewAssetDescription] = useState('');
    const [newAssetCriticality, setNewAssetCriticality] = useState('D');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [usersTrigger, setUsersTrigger] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLogLevel('error');
    }, []);

    useEffect(() => {
        if (user) {
            const assetCollectionPath = `artifacts/${APP_ID}/assets`;
            const q = query(collection(db, assetCollectionPath), orderBy('createdAt', 'desc'), limit(100));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const assetsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAssets(assetsData);
                setError(null);
            }, () => setError("Error al cargar activos."));
            return () => unsubscribe();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const inspectionsColRef = collection(db, `artifacts/${APP_ID}/inspections`);
            const q = query(inspectionsColRef, orderBy('date', 'desc'), limit(10));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const inspectionsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, date: doc.data().date?.toDate() }));
                setLatestInspections(inspectionsData);
            });
            const allQuery = query(inspectionsColRef, orderBy('date', 'desc'));
            const unsubAll = onSnapshot(allQuery, (snapshot) => {
                const allData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, date: doc.data().date?.toDate() }));
                setAllInspections(allData);
            });
            return () => { unsubscribe(); unsubAll(); };
        }
    }, [user]);

    useEffect(() => {
        if (userRole === 'admin') {
            const usersColRef = collection(db, `artifacts/${APP_ID}/users`);
            const unsubscribe = onSnapshot(usersColRef, (snapshot) => {
                setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });
            return () => unsubscribe();
        }
    }, [userRole, usersTrigger]);

    const filteredAssets = useMemo(() => {
        if (!searchTerm) return assets;
        const lower = searchTerm.toLowerCase();
        return assets.filter(a => a.name.toLowerCase().includes(lower) || (a.location || '').toLowerCase().includes(lower));
    }, [assets, searchTerm]);

    const handleRoleChange = async (uid, newRole) => {
        if (userRole !== 'admin') return;
        try {
            await updateDoc(doc(db, `artifacts/${APP_ID}/users`, uid), { role: newRole });
        } catch {
            setError("Error al actualizar el rol.");
        }
    };

    const handleUserCreated = () => {
        setUsersTrigger(c => c + 1);
        setError("✓ Usuario creado con exito.");
        setTimeout(() => setError(null), 5000);
    };

    const handleAddAsset = useCallback(async (e) => {
        e.preventDefault();
        if (!newAssetName) return;
        setLoading(true);
        setError(null);
        try {
            await addDoc(collection(db, `artifacts/${APP_ID}/assets`), {
                name: newAssetName,
                location: newAssetLocation,
                tag: newAssetTag,
                description: newAssetDescription,
                criticality: newAssetCriticality,
                status: 'Uninspected',
                createdAt: serverTimestamp(),
            });
            setNewAssetName('');
            setNewAssetLocation('');
            setNewAssetTag('');
            setNewAssetDescription('');
            setNewAssetCriticality('D');
            setError("✓ Activo creado exitosamente.");
            setTimeout(() => setError(null), 3000);
        } catch {
            setError("Error al guardar el activo.");
        } finally {
            setLoading(false);
        }
    }, [newAssetName, newAssetLocation, newAssetTag, newAssetDescription, newAssetCriticality]);

    const handleSaveInspection = useCallback(async (asset, results, notes, overallStatus, photoURLs) => {
        if (!user || !asset) return;
        setLoading(true);
        setError(null);
        try {
            await addDoc(collection(db, `artifacts/${APP_ID}/inspections`), {
                assetId: asset.id,
                assetName: asset.name,
                inspectorUserId: user.uid,
                date: serverTimestamp(),
                results: results,
                notes: notes,
                overallStatus: overallStatus,
                photoURLs: photoURLs || [],
            });
            await updateDoc(doc(db, `artifacts/${APP_ID}/assets`, asset.id), {
                status: overallStatus,
                lastInspectionDate: serverTimestamp(),
            });
            navigate('/');
            setError("✓ Inspeccion guardada exitosamente.");
            setTimeout(() => setError(null), 3000);
        } catch (e) {
            console.error("Error al guardar inspeccion:", e);
            setError(`Error al guardar la Inspeccion: ${e?.message || 'revisa conexion/permisos'}`);
        } finally {
            setLoading(false);
        }
    }, [user, navigate]);

    const handleBulkAddAssets = useCallback(async (assets, callback) => {
        if (userRole !== 'admin') {
            return callback(false, "Permiso denegado.");
        }
        try {
            const functions = getFunctions();
            const bulkAddAssets = httpsCallable(functions, 'bulkAddAssets');
            const result = await bulkAddAssets({ assets, appId: APP_ID });
            if (result.data.success) {
                callback(true, `Carga masiva completada: ${result.data.createdCount} activos creados.`);
            } else {
                throw new Error(result.data.error || "Error desconocido en la funcion de carga masiva.");
            }
        } catch (error) {
            console.error("Error calling bulkAddAssets function:", error);
            callback(false, `Error en la carga: ${error.message}`);
        }
    }, [userRole]);

    if (!user) {
        return <Login />;
    }

    return (
        <div className="min-h-screen text-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header user={user} userRole={userRole} logout={logout} location={location} />

                <AnimatePresence mode="wait">
                    {error && <ErrorAlert key="error" error={error} />}
                </AnimatePresence>

                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <Routes location={location}>
                                <Route path="/" element={
                                    <AssetList
                                        userRole={userRole}
                                        handleAddAsset={handleAddAsset}
                                        onBulkAddAssets={handleBulkAddAssets}
                                        loading={loading}
                                        newAssetName={newAssetName} setNewAssetName={setNewAssetName}
                                        newAssetLocation={newAssetLocation} setNewAssetLocation={setNewAssetLocation}
                                        newAssetDescription={newAssetDescription} setNewAssetDescription={setNewAssetDescription}
                                        newAssetTag={newAssetTag} setNewAssetTag={setNewAssetTag}
                                        newAssetCriticality={newAssetCriticality} setNewAssetCriticality={setNewAssetCriticality}
                                        filteredAssets={filteredAssets}
                                        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                        onNavigateToAssetHistory={(asset) => navigate(`/asset/${asset.id}`)}
                                        onNavigateToInspection={(asset) => navigate(`/asset/${asset.id}/inspect`)}
                                    />
                                } />

                                {userRole === 'admin' && <Route path="/dashboard" element={
                                    <Dashboard
                                        assets={assets}
                                        latestInspections={latestInspections}
                                        allInspections={allInspections}
                                        onInspectAssetHistory={(asset) => navigate(`/asset/${asset.id}`)}
                                    />
                                } />}

                                {userRole === 'admin' && <Route path="/users" element={
                                    <UserManagement
                                        users={users}
                                        onRoleChange={handleRoleChange}
                                        onUserCreated={handleUserCreated}
                                    />
                                } />}

                                <Route path="/asset/:assetId" element={
                                    <AssetHistoryPage assets={assets} db={db} appId={APP_ID} userRole={userRole} />
                                } />

                                <Route path="/asset/:assetId/inspect" element={
                                    <InspectionPage assets={assets} onSave={handleSaveInspection} loading={loading} />
                                } />
                            </Routes>
                        </motion.div>
                    </AnimatePresence>
                </main>

                <footer className="mt-12 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-600">
                        PIA App v1.0 - Impulsada por React, Firebase y Tailwind CSS
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default App;
