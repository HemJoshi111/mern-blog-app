import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../api/postService';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';

const EditPostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();

  // Fetch the post data on mount to pre-fill the form
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const post = await getPost(id);
        // Note: Add authorization check here if needed,
        // but backend already protects against update.
        setFormData({
          title: post.title,
          content: post.content,
          coverImage: post.coverImage || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const { title, content, coverImage } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePost(id, { title, content, coverImage });
      toast.success('Post updated successfully!');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update post');
      setLoading(false);
    }
  };

  if (loading && !formData.title) return <Loader />; // Show loader only on initial fetch
  if (error) return <Message type="danger">{error}</Message>;

  return (
    <div className="form-container">
      <h1>Edit Post</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL (Optional)</label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={coverImage}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;