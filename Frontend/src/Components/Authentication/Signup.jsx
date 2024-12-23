import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom';

import { toast } from 'react-toastify';
import authService from '../../features/signupService';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }


    try {
      const response = await authService.signupService(formData);
      console.log(response);
      toast.success('User created successfully');
      // Redirect to login page
      navigate('/login');

      // form empty form
      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: '',
        password: '',
        confirmPassword: '',
      });



    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }

    console.log(formData);
  };

  return (
    <div className="flex h-full w-full bg-gray-100 bg-gradient-to-r from-[#CDF1FF] to-[#ECE9FF]">
      {/* Left side - Signup Form */}
      <div className=" w-1/2 flex items-center justify-end">
        <div className="bg-white p-8 rounded-lg shadow-md w-[500px]">
          <div className='mb-6'>
            <h2 className="text-2xl ">Create an account as User</h2>
            <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="block text-gray-700 text-sm mb-2">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block text-gray-700 text-sm mb-2">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="block text-gray-700 text-sm  mb-2">Phone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-3">
              <label htmlFor="skills" className="block text-gray-700 text-sm mb-2">Skills</label>
              <select id="skills" name="skills" value={formData.skills} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 " required>
                <option value="" >Select a skill</option>
                <option value="web_development">Web Development</option>
                <option value="software_developer">Software Development</option>
                <option value="application_development">Application Development</option>
                <option value="uiux">UI/UX Design</option>
                <option value="data_science">Data Science</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block text-gray-700 text-sm mb-2">Password</label>
              <input type={`${showPassword ? 'text' : 'password'}`} id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm mb-2">Confirm Password</label>
              <input type={`${showPassword ? 'text' : 'password'}`} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
              <div className='text-xs text-gray-500 flex items-center gap-1 mt-2'>
                <p>Show Password </p>
                <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Create an Account
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="w-1/2 bg-cover bg-center flex justify-start items-center">
        <img src="/assets/images/SignupImg.png" alt="Signup" />
      </div>
    </div>
  );
};

export default Signup;