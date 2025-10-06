import React from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign:'center',
  width:'80vw',
  padding: '0 6rem',
  backgroundColor: '#00000074', // optional background overlay
  backdropFilter: 'blur(3px)',
  marginLeft:'55px',
  marginTop:'30px',
  borderRadius:'20px'
};

const headingStyle = {
  color: '#fff',
  fontSize: '6rem',
  fontWeight: 'bold',
  fontFamily: "'Finger Paint', sans-serif",
  maxWidth: '50%',
  textAlign: 'left',
  
  borderRadius: '40px',
  padding: '1rem',
};

const rightContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '40%',
  cursor: 'pointer',
  color: '#f9e4c7',
  fontFamily: "'Finger Paint', sans-serif",
};

const imageStyle = {
  marginBottom: '1rem',
  backgroundColor:'#ffffffff',
  borderRadius:'8px',
  width:'400px',
  backdropFilter: 'blur(9px)',
};

const startWritingTextStyle = {
  fontSize: '3rem',
  padding: '0.8rem 4.8rem',
   borderRadius: '9999px',
  
};

function HomePage() {
  const navigate = useNavigate();

  const handleStartWritingClick = () => {
    navigate('/signup');
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to my Blog Platform</h1>

      <div style={rightContainerStyle} onClick={handleStartWritingClick}>
        <img
          src="/write.png" 
          color='white'// <-- Make sure this image is in your public folder
          alt="Hand with pen"
          style={imageStyle}
        />
        <span style={startWritingTextStyle}
        onMouseOver={e => {
  e.currentTarget.style.backgroundColor = '#f9e4c7';
  e.currentTarget.style.color = '#000';
}}
onMouseOut={e => {
  e.currentTarget.style.backgroundColor = 'black';
  e.currentTarget.style.color = '#fff';
}}>Start Writing</span>
      </div>
    </div>
  );
}

export default HomePage;
