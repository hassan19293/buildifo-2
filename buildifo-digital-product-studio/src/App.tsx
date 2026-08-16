import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SocialProofSection } from './components/SocialProofSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ProjectStickyTransition } from './components/ProjectStickyTransition';
import { ServicesSection } from './components/ServicesSection';
import { SaaSShowcaseSection } from './components/SaaSShowcaseSection';
import { WebShowcaseSection } from './components/WebShowcaseSection';
import { MobileShowcaseSection } from './components/MobileShowcaseSection';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { UIUXShowcaseSection } from './components/UIUXShowcaseSection';
import { ProcessSection } from './components/ProcessSection';
import { TechnologySection } from './components/TechnologySection';
import { WhyUsSection } from './components/WhyUsSection';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { StartProjectModal } from './components/StartProjectModal';
import { MotionHUD } from './components/MotionHUD';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'work', 'evolution', 'services', 'showcases', 'process', 'tech', 'why', 'stats', 'testimonials', 'about', 'faq', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative selection:bg-[#FF4E00] selection:text-white font-sans overflow-x-hidden">
      
      {/* Frosted Glass Global Ambient Backdrop Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Right Electric Amber/Orange Glow */}
        <div className="absolute -top-32 -right-32 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-[#FF4E00]/10 rounded-full blur-[160px] animate-ambient-glow" />
        {/* Deep Ember Top-Left Warmth */}
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#221008]/40 rounded-full blur-[150px]" />
        {/* Midnight Sapphire Center Glow */}
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-[#0A1229]/50 rounded-full blur-[180px]" />
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      {/* SECTION 01: Top Navigation Bar */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        activeSection={activeSection}
      />

      <main className="relative z-10">
        {/* SECTION 02: Hero Viewport */}
        <HeroSection
          onOpenContact={() => setIsContactOpen(true)}
          onExploreWork={handleScrollToWork}
        />

        {/* SECTION 03: Social Proof / Industry Category Marks */}
        <SocialProofSection />

        {/* SECTION 04: Selected Work (6 Featured Client Flagships) */}
        <SelectedWorkSection
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Sticky Case Study Evolution (Wireframe -> Design System -> Mobile -> Live Telemetry) */}
        <ProjectStickyTransition />

        {/* SECTION 05: Services Interactive Showcase with Tone-Shift Accent Glows */}
        <ServicesSection
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* SECTION 06: SaaS Development Deep Dive */}
        <SaaSShowcaseSection />

        {/* SECTION 07: Web Development Layered 3D Browser Mockups */}
        <WebShowcaseSection />

        {/* SECTION 08: Mobile App Development 3D Tilted Phones */}
        <MobileShowcaseSection />

        {/* SECTION 09: Video Editing NLE Timeline Showcase */}
        <VideoShowcaseSection />

        {/* SECTION 10: UI/UX Design Systems, Tokens & Wireframes */}
        <UIUXShowcaseSection />

        {/* SECTION 11: Systematic 6-Step Process */}
        <ProcessSection />

        {/* SECTION 12: Technologies BUILDIFO Uses */}
        <TechnologySection />

        {/* SECTION 13: Why BUILDIFO - Key Agency Strengths */}
        <WhyUsSection />

        {/* SECTION 14: Statistics - Verified Impact Metrics with Count Up */}
        <StatsSection />

        {/* SECTION 15: Testimonials - Founder & Executive Endorsements */}
        <TestimonialsSection />

        {/* SECTION 16: About BUILDIFO - Story & Craft Precision */}
        <AboutSection />

        {/* SECTION 17: Frequently Asked Questions Accordion */}
        <FAQSection />

        {/* SECTION 18: Interactive Direct Project Intake Form */}
        <ContactSection />

        {/* SECTION 19: Final Bold High-Contrast CTA */}
        <FinalCTASection
          onOpenContact={() => setIsContactOpen(true)}
        />
      </main>

      {/* SECTION 20: Footer with Global Hub Clocks & Navigation */}
      <Footer />

      {/* Interactive Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => {
          setSelectedProject(null);
          setIsContactOpen(true);
        }}
      />

      {/* Interactive Multi-Step Project Inquiry Modal */}
      <StartProjectModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Interactive Master Animation Flow HUD Navigator */}
      <MotionHUD />

    </div>
  );
}
