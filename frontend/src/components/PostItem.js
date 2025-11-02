import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  // Function to create a short excerpt
  const getExcerpt = (content, length = 150) => {
    if (content.length <= length) {
      return content;
    }
    return content.substring(0, length) + '...';
  };

  return (
    <article className="post-item">
      <Link to={`/post/${post._id}`}>
        <h2>{post.title}</h2>
        <div className="post-meta">
          <span>By: {post.author.name}</span> | 
          <span> {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="post-excerpt">{getExcerpt(post.content)}</p>
        <span style={{ color: '#007bff', fontWeight: 500 }}>Read More &rarr;</span>
      </Link>
    </article>
  );
};

export default PostItem;