import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorModal from './errorModal';
import Preloader from './preloader';
import { useDispatch } from 'react-redux';
import { closePreloader } from '../store/fetchSlice';

interface Props {
  children?: ReactNode;
}
const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const tokens = localStorage.getItem('token');
    if (
      router.pathname !== '/login' &&
      router.pathname !== '/' &&
      router.pathname !== '/signup' &&
      router.pathname !== '/comingSoon' &&
      router.pathname !== '/404' &&
      !tokens
    ) {
      router.push('/login');
    }
  }, []);
  useEffect(() => {
    dispatch(closePreloader());
  }, []);
  return (
    <GoogleOAuthProvider
      clientId={'354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com'}
    >
      <div>
        <Head>
          <title>CodeAlgo Academy</title>
        </Head>
        <main>{children}</main>
        <ErrorModal />
        <Preloader />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Layout;
