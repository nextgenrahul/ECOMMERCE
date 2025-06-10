import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempt with:', { name, email, password });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f8f8' }}>
      <div className="bg-white-10 p-8 rounded-lg shadow-md w-full max-w-md border-2 border-black">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Your FullName'
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          Already have an account?{' '}
          <Link to="/login" className="font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
