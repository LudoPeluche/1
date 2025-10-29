import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const required = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
];
const missing = required.filter((k) => !import.meta.env[k]);
if (missing.length) {
  // eslint-disable-next-line no-console
  console.error('Firebase config incompleta. Faltan:', missing.join(', '));
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optional: Firebase Analytics only in browser
export async function getAnalyticsInstance() {
  if (typeof window === 'undefined' || !firebaseConfig.measurementId) return null;
  const mod = await import('firebase/analytics');
  if (mod.isSupported) {
    try {
      const ok = await mod.isSupported();
      return ok ? mod.getAnalytics(app) : null;
    } catch {
      return null;
    }
  }
  return null;
}
