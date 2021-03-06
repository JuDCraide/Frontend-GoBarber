/* eslint-disable camelcase */
import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}
interface AuthState {
  token: string;
  user: User;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credential: SignInCredentials): Promise<void>;
  signOut(): void;
  updatedUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const res = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const updatedUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updatedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
