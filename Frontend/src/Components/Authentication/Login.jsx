import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../features/User/userSlice';
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch login action
      const result = await dispatch(login(formData)).unwrap();
      toast.success(result.message || 'Login successful');
      navigate("/dashboard")
      // Clear form data
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      toast.error(error || 'An error occurred during login');
    }
  };

  return (
      <div className="flex h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        {/* Right side - Image */}
        <div className="w-1/2 flex items-center justify-center">
          <img src="/assets/images/LoginImg.png" alt="Login" />
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    required
                />
              </div>
              <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    required
                />
              </div>
              <div className="mb-4">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                />
                <label
                    htmlFor="showPassword"
                    className="ml-2 text-gray-700 text-sm"
                >
                  Show Password
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                    disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
              {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
