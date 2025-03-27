import React, { memo } from 'react';

import { Container } from '@mui/material';

import { NavSection } from '../../components/nav-section';

import navConfig from './config';

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-[88px] w-full z-10 bg-white py-2 shadow-sm transition-all">
      <Container>
        <NavSection navConfig={navConfig} />
      </Container>
    </div>
  );
};

export default memo(Navbar);
