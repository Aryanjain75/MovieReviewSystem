import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthToggle = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo/Title */}
        <div className="text-2xl font-bold">
          <NavLink to="/">MOvie Review</NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <NavLink to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </NavLink>
          <NavLink
            to="/myreviews"
            className="hover:text-yellow-400 transition-colors"
          >
            My Reviews
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to={`/userId/${123}`} // Replace `123` with the dynamic user ID
              className="hover:text-yellow-400 transition-colors"
            >
              User ID
            </NavLink>
          )}
        </nav>

        {/* Login/Logout Button */}
        <div>
          <button
            onClick={handleAuthToggle}
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
