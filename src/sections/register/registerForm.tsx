import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import FormProvider from '../../components/hook-form/FormProvider';
import { useAuth } from '../../hooks/useAuth';
import { PATH_AUTH } from '../../routes/paths';
import RegisterSchema from '../../validations/register.scheme';

interface RegisterFormInputs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { register } = useAuth();

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RegisterSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: RegisterFormInputs) => {
    const { email, firstName, lastName, password } = data;

    await register(email, password, firstName, lastName);
  };

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h4" className="text-center font-bold">
        Crie sua conta
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          className="login-form__input"
          {...methods.register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          {...methods.register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Sobrenome"
          variant="outlined"
          fullWidth
          margin="normal"
          {...methods.register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          className="login-form__input"
          {...methods.register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="login-form__button"
          disabled={isSubmitting}
        >
          Cadastrar
        </Button>
      </FormProvider>
      <Link
        className="text-sm text-blue-600"
        variant="subtitle2"
        component={RouterLink}
        to={PATH_AUTH.login}
      >
        Faça o seu login
      </Link>
    </div>
  );
};

export default RegisterForm;
