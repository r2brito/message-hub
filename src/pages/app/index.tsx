import { Container, Typography, Box, Avatar } from '@mui/material';

import Page from '../../components/page';
import { useAuth } from '../../hooks/useAuth';

const GeneralApp: React.FC = () => {
  const { user } = useAuth();

  return (
    <Page title="Home">
      <Container maxWidth="xl">
        <Box className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
          <Avatar
            alt={user?.displayName}
            src={user?.photoURL}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h4" className="font-bold mb-2">
            Bem-vindo, {user?.displayName || 'usuário'}!
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default GeneralApp;
