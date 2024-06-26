import React, { useState } from 'react'
import { handleLogin } from '../helpers'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      router.push('/chat');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1 className='text-center mt-3'>Log in</h1>
      <div className="container my-5 d-flex justify-content-center">
        <div>
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <span>Not an account? </span><Link href="/sign-up">SignUp</Link><br />
          <button type="submit" className="btn btn-primary my-2" onClick={handleSubmit}>Log in</button>
        </div>
      </div>
    </>
  )
}
