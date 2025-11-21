import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowsClockwise, ShieldCheck, Rocket, Gear } from 'phosphor-react';
import { useLanguage } from '../contexts/LanguageContext';

export const MethodologyPage: React.FC<{ onNavigate: (page: 'home' | 'methodology') => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Cycle through steps automatically
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000); // 4 seconds per step

    return () => clearInterval(interval);
  }, [isPaused]);

  const steps = [
    { icon: ArrowsClockwise, title: t.methodology.step1_title, desc: t.methodology.step1_desc },
    { icon: Rocket, title: t.methodology.step2_title, desc: t.methodology.step2_desc },
    { icon: ShieldCheck, title: t.methodology.step3_title, desc: t.methodology.step3_desc },
    { icon: ArrowRight, title: t.methodology.step4_title, desc: t.methodology.step4_desc },
  ];

  return (
    <div className="bg-tokyon-black min-h-screen pt-20 animate-fade-in">
      
      {/* Header Section */}
      <section className="border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] skew-x-12 pointer-events-none"></div>
        
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 pt-24 pb-12">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px w-12 bg-tokyon-orange"></div>
             <span className="font-mono text-xs md:text-sm text-tokyon-orange tracking-widest uppercase">{t.methodology.label}</span>
          </div>
          
          <h1 className="font-display font-black text-[10vw] leading-[0.85] text-white tracking-tighter uppercase mb-12">
            {t.methodology.title_prefix} <br />
            {t.methodology.title_suffix}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/10 pt-12">
            <div className="md:col-span-5">
              <p className="text-2xl text-white font-light leading-tight">
                {t.methodology.intro_text} <span className="text-tokyon-orange font-medium">{t.methodology.intro_highlight}</span>.
              </p>
            </div>
            <div className="md:col-span-7 flex flex-col justify-end">
              <p className="text-gray-400 max-w-xl">
                {t.methodology.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10">
        
        {/* Pillar 1 */}
        <div className="border-r border-white/10 p-8 md:p-12 hover:bg-white/5 transition-colors group">
          <span className="font-mono text-xs text-gray-500 mb-12 block">01 — FOUNDATION</span>
          <h3 className="font-display font-bold text-4xl text-white mb-6 group-hover:text-tokyon-orange transition-colors">{t.methodology.pillar1_title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {t.methodology.pillar1_desc}
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-white"><div className="w-1 h-1 bg-tokyon-orange"></div>Brand Core®</li>
            <li className="flex items-center gap-3 text-sm text-white"><div className="w-1 h-1 bg-tokyon-orange"></div>Monthly Review®</li>
          </ul>
        </div>

        {/* Pillar 2 */}
        <div className="border-r border-white/10 p-8 md:p-12 hover:bg-white/5 transition-colors group">
          <span className="font-mono text-xs text-gray-500 mb-12 block">02 — EXPRESSION</span>
          <h3 className="font-display font-bold text-4xl text-white mb-6 group-hover:text-tokyon-orange transition-colors">{t.methodology.pillar2_title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {t.methodology.pillar2_desc}
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-white"><div className="w-1 h-1 bg-tokyon-orange"></div>Orange Identity®</li>
            <li className="flex items-center gap-3 text-sm text-white"><div className="w-1 h-1 bg-tokyon-orange"></div>Social Presence®</li>
            <li className="flex items-center gap-3 text-sm text-white"><div className="w-1 h-1 bg-tokyon-orange"></div>SalesKit®</li>
          </ul>
        </div>

        {/* Pillar 3 */}
        <div className="p-8 md:p-12 hover:bg-white/5 transition-colors group">
          <span className="font-mono text-xs text-gray-500 mb-12 block">03 — LONGEVITY</span>
          <h3 className="font-display font-bold text-4xl text-white mb-6 group-hover:text-tokyon-orange transition-colors">{t.methodology.pillar3_title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {t.methodology.pillar3_desc}
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-white"><div className="w-1 h-1 bg-tokyon-orange"></div>Web Evolution®</li>
            <li className="flex items-center gap-3 text-sm text-white"><div className="w-1 h-1 bg-tokyon-orange"></div>BrandGuard®</li>
            <li className="flex items-center gap-3 text-sm text-white"><div className="w-1 h-1 bg-tokyon-orange"></div>Orange Automations®</li>
          </ul>
        </div>
      </section>

      {/* The Cycle - Animated Process View */}
      <section className="py-24 border-b border-white/10 relative bg-tokyon-black overflow-hidden">
         {/* Background Pulse Effect */}
         <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className={`absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-[4000ms] ease-linear`}
                 style={{ transform: `translateX(${(activeStep * 25) - 25}%)` }}>
            </div>
         </div>

         <div className="max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
               <div>
                  <span className="font-mono text-xs text-tokyon-orange mb-4 block flex items-center gap-2">
                    {t.methodology.cycle_label}
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                  </span>
                  <h2 className="font-display font-bold text-5xl text-white">{t.methodology.cycle_title}</h2>
               </div>

               {/* The "Engine" Animation Visual */}
               <div className="flex items-center gap-4 opacity-50">
                  <div className="relative w-16 h-16">
                     {/* Outer Ring */}
                     <div className="absolute inset-0 border border-white/30 rounded-full border-dashed animate-spin-slow"></div>
                     {/* Inner Ring */}
                     <div className="absolute inset-2 border border-white/50 rounded-full border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                     {/* Core */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-tokyon-orange rounded-full animate-pulse"></div>
                     </div>
                  </div>
                  <div className="hidden md:block">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">System Status</p>
                    <p className="font-mono text-xs text-white uppercase tracking-widest">Operational</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10"
                 onMouseEnter={() => setIsPaused(true)}
                 onMouseLeave={() => setIsPaused(false)}>
               
               {steps.map((step, index) => {
                 const isActive = activeStep === index;
                 const Icon = step.icon;
                 
                 return (
                   <div 
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`
                        relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 transition-all duration-500 cursor-pointer
                        ${isActive ? 'bg-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]' : 'hover:bg-white/5'}
                      `}
                   >
                      {/* Active Top Border Highlight */}
                      <div className={`absolute top-0 left-0 w-full h-[2px] bg-tokyon-orange transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

                      {/* Icon & Number */}
                      <div className="flex justify-between items-start mb-12">
                         <span className={`font-mono text-4xl font-bold transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/20'}`}>
                            0{index + 1}
                         </span>
                         <Icon 
                            size={32} 
                            className={`transition-all duration-500 ${isActive ? 'text-tokyon-orange scale-110' : 'text-white/20'}`} 
                            weight={isActive ? "fill" : "regular"}
                         />
                      </div>
                      
                      {/* Content */}
                      <h4 className={`text-xl font-bold mb-4 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {step.title}
                      </h4>
                      <p className={`text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                        {step.desc}
                      </p>

                      {/* Progress Bar at Bottom */}
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 overflow-hidden">
                         <div 
                            className={`h-full bg-tokyon-orange transition-all ease-linear`}
                            style={{ 
                              width: isActive && !isPaused ? '100%' : '0%', 
                              transitionDuration: isActive && !isPaused ? '4000ms' : '0ms' 
                            }}
                         ></div>
                      </div>
                   </div>
                 );
               })}

            </div>
            
            <div className="mt-4 flex justify-center md:justify-end gap-2">
               {steps.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${activeStep === idx ? 'bg-tokyon-orange w-6' : 'bg-white/20 hover:bg-white/50'}`}
                  />
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 md:px-8 text-center">
         <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8">
            {t.methodology.cta_title}
         </h2>
         <button 
           onClick={() => {
             onNavigate('home');
             setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
             }, 100);
           }}
           className="bg-tokyon-orange text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-tokyon-black transition-all"
         >
            {t.methodology.cta_button}
         </button>
      </section>
    </div>
  );
};