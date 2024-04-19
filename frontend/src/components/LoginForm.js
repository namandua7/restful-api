import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (props.token) {
      props.setIsLoggedIn(true);
      navigate('/');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/sign_in',
        { email, password }
      );
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      props.setToken(response.data.token);
      props.setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="my-5 container">
      <form onSubmit={handleSubmit} className={`text-${props.mode === 'dark' ? 'light' : 'dark'}`}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password}onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Remember</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
