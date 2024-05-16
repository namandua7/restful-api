import React from 'react';
import '../styles/global.css';
import Link from 'next/link';

export default function SignUp() {
  return (
    <>
      <h1 className='text-center mt-5'>Sign Up</h1>
      <div className='container my-5 d-flex justify-content-center'>
        <div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
            <input className="form-control w-100" id="exampleFormControlInput1" placeholder="Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
            <input className="form-control w-100" id="exampleFormControlInput1" placeholder="Username" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Contact</label>
            <input type="text" className="form-control w-100" id="exampleFormControlTextarea1" placeholder='Contact'></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control w-100" id="exampleFormControlInput1" placeholder="Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
            <input type="password" className="form-control w-100" id="exampleFormControlInput1" placeholder="Password" />
          </div>
          <span>Have an account? </span><Link href="/login">Login</Link><br />
          <button type="submit" className="btn btn-primary my-2">Sign Up</button>
        </div>
      </div>
    </>
  );
}