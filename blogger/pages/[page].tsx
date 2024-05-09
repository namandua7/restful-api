import SignUp from '@/components/SignUp';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Login from '../components/Login';
import Chat from '../components/Chat';

export default function Page() {
  const router = useRouter();
  const { page } = router.query;

  switch (page) {
    case 'sign-up':
      return (
        <Layout title ='Sign Up'>
          <SignUp />
        </Layout>
      );
    case 'login':
      return (
        <Layout title='Log in'>
          <Login />
        </Layout>
      )
    case 'chat':
      return (
        <Layout title='Chat'>
          <Chat />
        </Layout>
      )
    default:
      return <p>Page not found</p>;
  }
}
