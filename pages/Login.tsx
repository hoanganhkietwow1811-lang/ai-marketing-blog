import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { Mail, Lock, LogIn, AlertCircle, ArrowRight } from 'lucide-react';

import { useAuth } from '../context/AuthContext';



const Login: React.FC = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    setError('');



    try {

      // 1. Gọi API đăng nhập (CỔNG 4000)

      const res = await fetch('http://localhost:4000/api/login', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ email, password }),

      });



      const data = await res.json();



      if (!res.ok) {

        throw new Error(data.error || 'Đăng nhập thất bại');

      }



      // 2. Lưu token vào máy

      localStorage.setItem('token', data.token);

      localStorage.setItem('user', JSON.stringify(data.user));



      // 3. Cập nhật Context (nếu có)

      if (login) login(data.user);

     

      // 4. Chuyển hướng

      // Dùng window.location.href để web load lại hoàn toàn (đảm bảo cập nhật Menu Admin)

      window.location.href = '/';



    } catch (err: any) {

      console.error("Lỗi đăng nhập:", err);

      if (err.message === 'Failed to fetch') {

        setError('Không thể kết nối Server (Port 4000). Bạn đã chạy Backend chưa?');

      } else {

        setError(err.message);

      }

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full">

       

        {/* Header */}

        <div className="text-center mb-8 animate-slide-up">

          <div className="inline-block mb-4">

            <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto animate-float shadow-premium-lg">

              <LogIn className="text-white dark:text-black" size={32} />

            </div>

          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white mb-3">

            Welcome Back

          </h2>

          <p className="text-slate-600 dark:text-slate-400">

            Sign in to access your dashboard

          </p>

        </div>



        {/* Login Form */}

        <form onSubmit={handleSubmit} className="glass shadow-premium-lg rounded-2xl p-8 animate-scale-in">

         

          {/* Error Message */}

          {error && (

            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start animate-slide-up">

              <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={20} />

              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>

            </div>

          )}



          {/* Email */}

          <div className="mb-5">

            <label className="block text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-2">

              Email

            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />

              <input

                type="email"

                value={email} onChange={(e) => setEmail(e.target.value)} required

                className="w-full pl-12 pr-4 py-3 rounded-xl glass border-2 border-slate-200 dark:border-slate-800 focus:border-black dark:focus:border-white outline-none transition-all duration-300 text-black dark:text-white placeholder-slate-400"

                placeholder="name@example.com"

              />

            </div>

          </div>



          {/* Password */}

          <div className="mb-8">

            <div className="flex justify-between items-center mb-2">

                <label className="block text-sm font-bold uppercase tracking-widest text-black dark:text-white">

                Password

                </label>

            </div>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />

              <input

                type="password"

                value={password} onChange={(e) => setPassword(e.target.value)} required

                className="w-full pl-12 pr-4 py-3 rounded-xl glass border-2 border-slate-200 dark:border-slate-800 focus:border-black dark:focus:border-white outline-none transition-all duration-300 text-black dark:text-white placeholder-slate-400"

                placeholder="••••••••"

              />

            </div>

          </div>



          {/* Submit Button */}

          <button

            type="submit" disabled={loading}

            className="w-full flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 shadow-premium-lg shine-effect disabled:opacity-50 group"

          >

            {loading ? 'Signing In...' : (

              <>

                Sign In <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />

              </>

            )}

          </button>



          {/* Register Link */}

          <div className="mt-6 text-center">

            <p className="text-sm text-slate-600 dark:text-slate-400">

              Don't have an account?{' '}

              <Link to="/register" className="font-bold text-black dark:text-white hover:underline">

                Create one

              </Link>

            </p>

          </div>

        </form>

      </div>

    </div>

  );

};



export default Login;