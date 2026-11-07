import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { getAssetUrl } from '../utils/cloudinary';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const logoUrl = getAssetUrl('logo');

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, []);

  const toggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = nextState ? 'hidden' : '';
    }
  };

  const close = () => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Programs', href: '#programs' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Membership', href: '#membership' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleJoinClick = () => {
    close();
    window.dispatchEvent(new CustomEvent('open-join-modal', { detail: { plan: 'Premium' } }));
  };

  const drawerContent = (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#070709]/95 backdrop-blur-2xl p-6 sm:p-8 overflow-y-auto transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
          : 'opacity-0 -translate-y-full pointer-events-none invisible'
      }`}
    >
      {/* Top Bar inside drawer: aligned with header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10 flex-shrink-0">
        <a href="#home" onClick={close} className="flex-shrink-0">
          <img
            src={logoUrl}
            alt="Peakform Fitness Club"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>
        <button
          onClick={close}
          className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Links with staggered slide-in transition */}
      <div className="py-6 sm:py-8 space-y-4 my-auto">
        {navLinks.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            onClick={close}
            style={{
              transitionDelay: isOpen ? `${60 + idx * 35}ms` : '0ms',
            }}
            className={`font-display italic text-3xl sm:text-4xl font-extrabold uppercase tracking-wider block transition-all duration-300 ${
              isOpen
                ? 'opacity-100 translate-x-0 text-white hover:text-[#CCFF00]'
                : 'opacity-0 -translate-x-4 text-white'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Bottom Actions & Contact Info */}
      <div
        style={{ transitionDelay: isOpen ? '280ms' : '0ms' }}
        className={`space-y-4 pt-6 border-t border-white/10 flex-shrink-0 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={handleJoinClick}
          className="w-full bg-[#CCFF00] hover:bg-[#D4F933] text-black font-extrabold uppercase tracking-wider py-4 px-6 rounded-full text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.35)] cursor-pointer"
        >
          <span>Join the Club</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="space-y-2 text-xs text-gray-400 pt-1">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-3.5 h-3.5 text-[#CCFF00] flex-shrink-0" />
            <span>Shivaji Chowk, Kalyan (W), Maharashtra</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-3.5 h-3.5 text-[#CCFF00] flex-shrink-0" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-3.5 h-3.5 text-[#CCFF00] flex-shrink-0" />
            <span>Mon-Sat: 6:00 AM - 10:30 PM | Sun: 7 AM - 2 PM</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      {/* Morphing Hamburger Button */}
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex flex-col items-center justify-center gap-1 text-white hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-out origin-center ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span
          className={`w-4 h-0.5 bg-current rounded-full transition-all duration-200 ease-out ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
          }`}
        />
        <span
          className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-out origin-center ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </button>

      {/* Portal to body: always mounted when client-ready so exit/entry animations run seamlessly */}
      {mounted && typeof document !== 'undefined'
        ? createPortal(drawerContent, document.body)
        : null}
    </div>
  );
}
