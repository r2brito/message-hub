import { Suspense } from 'react';

import { AuthProvider } from './contexts/FirebaseContext';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
