import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login } from '../api/authService';
import { toast } from 'react-toastify';
import Message from '../components/Message';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useAuth(); // Rename 'login' from context
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the API service
      // data is { _id, name, email, token }
      const data = await login({ email, password });

      // --- FIX ---
      // Check if a token was actually returned.
      if (data && data.token) {
        // Construct the user object for our context
        const user = { _id: data._id, name: data.name, email: data.email };
        
        // Call the context function to update global state
        authLogin(user, data.token);
        
        toast.success('Logged in successfully!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
         throw new Error(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      // With the backend fix, this now works correctly for 401 errors
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {error && <Message type="danger">{error}</Message>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
