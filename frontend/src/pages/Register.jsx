import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmail } from '../api/authApi';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google/login`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(formData.name, formData.email, formData.password);
      console.log("Register success:", formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join LogoAI and start designing today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md"
          >
            Create Free Account
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-gray-400 text-sm font-medium">OR SIGN UP WITH</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 p-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition font-medium text-gray-700"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          Sign up with Google
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;