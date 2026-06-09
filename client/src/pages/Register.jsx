import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Terjadi kesalahan saat mendaftar');

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white font-sans text-[#111111]">
      <div className="w-full max-w-[360px]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
          <p className="mt-2 text-sm text-[#6b7280]">Start documenting your journey today.</p>
        </div>

        {error && (
          <div className="p-3 mb-6 text-sm text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-[#374151]">Username</label>
            <input
              type="text"
              required
              className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-shadow placeholder-[#a1a1aa]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-[#374151]">Email</label>
            <input
              type="email"
              required
              className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-shadow placeholder-[#a1a1aa]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-[#374151]">Password</label>
            <input
              type="password"
              required
              minLength="6"
              className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-shadow placeholder-[#a1a1aa]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 px-4 mt-2 text-sm font-semibold text-white transition-colors bg-[#111111] rounded-md hover:bg-[#242424] disabled:bg-[#e5e7eb] disabled:text-[#6b7280]"
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#6b7280]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#111111] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;