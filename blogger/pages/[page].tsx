import React from 'react';
import Layout from '../components/Layout';
import SignUp from '@/components/SignUp';
import Login from '../components/Login';
import Chat from '../components/Chat';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { page } = router.query;

  switch (page) {
    case 'sign-up':
      return (
        <Layout>
          <SignUp />
        </Layout>
      );
    case 'login':
      return (
        <Layout>
          <Login />
        </Layout>
      );
    case 'chat':
      return (
        <Layout title='Chat'>
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