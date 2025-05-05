// src/components/LoginForm.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import bg from '/Images/loginbg.jpg';

const LoginForm = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center  "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-[90%] justify-self-center max-w-md ">
        <h1 className="text-3xl font-bold text-center mb-6">LOGIN</h1>
        
        
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-gray-700">Remember me</label>
            </div>
            
            <a href="#" className="text-blue-600 hover:text-blue-800">Forgot Password?</a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <NavLink to={'/signup'} className="text-blue-600 hover:text-blue-800">Sign Up</NavLink>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default LoginForm;