import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const avatar = useSelector((state) => state.auth.user?.avatar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center pr-6 shadow-sm bg-white sticky top-0 z-50 h-20">
      <Link to="/" className="flex items-center gap-2 h-full">
        <img
          src="horizon.svg"
          alt="logo"
          className="object-contain transition-all duration-300"
          style={{ height: '200px', width: '300px' }}
        />
      </Link>

      <div className="flex gap-4 items-center">
        {loggedIn ? (
          <>
            <Link to="/dashboard" className="hidden md:block font-medium text-gray-600 hover:text-indigo-600 transition">
              Dashboard
            </Link>
            <Link to="/create" className="hidden md:block font-medium text-gray-600 hover:text-indigo-600 transition">
              Create Logo
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none flex items-center"
              >
                <img
                  src={avatar}
                  alt="profile"
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-indigo-600 transition cursor-pointer object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in-down z-50">

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    View Profile
                  </Link>

                  <Link
                    to="/dashboard"
                    className="block md:hidden px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="font-medium text-gray-600 hover:text-indigo-600 transition">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg">
              Get Started
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;