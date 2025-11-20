import React from 'react';
import { TokyonLogo } from './TokyonLogo';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  // Footer content is mostly universal, but we can use context for future expansion if needed
  const { language } = useLanguage();

  return (
    <footer className="bg-tokyon-black py-12 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
               <TokyonLogo className="h-5" showText={false} />
               <span className="font-display font-bold text-white tracking-tight">TOKYON INC.</span>
            </div>
            
            <div className="flex gap-8 text-xs font-mono text-gray-500 uppercase tracking-wider">
               <a href="#" className="hover:text-white transition-colors">Instagram</a>
               <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-white transition-colors">{language === 'pt' ? 'Privacidade' : 'Privacy'}</a>
            </div>

            <p className="text-xs font-mono text-gray-600">
               © {new Date().getFullYear()}
            </p>
         </div>
      </div>
    </footer>
  );
};