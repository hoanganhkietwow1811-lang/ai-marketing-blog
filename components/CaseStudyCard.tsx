import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CaseStudyCardProps {
  post: BlogPost;
  compact?: boolean;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ post, compact = false }) => {
  if (!post.caseStudyMeta) return null;

  if (compact) {
      return (
        <Link to={`/post/${post.id}`} className="block group glass shadow-premium p-6 rounded-sm hover-lift hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shine-effect overflow-hidden">
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                    {post.caseStudyMeta.industry}
                </span>
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2 group-hover:scale-105 transition-transform duration-300">{post.caseStudyMeta.brand}</h3>
            <p className="text-sm opacity-80 line-clamp-2 group-hover:opacity-100 transition-opacity">{post.caseStudyMeta.problem}</p>
        </Link>
      )
  }

  return (
    <Link to={`/post/${post.id}`} className="block group relative border-t border-slate-200 dark:border-zinc-800 py-12 hover:bg-slate-50 dark:hover:bg-zinc-900/30 transition-all duration-300 hover:shadow-premium-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Brand & Industry */}
        <div className="md:col-span-3">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2 block group-hover:text-black dark:group-hover:text-white transition-colors">
            {post.caseStudyMeta.industry}
          </span>
          <h3 className="text-4xl font-serif font-bold text-black dark:text-white group-hover:translate-x-2 group-hover:scale-105 transition-all duration-300 gradient-text">
            {post.caseStudyMeta.brand}
          </h3>
        </div>

        {/* Problem & Insight */}
        <div className="md:col-span-6 space-y-4">
            <div className="group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-xs font-semibold text-slate-500 uppercase mr-2">Challenge:</span>
                <span className="text-slate-900 dark:text-slate-300">{post.caseStudyMeta.problem}</span>
            </div>
            <div className="group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: '50ms' }}>
                <span className="text-xs font-semibold text-slate-500 uppercase mr-2">Insight:</span>
                <span className="text-slate-900 dark:text-slate-300 italic">"{post.caseStudyMeta.keyInsight}"</span>
            </div>
        </div>

        {/* Action */}
        <div className="md:col-span-3 text-right">
             <span className="inline-flex items-center px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white text-sm font-bold uppercase tracking-widest group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 group-hover:scale-105 shadow-premium">
                View Case <ArrowUpRight size={16} className="ml-2 group-hover:rotate-45 transition-transform duration-300" />
             </span>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
