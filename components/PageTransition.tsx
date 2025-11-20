import React from 'react';
import { useTransition } from '../contexts/TransitionContext';
import { TokyonLogo } from './TokyonLogo';

export const PageTransition: React.FC = () => {
  const { isTransitioning, transitionStage } = useTransition();

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex pointer-events-none">
      {/* The 5 Columns of the Grid Shutter */}
      {[0, 1, 2, 3, 4].map((index) => (
        <div 
          key={index} 
          className={`
            h-full w-1/5 bg-tokyon-black border-r border-white/10 relative
            ${transitionStage === 'entering' ? 'animate-shutter-in' : 'animate-shutter-out'}
          `}
          style={{ 
            animationDelay: `${index * 0.05}s`, // Stagger effect
            transformOrigin: transitionStage === 'entering' ? 'top' : 'bottom'
          }}
        >
          {/* Only show Icon on the center column */}
          {index === 2 && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
               <div className={`
                 transition-opacity duration-300
                 ${transitionStage === 'entering' ? 'opacity-100 delay-500' : 'opacity-0'}
               `}>
                  <div className="transform scale-150 animate-pulse">
                    <TokyonLogo showText={false} className="h-24 w-24 text-tokyon-orange" />
                  </div>
               </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};