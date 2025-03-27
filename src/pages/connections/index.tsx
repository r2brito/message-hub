import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FormProvider from '../../components/hook-form/FormProvider';
import { createConnection, listenConnections } from '../../firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { PATH_APP } from '../../routes/paths';
import ConnectionSchema from '../../validations/connection.scheme';

interface ConnectionFormInputs {
  name: string;
}

export default function ConnectionsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [connections, setConnections] = useState<any[]>([]);

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(ConnectionSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (user) {
      const unsubscribe = listenConnections(user.uid, setConnections);
      return () => unsubscribe();
    }
  }, [user]);

  const onSubmit = async (data: ConnectionFormInputs) => {
    if (user) {
      await createConnection(user.uid, data.name);
    }
  };

  const handleClick = (id: string) => {
    navigate(`${PATH_APP.general.contacts.replace(':connectionId', id)}`);
  };

  return (
    <div className="px-4 py-6 min-h-[calc(100vh-200px)] flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Minhas Conexões</h2>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <TextField
              label="Nome da conexão"
              variant="outlined"
              fullWidth
              {...methods.register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base"
            >
              Adicionar
            </Button>
          </div>
        </FormProvider>

        <div className="mt-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map(conn => (
              <Card
                onClick={() => handleClick(conn.id)}
                key={conn.id}
                className="cursor-pointer hover:shadow-xl transition-transform hover:-translate-y-1"
              >
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-blue-800">
                    {conn.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
