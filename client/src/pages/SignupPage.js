import React, { useState } from 'react';

const head={
  fontSize: '2.9rem',
  fontWeight: '500',
  margin: 0,
  marginBottom: '0.3rem',
  fontFamily: "'Flavors', cursive",
}

const container = {
  maxWidth: '500px',
  margin: '0rem auto',
  backgroundColor: '#00000074',
  backdropFilter: 'blur(3px)',
  borderRadius: '8px',
  boxShadow: '0 2px 16px rgba(0,0,0,.1)',
  padding: '2.5rem 3.9rem',
  fontFamily: "'Finger Paint', sans-serif",
  height: '525px',
  color: '#fff',
};

const heading = {
  fontSize: '2rem',
  fontWeight: '600',
  margin: 0,
  marginBottom: '0.3rem',
  textAlign: 'center',
  marginTop:'-1.5rem'
};

const subheading = {
  color: '#fff',
  textAlign: 'center',
  marginBottom: '-1rem',
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

const legal = {
  fontSize: '0.91rem',
  color: '#fff',
  margin: '1.2rem 0 2.3rem 0',
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
  marginTop: '-0.4rem',
  cursor: 'pointer',
  letterSpacing: '0.02rem',
  fontFamily: "'Finger Paint', sans-serif",
};

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  const API_BASE = process.env.REACT_APP_API_URL;
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });

      if (response.ok) {
        alert('Account created! You may now log in.');
        // Optionally clear form or redirect after signup
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Signup failed');
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div style={container}>
      <h1 style={heading}>Sign up for <p style={head}>Inkspire</p></h1>
      <div style={subheading}>
        Create a free account or{' '}
        <a href="/login" style={{ color: '#f9e4c7', textDecoration: 'underline' }}>
          Log In
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
        <label style={label}>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <div style={legal}>
          By creating an account, you agree to our&nbsp;
          <a href="/terms" style={{ color: '#f9e4c7', textDecoration: 'underline' }}>
            Terms
          </a>{' '}
          and have read and acknowledge the&nbsp;
          <a href="/privacy" style={{ color: '#f9e4c7', textDecoration: 'underline' }}>
            Privacy Policy
          </a>
          .
        </div>
        <button style={button} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
