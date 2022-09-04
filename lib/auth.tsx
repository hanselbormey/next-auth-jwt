import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';

type Props = {
  children: JSX.Element;
};

type AuthProviderProps = {
  session: any;
  token: string;
  logout(): void;
  login(): void;
  register(): void;
  /*   removeItem(e: string): void;
  updateItem(p: Product | CartItem, qty: number): void; */
};

export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
  // return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const authContext = createContext<AuthProviderProps>({
  session: null,
  token: '',
  logout: () => {},
  login: () => {},
  register: () => {}
  /*   isEmpty: () => true,
  emptyCart: () => {} */
});

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [session, setSession] = useState<any>();
  const [token, setToken] = useState('');

  const router = useRouter();

  const getSession = async () => {
    const response = await fetch('/api/auth/session');
    const result = await response.json();
    return result.data;
  };

  const login = async (data: any) => {
    const response = await fetch('/api/auth/login', {
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await response.json();
    if (result.data) {
      setSession(result.data);
    }

    return result;
  };

  const logout = async () => {
    setSession(null);
    setToken('');
    await fetch('/api/auth/logout');
  };

  const register = (user: any) => {};

  useEffect(() => {
    // get user and token
    async function fetchSession() {
      const sessionTemp = await getSession();
      const tokenTemp = 'myToken';
      setSession(sessionTemp);
      setToken(tokenTemp);
    }

    fetchSession();
  }, []);

  return {
    session,
    token,
    login,
    logout,
    register
  };
}
