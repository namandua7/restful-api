import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { handleLogin } from '../helpers';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      router.push('/home');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1 className='text-center text-3xl font-bold mt-10'>Log in</h1>
      <div className="container mx-auto my-10 flex justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          {errorMessage && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email address</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <span className="text-gray-600">Not an account? </span>
          <Link href="/sign-up" className="text-blue-500 hover:text-blue-700 font-semibold">Sign Up</Link><br />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
}
