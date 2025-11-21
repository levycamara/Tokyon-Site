import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Check } from 'phosphor-react';
import { getIcon } from '../constants';
import { getPortfolioForService } from '../services/contentService';
import { PortfolioItem } from '../types';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (page: 'home' | 'service-detail' | 'case-study', id?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onNavigate }) => {
  const { t, language } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  
  const serviceIndex = t.services.list.findIndex(s => s.id === serviceId);
  const service = t.services.list[serviceIndex];
  const nextService = t.services.list[(serviceIndex + 1) % t.services.list.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingPortfolio(true);
      const items = await getPortfolioForService(serviceId, language);
      setPortfolioItems(items);
      setIsLoadingPortfolio(false);
    };
    loadData();
  }, [serviceId, language]);

  if (!service) return <div>Service not found</div>;

  const details = service.details || {
    fullDescription: service.description,
    benefitTitle: "Benefícios",
    benefits: ["High impact", "Strategic alignment"],
    deliverablesTitle: "Entregáveis",
    deliverables: ["Consultation", "Implementation"],
    portfolioTitle: "Cases Selecionados"
  };

  // Helper to determine background style for cards
  const getCardBackground = (item: PortfolioItem) => {
    // Priority 1: Hero Image URL
    if (item.heroImage && item.heroImage.startsWith('http')) {
       return { backgroundImage: `url(${item.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    // Priority 2: Image Color is a URL (Legacy)
    if (item.imageColor && item.imageColor.startsWith('http')) {
       return { backgroundImage: `url(${item.imageColor})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    // Priority 3: CSS Class (handled via className, not style)
    return {};
  };

  const getCardClasses = (item: PortfolioItem) => {
     if ((item.heroImage && item.heroImage.startsWith('http')) || (item.imageColor && item.imageColor.startsWith('http'))) {
        return 'bg-gray-900'; // Base color while loading
     }
     return item.imageColor || 'bg-gray-900';
  };

  return (
    <div className="bg-tokyon-black min-h-screen pt-20 animate-fade-in text-white">

      <div className="fixed top-20 left-0 w-full z-20 px-4 md:px-8 py-4 pointer-events-none">
        <button 
          onClick={() => onNavigate('home')}
          className="pointer-events-auto flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white uppercase tracking-widest transition-colors backdrop-blur-sm bg-tokyon-black/50 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={14} /> {t.services.back}
        </button>
      </div>

      <section className="border-b border-white/10 pt-32 pb-16 relative overflow-hidden">
         <div className="absolute right-0 top-0 h-full w-1/2 opacity-[0.03] pointer-events-none">
            {getIcon(service.iconName, "w-full h-full")}
         </div>
         <div className="max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-px w-12 bg-tokyon-orange"></div>
               <span className="font-mono text-xs md:text-sm text-tokyon-orange tracking-widest uppercase">SERVICE ID: {service.id.toUpperCase()}</span>
            </div>
            <h1 className="font-display font-black text-[10vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
               {service.title}
            </h1>
         </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] border-b border-white/10">
        <div className="lg:col-span-7 p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
           <h3 className="font-display text-3xl text-white mb-8">{language === 'pt' ? 'O Escopo' : 'The Scope'}</h3>
           <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-12">{details.fullDescription}</p>
           <div className="mt-12">
              <h4 className="font-mono text-xs text-tokyon-orange uppercase tracking-widest mb-6">{details.benefitTitle}</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400">
                    <Check size={18} className="text-white mt-1 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
           </div>
        </div>
        <div className="lg:col-span-5 p-8 md:p-16 bg-white/5">
           <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-8">{details.deliverablesTitle}</h4>
           <ul className="space-y-0">
             {details.deliverables.map((item, idx) => (
               <li key={idx} className="border-b border-white/10 py-4 flex items-center justify-between group hover:pl-4 transition-all cursor-default">
                 <span className="text-lg font-medium text-white">{item}</span>
                 <span className="text-tokyon-orange opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
               </li>
             ))}
           </ul>
        </div>
      </section>

      <section className="py-24 border-b border-white/10">
          <div className="max-w-[1920px] mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-16">
                <h2 className="font-display font-bold text-5xl text-white uppercase">{details.portfolioTitle}</h2>
            </div>

            {isLoadingPortfolio ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="animate-pulse bg-white/5 h-96"></div></div>
            ) : portfolioItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {portfolioItems.map((item, idx) => (
                  <div key={idx} onClick={() => item.slug && onNavigate('case-study', item.slug)} className="group cursor-pointer">
                      <div 
                        className={`aspect-[4/5] mb-6 relative overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-tokyon-orange/50 ${getCardClasses(item)}`}
                        style={getCardBackground(item)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                            <span className="border border-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-white bg-black/50">
                              {language === 'pt' ? 'Ver Case Completo' : 'View Full Case'}
                            </span>
                        </div>
                        <div className="absolute bottom-4 left-4 opacity-50">
                            <span className="font-display font-black text-6xl text-white/20">0{idx + 1}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-start border-t border-white/10 pt-4">
                        <div>
                            <h4 className="text-xl font-bold text-white mb-1">{item.client}</h4>
                            <p className="text-sm text-gray-500">{item.project}</p>
                        </div>
                        <ArrowRight className="text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                      </div>
                  </div>
                ))}
              </div>
            ) : (
               <div className="py-12 text-center border border-dashed border-white/10"><p className="text-gray-500">Loading...</p></div>
            )}
          </div>
      </section>

      <section 
        onClick={() => onNavigate('service-detail', nextService.id)}
        className="h-[50vh] flex items-center justify-center bg-white/5 hover:bg-tokyon-orange transition-colors duration-700 cursor-pointer group border-b border-white/10 relative overflow-hidden"
      >
         <div className="text-center relative z-10">
            <span className="font-mono text-xs text-white/50 uppercase tracking-widest mb-4 block group-hover:text-white">{t.services.next_service}</span>
            <h2 className="font-display font-black text-6xl md:text-8xl text-white group-hover:scale-110 transition-transform duration-700">
               {nextService.title}
            </h2>
         </div>
      </section>
    </div>
  );
};