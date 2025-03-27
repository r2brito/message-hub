import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import FormProvider from '../../components/hook-form/FormProvider';
import { useAuth } from '../../hooks/useAuth';
import { PATH_AUTH } from '../../routes/paths';
import LoginSchema from '../../validations/login.scheme';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(LoginSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    await login(email, password);
  };

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h4" className="text-center font-bold">
        Login
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...methods.register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          {...methods.register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base"
        >
          Entrar
        </Button>
      </FormProvider>

      <div className="flex flex-col gap-2 text-center">
        <Link component={RouterLink} to="#" underline="hover" className="text-sm text-blue-600">
          Esqueceu sua senha?
        </Link>
        <Link
          component={RouterLink}
          to={PATH_AUTH.register}
          underline="hover"
          className="text-sm text-blue-600"
        >
          Crie sua conta
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
