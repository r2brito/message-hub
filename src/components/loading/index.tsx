import React from 'react';

import { Typography } from '@mui/material';

type LoadingScreenProps = {
  isMain?: boolean;
  [key: string]: any;
};

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return <Typography>Loading...</Typography>;
};

export default LoadingScreen;
