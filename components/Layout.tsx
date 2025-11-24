import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, Search, ArrowRight } from 'lucide-react';
import TriBot from './TriBot';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Insights', path: '/blog' },
    { name: 'Frameworks', path: '/resources' },
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
              <div className="pt-8 flex space-x-6">
                <button onClick={toggleTheme} className="text-black dark:text-white hover:scale-110 hover:rotate-180 transition-all duration-300">
                    {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] glass flex items-center justify-center animate-fade-in">
            <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-8 right-8 p-2 text-slate-500 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
                <X size={32} strokeWidth={1} />
            </button>
            <div className="w-full max-w-2xl px-4 animate-scale-in">
                <input 
                    type="text" 
                    placeholder="Search articles, strategies..." 
                    className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 text-3xl md:text-5xl font-serif font-bold py-4 text-black dark:text-white placeholder-slate-300 dark:placeholder-slate-700 focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                    autoFocus
                />
                <div className="mt-8 flex flex-wrap gap-4 animate-slide-up">
                    <span className="text-sm text-slate-400 uppercase tracking-widest">Trending:</span>
                    <button className="text-sm font-medium hover:underline transition-all duration-200 hover:scale-110 hover:text-black dark:hover:text-white">Adidas Case Study</button>
                    <button className="text-sm font-medium hover:underline transition-all duration-200 hover:scale-110 hover:text-black dark:hover:text-white">Viral Psychology</button>
                    <button className="text-sm font-medium hover:underline transition-all duration-200 hover:scale-110 hover:text-black dark:hover:text-white">Pricing Models</button>
                </div>
            </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow bg-white dark:bg-black">
        {children}
      </main>

      {/* TriBot AI */}
      <TriBot />

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 mt-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold font-serif tracking-tight text-black dark:text-white">
                TRI BUI<span className="text-slate-400">.</span>
              </span>
              <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-sm text-lg font-light leading-relaxed">
                Decoding marketing, one case study at a time. Strategy without the buzzwords.
              </p>
              <div className="mt-8 flex flex-col space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact</span>
                  <a href="mailto:hello@tribui.com" className="text-lg hover:underline">hello@tribui.com</a>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Content</h3>
              <ul className="space-y-4">
                <li><Link to="/case-studies" className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Insights</Link></li>
                <li><Link to="/resources" className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Frameworks</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Social</h3>
              <ul className="space-y-4">
                <li><a href="#" className="flex items-center group text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">LinkedIn <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="flex items-center group text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Twitter <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                <li><a href="#" className="flex items-center group text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Substack <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Tri Bui. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-black dark:hover:text-white">Privacy</a>
                <a href="#" className="hover:text-black dark:hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;