import { BlogPost, Category, Resource } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'adidas-case-study',
    title: 'Adidas: When Culture Eats Strategy for Breakfast',
    subtitle: 'How Adidas regained its cool factor by focusing on subcultures rather than mass appeal.',
    category: Category.CASE_STUDY,
    tags: ['Branding', 'Culture', 'Fashion'],
    image: '/images/adidas.jpg',
    date: 'Oct 12, 2023',
    readTime: '6 min read',
    isFeatured: true,
    caseStudyMeta: {
      brand: 'Adidas',
      industry: 'Apparel / Sports',
      problem: 'Losing relevance with Gen Z due to overly corporate messaging.',
      approach: 'Decentralized storytelling through local creators and subcultures.',
      keyInsight: 'You do not build culture. You support the people who do.',
    },
    content: {
      intro: "Adidas was stuck. While Nike was mastering the hero's journey, Adidas felt like a legacy player relying on past glory. This case study explores how they pivoted from top-down advertising to bottom-up cultural integration.",
      keyPoints: [
        'Shifted 30% of media budget to community activation.',
        'Partnered with micro-influencers instead of just mega-stars.',
        'Revived the Originals line by letting creators remix heritage assets.'
      ],
      sections: [
        {
          heading: 'The Relevance Gap',
          body: "In the mid-2010s, Adidas saw sales stagnate in key urban markets. Their data showed high awareness but low 'cool factor'. They were a gym brand, not a lifestyle brand."
        },
        {
          heading: 'The "Open Source" Strategy',
          body: "They opened their archives to collaborators like Kanye West, Pharrell, and later, thousands of local creators. The strategy was risky: give up control of the brand guidelines to gain authenticity."
        }
      ],
      takeaways: "Brands today must move from 'broadcasting' to 'facilitating'. Control is the enemy of cool."
    }
  },
  {
    id: 'romano-vip',
    title: 'Romano: Selling the Gentleman Dream in Vietnam',
    subtitle: 'Decoding the positioning that made Romano synonymous with male grooming.',
    category: Category.CASE_STUDY,
    tags: ['Local Market', 'Positioning', 'FMCG'],
    image: '/images/romano.jpg',
    date: 'Sep 28, 2023',
    readTime: '5 min read',
    caseStudyMeta: {
      brand: 'Romano',
      industry: 'FMCG / Personal Care',
      problem: 'Competing with global giants like X-Men in a price-sensitive market.',
      approach: 'Distinct emotional positioning: The Italian Gentleman.',
      keyInsight: 'Men do not just want to smell good; they want to feel successful.',
    },
    content: {
      intro: "In a crowded shelf of blue bottles, Romano stood out by selling a specific fantasy: Italian sophistication. It wasn't about cleaning hair; it was about upgrading your status.",
      keyPoints: [
        'Consistent visual identity (Green) vs competitors (Blue/Red).',
        'Focused on the aspirational "VIP" lifestyle.',
        'Masterful use of scent as a brand signature.'
      ],
      sections: [
        {
          heading: 'Visual Differentiation',
          body: "While X-Men owned the 'Hero/Action' territory with blue packaging, Romano chose a deep, premium green. This immediately signaled a different shelf tier, even at a similar price point."
        },
        {
          heading: 'The VIP Narrative',
          body: "Their campaigns consistently feature the Romano man in suits, luxury settings, and commanding respect. They sell confidence in a bottle."
        }
      ],
      takeaways: "Functional benefits get you on the shelf. Emotional benefits get you in the cart."
    }
  },
  {
    id: 'starbucks-growth',
    title: 'Starbucks: The Third Place in a Digital World',
    subtitle: 'Is the physical experience still relevant when 30% of orders are mobile?',
    category: Category.GROWTH,
    tags: ['Retail', 'Digital Transformation', 'CX'],
    image: '/images/starbucks.png',
    date: 'Nov 02, 2023',
    readTime: '8 min read',
    isFeatured: true,
    content: {
      intro: "Starbucks built an empire on being the 'Third Place' between home and work. But with the rise of grab-and-go and mobile ordering, the company is fundamentally changing its operations without trying to lose its soul.",
      keyPoints: [
        'Mobile Order & Pay now accounts for huge revenue share.',
        'Store layouts are shrinking to accommodate pickup-only behaviors.',
        'Loyalty program drives frequency more than product innovation.'
      ],
      sections: [
        {
          heading: 'Friction vs. Connection',
          body: "The classic barista conversation is disappearing. Starbucks is betting that speed is a form of service. But the risk is becoming a vending machine for caffeine."
        },
        {
          heading: 'The Data Engine',
          body: "Deep Down, Starbucks is a data company. Their app knows your routine better than you do, pushing offers exactly when your habit loop triggers."
        }
      ],
      takeaways: "Convenience is a commodity. Experience is the differentiator. Balancing the two is the hardest act in modern retail."
    }
  },
  {
    id: 'shopee-machine',
    title: 'The Shopee Marketing Machine: Localized Gamification',
    subtitle: 'How Shopee beat Lazada by understanding the Southeast Asian love for noise and games.',
    category: Category.STRATEGY,
    tags: ['E-commerce', 'Gamification', 'Growth Hacking'],
    image: 'https://picsum.photos/800/400?random=4',
    date: 'Aug 15, 2023',
    readTime: '7 min read',
    content: {
      intro: "Shopee didn't just build a marketplace; they built an entertainment app that sells things. This 'Shoppertainment' model proved that in SEA, chaotic fun beats clean design.",
      keyPoints: [
        'Baby Shark adaptation was a masterclass in earworm marketing.',
        'In-app games drive daily active usage (DAU) even without purchase intent.',
        'Hyper-localization of campaigns per country.'
      ],
      sections: [
        {
          heading: 'The Engagement Loop',
          body: "Users open Shopee to water a digital tree or play a bubble game. Once they are in, they browse. It is a funnel that starts with dopamine, not search."
        },
        {
          heading: 'Viral Jingles',
          body: "They understood that mass awareness in SEA requires memorable, annoying, repetitive audio triggers. It is not high art, but it is high effectiveness."
        }
      ],
      takeaways: "Don't design for the design community. Design for the user's actual behavior."
    }
  },
  {
    id: 'psychology-viral',
    title: 'The Psychology Behind Viral Campaigns',
    subtitle: 'Why we share: Social currency, triggers, and emotion.',
    category: Category.CONSUMER,
    tags: ['Psychology', 'Viral', 'Content'],
    image: 'https://picsum.photos/800/400?random=5',
    date: 'Dec 01, 2023',
    readTime: '6 min read',
    content: {
      intro: "Virality isn't luck. It's engineering. By understanding the STEPPS framework (Jonah Berger), we can reverse engineer why some campaigns fly and others die.",
      keyPoints: [
        'Social Currency: Does sharing this make me look good?',
        'Triggers: What environmental cue makes me think of this product?',
        'Emotion: High arousal emotions (awe, anger) drive sharing.'
      ],
      sections: [
        {
          heading: 'The Ego of Sharing',
          body: "We share things that refine our identity. If a campaign makes the user feel smart, insider, or funny, they will spread it for you."
        }
      ],
      takeaways: "Stop trying to make a viral video. Start trying to make your users look cool."
    }
  },
  {
    id: 'positioning-sticks',
    title: 'Creating a Positioning That Sticks',
    subtitle: 'The battle for the mind is won with simplicity, not features.',
    category: Category.STRATEGY,
    tags: ['Positioning', 'Branding'],
    image: 'https://picsum.photos/800/400?random=6',
    date: 'Jan 10, 2024',
    readTime: '5 min read',
    content: {
      intro: "Positioning is not what you do to a product. Positioning is what you do to the mind of the prospect. It is about owning a word.",
      keyPoints: [
        'Volvo owns Safety.',
        'BMW owns Driving.',
        'What do you own?'
      ],
      sections: [
        {
          heading: 'The Trap of "More"',
          body: "Most brands try to be everything: high quality, low price, fast service. That is not positioning; that is wishful thinking. Sacrifice is the essence of strategy."
        }
      ],
      takeaways: "Be one thing to one person. That is enough to build a billion-dollar business."
    }
  },
  {
    id: 'data-decisions',
    title: 'Turning Data Into Marketing Decisions',
    subtitle: 'Stop looking at vanity metrics. Start looking at behavior flows.',
    category: Category.GROWTH,
    tags: ['Data', 'Analytics'],
    image: 'https://picsum.photos/800/400?random=7',
    date: 'Feb 14, 2024',
    readTime: '4 min read',
    content: {
      intro: "We are drowning in data but starving for insights. A dashboard full of green numbers means nothing if you don't know *why* they are green.",
      keyPoints: [
        'Focus on retention cohorts, not total users.',
        'CAC is useless without LTV context.',
        'Qualitative feedback explains the Quantitative spikes.'
      ],
      sections: [
        {
          heading: 'The "So What?" Test',
          body: "Every time you see a metric, ask 'So what?'. Traffic is up 20%. So what? Did conversion hold? Did lead quality drop? If you can't answer, the metric is vanity."
        }
      ],
      takeaways: "Data doesn't make decisions. You do. Data just reduces the risk of being wrong."
    }
  },
  {
    id: 'tiktok-strategy',
    title: 'TikTok Marketing in SEA: Beyond Dance Trends',
    subtitle: 'How brands are winning on TikTok without looking desperate.',
    category: Category.STRATEGY,
    tags: ['TikTok', 'Social Media', 'SEA'],
    image: 'https://picsum.photos/800/400?random=8',
    date: 'Mar 05, 2024',
    readTime: '7 min read',
    content: {
      intro: "TikTok isn't just for Gen Z anymore. Brands that master the platform's unique language are seeing massive returns. But most get it wrong.",
      keyPoints: [
        'Native content beats polished ads 10:1',
        'Sound strategy > visual strategy on TikTok',
        'Micro-trends move faster than your approval process'
      ],
      sections: [
        {
          heading: 'The TikTok Paradox',
          body: "The more 'professional' your content looks, the worse it performs. TikTok rewards authenticity, speed, and participation in cultural moments."
        }
      ],
      takeaways: "Stop treating TikTok like Instagram. It's a different game with different rules."
    }
  },
  {
    id: 'pricing-psychology',
    title: 'The Psychology of Pricing: Why $99 Still Works',
    subtitle: 'Behavioral economics principles every marketer should know.',
    category: Category.CONSUMER,
    tags: ['Pricing', 'Psychology', 'Conversion'],
    image: 'https://picsum.photos/800/400?random=9',
    date: 'Mar 12, 2024',
    readTime: '6 min read',
    content: {
      intro: "Pricing is not just math. It's psychology, positioning, and perception management all rolled into one decision.",
      keyPoints: [
        'Charm pricing ($99 vs $100) increases conversion by 24%',
        'Anchoring: Show expensive option first',
        'Decoy pricing creates perceived value'
      ],
      sections: [
        {
          heading: 'The Power of Context',
          body: "A $50 wine feels cheap at a high-end restaurant but expensive at a grocery store. Context shapes perception more than actual price."
        }
      ],
      takeaways: "Price is a story you tell. Make sure it's the right one."
    }
  },
  {
    id: 'content-distribution',
    title: 'Content Distribution > Content Creation',
    subtitle: 'Why your best content is probably invisible.',
    category: Category.GROWTH,
    tags: ['Content', 'Distribution', 'SEO'],
    image: 'https://picsum.photos/800/400?random=10',
    date: 'Mar 18, 2024',
    readTime: '5 min read',
    content: {
      intro: "You spent 40 hours creating the perfect guide. It got 47 views. The problem isn't your content—it's your distribution.",
      keyPoints: [
        'Spend 20% creating, 80% distributing',
        'Repurpose content across 10+ channels',
        'Distribution compounds; creation doesn't'
      ],
      sections: [
        {
          heading: 'The One-to-Many Strategy',
          body: "Take one pillar piece and break it into: 10 tweets, 5 LinkedIn posts, 3 Instagram carousels, 1 podcast episode, and 15 newsletter snippets."
        }
      ],
      takeaways: "Great content with poor distribution loses to mediocre content with great distribution. Every time."
    }
  },
  {
    id: 'grab-case-study',
    title: 'Grab: The Super App Strategy That Changed SEA',
    subtitle: 'How Grab became more than just a ride-hailing app.',
    category: Category.CASE_STUDY,
    tags: ['Platform', 'SEA', 'Growth'],
    image: 'https://picsum.photos/800/400?random=11',
    date: 'Mar 25, 2024',
    readTime: '8 min read',
    isFeatured: false,
    caseStudyMeta: {
      brand: 'Grab',
      industry: 'Tech / Mobility',
      problem: 'How to compete with Uber while being profitable in a price-sensitive market.',
      approach: 'Build a super app ecosystem instead of just ride-hailing.',
      keyInsight: 'In SEA, customers want everything in one app. Convenience > specialization.'
    },
    content: {
      intro: "Grab didn't just beat Uber. They redefined what a mobility company could be by becoming the operating system for Southeast Asian daily life.",
      keyPoints: [
        'Expanded from rides to food, payments, and financial services',
        'Localized for each market (GrabPay, GrabFood, etc.)',
        'Built network effects across services'
      ],
      sections: [
        {
          heading: 'The Super App Thesis',
          body: "While Western markets prefer specialized apps, SEA users want one app for everything. Grab recognized this cultural difference early."
        },
        {
          heading: 'The Cash-to-Digital Bridge',
          body: "GrabPay became a Trojan horse for financial inclusion, bringing millions of unbanked users into the digital economy."
        }
      ],
      takeaways: "Platform thinking beats product thinking in emerging markets. Build ecosystems, not features."
    }
  },
  {
    id: 'email-marketing-2024',
    title: 'Email Marketing in 2024: Still Not Dead',
    subtitle: 'Why email outperforms social media for ROI.',
    category: Category.GROWTH,
    tags: ['Email', 'Retention', 'ROI'],
    image: 'https://picsum.photos/800/400?random=12',
    date: 'Apr 02, 2024',
    readTime: '6 min read',
    content: {
      intro: "Everyone chases social media. Smart marketers quietly build email lists. Email marketing returns $42 for every $1 spent.",
      keyPoints: [
        'You own your email list; you rent social media audiences',
        'Email converts 3x better than social media',
        'Segmentation is the difference between spam and relevance'
      ],
      sections: [
        {
          heading: 'The Ownership Advantage',
          body: "Instagram could ban you tomorrow. TikTok's algorithm could change. Your email list? That's yours forever."
        }
      ],
      takeaways: "Treat email like a product, not a broadcast channel. Respect the inbox."
    }
  },
  {
    id: 'community-marketing',
    title: 'Community-Led Growth: The New Playbook',
    subtitle: 'Why communities beat ads in the long run.',
    category: Category.STRATEGY,
    tags: ['Community', 'Growth', 'Retention'],
    image: 'https://picsum.photos/800/400?random=13',
    date: 'Apr 10, 2024',
    readTime: '7 min read',
    content: {
      intro: "Communities are the moat ads can't build. They create belonging, not just transactions.",
      keyPoints: [
        'Community members have 3x higher LTV',
        'Word-of-mouth from communities converts at 50%+',
        'Communities provide free market research'
      ],
      sections: [
        {
          heading: 'From Audience to Community',
          body: "An audience consumes your content. A community creates with you. The shift requires letting go of control."
        }
      ],
      takeaways: "Build a community around your mission, not your product. The product is the excuse to gather."
    }
  },
  {
    id: 'influencer-marketing-roi',
    title: 'Influencer Marketing: Measuring What Actually Matters',
    subtitle: 'Beyond vanity metrics to real business impact.',
    category: Category.GROWTH,
    tags: ['Influencer', 'ROI', 'Measurement'],
    image: 'https://picsum.photos/800/400?random=14',
    date: 'Apr 18, 2024',
    readTime: '5 min read',
    content: {
      intro: "Most brands measure influencer success by likes and reach. Meanwhile, their CFO is asking about actual revenue.",
      keyPoints: [
        'Engagement rate > follower count',
        'Use unique promo codes to track conversions',
        'Micro-influencers (10K-100K) often deliver better ROI'
      ],
      sections: [
        {
          heading: 'The Attribution Problem',
          body: "Influencer marketing works best as brand building, not direct response. Set expectations accordingly with stakeholders."
        }
      ],
      takeaways: "Treat influencer partnerships like media buys. Demand measurement, not just 'exposure'."
    }
  },
  {
    id: 'brand-storytelling',
    title: 'Brand Storytelling: Framework Not Fluff',
    subtitle: 'The anatomy of stories that sell.',
    category: Category.STRATEGY,
    tags: ['Storytelling', 'Branding', 'Content'],
    image: 'https://picsum.photos/800/400?random=15',
    date: 'Apr 25, 2024',
    readTime: '8 min read',
    content: {
      intro: "Every brand says they tell stories. Few actually do. Here's the difference between a story and a sales pitch.",
      keyPoints: [
        'Stories need conflict, not just benefits',
        'Your customer is the hero; you are the guide',
        'Emotion drives decision; logic justifies it'
      ],
      sections: [
        {
          heading: 'The Hero\'s Journey for Brands',
          body: "Customer has problem → Meets your brand → Transformation occurs. Simple structure, infinite variations."
        },
        {
          heading: 'Show Don\'t Tell',
          body: "Don't say 'We're innovative.' Show a story of how you solved an impossible problem."
        }
      ],
      takeaways: "Facts tell, stories sell. But only if you're telling the right story."
    }
  },
  {
    id: 'seo-content-strategy',
    title: 'SEO in 2024: Create for Humans, Optimize for Bots',
    subtitle: 'Modern SEO is about user intent, not keywords.',
    category: Category.GROWTH,
    tags: ['SEO', 'Content', 'Search'],
    image: 'https://picsum.photos/800/400?random=16',
    date: 'May 02, 2024',
    readTime: '7 min read',
    content: {
      intro: "Google's algorithm is now smart enough to understand context and intent. Keyword stuffing is dead. Understanding your audience is everything.",
      keyPoints: [
        'Topic clusters > individual keywords',
        'Search intent determines content format',
        'Page experience is a ranking factor'
      ],
      sections: [
        {
          heading: 'The Intent Mapping Framework',
          body: "Every search query has intent: informational, navigational, commercial, or transactional. Match your content to intent."
        }
      ],
      takeaways: "Win SEO by being the best answer, not the best optimizer."
    }
  },
  {
    id: 'marketing-attribution',
    title: 'Marketing Attribution: The Unsolvable Problem',
    subtitle: 'Why attribution models are broken and what to do instead.',
    category: Category.STRATEGY,
    tags: ['Attribution', 'Analytics', 'Measurement'],
    image: 'https://picsum.photos/800/400?random=17',
    date: 'May 10, 2024',
    readTime: '6 min read',
    content: {
      intro: "Every marketing team wants perfect attribution. No marketing team has it. Here's how to make peace with ambiguity.",
      keyPoints: [
        'Multi-touch attribution is directionally correct, not precisely accurate',
        'Incrementality testing > attribution models',
        'Focus on contribution, not attribution'
      ],
      sections: [
        {
          heading: 'The Dark Funnel Problem',
          body: "Most B2B buying happens in Slack channels, private LinkedIn DMs, and podcast conversations. Your attribution model sees none of it."
        }
      ],
      takeaways: "Accept that marketing is part science, part art. Use data to reduce uncertainty, not eliminate it."
    }
  }
];

export const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'The Brand Positioning Canvas',
    type: 'Framework',
    description: 'A one-page template to define your brand core, value proposition, and reasons to believe.',
    link: '#'
  },
  {
    id: '2',
    title: 'Growth Loop Worksheet',
    type: 'Template',
    description: 'Map out your acquisition, activation, and referral loops visually.',
    link: '#'
  },
  {
    id: '3',
    title: 'Playing to Win',
    type: 'Book',
    description: 'By A.G. Lafley. The definitive guide on strategy: Where to play and how to win.',
    link: '#'
  },
  {
    id: '4',
    title: 'Marketing Trend Report 2024',
    type: 'Guide',
    description: 'My personal synthesis of the top 10 trends shifting the SEA market this year.',
    link: '#'
  }
];