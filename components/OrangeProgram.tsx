import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const OrangeProgram: React.FC<{ onNavigate?: (page: 'home' | 'methodology') => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section id="program" className="bg-tokyon-gray border-b border-white/10 py-32 md:py-48 relative overflow-hidden">
      {/* Background Text Texture */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
         <div className="font-display font-black text-[20vw] text-white leading-none whitespace-nowrap -rotate-12 origin-center translate-y-1/4">
            ORANGE PROGRAM ORANGE PROGRAM
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4">
             <span className="font-mono text-xs text-tokyon-orange mb-4 block">{t.program.label}</span>
             <h2 className="font-display font-bold text-5xl md:text-7xl text-white leading-[0.9] tracking-tighter mb-8">
                {t.program.title_prefix} <br />
                <span className="text-tokyon-orange">{t.program.title_highlight}</span> <br />
                {t.program.title_suffix}
             </h2>
          </div>

          <div className="md:col-span-8 flex flex-col justify-end">
             <p className="text-xl md:text-3xl text-white font-light leading-snug mb-12">
                {t.program.description}
             </p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                   <h4 className="text-white font-bold uppercase tracking-wider mb-2">{t.program.card1_title}</h4>
                   <p className="text-gray-400 text-sm">{t.program.card1_desc}</p>
                </div>
                <div>
                   <h4 className="text-white font-bold uppercase tracking-wider mb-2">{t.program.card2_title}</h4>
                   <p className="text-gray-400 text-sm">{t.program.card2_desc}</p>
                </div>
             </div>

             <div className="mt-12">
               <button 
                 onClick={() => onNavigate && onNavigate('methodology')}
                 className="inline-block bg-white text-tokyon-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-tokyon-orange hover:text-white transition-colors"
               >
                 {t.program.cta}
               </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};