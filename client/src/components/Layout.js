import React from 'react';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
      <footer className="bg-gray-200 p-4 text-center text-sm">
        &copy; 2025 Your Blog Platform
      </footer>
    </div>
  );
};

export default Layout;
