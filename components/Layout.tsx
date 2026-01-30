import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, Menu, X, Search, ArrowRight, LogIn, LogOut, LayoutDashboard, User } from 'lucide-react';
import TriBot from './TriBot';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  // Lấy dữ liệu từ AuthContext
  const { user, logout } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập và quyền Admin
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ADMIN';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Insights', path: '/blog' },
    { name: 'Case Guide', path: '/case-guide' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Sticky Navbar with Glassmorphism */}
      <nav className="sticky top-0 z-40 glass shadow-premium border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <span className="text-2xl font-serif font-bold tracking-tighter text-black dark:text-white group-hover:scale-105 transition-transform duration-300">
                  TRI BUI<span className="text-slate-400 dark:text-slate-600 animate-pulse">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide uppercase transition-all duration-200 relative group ${
                    isActive(link.path)
                      ? 'text-black dark:text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 w-full h-px bg-black dark:bg-white transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${isActive(link.path) ? 'scale-x-100' : ''}`}></span>
                </Link>
              ))}
              
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

              {/* Auth Buttons - Logic hiển thị tên và quyền Admin */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Chỉ hiện nút Dashboard nếu là ADMIN */}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="p-2 text-blue-600 dark:text-blue-400 hover:scale-110 transition-all"
                      title="Admin Dashboard"
                    >
                      <LayoutDashboard size={20} strokeWidth={1.5} />
                    </Link>
                  )}
                  
                  <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full">
                    <User size={16} className="text-slate-500" />
                    <span className="text-sm font-bold text-black dark:text-white">
                      {user?.name}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="p-2 text-red-500 hover:text-red-700 transition-all hover:scale-110"
                    title="Logout"
                  >
                    <LogOut size={20} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-slate-500 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
                  title="Login"
                >
                  <LogIn size={20} strokeWidth={1.5} />
                </Link>
              )}

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-180"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'light' ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 mr-2 text-slate-500"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-black dark:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-black border-b border-slate-100 dark:border-slate-800 absolute w-full h-screen z-50 animate-slide-up">
            <div className="px-4 pt-4 pb-3 space-y-6 flex flex-col items-center justify-center h-3/4">
              {isAuthenticated && (
                <div className="text-center mb-4">
                  <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Logged in as</p>
                  <p className="text-xl font-bold text-black dark:text-white">{user?.name}</p>
                </div>
              )}
              
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-3xl font-serif font-bold transition-all duration-300 hover:scale-110 ${
                    isActive(link.path)
                      ? 'text-black dark:text-white'
                      : 'text-slate-400 dark:text-slate-600 hover:text-black dark:hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.name}
                </Link>
              ))}

              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-blue-500 font-bold text-lg">
                  Dashboard
                </Link>
              )}

              <div className="pt-8 flex space-x-6">
                {isAuthenticated ? (
                  <button onClick={logout} className="text-red-500 flex items-center font-bold">
                    <LogOut className="mr-2" /> LOGOUT
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-black dark:text-white flex items-center font-bold">
                    <LogIn className="mr-2" /> LOGIN
                  </Link>
                )}
                <button onClick={toggleTheme} className="text-black dark:text-white hover:scale-110 hover:rotate-180 transition-all duration-300">
                    {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-white dark:bg-black">
        {children}
      </main>

      <TriBot />

      {/* Footer (Giữ nguyên phần dưới) */}
      <footer className="bg-slate-50 dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 mt-20 py-20">
        {/* ... code footer cũ ... */}
      </footer>
    </div>
  );
};

export default Layout;