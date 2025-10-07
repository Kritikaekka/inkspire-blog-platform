import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function EditPostPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPost = async () => {
    try {
      setLoading(true);
      const API_BASE = process.env.REACT_APP_API_URL;

      const res = await axios.get(`${API_BASE}/api/posts/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setTitle(res.data.title || '');
      setContent(res.data.content || '');
    } catch (err) {
      alert('Could not load post.');
      navigate('/posts');
    } finally {
      setLoading(false);
    }
  };
  fetchPost();
}, [id, token, navigate]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const API_BASE = process.env.REACT_APP_API_URL;

    await axios.put(
      `${API_BASE}/api/posts/${id}`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Post updated!');
    navigate(`/posts/${id}`);
  } catch (err) {
    alert('Failed to update post.');
  }
};

  if (loading)
    return <div style={{ color: '#fff', padding: '2rem' }}>Loading...</div>;

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
      }}>
        Edit Post
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 22 }}>
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
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem',
              border: '1.5px solid #aaa',
              borderRadius: 9,
              fontSize: '1.12rem',
              fontFamily: 'inherit'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 24 }}>
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
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{
              width: '100%',
              minHeight: 120,
              padding: '1rem',
              fontSize: '1.13rem',
              border: '1.5px solid #aaa',
              borderRadius: 9,
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            background: '#bc2125',
            color: '#fff',
            border: 'none',
            borderRadius: 16,
            padding: '12px 36px',
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPostPage;
