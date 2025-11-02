import React from 'react';

// 'type' can be 'danger' or 'success'
const Message = ({ children, type = 'danger' }) => {
  return <div className={`message message-${type}`}>{children}</div>;
};

export default Message;