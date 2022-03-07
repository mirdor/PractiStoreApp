import { AxiosError } from 'axios';
import React, { createContext, useEffect, useReducer } from 'react';
import cafeApi from '../api/cafeApi';
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (data: RegisterData) => void;
  signIn: (data: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
  user: null,
};

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    const token = await AsyncStorage.getItem('token');

    // No token
    if (!token) return dispatch({ type: 'notAuthenticated' });

    // Token exists

    const res = await cafeApi.get<LoginResponse>('/auth');

    if (res.status !== 200) {
      return dispatch({ type: 'notAuthenticated' });
    }

    await AsyncStorage.setItem('token', res.data.token);

    dispatch({
      type: 'signup',
      payload: {
        token: res.data.token,
        user: res.data.usuario,
      },
    });
  };

  const signUp = async ({ correo, nombre, password }: RegisterData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/usuarios', {
        correo,
        nombre,
        password,
      });
      dispatch({
        type: 'signup',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Ocurrió un error. Revise la información.',
      });
    }
  };

  const signIn = async ({ correo, password }: LoginData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
      dispatch({
        type: 'signup',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({ type: 'addError', payload: error.response.data.msg || 'Información incorrecta' });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };

  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
