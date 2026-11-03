import React from 'react';
import { ChefHat, ShieldCheck, Heart, Award, MapPin, Sparkles } from 'lucide-react';
import { RestaurantSettings } from '../types';

interface AboutPageProps {
  settings: RestaurantSettings;
  language: 'en' | 'bn';
  onBookTable: () => void;
  onExploreMenu: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  settings,
  language,
  onBookTable,
  onExploreMenu,
}) => {
  return (
    <div className="py-12 md:py-20 bg-[#F7F3E9] text-[#252A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* Hero Banner inside About */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32]/10 text-[#173F32] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E98738]" />
            {language === 'bn' ? 'স্কাই বাইট কাহিনী' : 'Our Heritage & Passion'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#173F32]">
            {language === 'bn' ? 'স্বাদ ও সেবার অনন্য মেলবন্ধন' : 'A Rooftop Culinary Destination in Kushtia'}
          </h1>
          <p className="text-base sm:text-lg text-[#252A27]/75 font-light leading-relaxed">
            {settings.tagline}
          </p>
        </div>

        {/* Section 1: Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#173F32]/20 aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Sky Bite Rooftop Kushtia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173F32]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E98738]">
                  5 Rasta More, Kushtia
                </span>
                <h4 className="text-lg font-bold font-display">Skyline Terrace Dining</h4>
              </div>
            </div>
            {/* Small accent image */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 rounded-xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1559742811-822863646698?auto=format&fit=crop&w=400&q=80"
                alt="Chef preparing prawns"
                className="w-full h-32 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E98738] uppercase tracking-wider">
              <span className="w-8 h-0.5 bg-[#E98738]" />
              {language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#173F32]">
              {language === 'bn'
                ? 'কুষ্টিয়ার ভোজন সংস্কৃতিতে এক নতুন দিগন্ত'
                : 'Elevating Gastronomy in the Cultural Capital of Kushtia'}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#252A27]/80 leading-relaxed font-light">
              <p>
                {language === 'bn'
                  ? 'স্কাই বাইট রেস্টুরেন্টের যাত্রা শুরু হয়েছিল একটি স্পষ্ট স্বপ্ন নিয়ে—কুষ্টিয়ার মানুষকে এমন একটি রুফটপ ডাইনিং অভিজ্ঞতা দেওয়া, যা সাধারণত বড় বড় মেট্রোপলিটন শহরে দেখা যায়।'
                  : 'Sky Bite Restaurant was founded with a singular conviction: that the vibrant, culturally rich city of Kushtia deserves a world-class rooftop dining experience. Situated prominently at 5 Rasta More, we bridged gourmet culinary craftsmanship with an unmatched open-air ambience.'}
              </p>
              <p>
                {language === 'bn'
                  ? 'খাবারের স্বাদ, কাঁচামালের বিশুদ্ধতা এবং প্রতিটি মেহমানকে আন্তরিক ভালোবাসা দিয়ে আপ্যায়ন করাই আমাদের মূল শক্তি। চাইনিজ ওয়াক হোক বা ইতালীয় মার্গারিটা পিৎজা, প্রতিটি পদের পেছনে রয়েছে আমাদের দক্ষ শেফদের পরম যত্ন।'
                  : 'Whether you are sharing an authentic wood-fired pizza with your family, indulging in our garlic herb grilled red snapper, or sipping an artisan mocktail as the twilight falls over Kushtia town, every detail is tuned for your comfort.'}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#173F32]">
                <MapPin className="w-4 h-4 text-[#E98738]" />
                <span>1 No. R. A. Khan Road, Kushtia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Food Philosophy & Core Commitments */}
        <div className="bg-[#173F32] text-[#F7F3E9] rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F7F3E9]">
              {language === 'bn' ? 'আমাদের খাদ্য দর্শন ও অঙ্গীকার' : 'Our Food Philosophy & Quality Promise'}
            </h3>
            <p className="mt-2 text-sm text-[#F7F3E9]/80 font-light">
              "Your Taste, Your Kitchen, Our Care."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#123328] p-6 rounded-2xl border border-[#2d6f5a] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E98738]/20 text-[#E98738] flex items-center justify-center">
                <ChefHat className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg font-display text-[#F7F3E9]">
                {language === 'bn' ? 'মাস্টার শেফের শৈল্পিক ছোঁয়া' : 'Master Culinary Craft'}
              </h4>
              <p className="text-xs sm:text-sm text-[#F7F3E9]/75 leading-relaxed">
                {language === 'bn'
                  ? 'আন্তর্জাতিক রেস্টুরেন্টে অভিজ্ঞ শেফদের দ্বারা প্রতিটি রেসিপি নিখুঁতভাবে তৈরি।'
                  : 'Trained chefs who bring mastery in Szechuan wok techniques, handmade pasta sauces, and live grilling.'}
              </p>
            </div>

            <div className="bg-[#123328] p-6 rounded-2xl border border-[#2d6f5a] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E98738]/20 text-[#E98738] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg font-display text-[#F7F3E9]">
                {language === 'bn' ? 'শতভাগ স্বাস্থ্যসম্মত রান্নাঘর' : '100% Halal & Hygienic'}
              </h4>
              <p className="text-xs sm:text-sm text-[#F7F3E9]/75 leading-relaxed">
                {language === 'bn'
                  ? 'কড়া হাইজিন প্রোটোকল, নিয়মিত স্যানিটাইজেশন এবং বিশুদ্ধ ফিল্টার্ড পানির ব্যবহার।'
                  : 'Highest sanitization standards in food handling, certified halal meat, and spotless kitchen protocols.'}
              </p>
            </div>

            <div className="bg-[#123328] p-6 rounded-2xl border border-[#2d6f5a] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E98738]/20 text-[#E98738] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg font-display text-[#F7F3E9]">
                {language === 'bn' ? 'আন্তরিক আতিথেয়তা' : 'Heartfelt Hospitality'}
              </h4>
              <p className="text-xs sm:text-sm text-[#F7F3E9]/75 leading-relaxed">
                {language === 'bn'
                  ? 'আমরা আপনাকে শুধু একজন কাস্টমার নই, পরিবারের মেহমান হিসেবে সম্মান জানাই।'
                  : 'Every guest is received with genuine respect, polite care, and prompt table service.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4 space-y-4">
          <h3 className="text-2xl font-bold font-display text-[#173F32]">
            {language === 'bn' ? 'আজই স্কাই বাইটে আপনার আসন বুক করুন' : 'Experience It in Person'}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookTable}
              className="px-6 py-3 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-bold text-sm shadow cursor-pointer transition-all hover:scale-105"
            >
              {language === 'bn' ? 'টেবিল রিজার্ভেশন করুন' : 'Book a Rooftop Table'}
            </button>
            <button
              onClick={onExploreMenu}
              className="px-6 py-3 rounded-xl bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] font-bold text-sm shadow cursor-pointer transition-all"
            >
              {language === 'bn' ? 'সম্পূর্ণ মেনু দেখুন' : 'Explore Menu Online'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
