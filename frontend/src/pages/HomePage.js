import React, { useState, useEffect } from 'react';
import { getPosts } from '../api/postService';
import PostItem from '../components/PostItem';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
  // Initialize state with an empty array, not null
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        
        const data = await getPosts();

        // --- FIX 1: Validate API response ---
        // Before setting state, check if the data is actually an array.
        // This prevents a crash if the API returns null, undefined, or an object.
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          // If data isn't an array, set posts to an empty array
          // to prevent a render error.
          setPosts([]);
          console.warn('API did not return an array for posts, setting to empty array.');
        }

      } catch (err) {
        // --- FIX 2: Better Error Handling ---
        // This correctly gets the error message from an Axios error (which is often nested)
        // or a standard JavaScript error.
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        
        setError(message);
        setPosts([]); // Also set posts to empty array on error
      
      } finally {
        // This 'finally' block runs whether the 'try' or 'catch' block ran.
        // It ensures the loader is always turned off after the API call.
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  // --- RENDER LOGIC ---

  // 1. Show Loader while fetching
  if (loading) {
    return <Loader />;
  }

  // 2. Show Error message if something went wrong
  if (error) {
    return <Message type="danger">{error}</Message>;
  }

  // 3. Show main content (the posts or "no posts" message)
  return (
    <div className="home-page">
      <h1>Latest Posts</h1>

      {/* --- FIX 3: Defensive Render Check ---
        Check if 'posts' is truthy (not null/undefined) AND has a length of 0.
        This is safer than just checking posts.length.
      */}
      {!posts || posts.length === 0 ? (
        <Message type="info">No posts found.</Message>
      ) : (
        <div className="posts-list">
          {/*
            --- FIX 4: Optional Chaining ---
            Using 'posts?.map' is an extra layer of safety.
            It means "only call .map if 'posts' is not null or undefined".
            This will prevent the 'Cannot read properties of null (reading 'map')' error.
          */}
          {posts?.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
