import React from 'react';
import { MapPin, Clock, Phone, Send, ExternalLink, Navigation } from 'lucide-react';
import { RestaurantSettings } from '../types';
import { getGoogleMapsUrl } from '../utils/formatters';

interface LocationHoursSectionProps {
  settings: RestaurantSettings;
  language: 'en' | 'bn';
}

export const LocationHoursSection: React.FC<LocationHoursSectionProps> = ({ settings, language }) => {
  return (
    <section className="py-16 md:py-24 bg-[#173F32] text-[#F7F3E9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Details & Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E98738]/15 text-[#E98738] text-xs font-bold uppercase tracking-wider border border-[#E98738]/20">
              <MapPin className="w-3.5 h-3.5" />
              {language === 'bn' ? 'আমাদের লোকেশন ও সময়সূচি' : 'Find Us in Kushtia'}
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#F7F3E9]">
              {language === 'bn' ? '৫ রাস্তার মোড়ে আপনাকে স্বাগতম' : 'Visit Us at 5 Rasta More'}
            </h2>

            <p className="text-sm md:text-base text-[#F7F3E9]/80 leading-relaxed font-light">
              {language === 'bn'
                ? 'কুষ্টিয়া শহরের কেন্দ্রস্থলে অবস্থিত স্কাই বাইট রেস্টুরেন্ট। চমৎকার দৃশ্য আর রসনাতৃপ্তির সেরা ঠিকানা।'
                : 'Conveniently located at Kushtia’s most accessible landmark with dedicated rooftop seating and secure parking.'}
            </p>

            {/* Address & Hours Cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#123328] border border-[#2d6f5a]">
                <div className="w-10 h-10 rounded-lg bg-[#E98738]/20 text-[#E98738] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#F7F3E9]">
                    {language === 'bn' ? 'রেস্টুরেন্টের ঠিকানা' : 'Official Address'}
                  </h4>
                  <p className="text-xs text-[#F7F3E9]/80 mt-0.5 leading-relaxed">
                    {settings.address}
                  </p>
                  <p className="text-[11px] text-[#E98738] mt-1 font-semibold">
                    {language === 'bn' ? '৫ রাস্তার মোড়, ১ নং আর এ খান রোড, কুষ্টিয়া' : '5 Rasta More, Kushtia Sadar'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#123328] border border-[#2d6f5a]">
                <div className="w-10 h-10 rounded-lg bg-[#E98738]/20 text-[#E98738] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#F7F3E9]">
                    {language === 'bn' ? 'খোলা থাকার সময়' : 'Opening Hours'}
                  </h4>
                  <p className="text-xs text-[#F7F3E9]/80 mt-0.5 font-medium">
                    {settings.openingHours}
                  </p>
                  <p className="text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    {language === 'bn' ? 'সপ্তাহের ৭ দিনই খোলা' : 'Open 7 Days a Week'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={getGoogleMapsUrl(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-bold text-xs sm:text-sm flex items-center gap-2 shadow transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'bn' ? 'গুগল ম্যাপে ডিরেকশন' : 'Get Directions'}</span>
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="px-5 py-2.5 rounded-xl bg-[#1f5242] hover:bg-[#276451] text-[#F7F3E9] border border-[#35836a] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#E98738]" />
                <span>{language === 'bn' ? 'সরাসরি কল করুন' : 'Call Staff'}</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed Preview */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border-2 border-[#2d6f5a] shadow-2xl bg-[#123328] relative group">
              {/* Map Title Bar */}
              <div className="bg-[#123328] px-4 py-3 border-b border-[#2d6f5a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span className="text-xs font-bold text-[#F7F3E9]">
                    Kushtia 5 Rasta More — Google Maps
                  </span>
                </div>
                <a
                  href={getGoogleMapsUrl(settings)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#E98738] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Real Responsive Google Maps Embed centering Kushtia 5 Rasta More */}
              <div className="relative aspect-[16/10] w-full">
                <iframe
                  title="Sky Bite Restaurant Kushtia Location"
                  src="https://maps.google.com/maps?q=5%20Rasta%20More,%20Kushtia,%20Bangladesh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Bottom Quick Bar */}
              <div className="p-3 bg-[#123328] border-t border-[#2d6f5a] flex items-center justify-between text-xs text-[#F7F3E9]/80">
                <span>📍 1 No. R. A. Khan Road, Kushtia</span>
                <span className="text-[#E98738] font-bold">Rooftop Elevator Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
