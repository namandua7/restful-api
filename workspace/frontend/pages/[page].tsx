import React from 'react';
import { useRouter } from 'next/router';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';

const Page = () => {
  const router = useRouter();
  const { page } = router.query;

  switch (page) {
    case 'login':
      return <Login />;
    case 'sign-up':
      return <SignUp />;
    default:
      return <div>Page not found</div>;
  }
}

export default Page;