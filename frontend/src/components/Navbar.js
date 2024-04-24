import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setToken('');
    props.setIsLoggedIn(false);
    props.setUser('');
    navigate('/login');
  };
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">{props.title}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <div className={`form-check form-switch text-${props.mode === 'dark' ? 'light' : 'dark'}`}>
            <input className="form-check-input" type="checkbox" role="switch" checked={props.mode === 'dark'} onClick={props.toggleMode} id="flexSwitchCheckChecked" />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Dark mode</label>
          </div>
          {window.location.pathname === "/projects" && (
            <form className="d-flex mx-4" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          )}
          {props.isLoggedIn ? (
              <p className={`mx-4 my-2 text-${props.mode === 'dark' ? 'light' : 'dark'}`}>{JSON.parse(localStorage.getItem('user')).name}</p>
            ) : (
            <></>
          )}
          {props.isLoggedIn ? (
            <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
          ) : (
            <Link to="/login" className='btn btn-primary'>Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
