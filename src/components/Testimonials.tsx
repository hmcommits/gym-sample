import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetUrl } from '../utils/cloudinary';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Aditya K.',
      memberFor: 'Member for 8 Months',
      image: getAssetUrl('memberAditya'),
      quote: '"Lost 12 kg and feel stronger than ever. The trainers are super supportive!"',
    },
    {
      name: 'Sneha M.',
      memberFor: 'Member for 6 Months',
      image: getAssetUrl('memberSneha'),
      quote: '"A great environment, professional trainers and amazing results. Highly recommend!"',
    },
    {
      name: 'Rohit S.',
      memberFor: 'Member for 1 Year',
      image: getAssetUrl('memberRohit'),
      quote: '"The best gym in the area! Modern equipment, clean space and a motivating vibe."',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#070709] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(204,255,0,0.04)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header row */}
        <div className="flex items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-[#CCFF00] text-[11px] font-black uppercase tracking-widest mb-1.5 sm:mb-2">MEMBER STORIES</div>
            <h2 className="font-display italic font-black text-white uppercase leading-[0.88]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              REAL RESULTS, REAL PEOPLE
            </h2>
          </div>
          
          {/* Navigation arrows — reference style: circle outline */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={prev}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Review Cards: 1 active card on mobile, all 3 side-by-side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((rev, idx) => (
            <div
              key={rev.name}
              className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
                idx === currentIndex ? 'block' : 'hidden md:block'
              } ${
                idx === currentIndex
                  ? 'border-[rgba(204,255,0,0.4)] bg-[#111118] shadow-[0_0_30px_rgba(204,255,0,0.08)]'
                  : 'border-white/[0.08] bg-[#0E0E14] hover:border-white/15'
              }`}
            >
              {/* Top: avatar + name + stars in a row */}
              <div className="flex items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Circular avatar */}
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ${idx === currentIndex ? 'ring-[#CCFF00]' : 'ring-white/10'}`}>
                    <img
                      src={rev.image}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display italic font-black text-white uppercase text-base leading-tight truncate">
                      {rev.name}
                    </div>
                    <div className="text-gray-400 text-[11px] sm:text-xs mt-0.5 truncate">{rev.memberFor}</div>
                  </div>
                </div>
                {/* Stars */}
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" viewBox="0 0 24 24">
                      <path d="M12 2l2.4 4.9L20 8l-4 3.9.9 5.6L12 15l-4.9 2.5.9-5.6L4 8l5.6-.1L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {rev.quote}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile pagination dots */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex ? 'w-6 bg-[#CCFF00]' : 'w-2 bg-white/20'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}