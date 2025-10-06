import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import PostsPage from './pages/PostsPage';
import NewPostPage from './pages/NewPostPage';
import PostDetailsPage from './pages/PostDetailsPage';
import EditPostPage from './pages/EditPostPage';
import ProfilePage from './pages/ProfilePage';
  



function App() {
  return (
    <div
      className="bg-cover bg-center min-h-screen h-screen"
       style={{
    backgroundImage: "url('/cover.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    marginTop:'-0.5rem',
    marginLeft:'-0.5rem',
    overflowX:'hidden',
    marginBottom:'-0.5rem',
    marginRight:'-0.5rem',
    
    
  }}
    >
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <PostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-post"
            element={
              <ProtectedRoute>
                <NewPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <ProtectedRoute>
                <EditPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
  path="/posts"
  element={
    <ProtectedRoute>
      <PostsPage />
    </ProtectedRoute>
  }
/>


        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/posts/edit/:id" element={<EditPostPage />} />

        {/* Add this for creating new posts */}
        <Route path="/new-post" element={<NewPostPage />} />

        {/* other routes */}
    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
