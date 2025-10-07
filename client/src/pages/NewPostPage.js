import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_BASE = process.env.REACT_APP_API_URL;
await axios.post(`${API_BASE}/api/posts`, { title, content }, {
  headers: { Authorization: `Bearer ${token}` }
});
      alert('Post created successfully!');
      navigate('/posts');
    } catch (err) {
      alert('Error creating post.');
    }
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.97)',
      borderRadius: 20,
      boxShadow: '0 8px 36px #3331',
      maxWidth: 580,
      margin: '4rem auto',
      padding: '0.5rem 4.5rem 2.9rem 2.9rem',
      fontFamily: "'Roboto', 'Segoe UI', Arial, sans-serif"
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 800,
        marginBottom: 24,
        textAlign: 'center',
        color: '#bc2125',
        fontFamily: "'Finger Paint', sans-serif",
        letterSpacing: 0.02
      }}>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <label style={{
          display: 'block',
            fontWeight: 700,
            fontSize: '1.18rem',
            marginBottom: 7,
            fontFamily: "'Finger Paint', sans-serif",
            color: '#bc2125'
        }}>
          Title
        </label>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '1em 1em',
            fontSize: '1.13rem',
            borderRadius: 9,
            border: '1.5px solid #bbb',
            marginBottom: 18,
            outline: 'none',
            marginTop: 3,
            fontFamily: 'inherit'
          }}
        />
        <label style={{
          display: 'block',
            fontWeight: 700,
            fontSize: '1.18rem',
            marginBottom: 7,
            fontFamily: "'Finger Paint', sans-serif",
            color: '#bc2125'
        }}>
          Content
        </label>
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          style={{
            width: '100%',
            minHeight: 130,
            padding: '1.1em 1em',
            fontSize: '1.14rem',
            borderRadius: 9,
            border: '1.5px solid #bbb',
            resize: 'vertical',
            fontFamily: 'inherit',
            outline: 'none',
            marginBottom: 22,
            marginTop: 3,
            color: '#222',
          }}
        />

        <button
          type="submit"
          style={{
            background: '#bc2125',
            color: '#fff',
            border: 'none',
            borderRadius: 16,
            padding: '12px 86px',
            fontWeight: 800,
            fontSize: '1.17rem',
            cursor: 'pointer',
            display: 'block',
            margin: '0 auto',
            letterSpacing: 0.01,
            fontFamily: "'Finger Paint', sans-serif",
            boxShadow: '0 2px 7px #226cfd22'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#000000'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#bc2125'}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default NewPostPage;
