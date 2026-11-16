import React, { useState } from 'react';
import { X, MapPin, ArrowRight } from 'lucide-react';
import { FEATURED_SECTION, FEATURED_PROJECT } from '../../data/content';
import { ProjectItem } from '@/app/types';

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const AllProjectsModal: React.FC<AllProjectsModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState('All');

  if (!isOpen) return null;

  const allProjects = [FEATURED_PROJECT, ...SELECTED_PROJECTS];

  const categories = ['All', 'Residential', 'Luxury Interior', 'Modern Architecture', 'Interior Design'];

  const filtered =
    filter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#131317] border border-white/15 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
              Portfolio Archive
            </span>
            <h3
              className="text-2xl sm:text-3xl font-light text-white"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              All Architectural &amp; Interior Works
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 py-4 overflow-x-auto shrink-0 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filter === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-[#a1a1aa] hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-6 overflow-y-auto">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onClose();
                onSelectProject(item);
              }}
              className="group rounded-2xl overflow-hidden bg-[#18181d] border border-white/10 hover:border-[#c5a880]/60 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#d1d1d6] border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-[#c5a880]">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <h4
                  className="text-base font-normal text-white group-hover:text-[#c5a880] transition-colors leading-snug"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.title.replace('\n', ' ')}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#8e8e93] pt-1">
                  <span>{item.area}</span>
                  <span className="text-[#e2c499] inline-flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
