import React, { useState, useEffect } from 'react';
import { getIcon } from '../constants';
import { ArrowRight } from 'phosphor-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServicesSectionProps {
  onNavigate?: (page: 'home' | 'service-detail', id?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeServiceId, setActiveServiceId] = useState(t.services.list[0].id);

  // When language changes, ensure activeServiceId is still valid
  useEffect(() => {
    setActiveServiceId(t.services.list[0].id);
  }, [t]);

  const activeService = t.services.list.find(s => s.id === activeServiceId) || t.services.list[0];

  const handleServiceClick = (id: string) => {
    if (onNavigate) {
      onNavigate('service-detail', id);
    }
  };

  return (
    <section id="services" className="bg-tokyon-black border-b border-white/10 relative">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT COLUMN: The List (Scrollable) */}
        <div className="w-full lg:w-1/2 border-r border-white/10 flex flex-col">
          <div className="p-8 md:p-12 border-b border-white/10 sticky top-0 bg-tokyon-black z-20">
             <span className="font-mono text-xs text-tokyon-orange mb-2 block">{t.services.label}</span>
             <h2 className="font-display font-bold text-4xl text-white uppercase">{t.services.title}</h2>
          </div>

          <div className="flex-grow">
            {t.services.list.map((service, index) => (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveServiceId(service.id)}
                onClick={() => handleServiceClick(service.id)}
                className={`
                  group relative border-b border-white/10 cursor-pointer transition-all duration-300
                  ${activeServiceId === service.id ? 'bg-white' : 'bg-transparent hover:bg-white/5'}
                `}
              >
                <div className="p-8 md:p-10 flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-6">
                    <span className={`font-mono text-sm ${activeServiceId === service.id ? 'text-tokyon-black' : 'text-gray-600'}`}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className={`font-display font-bold text-2xl md:text-3xl mb-2 uppercase transition-colors ${activeServiceId === service.id ? 'text-tokyon-black' : 'text-white'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm md:text-base max-w-md transition-colors ${activeServiceId === service.id ? 'text-gray-800' : 'text-gray-500'}`}>
                         {service.description.split('.')[0]}.
                      </p>
                    </div>
                  </div>
                  
                  <ArrowRight 
                    size={24} 
                    className={`transform transition-transform duration-300 ${activeServiceId === service.id ? 'text-tokyon-orange -rotate-45' : 'text-white/20 group-hover:text-white'}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: The Preview (Sticky) */}
        <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 bg-tokyon-black items-center justify-center overflow-hidden">
           
           {/* Dynamic Background Effect */}
           <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tokyon-orange/20 rounded-full blur-[120px] animate-pulse"></div>
           </div>
           
           {/* Grid Lines on Right Panel */}
           <div className="absolute inset-0 border-l border-white/5 pointer-events-none"></div>

           <div className="relative z-10 p-12 max-w-xl w-full flex flex-col justify-between h-full py-24">
              
              {/* Top Info */}
              <div className="flex justify-between items-start border-b border-white/10 pb-8">
                 <div>
                   <span className="font-mono text-xs text-gray-500 block mb-2">CATEGORY</span>
                   <span className="font-display font-semibold text-xl text-white">{t.services.category}</span>
                 </div>
                 <div className="text-right">
                   <span className="font-mono text-xs text-gray-500 block mb-2">ID</span>
                   <span className="font-display font-bold text-4xl text-tokyon-orange">
                      {(t.services.list.findIndex(s => s.id === activeServiceId) + 1).toString().padStart(2, '0')}
                   </span>
                 </div>
              </div>

              {/* Center Icon Visual */}
              <div className="flex-grow flex items-center justify-center py-12 cursor-pointer" onClick={() => handleServiceClick(activeService.id)}>
                 <div key={activeService.id} className="animate-slide-up relative group">
                    <div className="text-tokyon-orange opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-[2.5] blur-sm transition-all duration-500 group-hover:scale-[3]">
                       {getIcon(activeService.iconName, "w-64 h-64")}
                    </div>
                    <div className="text-white relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
                       {getIcon(activeService.iconName, "w-48 h-48")}
                    </div>
                 </div>
              </div>

              {/* Bottom Detail */}
              <div key={activeService.title} className="animate-fade-in">
                 <h2 className="font-display font-bold text-5xl text-white mb-6 leading-none tracking-tight">
                    {activeService.title}
                 </h2>
                 <p className="text-gray-400 text-lg leading-relaxed mb-8 border-l-2 border-tokyon-orange pl-6">
                    {activeService.description}
                 </p>
                 <button 
                   onClick={() => handleServiceClick(activeService.id)}
                   className="inline-flex items-center gap-3 text-tokyon-orange hover:text-white transition-colors uppercase font-bold tracking-widest text-sm group"
                 >
                    {t.services.cta} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
};