import React, { useState, useEffect } from 'react';
import { TokyonLogo } from './TokyonLogo';
import { List, X, Globe } from 'phosphor-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onNavigate: (page: 'home' | 'methodology', hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'methodology', hash?: string) => {
    setIsMobileMenuOpen(false);
    // Pass everything to the parent handler (App.tsx) to decide between Transition vs Scroll
    onNavigate(page, hash); 
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const menuItems = [
    { label: t.nav.methodology, action: () => handleNavClick('methodology') },
    { label: t.nav.services, action: () => handleNavClick('home', 'services') },
    { label: t.consultant.button, action: () => handleNavClick('home', 'consultant') },
    { label: t.nav.start, action: () => handleNavClick('home', 'contact'), highlight: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${isScrolled || isMobileMenuOpen ? 'bg-tokyon-black' : 'bg-tokyon-black md:bg-transparent md:backdrop-blur-none md:py-5'} ${isScrolled ? 'py-4' : 'py-5'}`}>
      <div className="w-full px-4 md:px-8 flex justify-between items-center max-w-[1920px] mx-auto relative z-50">
        <button onClick={() => handleNavClick('home')} className="hover:opacity-90 transition-opacity">
          <TokyonLogo className="h-6 md:h-8" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => handleNavClick('methodology')} className="text-xs font-bold text-white hover:text-tokyon-orange transition-colors uppercase tracking-widest">
            {t.nav.methodology}
          </button>
          <button onClick={() => handleNavClick('home', 'services')} className="text-xs font-bold text-white hover:text-tokyon-orange transition-colors uppercase tracking-widest">
            {t.nav.services}
          </button>
          <button
            onClick={() => handleNavClick('home', 'contact')}
            className="border border-white/20 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-tokyon-black transition-all"
          >
            {t.nav.start}
          </button>
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
          >
            <Globe size={16} />
            <span className={language === 'pt' ? 'text-white' : ''}>PT</span>
            <span className="text-gray-700">|</span>
            <span className={language === 'en' ? 'text-white' : ''}>EN</span>
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="md:hidden flex items-center gap-4">
           <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-xs font-bold text-white"
          >
            {language.toUpperCase()}
          </button>
          <button
            className="text-white hover:text-tokyon-orange transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (Curtain) */}
      <div 
        className={`
          fixed inset-0 w-full h-screen bg-tokyon-black z-40 flex flex-col justify-center px-6 md:hidden
          transition-transform duration-[800ms] cubic-bezier(0.87, 0, 0.13, 1)
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
         {/* Background Texture/Grid for Mobile */}
         <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
            <div className="w-px h-full bg-white"></div>
            <div className="w-px h-full bg-white"></div>
            <div className="w-px h-full bg-white"></div>
            <div className="w-px h-full bg-white"></div>
         </div>

         <div className="flex flex-col gap-6 relative z-10">
            {menuItems.map((item, idx) => (
              <div key={idx} className="overflow-hidden">
                <button 
                  onClick={item.action}
                  className={`
                    text-left font-display font-black text-5xl sm:text-6xl leading-none uppercase tracking-tighter block
                    transition-transform duration-700 ease-out
                    ${item.highlight ? 'text-tokyon-orange' : 'text-white'}
                    ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-[120%]'}
                  `}
                  style={{ transitionDelay: `${150 + (idx * 100)}ms` }}
                >
                  {item.label}
                </button>
              </div>
            ))}
         </div>

         <div className={`
            absolute bottom-12 left-6 font-mono text-xs text-gray-600 uppercase tracking-widest
            transition-opacity duration-700 delay-500
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}
         `}>
            Tokyon Inc. © 2024
         </div>
      </div>
    </nav>
  );
};