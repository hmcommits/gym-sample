import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { getAssetUrl } from '../utils/cloudinary';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const logoUrl = getAssetUrl('logo');

  useEffect(() => {
    setMounted(true);
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
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#09090E] p-6 sm:p-8 animate-fadeIn overflow-y-auto">
      {/* Top Bar inside drawer */}
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

      {/* Nav Links */}
      <div className="py-6 sm:py-8 space-y-4 my-auto">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={close}
            className="font-display italic text-3xl sm:text-4xl font-extrabold text-white hover:text-[#CCFF00] uppercase tracking-wider block transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Bottom Actions & Contact Info */}
      <div className="space-y-4 pt-6 border-t border-white/10 flex-shrink-0">
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
      {/* Hamburger Button */}
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Portal to body so header's backdrop-filter never traps or clips the drawer */}
      {isOpen && mounted && typeof document !== 'undefined'
        ? createPortal(drawerContent, document.body)
        : null}
    </div>
  );
}