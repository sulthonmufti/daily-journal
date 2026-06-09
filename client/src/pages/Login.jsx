import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Terjadi kesalahan saat login');

      login(data.data, data.token);
      navigate('/'); 
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
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-[#6b7280]">Please enter your details to sign in.</p>
        </div>

        {error && (
          <div className="p-3 mb-6 text-sm text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-shadow placeholder-[#a1a1aa]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 px-4 mt-2 text-sm font-semibold text-white transition-colors bg-[#111111] rounded-md hover:bg-[#242424] disabled:bg-[#e5e7eb] disabled:text-[#6b7280]"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#6b7280]">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#111111] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;