import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useUserContext} from '../context/UserDetails';
const Header: React.FC = () => {
  const navigate = useNavigate();
  const { 
      username,
      setIsAuthenticated,
      setUsername,
      isAuthenticated,
      getUserDetails,
    }=useUserContext();
  // Fetch user details on component mount
  useEffect(() => {
    getUserDetails();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const token=localStorage.getItem("authToken");// Pass token in body
      await axios.post("https://movieapi-rook.onrender.com/auth/logout", {token:token});
      setIsAuthenticated(false);
      setUsername(null);
      localStorage.removeItem("authToken");
      navigate('/Login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-gray-800/50 text-white z-20 fixed w-full">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo/Title */}
        <div className="text-2xl font-bold">
          <Link to="/">Movie Review</Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/reviews" className="hover:text-yellow-400 transition-colors">
                My Reviews
              </Link>
              <span className="hover:text-yellow-400 transition-colors">
                {username || "User"}
              </span>
            </>
          )}
        </nav>

        {/* Login/Logout Button */}
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/Login">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
