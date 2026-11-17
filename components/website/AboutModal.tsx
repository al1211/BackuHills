import React from 'react';
import { X, Award, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { ABOUT_DATA } from '../../data/content';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onBookConsultation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#141418] border border-white/15 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
              The Studio
            </span>
            <h3
              className="text-2xl sm:text-3xl font-light text-white mt-1"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              About Aakriti Architects
            </h3>
            <p className="text-xs text-[#8e8e93]">
              Pioneering architectural excellence and interior sophistication since 2000.
            </p>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
            <img
              src="/src/assets/images/about_interior_living_1792414762240.jpg"
              alt="Aakriti Architects Studio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-light">
            <p>
              Founded in 2000 in Ambala, Haryana, Aakriti Architects has evolved into one of North India’s most revered architectural and interior design practices. Over two decades and 250+ completed projects, we have curated bespoke residences, corporate headquarters, industrial estates, and retail pavilions.
            </p>
            <p>
              Our philosophy reconciles contemporary structural minimalism with the sensory warmth of natural stone, bespoke timber, and curated illumination. Every line drawn at Aakriti Architects responds to site geography, sun orientation, wind corridors, and our client's intimate way of life.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <Clock className="w-4 h-4 text-[#c5a880]" />
              <div className="text-sm font-semibold text-white">25+ Years</div>
              <div className="text-[11px] text-[#71717a]">Practicing Since 2000</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <Award className="w-4 h-4 text-[#c5a880]" />
              <div className="text-sm font-semibold text-white">250+ Projects</div>
              <div className="text-[11px] text-[#71717a]">Completed Across India</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 col-span-2 sm:col-span-1">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <div className="text-sm font-semibold text-white">100% Turnkey</div>
              <div className="text-[11px] text-[#71717a]">Design to Handover</div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-medium cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="px-6 py-2 rounded-full bg-[#f1ece1] hover:bg-white text-black text-xs font-semibold cursor-pointer shadow-lg"
            >
              Discuss Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
