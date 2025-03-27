import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { PATH_APP } from '../routes/paths';

interface GuestGuardProps {
  children: ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_APP.general.app} />;
  }

  return <>{children}</>;
}
