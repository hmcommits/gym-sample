import React from 'react';
import type { TrainerData } from './TrainerModal';

interface Props {
  trainer: TrainerData;
}

export default function TrainerCard({ trainer }: Props) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent('open-trainer-modal', { detail: { trainer } })
    );
  };

  return (
    <div
      onClick={handleClick}
      className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[rgba(204,255,0,0.5)] transition-all duration-400 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-10px_rgba(204,255,0,0.25)]"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Photo */}
      <img
        src={trainer.image}
        alt={trainer.name}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-600 group-hover:scale-105"
      />

      {/* Top-left neon accent corner sheen matching reference.png */}
      <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-[#CCFF00]/25 via-[#CCFF00]/5 to-transparent pointer-events-none" />

      {/* Gradient — strong at bottom, light at top */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 70%, transparent 100%)' }}
      />

      {/* Bottom content — name, role, neon arrow */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 flex items-end justify-between gap-1">
        <div className="min-w-0 flex-1">
          <h3 className="font-display italic font-black text-white uppercase leading-tight text-xs sm:text-base lg:text-lg group-hover:text-[#CCFF00] transition-colors duration-300 truncate">
            {trainer.name}
          </h3>
          <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 truncate">{trainer.role}</p>
        </div>

        {/* Neon circular arrow button */}
        <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-[#CCFF00] text-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_12px_rgba(204,255,0,0.4)]">
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}