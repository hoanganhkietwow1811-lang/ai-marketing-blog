import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Kiểm tra mật khẩu nhập lại có khớp không
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setIsLoading(true);

    try {
      // 2. Gọi API đăng ký xuống Backend (CỔNG 4000)
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Đăng ký thất bại');
      }

      // 3. Thành công
      alert('Đăng ký thành công! Hãy đăng nhập ngay.');
      navigate('/login');
      
    } catch (err: any) {
      console.error("Lỗi đăng ký:", err); // Log lỗi ra console để dễ debug
      // Nếu lỗi là "Failed to fetch", nghĩa là server chưa bật
      if (err.message === 'Failed to fetch') {
          setError('Không thể kết nối đến Server (Port 4000). Bạn đã chạy Backend chưa?');
      } else {
          setError(err.message || 'Lỗi kết nối Server');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto animate-float shadow-premium-lg">
              <UserPlus className="text-white dark:text-black" size={32} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white mb-3">
            Create Account
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Join the community of strategic marketers
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="glass shadow-premium-lg rounded-2xl p-8 animate-scale-in">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start animate-slide-up">
              <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full pl-12 pr-4 py-3 rounded-xl glass border-2 border-slate-200 dark:border-slate-800 focus:border-black dark:focus:border-white outline-none transition-all duration-300 text-black dark:text-white placeholder-slate-400"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                placeholder="you@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-2">
              Password
            </label>
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

          {/* Confirm Password */}
          <div className="mb-8">
            <label className="block text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <CheckCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                className="w-full pl-12 pr-4 py-3 rounded-xl glass border-2 border-slate-200 dark:border-slate-800 focus:border-black dark:focus:border-white outline-none transition-all duration-300 text-black dark:text-white placeholder-slate-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" disabled={isLoading}
            className="w-full flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 shadow-premium-lg shine-effect disabled:opacity-50 group"
          >
            {isLoading ? 'Creating Account...' : (
              <>
                Sign Up <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-black dark:text-white hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;