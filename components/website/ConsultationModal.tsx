
import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Phone, Mail, User, Building, Send } from 'lucide-react';
 
interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Architectural Design',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    projectLocation: '',
    approxArea: '',
    timeline: 'Within 1-3 Months',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#141418] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 text-[#c5a880] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3
              className="text-2xl font-light text-white"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Consultation Requested
            </h3>
            <p className="text-sm text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-medium">{formData.name || 'valued client'}</span>.
              Our principal architect will review your project brief and connect with you at{' '}
              <span className="text-[#c5a880]">{formData.phone || '+91 94160 55307'}</span> within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-[#e2c499] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-1 mb-6">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
                Direct Studio Inquiry
              </span>
              <h3
                className="text-2xl sm:text-3xl font-light text-white"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Book a Consultation
              </h3>
              <p className="text-xs text-[#a1a1aa]">
                Share your requirements with Aakriti Architects. We craft custom architectural blueprints &amp; interiors.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs text-[#d1d1d6] flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-[#c5a880]" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b20] border border-white/10 text-white text-xs placeholder-[#52525b] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs text-[#d1d1d6] flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-[#c5a880]" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b20] border border-white/10 text-white text-xs placeholder-[#52525b] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs text-[#d1d1d6] flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-[#c5a880]" /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b20] border border-white/10 text-white text-xs placeholder-[#52525b] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                {/* Service Scope */}
                <div className="space-y-1">
                  <label className="text-xs text-[#d1d1d6] flex items-center gap-1.5 font-medium">
                    <Building className="w-3.5 h-3.5 text-[#c5a880]" /> Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b20] border border-white/10 text-white text-xs focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="Architectural Design">Architectural Design</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Residential Projects">Residential Villa / Bungalow</option>
                    <option value="Commercial Projects">Commercial / Corporate Office</option>
                    <option value="Industrial Projects">Industrial Facility</option>
                    <option value="Planning &amp; Consultation">Planning &amp; Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs text-[#d1d1d6] font-medium">Site Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Ambala, Chandigarh, Delhi NCR"
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b20] border border-white/10 text-white text-xs placeholder-[#52525b] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                {/* Approximate Area */}
                <div className="space-y-1">
                  <label className="text-xs text-[#d1d1d6] font-medium">Plot / Built-up Area</label>
                  <input
                    type="text"
                    placeholder="e.g. 5,000 sq. ft."
                    value={formData.approxArea}
                    onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b20] border border-white/10 text-white text-xs placeholder-[#52525b] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs text-[#d1d1d6] font-medium">Project Brief &amp; Vision</label>
                <textarea
                  rows={3}
                  placeholder="Describe your plot size, lifestyle requirements, preferred design style (modern minimalist, classical luxury, etc.)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b20] border border-white/10 text-white text-xs placeholder-[#52525b] focus:outline-none focus:border-[#c5a880] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#f1ece1] hover:bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
