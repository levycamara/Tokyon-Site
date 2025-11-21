import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OrangeProgram } from './components/OrangeProgram';
import { ServicesSection } from './components/ServicesSection';
import { ClientsTicker } from './components/ClientsTicker';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIConsultant } from './components/AIConsultant';
import { MethodologyPage } from './components/MethodologyPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { AdminGenerator } from './components/AdminGenerator';
import { CaseStudyPage } from './components/CaseStudyPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { TransitionProvider, useTransition } from './contexts/TransitionContext';
import { PageTransition } from './components/PageTransition';

type Page = 'home' | 'methodology' | 'service-detail' | 'admin' | 'case-study';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedCaseSlug, setSelectedCaseSlug] = useState<string>('');
  const { triggerTransition } = useTransition();

  const navigateTo = (page: Page, id?: string) => {
    if (page === currentPage && page !== 'admin' && page !== 'case-study') {
      if (page === 'home' && id) {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (!id) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
         return;
      }
    }

    let label = "";
    if (page === 'home') label = "HOMEPAGE";
    if (page === 'methodology') label = "METHODOLOGY";
    if (page === 'service-detail') label = "SERVICE DATA";
    if (page === 'admin') label = "RESTRICTED AREA";
    if (page === 'case-study') label = "PROJECT VIEW";

    triggerTransition(label, () => {
      if (page === 'service-detail' && id) {
        setSelectedServiceId(id);
      }
      if (page === 'case-study' && id) {
        setSelectedCaseSlug(id);
      }
      setCurrentPage(page);
      
      setTimeout(() => {
        if (page === 'home' && id) {
           const element = document.getElementById(id);
           if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
           window.scrollTo(0, 0);
        }
      }, 100);
    });
  };

  return (
    <div className="bg-tokyon-black min-h-screen text-white selection:bg-tokyon-orange selection:text-white">
      <PageTransition />
      
      {/* Esconde Navbar em páginas imersivas */}
      {currentPage !== 'admin' && currentPage !== 'case-study' && <Navbar onNavigate={navigateTo} />}
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <ClientsTicker />
            <OrangeProgram onNavigate={navigateTo} />
            <ServicesSection onNavigate={navigateTo} />
            <Contact />
          </>
        ) : currentPage === 'methodology' ? (
          <MethodologyPage onNavigate={navigateTo} />
        ) : currentPage === 'service-detail' ? (
          <ServiceDetailPage serviceId={selectedServiceId} onNavigate={navigateTo} />
        ) : currentPage === 'case-study' ? (
          <CaseStudyPage slug={selectedCaseSlug} onNavigate={navigateTo} />
        ) : currentPage === 'admin' ? (
          <AdminGenerator onNavigate={navigateTo} />
        ) : null}
      </main>

      {currentPage !== 'case-study' && <Footer onNavigate={navigateTo} />}
      
      {currentPage !== 'admin' && <AIConsultant />}
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