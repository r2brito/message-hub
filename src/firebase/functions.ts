import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions/v1';

admin.initializeApp();
const db = admin.firestore();

export const sendScheduledMessages = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async () => {
    const now = new Date();
    const snapshot = await db
      .collectionGroup('messages')
      .where('status', '==', 'agendada')
      .where('scheduleAt', '<=', now)
      .get();

    const updates = snapshot.docs.map(doc => doc.ref.update({ status: 'enviada' }));
    await Promise.all(updates);
  });
