import { useEffect, useState } from 'react';

import { getContactsByIds } from '../../firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { useRealtimeMessages, Message } from '../../hooks/useRealtimeMessages';

type Contact = {
  id: string;
  name: string;
  phone: string;
};

type MessageWithContacts = Message & {
  contactDetails?: Contact[];
};

export default function ManagerMessage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<'agendada' | 'enviada'>('agendada');
  const [messages, setMessages] = useState<MessageWithContacts[]>([]);
  const { messages: rawMessages, loading } = useRealtimeMessages(user?.uid || '', statusFilter);

  useEffect(() => {
    if (!rawMessages.length) {
      setMessages([]);
      return;
    }

    const enrich = async () => {
      const enriched: any[] = await Promise.all(
        rawMessages.map(async msg => {
          if (!msg.contacts || !msg.userId || !msg.connectionId) return msg;

          const contactDetails = await getContactsByIds(msg.userId, msg.contacts, msg.connectionId);

          return {
            ...msg,
            contactDetails,
          };
        })
      );

      setMessages(enriched);
    };

    enrich();
  }, [rawMessages]);

  if (!user?.uid) return <p className="text-red-500 text-center mt-10">Usuário não autenticado.</p>;

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto min-h-[calc(100vh-200px)]">
      <h2 className="text-2xl font-bold mb-6 text-center">Gerenciamento de Mensagens</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setStatusFilter('agendada')}
          disabled={statusFilter === 'agendada'}
          className={`px-4 py-2 rounded ${
            statusFilter === 'agendada'
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition'
          }`}
        >
          Agendadas
        </button>
        <button
          onClick={() => setStatusFilter('enviada')}
          disabled={statusFilter === 'enviada'}
          className={`px-4 py-2 rounded ${
            statusFilter === 'enviada'
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700 transition'
          }`}
        >
          Enviadas
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Carregando mensagens...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma mensagem {statusFilter} encontrada.</p>
      ) : (
        <ul className="space-y-6">
          {messages.map(msg => (
            <li key={msg.id} className="border border-gray-200 rounded-lg p-4 shadow">
              <p className="font-semibold text-lg text-blue-800">{msg.content}</p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {msg.status}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Programada para:</strong>{' '}
                {msg.scheduleAt?.toDate().toLocaleString() ?? 'Sem data'}
              </p>

              <div className="text-sm">
                <strong>Destinatários:</strong>
                <ul className="list-disc list-inside ml-4 mt-1">
                  {msg.contactDetails?.length ? (
                    msg.contactDetails.map(contact => (
                      <li key={contact.id}>
                        {contact.name} - {contact.phone}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">Nenhum contato encontrado.</li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
