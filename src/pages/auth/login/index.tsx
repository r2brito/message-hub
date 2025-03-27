import React from 'react';

import { Container } from '@mui/material';

import Page from '../../../components/page';
import LoginForm from '../../../sections/login/loginForm';

const Login: React.FC = () => {
  return (
    <Page title="Login">
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Container maxWidth="sm">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full">
            <LoginForm />
          </div>
        </Container>
      </div>
    </Page>
  );
};

export default Login;
