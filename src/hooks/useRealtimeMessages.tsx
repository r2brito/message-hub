import { useEffect, useState } from 'react';

import {
  collectionGroup,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';

import { db } from '../firebase/config';

export type Message = {
  id: string;
  content: string;
  status: 'agendada' | 'enviada';
  scheduleAt: Timestamp;
  createdAt: Timestamp;
  contacts: string[];
  userId: string;
  connectionId: string;
};

export function useRealtimeMessages(uid: string, statusFilter?: 'agendada' | 'enviada') {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid || typeof uid !== 'string') return;

    setLoading(true);

    const filters: QueryConstraint[] = [where('userId', '==', uid)];

    if (statusFilter) {
      filters.push(where('status', '==', statusFilter));
    }

    filters.push(orderBy('scheduleAt', 'desc'));

    const q = query(collectionGroup(db, 'messages'), ...filters);

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Message);
        setMessages(data);
        setLoading(false);
      },
      error => {
        console.error('[Firestore Error]:', error.message);
        setMessages([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [uid, statusFilter]);

  return { messages, loading };
}
