import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import { sendScheduledMessagesLogic } from './functions';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export const sendScheduledMessages = functions.pubsub
  .schedule('0 */12 * * *')
  .timeZone('America/Sao_Paulo')
  .onRun(async () => {
    await sendScheduledMessagesLogic();
  });

export const simulateScheduledMessage = functions.https.onRequest(async (req, res) => {
  await sendScheduledMessagesLogic();
  res.send('Simulação de envio executada.');
});
