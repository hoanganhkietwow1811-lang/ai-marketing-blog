import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  minimal?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false, minimal = false }) => {
  if (featured) {
    return (
      <Link to={`/post/${post.id}`} className="group relative block w-full h-full min-h-[500px] overflow-hidden rounded-sm bg-black shadow-premium-lg hover-lift">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 opacity-80 group-hover:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
          <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest mb-4 group-hover:scale-105 transition-transform duration-300 shine-effect">
            {post.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight group-hover:translate-x-2 transition-transform duration-300">
            {post.title}
          </h2>
          <p className="text-slate-300 text-lg mb-6 line-clamp-2 max-w-2xl font-light group-hover:text-white transition-colors duration-300">
            {post.subtitle}
          </p>
          <div className="flex items-center text-white text-sm font-medium tracking-wide uppercase group-hover:scale-105 transition-transform duration-300">
            <span>Read Article</span>
            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-4 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    );
  }

  if (minimal) {
      return (
        <Link to={`/post/${post.id}`} className="group block border-b border-slate-100 dark:border-slate-800 py-6 last:border-0 hover:translate-x-2 transition-all duration-300">
            <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-black dark:group-hover:text-white transition-colors">{post.category}</span>
                <span className="text-xs text-slate-400 group-hover:text-black dark:group-hover:text-white transition-colors">{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-black dark:text-white group-hover:underline decoration-2 underline-offset-4 transition-all duration-300 group-hover:translate-x-2">
                {post.title}
            </h3>
        </Link>
      )
  }

  return (
    <Link to={`/post/${post.id}`} className="group flex flex-col h-full glass shadow-premium hover-lift transition-all duration-300 p-4 -mx-4 rounded-xl overflow-hidden shine-effect">
      <div className="h-64 overflow-hidden rounded-sm mb-6 bg-slate-100 relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
             <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-black dark:group-hover:text-white transition-colors">{post.category}</span>
             <span className="text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{post.date}</span>
        </div>
        <h3 className="text-2xl font-bold font-serif text-black dark:text-white mb-3 leading-tight group-hover:translate-x-1 transition-transform duration-300">
          {post.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
          {post.subtitle}
        </p>
        <div className="mt-auto pt-4 flex items-center text-sm font-bold text-black dark:text-white uppercase tracking-wide group-hover:scale-105 transition-transform duration-300">
             Read More <ArrowRight size={14} className="ml-2 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
