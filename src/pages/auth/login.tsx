import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const abstractImg = './Login .png'; 

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed');

      // Note: localStorage usage for demonstration - in artifacts, use React state instead
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.is_provider ? 'provider' : 'student');
      localStorage.setItem('user_id', data.user.id.toString());
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate('/'); 

    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="h-[80%] flex p-4 font-sans">
      {/* Right: Login form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-l-3xl min-h-screen px-8 py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Back button near the form */}
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          
          <div className="flex flex-col items-center mb-8">
            <span className="font-bold text-2xl tracking-tight mb-2">Hustle hub</span>
            <h2 className="text-3xl font-serif font-semibold mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-6 text-center">Enter your email and password to access your account</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2 rounded border-gray-300"
                />
                Remember me
              </label>
              <Link to="/auth/forgot-password" className="text-sm text-gray-600 hover:underline">Forgot Password</Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Sign In
            </button>
            {/* <button
              type="button"
              className="w-full py-3 rounded-lg border border-gray-300 bg-white text-black font-semibold flex items-center justify-center gap-2 mt-2 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button> */}
          </form>
          <div className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="font-semibold text-black underline">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;