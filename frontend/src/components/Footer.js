import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
          <div className="container">
              <p>Made with <span className="heart">&hearts;</span> By Hem Joshi</p>
              <p>&copy; {new Date().getFullYear()} MERN Blog. All Rights Reserved.</p>
              
      </div>
    </footer>
  );
};

export default Footer;