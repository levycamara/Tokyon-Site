import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  transitionStage: 'entering' | 'exiting' | 'idle';
  transitionLabel: string;
  triggerTransition: (label: string, callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<'entering' | 'exiting' | 'idle'>('idle');
  const [transitionLabel, setTransitionLabel] = useState('');

  const triggerTransition = (label: string, callback: () => void) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionLabel(label);
    setTransitionStage('entering');

    // Total animation time Breakdown:
    // 0ms: Start entering (Columns slide down)
    // 800ms: Columns fully down (Screen covered). Execute Callback.
    // 1200ms: Start exiting (Columns slide up/away).
    // 2000ms: Animation complete.

    setTimeout(() => {
      // The screen is now fully covered. Change the content.
      callback();
      
      // Small pause for "processing" feel
      setTimeout(() => {
        setTransitionStage('exiting');
        
        setTimeout(() => {
          setIsTransitioning(false);
          setTransitionStage('idle');
        }, 800); // Match CSS shutter-out duration
      }, 400);
      
    }, 800); // Match CSS shutter-in duration
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, transitionStage, transitionLabel, triggerTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};