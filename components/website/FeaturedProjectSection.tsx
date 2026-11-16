import React from 'react';
import { ArrowRight, MapPin, Building, Maximize2 } from 'lucide-react';
import { FEATURED_PROJECT } from '../data/content';
import { ProjectItem } from '../types';

interface FeaturedProjectProps {
  onViewProject: (project: ProjectItem) => void;
}

export const FeaturedProjectSection: React.FC<FeaturedProjectProps> = ({ onViewProject }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#0e0e10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Specifications & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a880]">
                Featured Project
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Modern living. <br />
                <span className="font-normal text-[#f4efe6]">Timeless elegance.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed font-light">
              {FEATURED_PROJECT.description}
            </p>

            {/* Architectural Specifications List */}
            <div className="space-y-3.5 pt-2 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm text-[#e0ded8]">
                <div className="w-6 h-6 rounded-full border border-[#c5a880]/40 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <MapPin className="w-3 h-3" />
                </div>
                <span className="text-[#8e8e93] w-28 text-xs">Location:</span>
                <span className="font-medium text-white">{FEATURED_PROJECT.location}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#e0ded8]">
                <div className="w-6 h-6 rounded-full border border-[#c5a880]/40 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <Building className="w-3 h-3" />
                </div>
                <span className="text-[#8e8e93] w-28 text-xs">Project Type:</span>
                <span className="font-medium text-white">{FEATURED_PROJECT.category}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#e0ded8]">
                <div className="w-6 h-6 rounded-full border border-[#c5a880]/40 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <Maximize2 className="w-3 h-3" />
                </div>
                <span className="text-[#8e8e93] w-28 text-xs">Area:</span>
                <span className="font-medium text-white">{FEATURED_PROJECT.area}</span>
              </div>
            </div>

            {/* View Project Pill Button */}
            <div className="pt-4">
              <button
                onClick={() => onViewProject(FEATURED_PROJECT)}
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#1b1b1f] hover:bg-[#25252b] text-white border border-white/15 hover:border-white/30 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer shadow-lg"
              >
                <span>View Project</span>
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-[#c5a880]" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Wide Panoramic Villa Image */}
          <div className="lg:col-span-7">
            <div
              onClick={() => onViewProject(FEATURED_PROJECT)}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
            >
              <img
                src={FEATURED_PROJECT.imageUrl}
                alt="Featured Modern Villa Residence by Aakriti Architects"
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

              {/* Subtle hover badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                <span>Click to expand</span>
                <Maximize2 className="w-3 h-3 text-[#c5a880]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
