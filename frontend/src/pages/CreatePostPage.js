import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postService';
import { toast } from 'react-toastify';

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '', // URL for the image
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      await createPost({ title, content, coverImage });
      toast.success('Post created successfully!');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create post');
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Create New Post</h1>
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
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;