import { Project, ServiceItem, ProcessStep, StatItem, Testimonial, FAQItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'nova',
    number: '01',
    title: 'NOVA',
    category: 'AI SaaS Platform',
    tagline: 'Autonomous Intelligence Engine for Enterprise Engineering Teams',
    description: 'An AI-powered SaaS platform that orchestrates autonomous agents, accelerates developer productivity, and delivers real-time vector search across enterprise codebases.',
    client: 'Nova Concept Flagship',
    year: '2026',
    accentColor: '#FF4E00',
    deliverables: ['Product Architecture', 'Web Application', 'Design System', 'AI Agent Workflows'],
    metrics: [
      { label: 'Target Latency', value: '<35ms' },
      { label: 'Architecture', value: 'Multi-Tenant' },
      { label: 'Type Safety', value: '100% Strict' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    states: [
      {
        stage: '01',
        title: 'Information Architecture & Wireframe',
        description: 'Low-fidelity node layout mapping agent state machines, prompt pipelines, and team canvas spaces.',
        type: 'wireframe'
      },
      {
        stage: '02',
        title: 'UI Design & System Tokens',
        description: 'High-contrast frosted glass surface with mathematical spatial grid, glowing state indicators, and micro-typography.',
        type: 'ui'
      },
      {
        stage: '03',
        title: 'Responsive & Mobile Interface',
        description: 'Adaptive touch ergonomics, gesture-based prompt controls, and condensed telemetry cards for iOS & Android.',
        type: 'mobile'
      },
      {
        stage: '04',
        title: 'Production Application & Real-time Live Engine',
        description: 'Sub-millisecond WebSocket data streams, live graph rendering, and custom WebGL shaders.',
        type: 'final'
      }
    ]
  },
  {
    id: 'flow',
    number: '02',
    title: 'FLOW',
    category: 'Business Management Platform',
    tagline: 'Unified Operations, Resource Planning & Executive Telemetry',
    description: 'A comprehensive operations management platform designed to streamline cross-functional workflows, project billing, resource allocation, and real-time team collaboration.',
    client: 'Flow Operations Flagship',
    year: '2026',
    accentColor: '#10B981',
    deliverables: ['Operations Dashboard', 'Custom UI/UX', 'Cloud Infrastructure', 'Team Management'],
    metrics: [
      { label: 'Data Sync', value: 'Real-Time' },
      { label: 'UI Speed', value: '60fps GPU' },
      { label: 'Architecture', value: 'Modular Micro-UI' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'pulse',
    number: '03',
    title: 'PULSE',
    category: 'Mobile Application',
    tagline: 'Precision Biometrics & Daily Performance Tracking for Athletes',
    description: 'A next-generation mobile application engineered with 120Hz micro-haptics, offline synchronization, wearable Bluetooth streaming, and circadian rhythm optimization.',
    client: 'Pulse Fitness Concept',
    year: '2025',
    accentColor: '#38BDF8',
    deliverables: ['iOS & Android App', 'Haptic Motion', 'Bluetooth Protocol', 'Offline Sync'],
    metrics: [
      { label: 'Platform', value: 'iOS & Android' },
      { label: 'Animation', value: '120Hz Native' },
      { label: 'Sync Latency', value: '<20ms' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1510519138161-58474ebf899b?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'frame',
    number: '04',
    title: 'FRAME',
    category: 'Creative Video Platform',
    tagline: 'Cloud Non-Linear Editor & Motion Graphics Collaboration Suite',
    description: 'High-performance in-browser collaborative timeline editor built with WebAssembly, real-time waveform generation, asset versioning, and multi-track audio mastering.',
    client: 'Frame Cloud Suite Concept',
    year: '2025',
    accentColor: '#F43F5E',
    deliverables: ['Cloud NLE Editor', 'Timeline Engine', 'Audio Waveform Visualizer', 'Design System'],
    metrics: [
      { label: 'Engine', value: 'WebAssembly' },
      { label: 'Video Export', value: '4K ProRes' },
      { label: 'Audio Waveform', value: 'GPU Compute' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'orbit',
    number: '05',
    title: 'ORBIT',
    category: 'AI Productivity Platform',
    tagline: 'Intelligent Knowledge Graph & Contextual Task Orchestration',
    description: 'A modern AI productivity platform that transforms scattered company documentation, emails, and meetings into an interconnected, actionable knowledge graph.',
    client: 'Orbit Platform Exploration',
    year: '2025',
    accentColor: '#8B5CF6',
    deliverables: ['Knowledge Graph', 'AI Summarization', 'Desktop Application', 'Design Tokens'],
    metrics: [
      { label: 'Vector Search', value: 'Sub-15ms' },
      { label: 'Model Pipeline', value: 'Multi-Agent' },
      { label: 'Security', value: 'End-to-End' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80'
  },
  {
    id: 'luma',
    number: '06',
    title: 'LUMA',
    category: 'E-commerce Experience',
    tagline: 'Next-Gen Immersive Luxury Commerce Flagship & Visual Customizer',
    description: 'A bespoke e-commerce flagship featuring real-time 3D product customization, sub-second headless checkout, international currency routing, and fluid scroll storytelling.',
    client: 'Luma Luxury Concept',
    year: '2025',
    accentColor: '#F59E0B',
    deliverables: ['Headless Storefront', '3D Configurator', 'Motion Experience', 'Checkout Flow'],
    metrics: [
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Page Load', value: '0.4s LCP' },
      { label: '3D Runtime', value: 'WebGL 60fps' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'saas',
    title: 'SaaS Development',
    subtitle: 'High-velocity cloud architecture built for scale and hyper-growth',
    description: 'We engineer multi-tenant cloud software, robust API gateways, granular permission systems, real-time sync engines, and frictionless subscription workflows.',
    tags: ['React & Next.js', 'PostgreSQL & Supabase', 'Multi-tenant Auth', 'Real-time WebSockets', 'Automated CI/CD'],
    features: ['High-throughput real-time dashboards', 'Role-based enterprise security & RBAC', 'Elastic cloud scalability & serverless computing', 'Automated CI/CD deployment pipelines'],
    type: 'saas',
    deliverables: 'Production-ready cloud codebase, design system tokens, database schemas, CI/CD pipeline'
  },
  {
    id: 'web',
    title: 'Website Development',
    subtitle: 'High-performance interactive web flagships that convert',
    description: 'We construct ultra-performant, SEO-optimized web experiences with bespoke motion choreography, 60fps animations, and responsive editorial layouts.',
    tags: ['Next.js App Router', 'Tailwind CSS & Motion', 'Interactive Micro-UI', 'Headless CMS', 'Sub-second LCP'],
    features: ['Sub-second Largest Contentful Paint (LCP)', 'Fluid scroll-linked parallax animations', 'Accessible WCAG AA compliance', 'Headless CMS integration (Sanity, Strapi)'],
    type: 'web',
    deliverables: 'Interactive web application, custom animation engine, CMS integration, responsive layouts'
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    subtitle: 'Native and cross-platform mobile apps crafted for engagement',
    description: 'Intuitive iOS & Android applications engineered with 120Hz micro-haptics, offline synchronization, push notification engines, and frictionless touch ergonomics.',
    tags: ['React Native / Flutter', 'Offline-First SQLite', 'Biometric Security', 'Micro-Haptics', 'App Store Publishing'],
    features: ['Fluid 120fps gesture navigation', 'Instant offline state synchronizers', 'Deep linking & rich notification campaigns', 'Automated App Store & Google Play distribution'],
    type: 'mobile',
    deliverables: 'Production iOS and Android builds, Figma design system, offline sync engine, analytics telemetry'
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    subtitle: 'Systematic product design that makes complexity simple',
    description: 'From deep user research and journey mapping to atomic design token architectures, we create bespoke design systems that accelerate development cycles.',
    tags: ['Figma Design Systems', 'User Journey Mapping', 'Interactive Prototyping', 'Design Tokens', 'Usability Audits'],
    features: ['Comprehensive multi-theme token library (Dark/Light)', 'Interactive high-fidelity prototypes for user testing', 'Component documentation & Storybook integration', 'Developer handoff specs with pixel-perfect precision'],
    type: 'design',
    deliverables: 'Master Figma component library, design token documentation, interactive prototype, user research insights'
  },
  {
    id: 'video',
    title: 'Video Editing & Motion',
    subtitle: 'Cinematic brand films, motion graphics, and product launch reels',
    description: 'We direct and produce high-impact product launch videos, motion graphics packages, 3D product reveals, and signature micro-motion systems.',
    tags: ['Product Launch Reels', 'Motion Graphics', 'Premiere & After Effects', 'Sound Design & Audio', 'Kinetic Typography'],
    features: ['Cinema-grade 4K product rendering & editing', 'Custom synthesized sound design & audio mastering', 'High-energy motion graphics & kinetic typography', 'Social cutdowns & marketing motion assets'],
    type: 'video',
    deliverables: '4K master video exports, motion graphics toolkits, audio master tracks, social cutdowns'
  },
  {
    id: 'ai',
    title: 'AI & Custom Software',
    subtitle: 'Intelligent AI-powered workflows and custom software engineering',
    description: 'We embed state-of-the-art generative models, vector databases, autonomous agent workflows, and specialized business logic into production applications.',
    tags: ['AI Agent Pipelines', 'Vector Search (Pinecone/Qdrant)', 'Custom API Integration', 'Fast Inference UI', 'Enterprise Security'],
    features: ['Sub-50ms streaming generative interfaces', 'Multi-document retrieval-augmented generation (RAG)', 'Autonomous tool-calling agents with fallback safeguards', 'Structured output validation and token budget optimization'],
    type: 'ai',
    deliverables: 'Agent workflow code, vector search pipeline, prompt optimization suite, evaluation benchmarks'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Understand the business, users and problem',
    duration: 'Week 1',
    description: 'We immerse ourselves in your business objectives, target audience, competitive landscape, and technical constraints to uncover high-impact opportunities.',
    deliverables: ['Stakeholder Interviews', 'User Persona Archetypes', 'Technical Feasibility Audit', 'Scope & Milestone Architecture'],
    details: ['Uncovering core business bottlenecks', 'Auditing existing systems and user friction', 'Aligning KPI metrics and success criteria']
  },
  {
    number: '02',
    title: 'STRATEGY',
    subtitle: 'Define product direction and architecture',
    duration: 'Week 2',
    description: 'We map the product roadmap, user funnels, technical architecture, and feature prioritization to ensure every design and code decision drives real business outcomes.',
    deliverables: ['Information Architecture', 'User Journey Maps', 'Technology Stack Selection', 'Product PRD Blueprint'],
    details: ['Defining user conversion funnels', 'Mapping data flow and entity relations', 'Outlining security and compliance safeguards']
  },
  {
    number: '03',
    title: 'UX',
    subtitle: 'Structure the experience and user flows',
    duration: 'Week 3–4',
    description: 'We construct structural wireframes and testable prototypes, validating ergonomics, task completion speed, and navigation clarity before applying visual polish.',
    deliverables: ['Full Flow Wireframes', 'Interactive Clickable Prototype', 'User Testing Insights', 'Ergonomic Edge Case Reviews'],
    details: ['Rapid prototyping on desktop and mobile', 'Validating key tasks with target personas', 'Refining information hierarchy and navigation']
  },
  {
    number: '04',
    title: 'DESIGN',
    subtitle: 'Create the visual system and brand identity',
    duration: 'Week 5–6',
    description: 'We craft high-fidelity visual design, frosted glass styling, typography hierarchy, custom iconography, and fluid physics-based motion choreography.',
    deliverables: ['Master Figma Design System', 'Motion Choreography Specs', 'Design Token Library', 'Iconography & Brand Assets'],
    details: ['Building 60fps micro-interaction prototypes', 'Establishing dark & light mode color tokens', 'Creating reusable modular UI components']
  },
  {
    number: '05',
    title: 'BUILD',
    subtitle: 'Develop the product with modern technology',
    duration: 'Week 7–10',
    description: 'Our senior engineers write clean, type-safe code with automated testing, cloud infrastructure deployment, database optimizations, and sub-second render speeds.',
    deliverables: ['Production TypeScript Codebase', 'API & Database Integrations', 'Automated Test Suites', 'CI/CD Deployment Pipelines'],
    details: ['Rigorous performance auditing & profiling', 'End-to-end integration testing', 'Implementing zero-latency UI states']
  },
  {
    number: '06',
    title: 'LAUNCH',
    subtitle: 'Ship, measure and improve continuously',
    duration: 'Week 11+',
    description: 'We coordinate seamless zero-downtime production deployment, configure real-time telemetry monitoring, and optimize based on actual user analytics.',
    deliverables: ['Production Cloud Deployment', 'Analytics & Telemetry Setup', 'Handoff & Developer Training', 'Post-Launch Optimization Sprints'],
    details: ['Real-time user heatmaps & funnel analytics', 'Continuous performance optimization', 'Ongoing feature enhancements and scaling']
  }
];

export const STATS: StatItem[] = [
  {
    id: 'disciplines',
    value: 6,
    suffix: '',
    label: 'Core Disciplines',
    description: 'Full-spectrum capability spanning SaaS, Web Flagships, Mobile Apps, UI/UX, Video & AI'
  },
  {
    id: 'type-safety',
    value: 100,
    suffix: '%',
    label: 'Type-Safe Architecture',
    description: 'Strict end-to-end TypeScript codebase with zero runtime type shortcuts or compromise'
  },
  {
    id: 'fluidity',
    value: 60,
    suffix: 'fps',
    label: 'Micro-Interaction Fluidity',
    description: 'GPU-accelerated physics animations, layout springs, and sub-frame transition smoothness'
  },
  {
    id: 'sla',
    value: 24,
    suffix: 'h',
    label: 'Discovery Review SLA',
    description: 'Direct architectural evaluation and comprehensive scope proposal within one business day'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'BUILDIFO structures software with the architectural discipline of senior engineers and the eye of world-class product designers. The SaaS workflow is fast, coherent, and elegant.',
    author: 'Elena Rostova',
    role: 'Product Strategy Lead',
    company: 'SaaS Platform Architecture Archetype',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    metrics: 'SaaS Platform & AI Workflows',
    service: 'SaaS Architecture & Design System'
  },
  {
    id: '2',
    quote: 'The level of craftsmanship in their motion choreography and website development sets a distinctive standard. Layouts feel responsive and mathematically balanced.',
    author: 'Marcus Vance',
    role: 'Design Director',
    company: 'Web Flagship & Experience Design',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    metrics: 'Interactive Web Flagship',
    service: 'Web Flagship & Motion System'
  },
  {
    id: '3',
    quote: 'Direct collaboration with engineers who understand product ergonomics makes a massive difference. The mobile application feels snappy and polished down to the millisecond.',
    author: 'Siddharth Mehta',
    role: 'Mobile Engineering Lead',
    company: 'Mobile Ecosystem Architecture',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    metrics: 'Mobile App Architecture',
    service: 'Mobile App Development'
  },
  {
    id: '4',
    quote: 'Their video editing and motion graphics elevated our product showcase into a cohesive cinematic presentation that communicates value with clarity.',
    author: 'Sarah Chen',
    role: 'Creative Motion Producer',
    company: 'Creative Media & Launch Suite',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
    metrics: 'Video Motion Direction',
    service: 'Video Editing & Motion Design'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Getting Started',
    question: 'How does a project start?',
    answer: 'Every engagement begins with an initial discovery session where we review your project goals, technical requirements, and target timeline. From there, we formulate a clear scope, architecture blueprint, and sprint milestones before kicking off design and development.'
  },
  {
    id: 'faq-2',
    category: 'Timelines',
    question: 'How long does development take?',
    answer: 'Typical website and design system engagements take 3 to 6 weeks. Full-scale SaaS products and mobile applications typically require 6 to 12 weeks depending on feature scope and third-party integrations. We operate in transparent, bi-weekly sprints with continuous demos.'
  },
  {
    id: 'faq-3',
    category: 'Design & Process',
    question: 'Do you design before development?',
    answer: 'Yes. We believe in visual validation and rigorous user experience design prior to writing code. We create comprehensive wireframes, interactive prototypes, and design systems in Figma so you can review and test the exact experience before development begins.'
  },
  {
    id: 'faq-4',
    category: 'Capabilities',
    question: 'Can you build SaaS products?',
    answer: 'Absolutely. SaaS product development is one of our core specializations. We architect full-stack cloud applications with authentication, multi-tenant databases, analytics dashboards, subscription billing, and real-time APIs.'
  },
  {
    id: 'faq-5',
    category: 'Capabilities',
    question: 'Do you develop mobile apps?',
    answer: 'Yes. We engineer high-performance native and cross-platform mobile apps for iOS and Android using React Native, Flutter, and native Swift/Kotlin with 120Hz animations, offline synchronization, and push notifications.'
  },
  {
    id: 'faq-6',
    category: 'Capabilities',
    question: 'Do you provide video editing?',
    answer: 'Yes. Video editing and motion graphics are key services at BUILDIFO. We produce cinematic product launch videos, promotional reels, UI walkthroughs, kinetic typography, and motion design assets that capture attention.'
  },
  {
    id: 'faq-7',
    category: 'Collaboration',
    question: 'Can you work with an existing product?',
    answer: 'Yes. We regularly partner with companies to redesign, refactor, or scale existing products. We can conduct UX audits, rebuild legacy frontends, upgrade technology stacks, and add new feature modules.'
  },
  {
    id: 'faq-8',
    category: 'Process',
    question: 'How do revisions work?',
    answer: 'We maintain an iterative and transparent feedback loop. During each design and development milestone, you have dedicated review cycles with direct Slack access and Figma collaboration to refine every detail until it meets our high standard.'
  }
];

export const CATEGORY_MARKS = [
  { id: 'saas', name: 'SaaS Platforms', code: 'SAAS-01', desc: 'Cloud Software & Architecture' },
  { id: 'ai', name: 'AI Startups', code: 'AI-GEN', desc: 'Autonomous Agents & Vector Search' },
  { id: 'ecom', name: 'E-Commerce Brands', code: 'COMMERCE', desc: 'Custom Storefronts & 3D Config' },
  { id: 'enterprise', name: 'Enterprise Technology', code: 'ENTERPRISE', desc: 'High-Throughput Distributed Systems' },
  { id: 'mobile', name: 'Mobile Apps', code: 'MOBILE-OS', desc: 'iOS & Android Native Ecosystems' },
  { id: 'venture', name: 'Venture-Backed Startups', code: 'VENTURE', desc: 'Series A–C Hyper-Growth Engines' }
];

export const CLIENT_LOGOS = [
  { name: 'SaaS Platforms', tag: 'Cloud Software', logo: '▲ SAAS PLATFORMS' },
  { name: 'AI Startups', tag: 'Autonomous AI', logo: '◈ AI STARTUPS' },
  { name: 'E-Commerce Brands', tag: 'Luxury & DTC', logo: '❖ E-COMMERCE BRANDS' },
  { name: 'Enterprise Tech', tag: 'High Velocity', logo: '⬡ ENTERPRISE TECH' },
  { name: 'Mobile Apps', tag: 'iOS & Android', logo: '◉ MOBILE APPS' },
  { name: 'Venture-Backed', tag: 'Seed to Series C', logo: '✦ VENTURE-BACKED' }
];

export const WHY_BUILDIFO_POINTS = [
  {
    number: '01',
    title: 'DESIGN + DEVELOPMENT',
    subtitle: 'Seamless Harmony Under One Roof',
    description: 'We bridge the traditional gap between design and engineering. Our designers understand code constraints, and our engineers respect pixel-perfect aesthetics, eliminating friction and miscommunication.'
  },
  {
    number: '02',
    title: 'PRODUCT THINKING',
    subtitle: 'Strategic Business Alignment',
    description: 'We don’t just build features; we challenge assumptions and design systems that drive actual user adoption, conversion, retention, and business growth.'
  },
  {
    number: '03',
    title: 'PIXEL-PERFECT EXECUTION',
    subtitle: 'Zero Compromises on Craft',
    description: 'Every interaction, micro-animation, spacing token, and typographic scale is carefully calibrated to create a cohesive, world-class digital feel.'
  },
  {
    number: '04',
    title: 'FAST COMMUNICATION',
    subtitle: 'Direct Senior Access',
    description: 'No junior intermediaries or bureaucratic account managers. You collaborate directly with the senior designers and engineers building your product.'
  },
  {
    number: '05',
    title: 'SCALABLE TECHNOLOGY',
    subtitle: 'Future-Proof Modern Architecture',
    description: 'We build on modern, battle-tested foundations (React, Next.js, TypeScript, Node.js, Cloud APIs) engineered for high performance and effortless scaling.'
  },
  {
    number: '06',
    title: 'LONG-TERM SUPPORT',
    subtitle: 'Reliable Partnership Beyond Launch',
    description: 'We stand behind what we ship, offering ongoing optimization, feature expansion sprints, and technical guidance as your user base expands.'
  }
];

export const TECH_STACK = [
  {
    name: 'React',
    category: 'Frontend',
    icon: 'Atom',
    description: 'Component architecture with instant state updates and ultra-fast UI rendering.'
  },
  {
    name: 'Next.js',
    category: 'Framework',
    icon: 'Layers',
    description: 'Server-side rendering, edge caching, and optimized production routing.'
  },
  {
    name: 'TypeScript',
    category: 'Language',
    icon: 'Code2',
    description: 'Strict end-to-end type safety, preventing bugs before runtime deployment.'
  },
  {
    name: 'Node.js',
    category: 'Backend',
    icon: 'Server',
    description: 'High-concurrency microservices, REST & WebSocket real-time backends.'
  },
  {
    name: 'React Native',
    category: 'Mobile',
    icon: 'Smartphone',
    description: 'Cross-platform iOS and Android mobile applications with native 120Hz fluidity.'
  },
  {
    name: 'Flutter',
    category: 'Mobile',
    icon: 'SmartphoneNfc',
    description: 'Bespoke compiled native mobile interfaces with rich animation runtimes.'
  },
  {
    name: 'Figma',
    category: 'UI/UX Design',
    icon: 'Figma',
    description: 'Comprehensive design token systems, atomic components, and interactive prototypes.'
  },
  {
    name: 'After Effects',
    category: 'Motion Graphics',
    icon: 'Film',
    description: 'Cinematic visual effects, 2D/3D kinetic typography, and motion choreography.'
  },
  {
    name: 'Premiere Pro',
    category: 'Video Editing',
    icon: 'Video',
    description: 'Broadcast-grade multi-track video editing, color grading LUTs, and audio mastering.'
  },
  {
    name: 'AI APIs',
    category: 'Intelligence',
    icon: 'Bot',
    description: 'Generative AI integrations, vector embeddings, and autonomous agent orchestration.'
  }
];

export const PROJECT_TYPES = [
  'SaaS Development',
  'Web Development',
  'Mobile App Development',
  'Video Editing',
  'UI/UX Design',
  'Custom Software & AI'
] as const;

export const BUDGET_RANGES = [
  '< $15k',
  '$15k - $30k',
  '$30k - $60k',
  '$60k+'
] as const;


