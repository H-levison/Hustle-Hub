import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const abstractImg = './Login .png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    setSubmitted(true);
  };

  return (
    <div className="h-[80%] flex p-4">
      {/* Left: Abstract image and quote */}
      {/* <div className="rounded-3xl md:flex flex-col justify-between w-1/2 bg-black relative">
        <img src={abstractImg} alt="Abstract" className="absolute rounded-3xl inset-0 w-full h-full object-cover opacity-80" />
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-12">
          <div>
            <div className="uppercase tracking-widest text-xs text-white/80 mb-8 mt-4">Reset Password</div>
            <div className="text-5xl font-serif font-semibold text-white mb-6 leading-tight drop-shadow-lg">Forgot Your Password?</div>
            <div className="text-white/80 text-base max-w-md mb-8">No worries! Enter your email and we'll send you a link to reset your password and get you back on track.</div>
          </div>
          <div className="text-white/80 text-sm">
            Remembered your password?{' '}
            <Link to="/auth/login" className="underline font-semibold text-white">Sign In</Link>
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full border-4 border-white/20 rounded-3xl pointer-events-none" />
      </div> */}

      {/* Right: Forgot password form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-l-3xl min-h-screen px-8 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="flex flex-col items-center mb-8">
            <span className="font-bold text-2xl tracking-tight mb-2">Hustle hub</span>
            <h2 className="text-3xl font-serif font-semibold mb-2">Forgot Password</h2>
            <p className="text-gray-500 mb-6 text-center">Enter your email and we'll send you a reset link</p>
          </div>
          {submitted ? (
            <div className="text-center text-green-600 font-semibold text-lg">Check your email for a reset link!</div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          )}
          <div className="mt-8 text-center text-gray-500 text-sm">
            Remembered your password?{' '}
            <Link to="/auth/login" className="font-semibold text-black underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 