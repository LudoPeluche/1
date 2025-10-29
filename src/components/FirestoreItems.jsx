import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

export default function FirestoreItems() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    await addDoc(collection(db, 'items'), {
      text: value,
      createdAt: serverTimestamp(),
    });
    setText('');
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <form onSubmit={addItem} style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Nuevo item"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {items.map((it) => (
          <li key={it.id}>• {it.text || '(sin texto)'} </li>
        ))}
      </ul>
    </div>
  );
}

