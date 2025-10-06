import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const navStyles = {
  position: 'sticky',
  top: 0,
  width: '97%',
  zIndex: 50,
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
  fontFamily: "'Finger Paint', sans-serif"
};

const logoStyles = {
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  fontWeight: 'normal',
  fontSize: '2.7rem',
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: "'Flavors', cursive",
};

const navLinksContainer = {
  display: 'flex',
  gap: '6rem',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const navLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1.2rem',
};

const navLinkActiveStyles = {
  // Optionally define active link styles here
};

const authContainer = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
};

const buttonStyle = {
  backgroundColor: 'black',
  color: '#fff',
  border: 'none',
  borderRadius: '9999px',
  padding: '0.8rem 1.28rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  textDecoration: 'none',
  fontFamily: "'Finger Paint', sans-serif"
};

const buttonHoverStyle = {
  backgroundColor: '#f9e4c7',
  color: '#000',
};

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={navStyles}>
      {/* Logo */}
      <NavLink to="/" style={logoStyles}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: '28px', height: '28px', marginRight: '-1px' }}
        />
        Inkspire
      </NavLink>

      {/* Navigation Links */}
      <ul style={navLinksContainer}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...navLinkStyles, ...navLinkActiveStyles } : navLinkStyles
            }
          >
            Features
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts"
            style={({ isActive }) =>
              isActive ? { ...navLinkStyles, ...navLinkActiveStyles } : navLinkStyles
            }
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resources"
            style={({ isActive }) =>
              isActive ? { ...navLinkStyles, ...navLinkActiveStyles } : navLinkStyles
            }
          >
            Resources
          </NavLink>
        </li>
        {/* Show Create Post only if logged in */}
        {user && user.id && (
          <li>
            <NavLink
              to="/new-post"
              style={({ isActive }) =>
                isActive ? { ...navLinkStyles, ...navLinkActiveStyles } : navLinkStyles
              }
            >
              Create Post
            </NavLink>
          </li>
        )}
      </ul>

      {/* Auth Buttons */}
      <div style={authContainer}>
  {!user || !user.id ? (
    <>
      <NavLink
        to="/login"
        style={{ ...navLinkStyles, cursor: 'pointer' }}
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        style={buttonStyle}
        onMouseOver={e => {
          e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
          e.currentTarget.style.color = buttonHoverStyle.color;
        }}
        onMouseOut={e => {
          e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
          e.currentTarget.style.color = buttonStyle.color;
        }}
      >
        Get started
      </NavLink>
    </>
  ) : (
    <>
      <NavLink
        to={`/profile/${user.id}`}
        style={{ ...navLinkStyles, cursor: 'pointer' }}
      >
        {user.username || 'Profile'}
      </NavLink>
      <button
        onClick={handleLogout}
        style={buttonStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Logout
      </button>
    </>
  )}
</div>

    </nav>
  );
}

export default NavBar;
