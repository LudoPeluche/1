import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Prevenir que el mini-infobar aparezca en móviles
            e.preventDefault();
            // Guardar el evento para dispararlo después
            setDeferredPrompt(e);
            // Actualizar la UI para notificar al usuario que puede instalar la PWA
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Mostrar el prompt de instalación
        deferredPrompt.prompt();

        // Esperar a que el usuario responda al prompt
        const { outcome } = await deferredPrompt.userChoice;

        // Opcionalmente, loguear el resultado
        console.log(`User response to the install prompt: ${outcome}`);

        // Limpiar el prompt diferido, ya que solo se puede usar una vez
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="px-3 py-2 rounded-lg font-semibold transition duration-150 flex items-center bg-blue-600 text-white hover:bg-blue-500 shadow-md animate-pulse"
            aria-label="Instalar Aplicación"
        >
            <Download className="w-5 h-5 mr-2" />
            Instalar App
        </button>
    );
};

export default InstallPrompt;
