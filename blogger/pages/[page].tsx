import React from 'react';
import Layout from '../components/Layout';
import SignUp from '@/components/SignUp';
import Login from '../components/Login';
import Chat from '../components/Chat';
import Keyword from '../components/Keyword';
import { useRouter } from 'next/router';
import { useTheme } from '../components/ThemeContext';

const Page = () => {
  const router = useRouter();
  const { page } = router.query;
  const { theme } = useTheme();

  switch (page) {
    case 'keywords':
      return (
        <Layout title='Keywords' theme={theme}>
          <Keyword />
        </Layout>
      )
    case 'sign-up':
      return (
        <SignUp />
      );
    case 'login':
      return (
        <Login />
      );
    case 'chat':
      return (
        <Layout title='Chat' theme={theme}>
          <Chat />
        </Layout>
      );
    default:
      return (
        <Layout>
          <p>Page not found</p>
        </Layout>
      );
  }
}

export default Page;
