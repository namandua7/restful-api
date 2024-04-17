import React, { useState } from 'react'

export default function LoginForm(props) {
  return (
    <div className="my-5 container">
    <form className={`text-${props.mode==='dark'?'light':'dark'}`}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1"/>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" htmlFor="exampleCheck1">Remember</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}