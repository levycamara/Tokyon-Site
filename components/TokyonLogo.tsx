import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const TokyonLogo: React.FC<LogoProps> = ({ className = "h-8", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon / Symbol - The 8-pointed star/spark */}
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto text-tokyon-orange">
        <path d="M42 0H58V42H100V58H58V100H42V58H0V42H42V0Z" fill="currentColor" />
        <path d="M20.5 20.5L29.5 29.5L70.5 70.5L79.5 79.5" stroke="currentColor" strokeWidth="16" strokeLinecap="butt" className="opacity-0" /> 
        {/* Simplified geometric representation of the asterisk/spark provided in the prompt */}
        <rect x="42" y="0" width="16" height="100" fill="currentColor" />
        <rect x="0" y="42" width="100" height="16" fill="currentColor" />
        <rect x="18.6863" y="27.1716" width="16" height="87" transform="rotate(-45 18.6863 27.1716)" fill="currentColor" />
        <rect x="72.8284" y="15.8579" width="16" height="87" transform="rotate(45 72.8284 15.8579)" fill="currentColor" />
        <rect x="42" y="42" width="16" height="16" fill="white" /> {/* Center cutout */}
      </svg>
      
      {/* Text */}
      {showText && (
        <span className="font-display font-bold tracking-tighter text-2xl text-white uppercase">
          Tokyon
        </span>
      )}
    </div>
  );
};
