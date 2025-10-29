import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function StorageUploader() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');

  const onChange = (e) => setFile(e.target.files?.[0] || null);

  const upload = () => {
    if (!file) return;
    const path = `uploads/${Date.now()}_${file.name}`;
    const task = uploadBytesResumable(ref(storage, path), file);
    task.on('state_changed', (snap) => {
      setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
    });
    task.then(async (res) => {
      const download = await getDownloadURL(res.ref);
      setUrl(download);
    });
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <input type="file" onChange={onChange} />
      <button onClick={upload} disabled={!file}>Subir a Storage</button>
      {progress > 0 && progress < 100 && <div>Progreso: {progress}%</div>}
      {url && (
        <div>
          Archivo subido: <a href={url} target="_blank" rel="noreferrer">ver</a>
        </div>
      )}
    </div>
  );
}

