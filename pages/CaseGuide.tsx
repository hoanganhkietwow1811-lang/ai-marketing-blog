import React, { useState } from 'react';
import { Lightbulb, Target, Users, TrendingUp, CheckCircle, ArrowRight, Play, BookOpen } from 'lucide-react';

const CaseGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFramework, setExpandedFramework] = useState<string | null>(null);

  const steps = [
    {
      id: 'understand',
      title: '1. Understand the Problem',
      icon: Target,
      description: 'Define what you're actually solving',
      questions: [
        'What is the business problem vs. the marketing problem?',
        'What are the constraints (budget, timeline, resources)?',
        'What does success look like quantitatively?',
        'Who are the key stakeholders and decision-makers?'
      ],
      framework: 'Problem Statement Template',
      frameworkContent: '[Brand] needs to [achieve X] for [audience] because [reason], measured by [metric].'
    },
    {
      id: 'analyze',
      title: '2. Analyze the Market',
      icon: TrendingUp,
      description: 'Research before you strategize',
      questions: [
        'Who is the target audience (demographics, psychographics, behaviors)?',
        'What are the competitive alternatives and their positioning?',
        'What cultural/social trends are relevant?',
        'What are the category conventions to follow or break?'
      ],
      framework: '3C Analysis',
      frameworkContent: 'Company (strengths/weaknesses) → Customers (needs/behaviors) → Competitors (strategies/gaps)'
    },
    {
      id: 'insight',
      title: '3. Find the Insight',
      icon: Lightbulb,
      description: 'The "why" behind the "what"',
      questions: [
        'What truth about the audience is not obvious?',
        'What tension or contradiction can we resolve?',
        'What cultural shift can we tap into?',
        'What job-to-be-done is unmet?'
      ],
      framework: 'Insight Formula',
      frameworkContent: 'While [audience] thinks/does [X], they actually want/feel [Y] because [human truth].'
    },
    {
      id: 'strategy',
      title: '4. Develop Strategy',
      icon: Users,
      description: 'How you'll win',
      questions: [
        'What is the core positioning/message?',
        'What channels will we use and why?',
        'What is the content/creative approach?',
        'What is the phasing and prioritization?'
      ],
      framework: 'Strategy Pyramid',
      frameworkContent: 'Objective → Strategy → Tactics → Execution → Measurement'
    },
    {
      id: 'execute',
      title: '5. Execute & Measure',
      icon: CheckCircle,
      description: 'Turn strategy into results',
      questions: [
        'What are the leading vs. lagging indicators?',
        'What could go wrong (risks/mitigations)?',
        'How will we test and iterate?',
        'What does the post-campaign analysis look like?'
      ],
      framework: 'RACE Framework',
      frameworkContent: 'Reach → Act → Convert → Engage (map metrics to each stage)'
    }
  ];

  const templates = [
    {
      title: 'Situation Analysis Template',
      description: 'Comprehensive market and competitive analysis',
      sections: ['Market Size & Trends', 'Competitive Landscape', 'Consumer Insights', 'SWOT Analysis']
    },
    {
      title: 'Creative Brief Template',
      description: 'Guide your agency or creative team',
      sections: ['Background', 'Objective', 'Target Audience', 'Key Message', 'Tone', 'Mandatories']
    },
    {
      title: 'Campaign Measurement Plan',
      description: 'Define success before you launch',
      sections: ['KPIs by Funnel Stage', 'Attribution Model', 'Reporting Cadence', 'Success Criteria']
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Jumping to tactics before strategy',
      fix: 'Always ask "why this tactic?" before "how to execute this tactic?"'
    },
    {
      mistake: 'Solving for awareness when the problem is conversion',
      fix: 'Map the customer journey. Find the actual bottleneck.'
    },
    {
      mistake: 'Generic insights ("people want good value")',
      fix: 'Keep asking "why?" until you find a non-obvious truth.'
    },
    {
      mistake: 'Measuring activity instead of outcomes',
      fix: 'If it doesn't connect to revenue or retention, it's vanity.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      
      {/* Hero Section */}
      <section className="gradient-bg border-b border-slate-200 dark:border-slate-800 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 animate-scale-in">
              <span className="inline-flex items-center px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-black dark:text-white shadow-premium">
                <BookOpen size={14} className="mr-2" />
                Marketing Case Guide
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-black dark:text-white mb-6 leading-none tracking-tight animate-slide-up">
              How to Solve <span className="gradient-text">Marketing Cases</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light mb-8 animate-slide-up">
              A structured framework for analyzing marketing problems and developing winning strategies
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <button 
                onClick={() => setActiveStep(0)}
                className="inline-flex items-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 shadow-premium-lg shine-effect group"
              >
                <Play size={20} className="mr-2" />
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Step Navigator */}
          <div className="mb-16">
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                const isCompleted = activeStep > index;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`flex-shrink-0 glass shadow-premium p-6 rounded-2xl transition-all duration-300 min-w-[250px] ${
                      isActive 
                        ? 'border-2 border-black dark:border-white scale-105' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-black dark:bg-white' : 'bg-slate-200 dark:bg-slate-800'
                      }`}>
                        <Icon className={isActive ? 'text-white dark:text-black' : 'text-slate-600 dark:text-slate-400'} size={20} />
                      </div>
                      {isCompleted && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-1 text-left">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-left">
                      {step.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="glass shadow-premium-lg rounded-2xl p-8 md:p-12 animate-scale-in">
            {steps.map((step, index) => {
              if (index !== activeStep) return null;
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="space-y-8">
                  
                  {/* Header */}
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white dark:text-black" size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mb-2">
                        {step.title}
                      </h2>
                      <p className="text-lg text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Questions */}
                  <div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                      Key Questions to Ask:
                    </h3>
                    <div className="space-y-3">
                      {step.questions.map((question, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-4 glass rounded-xl hover:scale-105 transition-transform duration-300">
                          <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white dark:text-black text-xs font-bold">{idx + 1}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Framework */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-black border-2 border-slate-200 dark:border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-black dark:text-white flex items-center">
                        <Lightbulb className="mr-2 text-yellow-500" size={20} />
                        Framework: {step.framework}
                      </h3>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic font-medium">
                      {step.frameworkContent}
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-6">
                    {activeStep > 0 && (
                      <button
                        onClick={() => setActiveStep(activeStep - 1)}
                        className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white font-bold uppercase tracking-widest rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                      >
                        ← Previous
                      </button>
                    )}
                    {activeStep < steps.length - 1 && (
                      <button
                        onClick={() => setActiveStep(activeStep + 1)}
                        className="ml-auto px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 shadow-premium flex items-center"
                      >
                        Next Step
                        <ArrowRight size={18} className="ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 gradient-bg border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-black dark:text-white mb-4">
              Ready-to-Use Templates
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Download and customize for your cases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, idx) => (
              <div key={idx} className="glass shadow-premium-lg p-6 rounded-2xl hover-lift">
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                  {template.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {template.description}
                </p>
                <div className="space-y-2 mb-6">
                  {template.sections.map((section, i) => (
                    <div key={i} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle size={14} className="mr-2 text-green-500" />
                      {section}
                    </div>
                  ))}
                </div>
                <button className="w-full px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:scale-105 transition-all duration-300 shine-effect">
                  Download Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-black dark:text-white mb-4">
              Common Mistakes to Avoid
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Learn from these frequent pitfalls
            </p>
          </div>

          <div className="space-y-4">
            {commonMistakes.map((item, idx) => (
              <div key={idx} className="glass shadow-premium p-6 rounded-xl hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">✗</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-black dark:text-white mb-2">
                      {item.mistake}
                    </h3>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">✓</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-black dark:text-white">Fix:</span> {item.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mb-6">
            Practice Makes Perfect
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Apply this framework to real case studies in the blog
          </p>
          <a 
            href="/#/case-studies"
            className="inline-flex items-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 shadow-premium-lg"
          >
            Browse Case Studies
            <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </section>

    </div>
  );
};

export default CaseGuide;
