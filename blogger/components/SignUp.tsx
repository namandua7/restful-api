import React from 'react'

export default function SignUp() {
  return (
    <>
    <h1 className='text-center mt-3'>Sign Up</h1>
    <div className="container my-5">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
        <input className="form-control" id="exampleFormControlInput1" placeholder="Name" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
        <input className="form-control" id="exampleFormControlInput1" placeholder="Username" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Contact</label>
        <input type="text" className="form-control" id="exampleFormControlTextarea1" placeholder='Contact'></input>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </div>
    </>
  )
}
