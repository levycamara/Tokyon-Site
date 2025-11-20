import React from 'react';
import { ArrowDown } from 'phosphor-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col pt-20 border-b border-white/10">
      {/* Grid Background Lines */}
      <div className="absolute inset-0 flex justify-between pointer-events-none select-none px-4 md:px-8 opacity-20">
        <div className="w-px h-full bg-white/10"></div>
        <div className="w-px h-full bg-white/10 hidden md:block"></div>
        <div className="w-px h-full bg-white/10 hidden md:block"></div>
        <div className="w-px h-full bg-white/10"></div>
      </div>

      <div className="flex-grow flex flex-col justify-center relative z-10 px-4 md:px-8 max-w-[1920px] mx-auto w-full">
        
        <div className="mb-4 flex items-center gap-4 animate-fade-in">
           <div className="h-px w-12 bg-tokyon-orange"></div>
           <span className="font-mono text-xs md:text-sm text-tokyon-orange tracking-widest uppercase">{t.hero.subtitle}</span>
        </div>

        <h1 className="font-display font-extrabold text-[15vw] leading-[0.8] tracking-tighter text-white mix-blend-difference animate-slide-up">
          TOKYON<span className="text-tokyon-orange">.</span>
        </h1>
        
        <div className="flex flex-col md:flex-row justify-between items-end mt-8 md:mt-4 border-t border-white/10 pt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-md">
            <p className="text-lg md:text-2xl text-gray-400 font-light leading-tight">
              {t.hero.description}
            </p>
          </div>
          
          <div className="hidden md:block text-right">
             <p className="text-xs font-mono text-gray-500 mb-2">{t.hero.est}</p>
             <p className="text-xs font-mono text-gray-500">{t.hero.global}</p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-8 animate-bounce">
        <ArrowDown size={24} className="text-tokyon-orange" />
      </div>
    </section>
  );
};