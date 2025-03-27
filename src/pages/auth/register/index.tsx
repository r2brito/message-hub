import React from 'react';

import { Container, Box } from '@mui/material';

import Page from '../../../components/page';
import RegisterForm from '../../../sections/register/registerForm';

const Register: React.FC = () => {
  return (
    <Page title="Crie sua conta">
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Container maxWidth="sm">
          <Box className="bg-white shadow-lg rounded-xl p-8 w-full">
            <RegisterForm />
          </Box>
        </Container>
      </div>
    </Page>
  );
};

export default Register;
