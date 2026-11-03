import React from 'react';
import { Utensils, Calendar, ChevronRight, Star, ShieldCheck, Flame } from 'lucide-react';
import { RestaurantSettings } from '../types';

interface HeroSectionProps {
  settings: RestaurantSettings;
  language: 'en' | 'bn';
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  language,
  onExploreMenu,
  onBookTable,
}) => {
  return (
    <section className="relative bg-[#173F32] text-[#F7F3E9] overflow-hidden">
      {/* Background Ambient Glows & Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="Sky Bite Rooftop Ambience"
          className="w-full h-full object-cover object-center opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#173F32] via-[#173F32]/90 to-[#173F32]/70 backdrop-blur-[1px]" />
        {/* Soft Warm Radial Highlights */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#E98738]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Tagline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Kushtia Rooftop Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E98738]/15 border border-[#E98738]/30 text-[#E98738] text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#E98738] animate-ping" />
              <span>
                {language === 'bn'
                  ? 'কুষ্টিয়ার আধুনিক প্রিমিয়াম রুফটপ রেস্টুরেন্ট'
                  : "Kushtia's Premier Rooftop Restaurant & Café"}
              </span>
            </div>

            {/* Tagline & Headline */}
            <div className="space-y-3">
              <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#E98738]">
                {settings.tagline}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-[#F7F3E9] leading-[1.15]">
                {language === 'bn' ? (
                  <>
                    স্বাদে সেরা আহার, <br />
                    <span className="text-[#E98738]">সুন্দরতম স্মৃতি উপহার।</span>
                  </>
                ) : (
                  <>
                    Good Food. <br />
                    <span className="text-[#E98738]">Great Moments.</span>
                  </>
                )}
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#F7F3E9]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {language === 'bn'
                ? 'স্কাই বাইট রেস্টুরেন্টে উপভোগ করুন তাজা উপাদানে তৈরি সুস্বাদু খাবার, আন্তরিক আতিথেয়তা এবং ৫ রাস্তার মোড়ে মনোমুগ্ধকর রুফটপ পরিবেশ।'
                : settings.subheading}
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-extrabold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <Utensils className="w-5 h-5" />
                <span>{language === 'bn' ? 'মেনু দেখুন ও অর্ডার করুন' : 'Explore Menu & Order'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onBookTable}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#1f5242] hover:bg-[#276451] text-[#F7F3E9] font-bold text-base border border-[#35836a] shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-[#E98738]" />
                <span>{language === 'bn' ? 'টেবিল রিজার্ভ করুন' : 'Reserve a Table'}</span>
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#1f5242] text-center lg:text-left">
              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#E98738]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-extrabold text-base sm:text-lg text-[#F7F3E9]">4.9 / 5</span>
                </div>
                <p className="text-xs text-[#F7F3E9]/60">
                  {language === 'bn' ? 'গুগল রিভিউ' : 'Google Rating'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#E98738]">
                  <Flame className="w-4 h-4" />
                  <span className="font-extrabold text-base sm:text-lg text-[#F7F3E9]">50+ Items</span>
                </div>
                <p className="text-xs text-[#F7F3E9]/60">
                  {language === 'bn' ? 'চাইনিজ ও ইতালিয়ান' : 'Chinese & Italian'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#E98738]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-extrabold text-base sm:text-lg text-[#F7F3E9]">100% Halal</span>
                </div>
                <p className="text-xs text-[#F7F3E9]/60">
                  {language === 'bn' ? 'স্বাস্থ্যসম্মত পরিবেশ' : 'Fresh & Hygienic'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Floating Bento Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#1f5242] aspect-[4/3] group">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                  alt="Sky Bite Signature Dish"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173F32] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E98738] text-[#173F32]">
                    Chef's Signature
                  </span>
                  <h3 className="text-lg font-bold text-[#F7F3E9] mt-1 font-display">
                    Mixed Grilled Sizzler & Seafood
                  </h3>
                  <p className="text-xs text-[#F7F3E9]/80">
                    Served smoking hot with Mediterranean sauces
                  </p>
                </div>
              </div>

              {/* Floating Pill: Rooftop Ambience */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-[#252A27]/95 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#E98738]/50">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80"
                    alt="Rooftop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#E98738] uppercase tracking-wide">
                    {language === 'bn' ? 'ওপেন এয়ার রুফটপ' : 'Open Air Rooftop'}
                  </p>
                  <p className="text-xs font-semibold text-[#F7F3E9]">
                    {language === 'bn' ? 'কুষ্টিয়া শহরের মনোরম ভিউ' : 'Panoramic Kushtia View'}
                  </p>
                </div>
              </div>

              {/* Floating Pill: Fast Delivery / WhatsApp */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-[#173F32]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#35836a] shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E98738] flex items-center justify-center text-[#173F32] font-black text-xl shrink-0">
                  ৳
                </div>
                <div>
                  <p className="text-xs font-bold text-[#F7F3E9]">
                    {language === 'bn' ? 'হোয়াটসঅ্যাপে সহজ অর্ডার' : 'WhatsApp Easy Ordering'}
                  </p>
                  <p className="text-[11px] text-[#F7F3E9]/70">
                    {language === 'bn' ? 'কুষ্টিয়া সদর ডেলিভারি মাত্র ৪০৳' : 'Inside Kushtia Sadar Delivery'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
