import React from 'react';
import Link from 'next/link';

export default function SignUp() {
  return (
    <>
      <h1 className='text-center text-3xl font-bold mt-10'>Sign Up</h1>
      <div className='container mx-auto my-10 flex justify-center'>
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" id="name" placeholder="Name" />
          </div>
          <div className="mb-5">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" id="username" placeholder="Username" />
          </div>
          <div className="mb-5">
            <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">Contact</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" id="contact" placeholder='Contact' />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email address</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" id="email" placeholder="Email" />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" id="password" placeholder="Password" />
          </div>
          <span className="text-gray-600">Have an account? </span>
          <Link href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">Login</Link><br />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300">Sign Up</button>
        </div>
      </div>
    </>
  );
}
