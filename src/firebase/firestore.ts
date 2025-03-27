import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  getDoc,
} from 'firebase/firestore';

import { Message, Connection, Contact } from '../types/models';

import { db } from './config';

const getUserPath = (uid: string) => `users/${uid}`;

export const createConnection = async (uid: string, name: string) => {
  const ref = collection(db, `${getUserPath(uid)}/connections`);
  await addDoc(ref, { name, createdAt: serverTimestamp() });
};

export const getConnections = async (uid: string) => {
  const ref = collection(db, `${getUserPath(uid)}/connections`);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Connection);
};

export const listenConnections = (uid: string, callback: (data: Connection[]) => void) => {
  const ref = collection(db, `${getUserPath(uid)}/connections`);
  return onSnapshot(ref, snapshot => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Connection);
    callback(data);
  });
};

export const addContact = async (uid: string, connectionId: string, contact: Contact) => {
  const ref = collection(db, `${getUserPath(uid)}/connections/${connectionId}/contacts`);
  await addDoc(ref, { ...contact, createdAt: serverTimestamp() });
};

export const listenContacts = (
  uid: string,
  connectionId: string,
  callback: (data: Contact[]) => void
) => {
  const ref = collection(db, `${getUserPath(uid)}/connections/${connectionId}/contacts`);
  return onSnapshot(ref, snapshot => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Contact);
    callback(data);
  });
};

export const sendMessage = async (uid: string, message: Message & { scheduleAt?: Timestamp }) => {
  console.log('message: ', message);
  const ref = collection(db, `${getUserPath(uid)}/messages`);
  await addDoc(ref, {
    ...message,
    status: message.scheduleAt ? 'agendada' : 'enviada',
    createdAt: serverTimestamp(),
  });
};

export const listenMessages = (uid: string, callback: (data: Message[]) => void) => {
  const ref = collection(db, `${getUserPath(uid)}/messages`);
  return onSnapshot(ref, snapshot => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Message);
    callback(data);
  });
};

export const getScheduledMessages = async (uid: string) => {
  const ref = collection(db, `${getUserPath(uid)}/messages`);
  const q = query(ref, where('status', '==', 'agendada'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Message);
};

export const updateMessageStatus = async (
  uid: string,
  messageId: string,
  status: 'enviada' | 'agendada'
) => {
  const ref = doc(db, `${getUserPath(uid)}/messages/${messageId}`);
  await updateDoc(ref, { status });
};
export const getContactsForConnection = async (uid: string, connectionId: string) => {
  const ref = collection(db, `users/${uid}/connections/${connectionId}/contacts`);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getContactsByIds = async (
  userId: string,
  contactIds: string[],
  connectionId: string
): Promise<Contact[]> => {
  console.log('userId: ', userId);
  console.log('contactIds: ', contactIds);
  const contacts = await Promise.all(
    contactIds.map(async id => {
      const ref = doc(db, `users/${userId}/connections/${connectionId}/contacts/${id}`);
      const snap = await getDoc(ref);
      return snap.exists() ? ({ id: snap.id, ...snap.data() } as Contact) : null;
    })
  );

  return contacts.filter(Boolean) as Contact[];
};
