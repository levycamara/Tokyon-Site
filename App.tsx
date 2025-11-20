import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OrangeProgram } from './components/OrangeProgram';
import { ServicesSection } from './components/ServicesSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIConsultant } from './components/AIConsultant';
import { MethodologyPage } from './components/MethodologyPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { TransitionProvider, useTransition } from './contexts/TransitionContext';
import { PageTransition } from './components/PageTransition';

type Page = 'home' | 'methodology' | 'service-detail';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const { triggerTransition } = useTransition();

  const navigateTo = (page: Page, id?: string) => {
    // 1. Handle Anchor/Scroll on the SAME PAGE (No transition needed)
    if (page === currentPage) {
      // Specifically for Home Page anchors like 'services', 'contact', etc.
      if (page === 'home' && id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      // If we are on detail page and clicked same detail, do nothing or scroll top
      if (page === 'service-detail' && id === selectedServiceId) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
         return;
      }
      // If simple refresh of view
      if (!id) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
         return;
      }
    }

    // 2. Handle Page Change (Trigger Transition)
    
    // Determine label (though we aren't using it visually anymore in the updated transition, we keep the logic sound)
    let label = "";
    if (page === 'home') label = "HOMEPAGE";
    if (page === 'methodology') label = "METHODOLOGY";
    if (page === 'service-detail') label = "SERVICE DATA";

    triggerTransition(label, () => {
      // Logic executed whilst screen is covered
      if (page === 'service-detail' && id) {
        setSelectedServiceId(id);
      }
      setCurrentPage(page);
      
      // Post-transition scrolling
      setTimeout(() => {
        if (page === 'home') {
          if (id) {
             const element = document.getElementById(id);
             if (element) element.scrollIntoView({ behavior: 'smooth' });
          } else {
             window.scrollTo(0, 0);
          }
        } else {
           window.scrollTo(0, 0);
        }
      }, 100);
    });
  };

  return (
    <div className="bg-tokyon-black min-h-screen text-white selection:bg-tokyon-orange selection:text-white">
      <PageTransition />
      <Navbar onNavigate={navigateTo} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <OrangeProgram onNavigate={navigateTo} />
            <ServicesSection onNavigate={navigateTo} />
            <Contact />
          </>
        ) : currentPage === 'methodology' ? (
          <MethodologyPage onNavigate={navigateTo} />
        ) : currentPage === 'service-detail' ? (
          <ServiceDetailPage serviceId={selectedServiceId} onNavigate={navigateTo} />
        ) : null}
      </main>

      <Footer />
      <AIConsultant />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TransitionProvider>
        <AppContent />
      </TransitionProvider>
    </LanguageProvider>
  );
}

export default App;