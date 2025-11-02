import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">
          Blog App
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            // If user is logged in
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/create-post">New Post</Link>
              </li>
              <li>
                <button onClick={onLogout} className="btn-logout">
                  Logout ({user.name})
                </button>
              </li>
            </>
          ) : (
            // If user is logged out
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;