import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';
import { getProjectBySlug } from '../services/contentService';
import { PortfolioItem } from '../types';

interface CaseStudyPageProps {
  slug: string;
  onNavigate: (page: 'home' | 'service-detail', id?: string) => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ slug, onNavigate }) => {
  const [project, setProject] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const p = await getProjectBySlug(slug);
      if (p) setProject(p);
    };
    load();
    window.scrollTo(0,0);
  }, [slug]);

  if (!project) return <div className="min-h-screen bg-tokyon-black flex items-center justify-center text-white">Loading Case...</div>;

  // Handle Background Image Logic
  const heroStyle = project.heroImage?.startsWith('http') 
    ? { backgroundImage: `url(${project.heroImage})` }
    : {};
  
  const heroClass = project.heroImage?.startsWith('http')
    ? 'bg-cover bg-center bg-no-repeat'
    : project.imageColor || 'bg-gray-900';

  return (
    <div className="bg-tokyon-black min-h-screen text-white animate-fade-in pb-24">

      {/* Nav */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
         <button 
           onClick={() => onNavigate('home')}
           className="pointer-events-auto flex items-center gap-3 bg-white/10 hover:bg-white text-white hover:text-black px-6 py-3 rounded-full backdrop-blur-md transition-all font-bold text-xs uppercase tracking-widest"
         >
            <ArrowLeft /> Close Project
         </button>
         <span className="font-mono text-xs text-white/50 tracking-widest hidden md:block">CASE STUDY VIEW</span>
      </div>

      {/* Hero Section */}
      <div className={`h-[80vh] w-full relative flex items-end ${heroClass}`} style={heroStyle}>
         <div className="absolute inset-0 bg-gradient-to-t from-tokyon-black via-tokyon-black/20 to-transparent"></div>
         
         <div className="max-w-[1920px] mx-auto px-4 md:px-8 w-full relative z-10 pb-12 md:pb-24">
            <span className="font-mono text-tokyon-orange mb-4 block text-sm tracking-widest uppercase">{project.client}</span>
            <h1 className="font-display font-black text-5xl md:text-9xl text-white uppercase leading-none tracking-tighter mb-8 break-words">
               {project.project}
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-4">
               {project.serviceIds?.map(s => (
                 <span key={s} className="border border-white/20 px-4 py-1 text-[10px] md:text-xs uppercase tracking-widest text-gray-300 rounded-full">{s}</span>
               ))}
            </div>
         </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 border-b border-white/10 mb-12">
         <div>
            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-tokyon-orange rounded-full"></div>
                <h3 className="text-tokyon-orange font-mono text-xs uppercase tracking-widest">The Challenge</h3>
            </div>
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
               {project.challenge || project.description}
            </p>
         </div>
         <div>
            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <h3 className="text-white font-mono text-xs uppercase tracking-widest">The Solution</h3>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed whitespace-pre-line">
               {project.solution || "Detailed solution breakdown not available for this summary view."}
            </p>
         </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 space-y-12">
         {project.gallery && project.gallery.length > 0 ? (
            project.gallery.map((imgUrl, index) => (
               <div key={index} className="w-full relative group overflow-hidden">
                  <img 
                     src={imgUrl} 
                     alt={`Project detail ${index + 1}`} 
                     className="w-full h-auto block"
                  />
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1 rounded">
                     <span className="text-xs font-mono text-white uppercase tracking-widest">Visual 0{index + 1}</span>
                  </div>
               </div>
            ))
         ) : (
            // Fallback placeholders if no gallery images
            <>
               <div className="w-full h-[60vh] bg-white/5 border border-white/10 flex items-center justify-center">
                  <p className="text-gray-600 font-mono uppercase tracking-widest">No Gallery Images Available</p>
               </div>
            </>
         )}
      </div>
      
      {/* Bottom Nav */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-24 text-center">
          <button 
             onClick={() => onNavigate('home')}
             className="text-gray-500 hover:text-white uppercase font-bold tracking-widest text-sm transition-colors"
          >
             Back to Projects
          </button>
      </div>
    </div>
  );
};