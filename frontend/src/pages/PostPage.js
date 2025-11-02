import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/postService';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); // Get the post ID from the URL

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // Re-run effect if the ID in the URL changes

  if (loading) return <Loader />;
  if (error) return <Message type="danger">{error}</Message>;
  if (!post) return null; // Should be covered by loading/error

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>By: {post.author.name}</span> | 
        <span> {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="post-image" />
      )}
      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostPage;