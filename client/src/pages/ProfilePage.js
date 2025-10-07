import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProfilePage() {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bioInput, setBioInput] = useState('');

  const isOwnProfile = user?.id === id;

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${API_BASE}/api/users/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProfile(res.data);
      setBioInput(res.data.bio || '');
    } catch (err) {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, [id, token]);

const saveBio = async () => {
  try {
    const API_BASE = process.env.REACT_APP_API_URL;
    await axios.put(
      `${API_BASE}/api/users/${id}`,
      { bio: bioInput },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProfile(prev => ({ ...prev, bio: bioInput }));
    setEditing(false);
  } catch (err) {
    alert('Failed to save bio');
  }
};


  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>User not found.</div>;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.97)',
      borderRadius: 28,
      boxShadow: '0 8px 36px #1a132420',
      maxWidth: 540,
      margin: '4rem auto',
      padding: '2.7rem 3.1rem',
      fontFamily: "'Roboto','Segoe UI',Arial,sans-serif",
      textAlign: 'center'
    }}>
      <img
        src={profile.avatar || '/default-avatar.png'}
        alt="Avatar"
        style={{
          width: 100,
          height: 100,
          borderRadius: 24,
          boxShadow: '0 2px 12px #18449733',
          objectFit: 'cover',
          marginBottom: 16,
          background: '#eee'
        }}
      />
      <h1 style={{ fontWeight: 900, fontSize: '2.1rem', color: '#bc2125', fontFamily: "'Finger Paint', sans-serif", }}>
        {profile.username}
      </h1>
      <div style={{ fontSize: '1.1rem', color: '#4c5265', fontWeight: 500, marginBottom: 5 }}>
        {profile.email}
      </div>
      <div style={{ fontSize: '1rem', color: '#738', marginBottom: 18 }}>
        Member since: {new Date(profile.createdAt).toLocaleDateString()}
      </div>

      <div style={{
        background: '#f8f8fe',
        borderRadius: 16,
        padding: '1.2rem 1rem',
        color: '#184497',
        fontSize: '1.08rem',
        boxShadow: '0 2px 8px #18449711',
        marginBottom: 5,
        minHeight: 110,
      }}>
        <strong>About:</strong>
        {!editing ? (
          <>
            {' '}
            {profile.bio || 'No bio added yet.'}
            {isOwnProfile && (
              <button
                style={{
                  marginLeft: 15,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  color: '#226cfd',
                  fontWeight: 700,
                }}
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            )}
          </>
        ) : (
          <>
            <textarea
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              rows={4}
              style={{ width: '95%', padding: '8px', fontSize: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
            />
            <div style={{ marginTop: 6 }}>
              <button
                onClick={saveBio}
                style={{
                  backgroundColor: '#226CFD',
                  color: '#fff',
                  borderRadius: 8,
                  border: 'none',
                  padding: '6px 16px',
                  marginRight: 10,
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{
                  backgroundColor: '#ccc',
                  borderRadius: 8,
                  border: 'none',
                  padding: '6px 16px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
