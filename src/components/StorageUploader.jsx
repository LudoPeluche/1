import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Loader, Paperclip } from 'lucide-react';

const StorageUploader = ({ onUploadComplete, uploadPath, label = 'Adjuntar Archivo' }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    upload(file);
  };

  const upload = (file) => {
    setUploading(true);
    setError('');
    setProgress(0);

    const storagePath = uploadPath ? `${uploadPath}/${Date.now()}_${file.name}` : `uploads/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const task = uploadBytesResumable(storageRef, file);

    task.on('state_changed',
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (err) => {
        console.error("Upload error:", err);
        setError('Error al subir el archivo.');
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(task.snapshot.ref);
          onUploadComplete(downloadURL, storagePath);
        } catch (err) {
          console.error("Error getting download URL:", err);
          setError('Error al obtener la URL del archivo.');
        } finally {
          setUploading(false);
        }
      }
    );
  };

  return (
    <div>
      <label className="relative inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer transition duration-150">
        {uploading ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            <span>Subiendo... ({progress}%)</span>
          </>
        ) : (
          <>
            <Paperclip className="w-4 h-4 mr-2" />
            <span>{label}</span>
          </>
        )}
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={uploading}
          accept="image/*"
        />
      </label>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default StorageUploader;

