/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactNode, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import LoadingScreen from '../components/loading';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/auth/login';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      // @ts-ignore
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
