import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const head = {
  fontSize: '2.9rem',
  fontWeight: '500',
  margin: 0,
  marginBottom: '0.3rem',
  fontFamily: "'Flavors', cursive",
};

const container = {
  maxWidth: '500px',
  margin: '4rem auto',
  backgroundColor: '#00000074',
  backdropFilter: 'blur(3px)',
  borderRadius: '8px',
  boxShadow: '0 2px 16px rgba(0,0,0,.1)',
  padding: '2.5rem 3.9rem',
  fontFamily: "'Finger Paint', sans-serif",
  height: '450px',
  color: '#fff',
};

const heading = {
  fontSize: '2.2rem',
  fontWeight: '600',
  margin: 0,
  marginBottom: '0.3rem',
  textAlign: 'center',
};

const subheading = {
  color: '#fff',
  textAlign: 'center',
  marginBottom: '2rem',
};

const label = {
  display: 'block',
  fontWeight: '600',
  margin: '1.2rem 0 0.2rem 0',
};

const input = {
  width: '100%',
  padding: '0.7rem',
  border: '2px solid #f9e4c7',
  borderRadius: '4px',
  fontSize: '1rem',
  marginBottom: '0.6rem',
  background: '#f8fafc',
  outline: 'none',
};

const button = {
  width: '100%',
  background: '#f9e4c7',
  color: '#000',
  fontWeight: 700,
  fontSize: '1.12rem',
  border: 'none',
  padding: '0.95rem 0',
  borderRadius: '26px',
  marginTop: '2.5rem',
  cursor: 'pointer',
  letterSpacing: '0.02rem',
  fontFamily: "'Finger Paint', sans-serif",
};

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Get setToken from AuthContext
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_BASE = process.env.REACT_APP_API_URL;
const response = await fetch(`${API_BASE}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});


      if (response.ok) {
        const data = await response.json();

        // Store token for authentication
        localStorage.setItem('token', data.token);

        // Update React context token to trigger re-render and auth update
        setToken(data.token);

        alert('Login successful!');
        navigate('/posts');
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed');
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div style={container}>
      <h1 style={heading}>
        Login to <p style={head}>Inkspire</p>
      </h1>
      <div style={subheading}>
        Don’t have an account?{' '}
        <a href="/signup" style={{ color: '#f9e4c7', textDecoration: 'underline' }}>
          Sign up
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
          required
        />
        <label style={label}>Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            required
          />
          <span
            onClick={() => setShowPassword((s) => !s)}
            style={{
              position: 'absolute',
              right: 1,
              top: 10,
              cursor: 'pointer',
              color: '#000',
              fontSize: '1.02rem',
              fontWeight: 600,
              userSelect: 'none',
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <button style={button} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
