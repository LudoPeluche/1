import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSPrompt, setShowIOSPrompt] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Detectar si ya está en modo standalone (instalada)
        const isInStandaloneMode = () => {
            return ('standalone' in window.navigator && window.navigator.standalone) ||
                (window.matchMedia('(display-mode: standalone)').matches);
        };

        if (isInStandaloneMode()) {
            setIsStandalone(true);
            return; // No mostrar nada si ya está instalada
        }

        // Detectar iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIosDevice);

        // Manejar evento para Android/Desktop
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            setShowIOSPrompt(true);
        } else if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            setDeferredPrompt(null);
        }
    };

    // Si ya está instalada, no renderizar nada
    if (isStandalone) return null;

    // Renderizar botón solo si hay evento diferido (Android/PC) o si es iOS
    if (!deferredPrompt && !isIOS) return null;

    return (
        <>
            <button
                onClick={handleInstallClick}
                className="px-3 py-2 rounded-lg font-semibold transition duration-150 flex items-center bg-blue-600 text-white hover:bg-blue-500 shadow-md animate-pulse ml-2"
                aria-label="Instalar Aplicación"
            >
                <Download className="w-5 h-5 mr-2" />
                Instalar App
            </button>

            {/* Modal de instrucciones para iOS */}
            {showIOSPrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl border border-gray-700 relative">
                        <button
                            onClick={() => setShowIOSPrompt(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-4">Instalar en iOS</h3>
                        <p className="text-gray-300 mb-4">
                            Para instalar esta aplicación en tu iPhone o iPad:
                        </p>
                        <ol className="space-y-3 text-gray-300">
                            <li className="flex items-center">
                                <span className="bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                                <span>Toca el botón <Share className="w-5 h-5 inline mx-1" /> Compartir en la barra inferior.</span>
                            </li>
                            <li className="flex items-center">
                                <span className="bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                                <span>Desplázate hacia abajo y selecciona <span className="font-semibold text-white">"Agregar a Inicio"</span>.</span>
                            </li>
                        </ol>
                        <div className="mt-6 flex justify-center">
                            <span className="text-sm text-gray-500">Esto añadirá la app a tu pantalla de inicio.</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InstallPrompt;
