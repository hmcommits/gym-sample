import React from 'react';
import { ArrowRight, Check, Dumbbell, Crown, Gem } from 'lucide-react';
import { getAssetUrl } from '../utils/cloudinary';

export default function PricingSection() {
  const kettlebellUrl = getAssetUrl('membershipKettlebell');

  const plans = [
    {
      name: 'Basic',
      price: '1,499',
      popular: false,
      icon: (
        <svg className="w-6 h-6 text-white stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12M4 7v10M20 7v10" />
        </svg>
      ),
      features: [
        'Gym Access (All Hours)',
        'Basic Workout Guidance',
        'Locker Facility',
      ],
      ctaText: 'Get Started',
      ctaIcon: false,
    },
    {
      name: 'Premium',
      price: '2,499',
      popular: true,
      icon: <Crown className="w-6 h-6 text-[#CCFF00]" />,
      features: [
        'Everything in Basic',
        'Personalized Training Plan',
        'Group Classes (HIIT, Core, Mobility)',
        'InBody Fitness Assessment',
      ],
      ctaText: 'Get Started',
      ctaIcon: true,
    },
    {
      name: 'Elite',
      price: '3,999',
      popular: false,
      icon: <Gem className="w-6 h-6 text-white" />,
      features: [
        'Everything in Premium',
        '1-on-1 Personal Coaching',
        'Diet & Nutrition Guidance',
        'Progress Tracking & Review',
      ],
      ctaText: 'Get Started',
      ctaIcon: false,
    },
  ];

  const handleSelectPlan = (planName: string) => {
    window.dispatchEvent(new CustomEvent('open-join-modal', { detail: { plan: planName } }));
  };

  return (
    <section id="membership" className="py-14 sm:py-20 lg:py-24 bg-[#070709] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(204,255,0,0.04)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Left column (header + kettlebell) | Right column (3 vertical cards) */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-14 items-center lg:items-start">

          {/* LEFT column: Heading + Subtitle + Kettlebell graphic */}
          <div className="lg:w-[300px] flex-shrink-0 w-full text-left">
            <div className="text-[#CCFF00] text-xs font-black uppercase tracking-widest mb-2 sm:mb-3">MEMBERSHIP PLANS</div>
            <h2 className="font-display italic font-black text-white uppercase leading-[0.88] mb-3 sm:mb-4"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
              CHOOSE YOUR<br/>
              <span className="text-[#CCFF00]" style={{ textShadow: '0 0 25px rgba(204,255,0,0.4)' }}>FITNESS PLAN</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              Flexible and affordable plans designed for your goals.
            </p>

            {/* Kettlebell graphic with green smoky glow */}
            <div className="relative rounded-2xl overflow-hidden max-w-[200px] sm:max-w-[240px] mx-auto lg:mx-0">
              <img
                src={kettlebellUrl}
                alt="Peakform kettlebell & weight plate"
                className="w-full object-contain drop-shadow-[0_0_30px_rgba(204,255,0,0.25)]"
              />
            </div>
          </div>

          {/* RIGHT column: 3 Plan Cards */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-[#CCFF00] bg-[#111118] shadow-[0_0_40px_rgba(204,255,0,0.25)] lg:-translate-y-2'
                    : 'border border-white/10 bg-[#0E0E14] hover:border-white/20'
                }`}
              >
                {/* Most Popular Badge on Top Right */}
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.5)]">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Top row: Icon + Name */}
                  <div className="flex items-center gap-3 mb-2">
                    {plan.icon}
                    <h3 className={`font-display italic font-black uppercase text-2xl tracking-tight ${plan.popular ? 'text-[#CCFF00]' : 'text-white'}`}>
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/[0.08]">
                    <span className="font-display italic font-black text-white text-3xl sm:text-4xl leading-none">
                      ₹{plan.price}
                    </span>
                    <span className="text-gray-400 text-xs font-medium">/ month</span>
                  </div>

                  {/* Features list with yellow checkmarks */}
                  <div className="space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                        <Check className="w-4 h-4 text-[#CCFF00] stroke-[3] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-3.5 px-6 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group ${
                    plan.popular
                      ? 'bg-[#CCFF00] hover:bg-[#D4F933] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_rgba(204,255,0,0.6)]'
                      : 'border border-white/20 hover:border-[#CCFF00] text-white hover:text-[#CCFF00] bg-transparent'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  {plan.ctaIcon && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}