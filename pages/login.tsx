import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const [error, setError] = React.useState('');

  const { login } = useAuth();

  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    if (formData) {
      const { data, error } = await login(formData);
      if (data) {
        router.push('/');
      }
      if (error) {
        setError(error);
      }
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: '20%'
            }}
          >
            {error ? (
              <div
                style={{
                  borderRadius: '5px',
                  width: '100%',
                  marginBottom: '32px',
                  padding: '8px',
                  backgroundColor: '#e26060'
                }}
              >
                Error: {error}
              </div>
            ) : null}
            <label htmlFor="email">Email</label>
            <input type="text" {...register('email')} />
            <label htmlFor="password">Password</label>
            <input type="password" {...register('password')} />
            <br />
            <button>Submit</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
