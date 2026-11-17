import React from 'react';
import { X, MapPin, Calendar, Maximize2, Check, ArrowRight } from 'lucide-react';
import { ProductItem } from '@/app/types';
import Image from 'next/image';

interface ProjectModalProps {
  project: ProductItem | null;
  onClose: () => void;
  onRequestConsultation: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestConsultation,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#141418] border border-white/15 overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/15 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image Header */}
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-black">
          <Image
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#e2c499] border border-white/15">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h3
              className="text-2xl sm:text-3xl font-light text-white leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {project.title.replace('\n', ' ')}
            </h3>
            <p className="text-sm text-[#a1a1aa] mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Architectural Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#1a1a20] border border-white/5">
            <div>
              <div className="text-[11px] text-[#71717a] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#c5a880]" /> Location
              </div>
              <div className="text-xs sm:text-sm font-medium text-white mt-0.5">
                {project.location}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-[#71717a] flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-[#c5a880]" /> Built Area
              </div>
              <div className="text-xs sm:text-sm font-medium text-white mt-0.5">
                {project.area}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-[#71717a] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#c5a880]" /> Completion
              </div>
              <div className="text-xs sm:text-sm font-medium text-white mt-0.5">
                {project.year}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-[#71717a] flex items-center gap-1">
                <Check className="w-3 h-3 text-[#c5a880]" /> Studio Scope
              </div>
              <div className="text-xs sm:text-sm font-medium text-white mt-0.5">
                Turnkey Architecture
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            <span className="text-xs text-[#8e8e93]">
              Interested in a bespoke residence or commercial design like this?
            </span>
            <button
              onClick={() => {
                onClose();
                onRequestConsultation(project.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#f1ece1] hover:bg-white text-black text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>Inquire About Similar Design</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
