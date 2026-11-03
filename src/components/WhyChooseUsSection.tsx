import React from 'react';
import { Sparkles, UtensilsCrossed, Award, CloudSun, HeartHandshake } from 'lucide-react';

interface WhyChooseUsSectionProps {
  language: 'en' | 'bn';
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ language }) => {
  const pillars = [
    {
      icon: UtensilsCrossed,
      titleEn: 'Freshly Prepared Food',
      titleBn: 'তাজা ও খাঁটি খাবার',
      descEn: 'Every order is crafted from scratch using raw, fresh ingredients without any pre-frozen compromises.',
      descBn: 'কোনো ফ্রোজেন বা বাসি খাবার নয়; প্রতিটি অর্ডার করা খাবার শেফরা তাৎক্ষণিকভাবে গরম ও তাজা প্রস্তুত করেন।',
    },
    {
      icon: Award,
      titleEn: 'Quality Ingredients',
      titleBn: 'প্রিমিয়াম উপাদান',
      descEn: 'Imported Italian mozzarella, premium cuts, and fresh coastal seafood sourced with zero compromise.',
      descBn: 'খাঁটি মোজারেলা চিজ, এক্সট্রা ভার্জিন অলিভ অয়েল ও তাজা সিফুড দিয়ে আন্তর্জাতিক মানের স্বাদ নিশ্চিত করা হয়।',
    },
    {
      icon: CloudSun,
      titleEn: 'Comfortable Rooftop Dining',
      titleBn: 'মনোরম রুফটপ পরিবেশ',
      descEn: 'An open-air elevated sanctuary at 5 Rasta More offering panoramic city night views and gentle breezes.',
      descBn: 'কুষ্টিয়ার ব্যস্ত শহরের ওপরে খোলা আকাশের নিচে মনোরম আলো ও স্নিগ্ধ বাতাসের অসাধারণ প্রশান্ত পরিবেশ।',
    },
    {
      icon: HeartHandshake,
      titleEn: 'Friendly Warm Service',
      titleBn: 'আন্তরিক আতিথেয়তা',
      descEn: 'Hospitality that makes every visit memorable, whether a cozy family dinner or a lively gathering.',
      descBn: 'আপনার প্রতিটি মুহূর্তকে স্মরণীয় করে তুলতে আমাদের কর্মীরা সর্বদা হাসিমুখে সেবায় নিয়োজিত।',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#173F32] text-[#F7F3E9] relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E98738]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1f5242]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E98738]/15 text-[#E98738] text-xs font-bold uppercase tracking-wider mb-3 border border-[#E98738]/20">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'bn' ? 'আমাদের বিশেষত্ব' : 'The Sky Bite Standard'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#F7F3E9]">
            {language === 'bn' ? 'কেন স্কাই বাইট আপনার প্রথম পছন্দ?' : 'Why Choose Sky Bite Restaurant?'}
          </h2>
          <p className="mt-3 text-base text-[#F7F3E9]/80 font-light">
            {language === 'bn'
              ? 'আমরা বিশ্বাস করি প্রতিটি খাবারের সাথে জড়িয়ে থাকে একটি গল্প, আর প্রতিটি ভোজন একটি স্মরণীয় অভিজ্ঞতা।'
              : 'Dedicated to offering Kushtia an unparalleled gastronomic and elevated dining atmosphere.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#123328]/80 hover:bg-[#1a4738] p-7 rounded-2xl border border-[#2d6f5a]/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#E98738]/15 text-[#E98738] border border-[#E98738]/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#E98738] group-hover:text-[#173F32] transition-all">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#F7F3E9] mb-2 group-hover:text-[#E98738] transition-colors">
                  {language === 'bn' ? pillar.titleBn : pillar.titleEn}
                </h3>
                <p className="text-sm text-[#F7F3E9]/75 leading-relaxed flex-1">
                  {language === 'bn' ? pillar.descBn : pillar.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
