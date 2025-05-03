 
import loginGif from '../assets/images/signup.gif';  
import registerGif from '../assets/images/signup.gif'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config.js';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Login failed");
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.user._id);
      localStorage.setItem("role", data.user.role);

      navigate(`/home/${data.user._id}`);
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden my-1">
        {/* Illustration Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700  p-8 hidden md:flex items-center justify-center">
          <div className="text-white text-center space-y-8">
            <img 
              src={loginGif}
              alt="Secure Login"
              className="w-4/5 mx-auto animate-float"
            />
            <h3 className="text-3xl font-bold">Welcome Back!</h3>
            <p className="text-lg opacity-90">Secure access To Your Account</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-6 ">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                Sign In
              </h2>
              <p className="text-gray-500">Manage your account with secure access</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter The Email  "
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter The Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
              >
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                New here?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-blue-600 hover:text-blue-800 font-semibold underline hover:no-underline"
                >
                  Create an account
                </button>
              </p>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* Google SVG icon */}
                  </svg>
                </button>
                <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* GitHub SVG icon */}
                  </svg>
                </button>
                <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* Microsoft SVG icon */}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Login;