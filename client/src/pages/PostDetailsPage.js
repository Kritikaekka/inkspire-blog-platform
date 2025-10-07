import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';

function PostDetailsPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL;

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_BASE}/api/posts/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setPost(res.data);
      } catch (err) {
        setError('Post not found or could not fetch post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, token, API_BASE]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment) return;
    try {
      await axios.post(
        `${API_BASE}/api/comments`,
        { content: comment, postId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      const res = await axios.get(`${API_BASE}/api/posts/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setPost(res.data);
    } catch (err) {
      alert('Failed to add comment.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`${API_BASE}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post deleted');
      navigate('/posts');
    } catch (err) {
      alert('Delete failed');
    }
  };

  let loggedInUserId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      loggedInUserId = decoded.id || decoded.userId || decoded._id;
    } catch {
      loggedInUserId = null;
    }
  }

  if (loading)
    return <div style={{ color: '#fff', padding: '2rem' }}>Loading...</div>;
  if (error)
    return <div style={{ color: '#fff', padding: '2rem' }}>{error}</div>;
  if (!post)
    return <div style={{ color: '#fff', padding: '2rem' }}>No post data.</div>;

  return (
    <div
      style={{
        margin: '3rem auto',
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 24,
        boxShadow: '0 6px 32px #0002',
        maxWidth: 1150,
        padding: '2.2rem 2.6rem',
        fontFamily: "'Roboto', 'Segoe UI', Arial, sans-serif",
      }}
    >
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          style={{
            width: '100%',
            borderRadius: 14,
            marginBottom: 28,
            maxHeight: 330,
            objectFit: 'cover',
            boxShadow: '0 4px 18px #0002',
          }}
        />
      )}

      <div
        style={{
          fontSize: '1.8rem',
          color: '#f67114',
          marginBottom: 7,
          fontWeight: 700,
          letterSpacing: 0.88,
          fontFamily: "'Lobster Two', sans-serif",
          textShadow: '1px 1px 2px #fff6',
        }}
      >
        {post.author?.username || 'Unknown'}
      </div>

      <h1
        style={{
          fontSize: '2.9rem',
          fontWeight: 1000,
          lineHeight: 1.2,
          color: '#222',
          fontFamily: "'Finger Paint', sans-serif",
          marginBottom: 15,
        }}
      >
        {post.title}
      </h1>

      <p
        style={{
          marginBottom: 18,
          fontSize: '1.13rem',
          color: '#333',
          textAlign: 'justify',
          letterSpacing: '0.01rem',
          lineHeight: 1.8,
          whiteSpace: 'pre-line',
        }}
      >
        {post.content}
      </p>

      {post.author && post.author._id === loggedInUserId && (
        <div style={{ marginBottom: 24 }}>
          <Link
            to={`/posts/edit/${post._id}`}
            style={{
              background: '#bc2125',
              color: 'white',
              marginRight: 14,
              border: 'none',
              borderRadius: 20,
              padding: '7px 29px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '19px',
              boxShadow: '0 2px 5px #0002',
            }}
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            style={{
              fontSize: '19px',
              background: '#bc2125',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '9.1px 29px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 5px #0001',
            }}
          >
            Delete
          </button>
        </div>
      )}

      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#0c252d',
          margin: '18px 0 10px 0',
        }}
      >
        Comments
      </h2>
      {post.comments && post.comments.length === 0 && (
        <p style={{ color: '#999' }}>No comments yet.</p>
      )}
      <ul style={{ marginBottom: 0 }}>
        {post.comments &&
          post.comments.map((c) => (
            <li
              key={c._id}
              style={{
                background: '#f7f7fa',
                border: '1px solid #ececec',
                borderRadius: 8,
                marginBottom: 12,
                padding: '11px 16px 7px 16px',
              }}
            >
              <div style={{ marginBottom: 2, color: '#2f2f31', fontWeight: 500 }}>
                {c.content}
              </div>
              <small style={{ color: '#789', fontSize: '.99rem' }}>
                By: {c.author?.username || 'Unknown'}
              </small>
            </li>
          ))}
      </ul>
      <form onSubmit={handleAddComment} style={{ marginTop: 18 }}>
        <textarea
          placeholder="Add your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            border: '1.5px solid #bbb',
            borderRadius: 9,
            padding: '1.1rem',
            fontSize: '1.13rem',
            width: '100%',
            marginBottom: 9,
            minHeight: 50,
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
        <button
          type="submit"
          style={{
            background: '#bc2125',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '9.3px 22px',
            fontWeight: 700,
            fontSize: '1.08rem',
            cursor: 'pointer',
            float: 'right',
            boxShadow: '0 1px 4px #0002',
          }}
        >
          Add Comment
        </button>
      </form>
      <div style={{ clear: 'both' }} />
    </div>
  );
}

export default PostDetailsPage;
