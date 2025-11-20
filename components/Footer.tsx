import React from 'react';
import { TokyonLogo } from './TokyonLogo';
import { LockKey } from 'phosphor-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate?: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const handleAdminClick = () => {
    if (onNavigate) {
      onNavigate('admin');
    }
  };

  return (
    <footer className="bg-tokyon-black py-12 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
               <TokyonLogo className="h-5" showText={false} />
               <span className="font-display font-bold text-white tracking-tight">TOKYON INC.</span>
            </div>
            
            <div className="flex gap-8 text-xs font-mono text-gray-500 uppercase tracking-wider">
               <a href="https://instagram.com/letstokyon" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
               <a href="https://www.linkedin.com/company/tokyon" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-white transition-colors">{language === 'pt' ? 'Privacidade' : 'Privacy'}</a>
            </div>

            <div className="flex items-center gap-4">
               <p className="text-xs font-mono text-gray-600">
                  © {new Date().getFullYear()}
               </p>
               {/* SECRET ADMIN BUTTON */}
               <button 
                 onClick={handleAdminClick}
                 className="text-gray-800 hover:text-tokyon-orange transition-colors p-1"
                 title="Admin Access"
               >
                 <LockKey size={12} weight="fill" />
               </button>
            </div>
         </div>
      </div>
    </footer>
  );
};