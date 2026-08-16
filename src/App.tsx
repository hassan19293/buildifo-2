import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChapterMeta, CursorState, ProjectData } from './types';
import { Cursor } from './components/Cursor';
import { Navigation } from './components/Navigation';
import { Global3DWorld } from './components/Global3DWorld';
import { Chapter01Arrival } from './components/Chapter01Arrival';
import { Chapter02Reveal } from './components/Chapter02Reveal';
import { Chapter03Work } from './components/Chapter03Work';
import { Chapter04System } from './components/Chapter04System';
import { Chapter05Studio } from './components/Chapter05Studio';
import { Chapter06Approach } from './components/Chapter06Approach';
import { Chapter07Invitation } from './components/Chapter07Invitation';
import { ProjectModal } from './components/ProjectModal';
import { ContactDrawer } from './components/ContactDrawer';
import { soundEngine } from './utils/soundEngine';

const CHAPTERS: ChapterMeta[] = [
  { id: 'arrival', number: '01', name: 'ARRIVAL', material: 'BLACKENED STEEL & CONCRETE', lightSource: 'DOORWAY SUNLIGHT' },
  { id: 'reveal', number: '02', name: 'REVEAL', material: 'PAPER, PLASTER & LINEN', lightSource: 'DIFFUSE DAYLIGHT' },
  { id: 'work', number: '03', name: 'WORK', material: 'CHARCOAL & STONE PLINTHS', lightSource: 'GALLERY SPOTLIGHTS' },
  { id: 'system', number: '04', name: 'SYSTEM', material: 'BRUSHED TITANIUM & STEEL', lightSource: 'OVERHEAD WORKSHOP LAMP' },
  { id: 'studio', number: '05', name: 'STUDIO', material: 'OILED OAK & BOOKS', lightSource: 'WARM TABLE LAMP' },
  { id: 'approach', number: '06', name: 'APPROACH', material: 'PINNED PAPER & CORK WALL', lightSource: 'SOFT DAYLIGHT' },
  { id: 'invitation', number: '07', name: 'INVITATION', material: 'ARCHITECTURAL GLASS', lightSource: 'OPEN EXTERIOR DAYLIGHT' },
];

export default function App() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [cursorState, setCursorStateInternal] = useState<CursorState>('default');
  const [cursorText, setCursorText] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // 3D Continuous Navigation & Interactive States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [activeSystemLayerIndex, setActiveSystemLayerIndex] = useState(0);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);

  const tickingRef = useRef(false);

  const setCursor = useCallback((state: CursorState, text?: string) => {
    setCursorStateInternal(state);
    setCursorText(text);
  }, []);

  const handleToggleMute = useCallback(() => {
    soundEngine.isMuted = !soundEngine.isMuted;
    setIsMuted(soundEngine.isMuted);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Global Page Scroll Progress calculation for 3D Camera Travel
  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
          setScrollProgress(Math.min(1, Math.max(0, current)));
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Mouse Coordinate Tracking for 3D Parallax Tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection observer to track active chapter and material wayfinding
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedIdx = CHAPTERS.findIndex((c) => c.id === entry.target.id);
          if (matchedIdx !== -1) {
            setActiveChapterIndex(matchedIdx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F3EE]">
      {/* PERSISTENT CINEMATIC 3D WORLD CANVAS (Underlays all 7 chapters) */}
      <Global3DWorld
        scrollProgress={scrollProgress}
        activeChapterIndex={activeChapterIndex}
        activeSystemLayerIndex={activeSystemLayerIndex}
        hoveredProjectIndex={hoveredProjectIndex}
        pointerX={pointer.x}
        pointerY={pointer.y}
      />

      {/* Magnetic Art-Directed Cursor */}
      <Cursor cursorState={cursorState} cursorText={cursorText} />

      {/* Architectural Wayfinding Navigation */}
      <Navigation
        currentChapter={CHAPTERS[activeChapterIndex]}
        activeChapterIndex={activeChapterIndex}
        chapters={CHAPTERS}
        onSelectChapter={scrollToSection}
        onOpenInquiry={() => setIsInquiryOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        setCursorState={setCursor}
      />

      {/* MAIN DIGITAL ENVIRONMENT: 7 CONNECTED PHYSICAL CHAPTERS */}
      <main className="relative z-10">
        {/* CHAPTER 01 — ARRIVAL (Threshold, concrete, blackened steel, doorway light) */}
        <Chapter01Arrival
          setCursorState={setCursor}
          onExplore={() => scrollToSection('reveal')}
        />

        {/* CHAPTER 02 — REVEAL (Paper, plaster, drafting tables, diffuse light) */}
        <Chapter02Reveal
          setCursorState={setCursor}
          onSelectWork={() => scrollToSection('work')}
        />

        {/* CHAPTER 03 — WORK (Charcoal wall, stone floor, 3D plinths, gallery spotlights) */}
        <Chapter03Work
          onSelectProject={(proj) => setSelectedProject(proj)}
          setCursorState={setCursor}
          onProceedToSystem={() => scrollToSection('system')}
          onHoverProject={(idx) => setHoveredProjectIndex(idx)}
        />

        {/* CHAPTER 04 — SYSTEM (Machine room, 5 physical actuated 3D plates, overhead workshop lamp) */}
        <Chapter04System
          setCursorState={setCursor}
          onProceedToStudio={() => scrollToSection('studio')}
          onSelectLayerIndex={(idx) => setActiveSystemLayerIndex(idx)}
        />

        {/* CHAPTER 05 — STUDIO (Warm intimate atelier, oiled oak, books, desk lamp, material proofs) */}
        <Chapter05Studio
          setCursorState={setCursor}
          onProceedToApproach={() => scrollToSection('approach')}
        />

        {/* CHAPTER 06 — APPROACH (Physical process pin-up wall, tracing paper, margin notes) */}
        <Chapter06Approach
          setCursorState={setCursor}
          onProceedToInvitation={() => scrollToSection('invitation')}
        />

        {/* CHAPTER 07 — INVITATION (Architectural opening, glass, daylight exit, "LET'S BUILD SOMETHING.") */}
        <Chapter07Invitation
          onOpenInquiry={() => setIsInquiryOpen(true)}
          setCursorState={setCursor}
          onReturnToStart={() => scrollToSection('arrival')}
        />
      </main>

      {/* Curator Exhibition Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        setCursorState={setCursor}
      />

      {/* Studio Commission Inquiry Drawer */}
      <ContactDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        setCursorState={setCursor}
      />
    </div>
  );
}
