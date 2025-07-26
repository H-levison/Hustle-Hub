import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const abstractImg = "./Login .png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms || !isPasswordValid || !isPasswordMatch) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful! Please log in.");
      navigate("/auth/login");
    } catch (error) {
      console.log(error)
    }
  };

  const isPasswordValid = formData.password.length >= 8;
  const isPasswordMatch = formData.password === formData.confirmPassword;

  return (
    <div className="h-[80%] p-4 flex font-sans">
      {/* Left: Signup form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-r-3xl min-h-screen px-8 py-12">
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
            <span className="font-bold text-2xl tracking-tight mb-2">
              Hustle hub
            </span>
            <h2 className="text-3xl font-serif font-semibold mb-2">
              Create your account
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              Join us and start your journey today
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50 ${
                    formData.password && !isPasswordValid
                      ? "border-red-300"
                      : "border-gray-200"
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-1 text-xs">
                  <div
                    className={`flex items-center gap-1 ${
                      isPasswordValid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    At least 8 characters
                  </div>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50 ${
                    formData.confirmPassword && !isPasswordMatch
                      ? "border-red-300"
                      : "border-gray-200"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-1 text-xs">
                  <div
                    className={`flex items-center gap-1 ${
                      isPasswordMatch ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    Passwords match
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-700">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-black hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-medium text-black hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={
                !formData.agreeToTerms || !isPasswordValid || !isPasswordMatch
              }
              className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Create account
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
              Sign up with Google
            </button> */}
          </form>
          <div className="mt-8 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-black underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      {/* Right: Abstract image and quote */}
      {/* <div className="  md:flex  flex-col justify-between w-1/2 bg-black rounded-3xl relative">
        <img src={abstractImg} alt="Abstract" className="absolute rounded-3xl inset-0 w-full h-full object-cover opacity-80" />
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-12">
          <div>
            <div className="uppercase tracking-widest text-xs text-white/80 mb-8 mt-4">A New Beginning</div>
            <div className="text-5xl font-serif font-semibold text-white mb-6 leading-tight drop-shadow-lg">Start Your Journey Today</div>
            <div className="text-white/80 text-base max-w-md mb-8">Every accomplishment begins with the decision to try. Take the first step and create your future.</div>
          </div>
          <div className="text-white/80 text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="underline font-semibold text-white">Sign In</Link>
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full border-4 border-white/20 rounded-3xl pointer-events-none" />
      </div> */}
    </div>
  );
};

export default Signup;
