import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ChapterMeta, CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface NavigationProps {
  currentChapter: ChapterMeta;
  activeChapterIndex: number;
  chapters: ChapterMeta[];
  onSelectChapter: (id: string) => void;
  onOpenInquiry: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  setCursorState: (state: CursorState, text?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentChapter,
  activeChapterIndex,
  chapters,
  onSelectChapter,
  onOpenInquiry,
  isMuted,
  onToggleMute,
  setCursorState,
}) => {
  // Determine if currently in a light environment (Reveal, Studio, Invitation)
  const isLightEnvironment = currentChapter.id === 'reveal' || currentChapter.id === 'studio' || currentChapter.id === 'invitation';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-5 sm:px-8 py-4 flex items-center justify-between transition-colors duration-700 pointer-events-none ${
        isLightEnvironment ? 'text-[#080808]' : 'text-[#F5F3EE]'
      }`}
    >
      {/* Brand & Studio Location Coordinates */}
      <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
        <button
          onClick={() => {
            soundEngine.playClick();
            onSelectChapter('arrival');
          }}
          onMouseEnter={() => setCursorState('view', 'HOME')}
          onMouseLeave={() => setCursorState('default')}
          className="text-left group cursor-pointer flex items-baseline gap-3.5 min-h-[44px] py-1"
        >
          <div className="flex items-center gap-2">
            <span className="big-shoulders text-2xl sm:text-3xl font-black tracking-tighter">BUILDiFO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] inline-block shadow-[0_0_6px_#C8FF00]" />
          </div>
          <span
            className={`hidden sm:inline-block inter text-[10px] uppercase tracking-[0.3em] font-semibold transition-opacity ${
              isLightEnvironment ? 'opacity-40 text-[#080808]' : 'opacity-40 text-[#F5F3EE]'
            }`}
          >
            Creative Tech Studio
          </span>
        </button>

        {/* Current Environment Wayfinding Label */}
        <div
          className={`hidden md:flex items-center gap-2 pl-4 border-l text-[10px] inter font-semibold tracking-widest uppercase ${
            isLightEnvironment ? 'border-[#080808]/15 text-[#080808]/70' : 'border-white/10 text-[#A6A39B]'
          }`}
        >
          <span className="opacity-40">CH. {currentChapter.number}:</span>
          <span className="font-bold">{currentChapter.name}</span>
          <span className="opacity-30">/</span>
          <span className="opacity-60">{currentChapter.material}</span>
        </div>
      </div>

      {/* Chapter Wayfinding Timeline */}
      <nav className="hidden lg:flex items-center gap-6 inter text-[10px] uppercase tracking-widest font-semibold pointer-events-auto">
        <span className="opacity-40">Chapters</span>
        <div className="flex items-center gap-3">
          {chapters.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  soundEngine.playClick(900 + idx * 40);
                  onSelectChapter(ch.id);
                }}
                onMouseEnter={() => setCursorState('view', `${ch.number} ${ch.name}`)}
                onMouseLeave={() => setCursorState('default')}
                className={`py-0.5 transition-all duration-200 relative cursor-pointer ${
                  isActive
                    ? `border-b-2 font-bold ${
                        isLightEnvironment ? 'border-[#080808] text-[#080808]' : 'border-[#F5F3EE] text-[#F5F3EE]'
                      }`
                    : 'opacity-30 hover:opacity-80'
                }`}
              >
                <span>{ch.number}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Action Controls: Sound & Inquiry */}
      <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
        <button
          onClick={() => {
            onToggleMute();
            soundEngine.playClick(600);
          }}
          onMouseEnter={() => setCursorState('inspect', isMuted ? 'UNMUTE' : 'MUTE')}
          onMouseLeave={() => setCursorState('default')}
          title={isMuted ? 'Unmute tactile sound' : 'Mute tactile sound'}
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 transition-opacity hover:opacity-100 cursor-pointer ${
            isLightEnvironment ? 'text-[#080808]/70 hover:text-[#080808]' : 'text-[#A6A39B] hover:text-[#F5F3EE]'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={() => {
            soundEngine.playClick(750);
            onOpenInquiry();
          }}
          onMouseEnter={() => setCursorState('enter', 'INQUIRE')}
          onMouseLeave={() => setCursorState('default')}
          className={`min-h-[44px] flex items-center justify-center text-[10px] font-mono-tech tracking-widest uppercase px-3.5 py-2 transition-all duration-300 border cursor-pointer ${
            isLightEnvironment
              ? 'border-[#080808] text-[#080808] hover:bg-[#080808] hover:text-[#F5F3EE]'
              : 'border-[#F5F3EE]/40 text-[#F5F3EE] hover:border-[#F5F3EE] hover:bg-[#F5F3EE] hover:text-[#080808]'
          }`}
        >
          INITIATE / BRIEF
        </button>
      </div>
    </header>
  );
};
