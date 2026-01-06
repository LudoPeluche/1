import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { db } from './firebase'; // auth imported but not used directly anymore
import { getFunctions, httpsCallable } from 'firebase/functions';
import { collection, onSnapshot, addDoc, query, serverTimestamp, doc, updateDoc, orderBy, limit, setLogLevel, getDoc } from 'firebase/firestore';
// Iconos
import { Loader, List, LogOut, BarChart2, AlertTriangle, Users } from 'lucide-react';
// Componentes
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import AssetList from './components/AssetList';
import Dashboard from './components/Dashboard';
import AssetHistory from './components/AssetHistory';
import InspectionForm from './components/InspectionForm';
import { APP_ID } from './config';
import { useAuth } from './context/AuthContext';
import InstallPrompt from './components/InstallPrompt';

const AssetHistoryPage = ({ assets, db, appId, userRole }) => {
    const navigate = useNavigate();
    const { assetId } = useParams();
    const asset = assets.find(a => a.id === assetId);

    if (!asset) return <div className="flex items-center justify-center p-8"><Loader className="w-8 h-8 animate-spin mr-2" /> Cargando activo...</div>;

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
                    // We need db and appId here. Ideally they should be props or imported, 
                    // but since they are imported in the module scope, we can use them.
                    // Wait, db is imported. APP_ID is imported.
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

    if (!asset) return <div className="flex items-center justify-center p-8"><Loader className="w-8 h-8 animate-spin mr-2" /> Cargando activo...</div>

    return (
        <InspectionForm
            asset={asset}
            onBack={() => navigate(-1)}
            onSave={(results, notes, overallStatus, photoURLs) => onSave(asset, results, notes, overallStatus, photoURLs)}
            loading={loading}
        />
    );
};

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
    const [loading, setLoading] = useState(false); // Local loading for actions
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [usersTrigger, setUsersTrigger] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    // Remove old auth effects (lines 75-110 in original)

    useEffect(() => {
        setLogLevel('error'); // Keep this or move to main
    }, []);

    useEffect(() => {
        // Cargar activos para cualquier usuario autenticado (rol admin o técnico)
        if (user) {
            const assetCollectionPath = `artifacts/${APP_ID}/assets`;
            const q = query(collection(db, assetCollectionPath), orderBy('createdAt', 'desc'), limit(100));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const assetsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAssets(assetsData);
                setError(null);
            }, (e) => setError("Error al cargar activos."));
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
        } catch (error) {
            setError("Error al actualizar el rol.");
        }
    };

    const handleUserCreated = () => {
        setUsersTrigger(c => c + 1);
        setError("✓ Usuario creado con éxito.");
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
        } catch (e) {
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
            setError("✓ Inspección guardada.");
        } catch (e) {
            console.error("Error al guardar inspección:", e);
            setError(`Error al guardar la Inspección: ${e?.message || 'revisa conexión/permisos'}`);
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
                throw new Error(result.data.error || "Error desconocido en la función de carga masiva.");
            }
        } catch (error) {
            console.error("Error calling bulkAddAssets function:", error);
            callback(false, `Error en la carga: ${error.message}`);
        }
    }, [userRole]);

    // Handled by Context now
    // if (!isAuthReady) ...

    if (!user) {
        return <Login />;
    }

    const getLinkClass = (path) => {
        const baseClass = "px-3 py-2 rounded-lg font-semibold transition duration-150 flex items-center";
        const activeClass = {
            '/': 'bg-blue-600 text-white',
            '/dashboard': 'bg-teal-600 text-white',
            '/users': 'bg-purple-600 text-white',
        }[path];
        return `${baseClass} ${location.pathname === path ? activeClass : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-2 sm:p-4 md:p-8 font-sans max-w-7xl mx-auto">
            <header className="mb-8 pb-4 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 text-center sm:text-left">
                        PIA (Predictive Inspection App)
                    </h1>
                    <nav className="flex flex-wrap justify-center gap-2 items-center">
                        <Link to="/" className={getLinkClass('/')}><List className="w-5 h-5 mr-2" /> Activos</Link>
                        {userRole === 'admin' && <Link to="/dashboard" className={getLinkClass('/dashboard')}><BarChart2 className="w-5 h-5 mr-2" /> Dashboard</Link>}
                        {userRole === 'admin' && <Link to="/users" className={getLinkClass('/users')}><Users className="w-5 h-5 mr-2" /> Usuarios</Link>}
                        <InstallPrompt />
                        <button onClick={logout} className="px-3 py-2 rounded-lg font-semibold transition duration-150 flex items-center bg-red-600 text-white hover:bg-red-500"><LogOut className="w-5 h-5 mr-2" /> Salir</button>
                    </nav>
                </div>
                <p className="text-sm text-gray-400 mt-1">{`Usuario: ${user.displayName || user.email}`} | Rol: {userRole} | Entorno: {APP_ID}</p>
            </header>

            {error && <div className="p-3 mb-4 bg-red-800 rounded-lg flex items-center shadow-lg"><AlertTriangle className="w-5 h-5 mr-2" /><span>{error}</span></div>}

            <main>
                <Routes>
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
            </main>

            <footer className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
                Aplicación PIA - Impulsada por React y Firestore
            </footer>
        </div>
    );
};

export default App;











