import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyPosts, deletePost } from '../api/postService';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Function to fetch posts
  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const data = await getMyPosts(); // API call
      setPosts(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchMyPosts();
  }, []);

  // Delete handler
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        toast.success('Post deleted successfully');
        // Refetch posts to update the list
        fetchMyPosts();
        // Or filter state: setPosts(posts.filter(p => p._id !== postId));
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete post');
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <Message type="danger">{error}</Message>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{user.name}'s Dashboard</h1>
        <Link to="/create-post" className="btn">
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <Message type="info">You have not created any posts yet.</Message>
      ) : (
        <div className="dashboard-posts-list">
          {posts.map((post) => (
            <div key={post._id} className="dashboard-post">
              <Link to={`/post/${post._id}`} className="dashboard-post-title">
                {post.title}
              </Link>
              <div className="dashboard-post-actions">
                <Link to={`/edit-post/${post._id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;