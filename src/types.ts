export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  client: string;
  year: string;
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  heroImage: string;
  accentColor: string;
  liveUrl?: string;
  states?: {
    stage: string;
    title: string;
    description: string;
    type: 'wireframe' | 'ui' | 'mobile' | 'final';
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  features: string[];
  type: 'saas' | 'web' | 'mobile' | 'video' | 'design' | 'ai';
  deliverables: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  deliverables: string[];
  details: string[];
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metrics: string;
  service: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
