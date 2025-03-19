import React from 'react';
import Navbar from './Navbar';
import '../index.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      
      <main className="content-wrapper">
        {children}
      </main>

      <footer className="footer">
        <p>© 2025 Battleship Game. Built with React by Yijia.</p>
      </footer>
    </div>
  );
};

export default Layout;