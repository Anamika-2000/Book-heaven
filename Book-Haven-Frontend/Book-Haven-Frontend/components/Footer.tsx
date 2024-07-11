import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <div className="container mx-auto">
        <p>All rights reserved.</p>
        <p>
          Designed and developed by Team 6 &copy; {new Date().getFullYear()}{' '}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
