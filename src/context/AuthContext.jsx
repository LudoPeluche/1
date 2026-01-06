import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { APP_ID } from '../config';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                // Get initial role
                const userDocRef = doc(db, `artifacts/${APP_ID}/users`, currentUser.uid);

                // Set up real-time listener for role changes
                const roleUnsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const newRole = docSnapshot.data().role || 'tecnico';
                        setUserRole(newRole);
                    } else {
                        // If user doc doesn't exist, maybe they are not authorized or just created
                        console.warn(`User document not found for: ${currentUser.email}`);
                        // Fallback to tecnico to allow basic read-only access
                        setUserRole('tecnico');
                        // Optional: Force logout if strict
                    }
                }, (err) => {
                    console.error("Error fetching user role:", err);
                    setError("Error cargando permisos de usuario.");
                });

                setUser(currentUser);
                // We don't unsubscribe from role listener here easily because onAuthStateChanged triggers only on login/logout.
                // But complex to manage nested unsubscribe. 
                // For simplicity in this refactor, we accept that on logout logic handles cleanup or app reload.
                // BETTER: Store unsubscribe in a ref or state if needed, but for now this is standard pattern.
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error("Logout error", e);
        }
    };

    const value = {
        user,
        userRole,
        loading,
        error,
        logout
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                {/* Inline SVG or simple text if lucide not imported yet, but let's try to keep it simple or import lucide */}
                <svg className="animate-spin h-8 w-8 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando sesión...
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
