
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Check } from 'phosphor-react';
import { getIcon } from '../constants';
import { getPortfolioForService } from '../services/contentService';
import { PortfolioItem } from '../types';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (page: 'home' | 'service-detail', id?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onNavigate }) => {
  const { t, language } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  
  // Find current service data from translations (Static texts like Title/Description remain in code for speed)
  const serviceIndex = t.services.list.findIndex(s => s.id === serviceId);
  const service = t.services.list[serviceIndex];
  const nextService = t.services.list[(serviceIndex + 1) % t.services.list.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Fetch dynamic portfolio content (CMS or Local)
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

  const defaultDetails = {
    fullDescription: service.description,
    benefitTitle: language === 'pt' ? "Benefícios" : "Benefits",
    benefits: ["High impact", "Strategic alignment", "Professional execution"],
    deliverablesTitle: language === 'pt' ? "Entregáveis" : "Deliverables",
    deliverables: ["Consultation", "Implementation", "Review"],
    portfolioTitle: language === 'pt' ? "Cases Selecionados" : "Selected Works",
  };

  // Fallback if details aren't fully populated in translation yet
  const details = service.details || defaultDetails;

  return (
    <div className="bg-tokyon-black min-h-screen pt-20 animate-fade-in text-white">
      
      {/* Top Nav Bar within Page */}
      <div className="fixed top-20 left-0 w-full z-20 px-4 md:px-8 py-4 pointer-events-none">
        <button 
          onClick={() => onNavigate('home')}
          className="pointer-events-auto flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white uppercase tracking-widest transition-colors backdrop-blur-sm bg-tokyon-black/50 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={14} /> {t.services.back}
        </button>
      </div>

      {/* Hero Section */}
      <section className="border-b border-white/10 pt-32 pb-16 relative overflow-hidden">
         {/* Abstract Background Element */}
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

      {/* Details Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] border-b border-white/10">
        
        {/* Left: Description */}
        <div className="lg:col-span-7 p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
           <h3 className="font-display text-3xl text-white mb-8">{language === 'pt' ? 'O Escopo' : 'The Scope'}</h3>
           <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-12">
             {details.fullDescription}
           </p>
           
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

        {/* Right: Technical Deliverables */}
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
           
           <div className="mt-12 p-6 border border-white/10 bg-tokyon-black/50 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-tokyon-orange rounded-full text-white">
                  {getIcon(service.iconName, "w-6 h-6")}
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  {language === 'pt' ? 'Incluso no Orange Program' : 'Included in Orange Program'}
                </span>
             </div>
             <p className="text-xs text-gray-400">
               {language === 'pt' 
                 ? 'Este serviço pode ser contratado individualmente ou como parte do ecossistema completo.' 
                 : 'This service can be hired individually or as part of the complete ecosystem for greater efficiency.'}
             </p>
           </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 border-b border-white/10">
          <div className="max-w-[1920px] mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-16">
                <h2 className="font-display font-bold text-5xl text-white uppercase">{details.portfolioTitle}</h2>
                <span className="font-mono text-xs text-gray-500 hidden md:block">
                  {language === 'pt' ? 'ESTUDOS DE CASO' : 'SELECTED CASE STUDIES'}
                </span>
            </div>

            {isLoadingPortfolio ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-white/5 mb-6"></div>
                    <div className="h-6 w-2/3 bg-white/5 mb-2"></div>
                    <div className="h-4 w-1/3 bg-white/5"></div>
                  </div>
                ))}
              </div>
            ) : portfolioItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {portfolioItems.map((item, idx) => (
                  <div key={idx} className="group cursor-pointer">
                      {/* Image Placeholder */}
                      <div 
                        className={`aspect-[4/5] bg-cover bg-center mb-6 relative overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-tokyon-orange/50`}
                        style={{ 
                          backgroundImage: item.imageColor?.includes('url') ? item.imageColor : undefined,
                          background: item.imageColor?.includes('url') ? undefined : (item.imageColor || '#1a1a1a') // Fallback gradient class handled by className usually, but here handled by style/class combo logic
                        }}
                      >
                         {/* If it's a gradient class string (from local data), we apply it as a class. If it's a url (from Sanity), we used style above */}
                         {!item.imageColor?.includes('url') && (
                            <div className={`absolute inset-0 ${item.imageColor}`}></div>
                         )}

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                            <span className="border border-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-white">
                              {language === 'pt' ? 'Ver Case' : 'View Case'}
                            </span>
                        </div>
                        {/* Decorative content inside placeholder */}
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
                      <p className="text-sm text-gray-400 mt-4 leading-relaxed max-w-xs">
                        {item.description}
                      </p>
                  </div>
                ))}
              </div>
            ) : (
               <div className="py-12 text-center border border-dashed border-white/10">
                  <p className="text-gray-500 font-mono text-sm">
                    {language === 'pt' ? 'Novos cases sendo atualizados em breve.' : 'New cases coming soon.'}
                  </p>
               </div>
            )}
          </div>
      </section>

      {/* Next Service Navigation */}
      <section 
        onClick={() => onNavigate('service-detail', nextService.id)}
        className="h-[50vh] flex items-center justify-center bg-white/5 hover:bg-tokyon-orange transition-colors duration-700 cursor-pointer group border-b border-white/10 relative overflow-hidden"
      >
         <div className="text-center relative z-10">
            <span className="font-mono text-xs text-white/50 uppercase tracking-widest mb-4 block group-hover:text-white">{t.services.next_service}</span>
            <h2 className="font-display font-black text-6xl md:text-8xl text-white group-hover:scale-110 transition-transform duration-700">
               {nextService.title}
            </h2>
            <div className="mt-8 inline-flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
               <span className="font-bold text-sm uppercase tracking-widest">
                 {language === 'pt' ? 'Explorar' : 'Explore'}
               </span>
               <ArrowRight />
            </div>
         </div>
      </section>

    </div>
  );
};
