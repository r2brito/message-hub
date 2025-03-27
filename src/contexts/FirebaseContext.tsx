import { createContext, useEffect, useReducer, ReactNode } from 'react';

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '../firebase/config';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'user';
}

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext = createContext<{
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  ...initialState,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

function reducer(state: AuthState, action: { type: string; payload?: any }): AuthState {
  switch (action.type) {
    case 'INITIALISE':
      return {
        isAuthenticated: !!action.payload,
        isInitialized: true,
        user: action.payload,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const profile = userSnap.exists() ? userSnap.data() : {};

        dispatch({
          type: 'INITIALISE',
          payload: {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || profile.displayName,
            photoURL: user.photoURL || profile.photoURL,
            role: 'user',
          },
        });
      } else {
        dispatch({ type: 'INITIALISE', payload: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error.code, error.message);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email,
      displayName: `${firstName} ${lastName}`,
      photoURL: 'https://api.dicebear.com/7.x/initials/svg?seed=' + firstName + lastName,
    });
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isInitialized: state.isInitialized,
        user: state.user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
