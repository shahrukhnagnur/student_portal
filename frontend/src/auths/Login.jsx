import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setSuccess('Login successful!');
      setIsAuthenticated(true);
        console.log(response.data.token)
      setTimeout(() => {
        navigate("/");
        window.location.reload(); 
      }, 500);

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <StyledWrapper>
      <div className="login-card">
        <form className="form" onSubmit={handleLogin}>
          <h1 className="title">Sign in</h1>
          <p className="subtitle">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
          {error && <p className="message error">{error}</p>}
          {success && <p className="message success">{success}</p>}
          <div className="input-container">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit">Sign in</button>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #f9fafb, #e0f2fe, #fde68a);
  font-family: 'Arial', sans-serif;

  .login-card {
    background: #fff;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
  }

  .subtitle a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 500;
  }

  .message {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
  }

  .message.error {
    background-color: #fee2e2;
    color: #b91c1c;
  }

  .message.success {
    background-color: #d1fae5;
    color: #065f46;
  }

  .input-container {
    margin-bottom: 1rem;
  }

  .input-container input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;
  }

  .input-container input:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }

  .submit {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #4f46e5;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }

  .submit:hover {
    background-color: #4338ca;
  }

  .submit:active {
    transform: scale(0.98);
  }
`;

export default Login;
