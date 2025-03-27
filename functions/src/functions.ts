import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const sendScheduledMessagesLogic = async () => {
  const now = new Date();
  console.log(`[sendScheduledMessagesLogic] Executando às ${now.toISOString()}`);

  const snapshot = await db
    .collectionGroup('messages')
    .where('status', '==', 'agendada')
    .where('scheduleAt', '<=', now)
    .get();

  console.log(`[sendScheduledMessagesLogic] Mensagens encontradas: ${snapshot.size}`);

  const updates = snapshot.docs.map(doc => {
    console.log(`[Atualizando] ${doc.id}`);
    return doc.ref.update({ status: 'enviada' });
  });

  await Promise.all(updates);
  console.log('[sendScheduledMessagesLogic] Atualizações concluídas.');
};
