import React, { useState } from 'react';
import { MapPin, Target, TrendingUp, Users, Zap, BookOpen, Award, ArrowRight, Code, PenTool, BarChart, Megaphone } from 'lucide-react';

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface Career {
  id: string;
  title: string;
  icon: any;
  description: string;
  gradient: string;
  skills: {
    beginner: Skill[];
    intermediate: Skill[];
    advanced: Skill[];
  };
  tools: string[];
  salary: {
    entry: string;
    mid: string;
    senior: string;
  };
  timeline: string;
}

const MarketingRoadmap: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const careers: Career[] = [
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Manager',
      icon: Megaphone,
      description: 'Own the digital ecosystem: paid ads, SEO, social, email, and analytics.',
      gradient: 'from-purple-500 to-pink-500',
      skills: {
        beginner: [
          { name: 'Marketing Fundamentals', level: 'beginner' },
          { name: 'Social Media Basics', level: 'beginner' },
          { name: 'Content Writing', level: 'beginner' },
          { name: 'Google Analytics Setup', level: 'beginner' }
        ],
        intermediate: [
          { name: 'Facebook Ads Manager', level: 'intermediate' },
          { name: 'Google Ads Campaigns', level: 'intermediate' },
          { name: 'SEO Strategy', level: 'intermediate' },
          { name: 'Email Marketing Automation', level: 'intermediate' },
          { name: 'Conversion Optimization', level: 'intermediate' }
        ],
        advanced: [
          { name: 'Multi-Channel Attribution', level: 'advanced' },
          { name: 'Marketing Automation Platforms', level: 'advanced' },
          { name: 'Data-Driven Strategy', level: 'advanced' },
          { name: 'Team Leadership', level: 'advanced' },
          { name: 'Budget Management ($100K+)', level: 'advanced' }
        ]
      },
      tools: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'HubSpot', 'Mailchimp', 'Semrush'],
      salary: {
        entry: '$40K - $60K',
        mid: '$70K - $100K',
        senior: '$120K - $180K'
      },
      timeline: '2-3 years to senior level'
    },
    {
      id: 'growth-marketing',
      title: 'Growth Marketer',
      icon: TrendingUp,
      description: 'Experiment-driven growth: acquisition, activation, retention, and referral loops.',
      gradient: 'from-green-500 to-teal-500',
      skills: {
        beginner: [
          { name: 'Marketing Funnel Basics', level: 'beginner' },
          { name: 'A/B Testing Fundamentals', level: 'beginner' },
          { name: 'SQL Basics', level: 'beginner' },
          { name: 'Product Analytics', level: 'beginner' }
        ],
        intermediate: [
          { name: 'Growth Loops Design', level: 'intermediate' },
          { name: 'Retention Strategy', level: 'intermediate' },
          { name: 'Referral Programs', level: 'intermediate' },
          { name: 'Cohort Analysis', level: 'intermediate' },
          { name: 'PLG (Product-Led Growth)', level: 'intermediate' }
        ],
        advanced: [
          { name: 'North Star Metric Design', level: 'advanced' },
          { name: 'Experimentation Framework', level: 'advanced' },
          { name: 'Growth Team Leadership', level: 'advanced' },
          { name: 'Cross-Functional Collaboration', level: 'advanced' },
          { name: 'Scaling Playbooks', level: 'advanced' }
        ]
      },
      tools: ['Amplitude', 'Mixpanel', 'Optimizely', 'Segment', 'SQL', 'Python', 'Notion'],
      salary: {
        entry: '$50K - $70K',
        mid: '$90K - $130K',
        senior: '$150K - $220K'
      },
      timeline: '2-4 years to senior level'
    },
    {
      id: 'brand-marketing',
      title: 'Brand Strategist',
      icon: Award,
      description: 'Build brands that mean something: positioning, storytelling, and culture.',
      gradient: 'from-yellow-500 to-orange-500',
      skills: {
        beginner: [
          { name: 'Brand Fundamentals', level: 'beginner' },
          { name: 'Competitive Analysis', level: 'beginner' },
          { name: 'Consumer Psychology', level: 'beginner' },
          { name: 'Visual Identity Basics', level: 'beginner' }
        ],
        intermediate: [
          { name: 'Brand Positioning', level: 'intermediate' },
          { name: 'Brand Architecture', level: 'intermediate' },
          { name: 'Messaging Frameworks', level: 'intermediate' },
          { name: 'Brand Guidelines Development', level: 'intermediate' },
          { name: 'Campaign Strategy', level: 'intermediate' }
        ],
        advanced: [
          { name: 'Brand Transformation', level: 'advanced' },
          { name: 'Cultural Strategy', level: 'advanced' },
          { name: 'Global Brand Management', level: 'advanced' },
          { name: 'Stakeholder Management', level: 'advanced' },
          { name: 'Brand Valuation', level: 'advanced' }
        ]
      },
      tools: ['Figma', 'Miro', 'Keynote/PowerPoint', 'Brand24', 'Sprout Social', 'Airtable'],
      salary: {
        entry: '$45K - $65K',
        mid: '$80K - $120K',
        senior: '$130K - $200K'
      },
      timeline: '3-5 years to senior level'
    },
    {
      id: 'content-marketing',
      title: 'Content Strategist',
      icon: PenTool,
      description: 'Create content that attracts, engages, and converts audiences.',
      gradient: 'from-blue-500 to-indigo-500',
      skills: {
        beginner: [
          { name: 'Copywriting Basics', level: 'beginner' },
          { name: 'SEO Content Writing', level: 'beginner' },
          { name: 'Social Media Content', level: 'beginner' },
          { name: 'Content Calendar Management', level: 'beginner' }
        ],
        intermediate: [
          { name: 'Content Strategy Framework', level: 'intermediate' },
          { name: 'Editorial Planning', level: 'intermediate' },
          { name: 'Content Distribution', level: 'intermediate' },
          { name: 'Storytelling Techniques', level: 'intermediate' },
          { name: 'Content Performance Analysis', level: 'intermediate' }
        ],
        advanced: [
          { name: 'Content Pillar Strategy', level: 'advanced' },
          { name: 'Thought Leadership Development', level: 'advanced' },
          { name: 'Content Team Management', level: 'advanced' },
          { name: 'Multi-Channel Content Operations', level: 'advanced' },
          { name: 'Content ROI Modeling', level: 'advanced' }
        ]
      },
      tools: ['WordPress', 'Contentful', 'Grammarly', 'Canva', 'Ahrefs', 'BuzzSumo', 'CoSchedule'],
      salary: {
        entry: '$40K - $55K',
        mid: '$65K - $95K',
        senior: '$100K - $150K'
      },
      timeline: '2-4 years to senior level'
    },
    {
      id: 'marketing-analytics',
      title: 'Marketing Analyst',
      icon: BarChart,
      description: 'Turn data into decisions: attribution, forecasting, and optimization.',
      gradient: 'from-red-500 to-pink-500',
      skills: {
        beginner: [
          { name: 'Excel/Sheets Advanced', level: 'beginner' },
          { name: 'Google Analytics', level: 'beginner' },
          { name: 'Data Visualization Basics', level: 'beginner' },
          { name: 'Statistical Thinking', level: 'beginner' }
        ],
        intermediate: [
          { name: 'SQL for Marketing', level: 'intermediate' },
          { name: 'Marketing Attribution Models', level: 'intermediate' },
          { name: 'Predictive Analytics', level: 'intermediate' },
          { name: 'Dashboard Design (Tableau/Looker)', level: 'intermediate' },
          { name: 'A/B Test Analysis', level: 'intermediate' }
        ],
        advanced: [
          { name: 'Marketing Mix Modeling', level: 'advanced' },
          { name: 'Customer Lifetime Value Modeling', level: 'advanced' },
          { name: 'Machine Learning for Marketing', level: 'advanced' },
          { name: 'Data Science Collaboration', level: 'advanced' },
          { name: 'Analytics Team Leadership', level: 'advanced' }
        ]
      },
      tools: ['SQL', 'Python/R', 'Tableau', 'Looker', 'Google BigQuery', 'Excel', 'Jupyter'],
      salary: {
        entry: '$50K - $70K',
        mid: '$85K - $120K',
        senior: '$130K - $190K'
      },
      timeline: '2-3 years to senior level'
    },
    {
      id: 'product-marketing',
      title: 'Product Marketer',
      icon: Code,
      description: 'Bridge product and market: positioning, launches, and go-to-market.',
      gradient: 'from-cyan-500 to-blue-500',
      skills: {
        beginner: [
          { name: 'Product Management Basics', level: 'beginner' },
          { name: 'Market Research', level: 'beginner' },
          { name: 'Competitive Intelligence', level: 'beginner' },
          { name: 'User Persona Development', level: 'beginner' }
        ],
        intermediate: [
          { name: 'Product Positioning', level: 'intermediate' },
          { name: 'Go-to-Market Strategy', level: 'intermediate' },
          { name: 'Launch Planning & Execution', level: 'intermediate' },
          { name: 'Sales Enablement', level: 'intermediate' },
          { name: 'Pricing Strategy', level: 'intermediate' }
        ],
        advanced: [
          { name: 'Market Strategy Development', level: 'advanced' },
          { name: 'Cross-Functional Leadership', level: 'advanced' },
          { name: 'Product Lifecycle Management', level: 'advanced' },
          { name: 'Category Creation', level: 'advanced' },
          { name: 'Executive Stakeholder Management', level: 'advanced' }
        ]
      },
      tools: ['Productboard', 'Pendo', 'Figma', 'Intercom', 'Gong', 'Salesforce', 'Confluence'],
      salary: {
        entry: '$60K - $80K',
        mid: '$100K - $140K',
        senior: '$150K - $230K'
      },
      timeline: '3-4 years to senior level'
    }
  ];

  const selectedCareerData = careers.find(c => c.id === selectedCareer);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      
      {/* Hero Section */}
      <section className="gradient-bg border-b border-slate-200 dark:border-slate-800 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 animate-scale-in">
              <span className="inline-flex items-center px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-black dark:text-white shadow-premium">
                <MapPin size={14} className="mr-2" />
                Career Roadmap
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-black dark:text-white mb-6 leading-none tracking-tight animate-slide-up">
              Marketing <span className="gradient-text">Career Paths</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light mb-8 animate-slide-up">
              Interactive roadmaps for 6 different marketing specializations. Pick your path, build your skills.
            </p>
          </div>
        </div>
      </section>

      {/* Career Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-4">
              Choose Your Specialization
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Click on a career to see the detailed roadmap
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => {
              const Icon = career.icon;
              const isSelected = selectedCareer === career.id;
              
              return (
                <button
                  key={career.id}
                  onClick={() => setSelectedCareer(career.id === selectedCareer ? null : career.id)}
                  className={`glass shadow-premium-lg p-8 rounded-2xl text-left transition-all duration-300 hover-lift ${
                    isSelected ? 'border-2 border-black dark:border-white scale-105' : ''
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${career.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-black dark:text-white mb-3">
                    {career.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {career.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold text-black dark:text-white">
                    {isSelected ? 'Hide Details' : 'View Roadmap'}
                    <ArrowRight size={16} className={`ml-2 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Roadmap */}
      {selectedCareerData && (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-black border-t border-b border-slate-200 dark:border-slate-800 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="mb-12 text-center">
              <div className={`inline-block w-20 h-20 bg-gradient-to-br ${selectedCareerData.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-float`}>
                <selectedCareerData.icon className="text-white" size={40} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white mb-4">
                {selectedCareerData.title}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6">
                {selectedCareerData.description}
              </p>
              <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
                <span className="text-sm font-bold text-black dark:text-white">Timeline: {selectedCareerData.timeline}</span>
              </div>
            </div>

            {/* Level Selector */}
            <div className="flex justify-center mb-12">
              <div className="glass rounded-2xl p-2 inline-flex space-x-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                      activeLevel === level
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                        : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="glass shadow-premium-lg p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <div className={`w-3 h-3 rounded-full ${getLevelColor(activeLevel)} mr-3`}></div>
                  <h3 className="text-2xl font-serif font-bold text-black dark:text-white capitalize">
                    {activeLevel} Skills
                  </h3>
                </div>
                <div className="space-y-3">
                  {selectedCareerData.skills[activeLevel].map((skill, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-slate-50 dark:bg-zinc-900 rounded-lg hover:scale-105 transition-transform duration-300">
                      <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white dark:text-black font-bold text-sm">{idx + 1}</span>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Tools */}
                <div className="glass shadow-premium p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-4 flex items-center">
                    <Zap className="mr-2" size={20} />
                    Essential Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareerData.tools.map((tool, idx) => (
                      <span key={idx} className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Salary */}
                <div className="glass shadow-premium p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-4 flex items-center">
                    <Target className="mr-2" size={20} />
                    Salary Range
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Entry Level</span>
                      <span className="font-bold text-black dark:text-white">{selectedCareerData.salary.entry}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Mid Level</span>
                      <span className="font-bold text-black dark:text-white">{selectedCareerData.salary.mid}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Senior Level</span>
                      <span className="font-bold text-black dark:text-white">{selectedCareerData.salary.senior}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Resources CTA */}
            <div className="glass shadow-premium-lg p-8 rounded-2xl text-center">
              <BookOpen className="mx-auto mb-4 text-black dark:text-white" size={40} />
              <h3 className="text-2xl font-serif font-bold text-black dark:text-white mb-4">
                Ready to Start Learning?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Check out case studies and resources specific to this career path
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/#/case-studies"
                  className="inline-flex items-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 shadow-premium"
                >
                  Browse Case Studies
                </a>
                <a 
                  href="/#/resources"
                  className="inline-flex items-center px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-bold uppercase tracking-widest rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                >
                  View Resources
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* General Tips */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-black dark:text-white mb-4">
              Universal Marketing Skills
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Master these regardless of your specialization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass shadow-premium p-6 rounded-2xl hover-lift">
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Data Literacy</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Every marketer needs to read data, even if you're not an analyst. Know your metrics.
              </p>
            </div>
            <div className="glass shadow-premium p-6 rounded-2xl hover-lift">
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Psychology Basics</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Understand how humans make decisions. Marketing is applied psychology.
              </p>
            </div>
            <div className="glass shadow-premium p-6 rounded-2xl hover-lift">
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Business Acumen</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Know how businesses make money. Marketing exists to drive growth.
              </p>
            </div>
            <div className="glass shadow-premium p-6 rounded-2xl hover-lift">
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Communication</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Write clearly. Present confidently. Marketing is professional communication.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MarketingRoadmap;
