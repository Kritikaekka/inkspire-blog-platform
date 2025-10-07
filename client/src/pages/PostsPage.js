import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${API_BASE}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  };
  fetchPosts();
}, []);

  if (loading) return <Loader />;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2.4rem',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {posts.map((post) => {
        console.log('Post card id:', post._id); // Debug log

        return (
          <div
            key={post._id}
            style={{
              width: '320px',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 18px #0002',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={post.coverImage || '/placeholder.jpg'}
              alt={post.title}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                background: '#eee',
              }}
            />
            <div style={{ padding: '1.2rem', flex: 1 }}>
              <div
                style={{
                  fontSize: '1rem',
                  color: '#df4523',
                  fontWeight: 700,
                  marginBottom: '0.2rem',
                  fontFamily: "'Lobster Two', sans-serif",
                  letterSpacing: '.04em',
                }}
              >
                {post.author?.username || 'Unknown Author'}
              </div>
              <Link to={`/posts/${post._id}`}
                style={{
                  color: '#111',
                  fontWeight: 700,
                  fontSize: '1.13rem',
                  textDecoration: 'none',
                  marginBottom: '0.45rem',
                  display: 'inline-block',
                  fontFamily: "'Finger Paint', sans-serif",
                }}
              >
                {post.title}
              </Link>
              <p
                style={{
                  color: '#444',
                  fontSize: '.97rem',
                  marginTop: '.4rem',
                }}
              >
                {(post.content || '').substring(0, 80)}...
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostsPage;
