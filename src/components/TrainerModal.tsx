import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle, ArrowRight, Calendar, Star } from 'lucide-react';

export interface TrainerData {
  name: string;
  role: string;
  experience: string;
  image: string;
  bio: string;
  specialties: string[];
  certifications: string[];
}

export default function TrainerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [trainer, setTrainer] = useState<TrainerData | null>(null);

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.trainer) {
        setTrainer(e.detail.trainer);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }
    };

    window.addEventListener('open-trainer-modal', handleOpen);
    return () => {
      window.removeEventListener('open-trainer-modal', handleOpen);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  if (!isOpen || !trainer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0E0E14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo Column */}
        <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-dark-900 overflow-hidden flex-shrink-0">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent md:to-black/30" />
          <div className="absolute bottom-4 left-4 right-4 md:hidden">
            <span className="text-neon text-xs font-bold uppercase tracking-wider block">{trainer.role}</span>
            <h3 className="font-display italic text-2xl font-bold text-white uppercase">{trainer.name}</h3>
          </div>
        </div>

        {/* Content Column */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="hidden md:block mb-4">
              <span className="text-neon text-xs font-bold uppercase tracking-widest">{trainer.role}</span>
              <h3 className="font-display italic text-3xl font-extrabold text-white uppercase tracking-tight">
                {trainer.name}
              </h3>
              <div className="inline-flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                <Award className="w-3.5 h-3.5 text-neon" />
                <span>{trainer.experience} Experience</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              {trainer.bio}
            </p>

            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-1.5">
                {trainer.specialties.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-dark-850 border border-white/10 text-gray-300 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Certifications</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {trainer.certifications.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-neon flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                closeModal();
                window.dispatchEvent(
                  new CustomEvent('open-join-modal', {
                    detail: { plan: 'Elite', trainer: trainer.name },
                  })
                );
              }}
              className="w-full bg-neon hover:bg-neon-hover text-black font-extrabold uppercase tracking-wider py-3 px-5 rounded-full text-xs sm:text-sm transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation With {trainer.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
