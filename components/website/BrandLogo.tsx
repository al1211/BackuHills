import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md' }) => {
  return (
    <a href="#home" className={`flex items-center gap-3 group text-left ${className}`}>
      {/* Architectural Stylized A geometric mark */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'}
        >
          {/* Outer triangular drafting framework */}
          <path
            d="M18 4L32 30H4L18 4Z"
            stroke="#c5a880"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-colors group-hover:stroke-[#e2c499]"
          />
          {/* Inner architectural drafting geometric crossbeam and apex line */}
          <path
            d="M18 4V30"
            stroke="#c5a880"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <path
            d="M10 21H26"
            stroke="#e2c499"
            strokeWidth="1.5"
          />
          <circle cx="18" cy="21" r="1.5" fill="#c5a880" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        <span
          className={`font-semibold tracking-[0.2em] uppercase text-white transition-colors group-hover:text-[#c5a880] ${
            size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-xs tracking-[0.16em]' : 'text-sm'
          }`}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Aakriti Architects
        </span>
        <span
          className={`tracking-[0.25em] uppercase text-[#a1a1aa] font-medium ${
            size === 'lg' ? 'text-[11px]' : 'text-[9px]'
          }`}
        >
          Interiors &amp; Architecture
        </span>
      </div>
    </a>
  );
};
