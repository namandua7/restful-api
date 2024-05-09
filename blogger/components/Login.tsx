import React, { useState } from 'react'
import {handleLogin} from '../helpers'
import { useRouter } from 'next/router';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    handleLogin(e, email, password);
    router.push('/about');
  };

  return (
    <>
      <h1 className='text-center mt-3'>Log in</h1>
      <div className="container my-5">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Log in</button>
      </div>
    </>
  )
}
