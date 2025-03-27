import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import FormProvider from '../../components/hook-form/FormProvider';
import { addContact, listenContacts } from '../../firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import ContactSchema from '../../validations/contact.scheme';

type FormValues = {
  name: string;
  phone: string;
};

export default function ContactsPage() {
  const { user } = useAuth();
  const { connectionId } = useParams();
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    if (user && connectionId) {
      const unsub = listenContacts(user.uid, connectionId, setContacts);
      return () => unsub();
    }
  }, [user, connectionId]);

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(ContactSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleAdd = async (data: FormValues) => {
    if (user && connectionId) {
      await addContact(user.uid, connectionId, {
        name: data.name,
        phone: data.phone,
      });
    }
  };

  return (
    <div className="px-4 py-8 min-h-[calc(100vh-200px)] flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Contatos</h2>

        <FormProvider methods={methods} onSubmit={handleSubmit(handleAdd)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              {...methods.register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Telefone"
              variant="outlined"
              fullWidth
              {...methods.register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base"
          >
            Adicionar Contato
          </Button>
        </FormProvider>

        <div className="mt-8">
          <Typography variant="h6" className="text-lg font-semibold mb-4">
            Lista de Contatos
          </Typography>
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum contato adicionado ainda.</p>
          ) : (
            <ul className="space-y-3">
              {contacts.map(c => (
                <li
                  key={c.id}
                  className="border border-gray-200 p-3 rounded shadow-sm flex justify-between items-center"
                >
                  <span>
                    <strong>{c.name}</strong> - {c.phone}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
