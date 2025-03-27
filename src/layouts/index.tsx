import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './header';
import Navbar from './navbar';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Box component="main" className="pt-[200px] lg:pt-20 px-4 min-h-screen bg-gray-50">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
