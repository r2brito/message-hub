/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { useForm, Controller } from 'react-hook-form';

import FormProvider from '../../components/hook-form/FormProvider';
import { getConnections, getContactsForConnection, sendMessage } from '../../firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import MessagesSchema from '../../validations/messages.scheme';

type FormValues = {
  connection: string;
  content: string;
  contacts: string[];
  date?: string;
};

export default function MessagePage() {
  const { user } = useAuth();
  const [connections, setConnections] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const defaultValues = useMemo(
    () => ({
      connection: '',
      content: '',
      contacts: [],
      date: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(MessagesSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const connectionId = watch('connection');

  useEffect(() => {
    if (user) {
      getConnections(user.uid).then(setConnections);
    }
  }, [user]);

  useEffect(() => {
    if (user && connectionId) {
      setLoadingContacts(true);
      getContactsForConnection(user.uid, connectionId).then(res => {
        setContacts(res);
        setLoadingContacts(false);
      });
    }
  }, [connectionId]);

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    const scheduleAt = data.date ? Timestamp.fromDate(new Date(data.date)) : undefined;

    await sendMessage(user.uid, {
      userId: user.uid,
      content: data.content,
      contacts: data.contacts,
      connectionId,
      scheduleAt,
      status: scheduleAt ? 'agendada' : 'enviada',
    });

    reset();
  };

  return (
    <div className="flex justify-center px-4 py-8 min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Envio de Mensagens</h2>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <Select
              {...methods.register('connection')}
              displayEmpty
              fullWidth
              error={!!errors.connection}
            >
              <MenuItem value="" disabled>
                Selecione uma conexão
              </MenuItem>
              {connections.map(conn => (
                <MenuItem key={conn.id} value={conn.id}>
                  {conn.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              {...methods.register('content')}
              label="Mensagem"
              multiline
              rows={4}
              fullWidth
              error={!!errors.content}
              helperText={errors.content?.message}
            />

            {connectionId && !loadingContacts && (
              <div>
                <Typography variant="subtitle1" className="font-medium mb-2">
                  Contatos
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {contacts.map(c => (
                    <FormControlLabel
                      key={c.id}
                      control={
                        <Controller
                          name="contacts"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value?.includes(c.id)}
                              onChange={e => {
                                const checked = e.target.checked;
                                const value = field.value || [];
                                if (checked) {
                                  field.onChange([...value, c.id]);
                                } else {
                                  field.onChange(value.filter(id => id !== c.id));
                                }
                              }}
                            />
                          )}
                        />
                      }
                      label={`${c.name} (${c.phone})`}
                    />
                  ))}
                </div>
              </div>
            )}

            <TextField
              label="Agendar envio (opcional)"
              type="datetime-local"
              fullWidth
              {...methods.register('date')}
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-base"
            >
              Enviar Mensagem
            </Button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
