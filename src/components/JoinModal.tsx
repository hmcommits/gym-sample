import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function JoinModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Premium');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: 'Strength & Muscle',
    timing: 'Morning (6:00 AM - 10:00 AM)',
  });

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.plan) {
        setSelectedPlan(e.detail.plan);
      }
      setSubmitted(false);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-join-modal', handleOpen);
    return () => {
      window.removeEventListener('open-join-modal', handleOpen);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0E0E14] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-neon/10 border border-neon rounded-full flex items-center justify-center mx-auto mb-5 text-neon shadow-[0_0_25px_rgba(204,255,0,0.3)]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-display italic text-3xl font-extrabold text-white uppercase tracking-tight mb-2">
              YOU'RE ON THE <span className="text-neon">ROSTER!</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              Welcome to Peakform Fitness Club, <span className="text-white font-semibold">{formData.name || 'Athlete'}</span>! Our head coach will call you at <span className="text-neon font-medium">{formData.phone || '+91 98765 43210'}</span> to schedule your orientation and free InBody assessment.
            </p>
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6 text-left text-xs space-y-1.5 text-gray-400">
              <div className="flex justify-between"><span className="text-gray-500">Selected Tier:</span> <span className="text-neon font-bold uppercase">{selectedPlan}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Primary Goal:</span> <span className="text-white">{formData.goal}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Preferred Slot:</span> <span className="text-white">{formData.timing}</span></div>
            </div>
            <button
              onClick={closeModal}
              className="w-full bg-neon hover:bg-neon-hover text-black font-extrabold uppercase tracking-wider py-3.5 px-6 rounded-full text-sm transition-all hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]"
            >
              Done & Return To Site
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/30 text-neon text-xs font-bold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Start Your Transformation
              </div>
              <h2 className="font-display italic text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-none">
                JOIN THE <span className="text-neon">CLUB</span>
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Fill in your details to secure your membership pass & book your free coaching consultation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Select Membership Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Basic', 'Premium', 'Elite'].map((plan) => (
                    <button
                      type="button"
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                        selectedPlan === plan
                          ? 'bg-neon text-black border-neon shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                          : 'bg-dark-850 text-gray-400 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#16161E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#16161E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#16161E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Primary Fitness Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-[#16161E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                >
                  <option value="Strength & Muscle Building">Strength & Muscle Building</option>
                  <option value="Weight Loss & Fat Burn">Weight Loss & Fat Burn</option>
                  <option value="Endurance & Functional Stamina">Endurance & Functional Stamina</option>
                  <option value="Mobility, Rehab & Flexibility">Mobility, Rehab & Flexibility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Preferred Training Slot
                </label>
                <select
                  value={formData.timing}
                  onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                  className="w-full bg-[#16161E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                >
                  <option value="Morning (6:00 AM - 10:00 AM)">Morning (6:00 AM - 10:00 AM)</option>
                  <option value="Afternoon (10:00 AM - 4:00 PM)">Afternoon (10:00 AM - 4:00 PM)</option>
                  <option value="Evening (4:00 PM - 10:30 PM)">Evening (4:00 PM - 10:30 PM)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-neon hover:bg-neon-hover text-black font-extrabold uppercase tracking-wider py-3.5 px-6 rounded-full text-sm transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] group"
                >
                  <span>Confirm Pass & Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neon" />
                <span>3-day free guest trial included. Zero obligations.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
