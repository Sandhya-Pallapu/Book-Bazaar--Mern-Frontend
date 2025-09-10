import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://book-bazaar-mern-backend-updated.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: trimmedUsername,
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      alert('Registration successful!');
      console.log('Registered user:', data);
      localStorage.setItem('token', data.token);
    } catch (error) {
      alert('Registration error: ' + error.message);
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 mt-20">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Username"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-900 transition text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-slate-800 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;





