import React from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#141418] border border-white/15 p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2.5 text-[#c5a880]">
            <Shield className="w-5 h-5" />
            <span className="text-[11px] tracking-widest uppercase font-semibold">
              Aakriti Architects Legal
            </span>
          </div>

          <h3
            className="text-2xl font-light text-white"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </h3>

          <div className="space-y-3 text-xs text-[#a1a1aa] leading-relaxed">
            {isPrivacy ? (
              <>
                <p>
                  At Aakriti Architects, we honor the privacy of our private and institutional clients. Any information submitted through our online consultation forms, telephone, or studio visits is retained solely for project assessment, architectural feasibility, and direct correspondence.
                </p>
                <p>
                  We never sell, lease, or monetize client personal records or site locations. Detailed architectural blueprints, security layout schematics, and private residential addresses are held under strict non-disclosure safeguards.
                </p>
                <p>
                  For any privacy inquiries or to update your contact record, please reach our administrative office at aakritiarch@yahoo.com or call +91 94160 55307.
                </p>
              </>
            ) : (
              <>
                <p>
                  All architectural drawings, 3D renderings, elevations, and design concepts displayed on this website are the intellectual property of Aakriti Architects (Ambala, Haryana) and are protected by Indian and international copyright statutes.
                </p>
                <p>
                  Project consultations booked through this portal constitute preliminary architectural discovery. Formal architectural execution, structural sanctioning, and construction contracts are governed by standard Council of Architecture (CoA) India norms and customized client agreements.
                </p>
                <p>
                  Photographs depicted in our portfolio document authentic commissions executed or consulted by Aakriti Architects since 2000.
                </p>
              </>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
