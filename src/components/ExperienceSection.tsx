import React from 'react';
import { Sparkles, Users, Wine, Heart, Compass } from 'lucide-react';

interface ExperienceSectionProps {
  language: 'en' | 'bn';
  onBookTable: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language, onBookTable }) => {
  const experiences = [
    {
      titleEn: 'Rooftop Ambience Under the Stars',
      titleBn: 'খোলা আকাশের নিচে স্নিগ্ধ রুফটপ',
      descEn: 'Enjoy the gentle Kushtia evening breeze, soft golden lighting, and an expansive skyline view from our open-air terrace.',
      descBn: '৫ রাস্তার মোড়ে কুষ্টিয়া শহরের মনোরম আলো এবং মুক্ত বাতাসের নিচে বসে ডিনার উপভোগ করুন।',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      icon: Compass,
      tag: 'Open-Air Terrace'
    },
    {
      titleEn: 'Cozy & Safe Family Dining',
      titleBn: 'পারিবারিক নিরাপদ ও আন্তরিক ডাইনিং',
      descEn: 'Spacious seating arrangements and quiet private booths designed specifically for memorable family dinners and celebrations.',
      descBn: 'পরিবার ও বাচ্চাদের নিয়ে নিরিবিলিতে স্বাচ্ছন্দ্যে সময় কাটানোর জন্য রয়েছে ডেডিকেটেড ফ্যামিলি কর্নার।',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      icon: Users,
      tag: 'Family Booths'
    },
    {
      titleEn: 'Friends Hangout & Group Vibes',
      titleBn: 'বন্ধুদের দারুণ আড্ডা ও ফুড ফিয়েস্তা',
      descEn: 'Share piping-hot wood-fired pizzas, sizzling platters, and artisan chilled mocktails with your closest squad.',
      descBn: 'বন্ধুদের সাথে জমজমাট আড্ডা আর মুখরোচক খাবারের মিলনমেলা স্কাই বাইটের ছাদে।',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      icon: Wine,
      tag: 'Squad Gatherings'
    },
    {
      titleEn: 'Birthdays & Special Occasions',
      titleBn: 'জন্মদিন ও বিশেষ অনুষ্ঠান উদযাপন',
      descEn: 'Custom table decorations, cake-cutting spaces, and tailored group platters to make anniversaries and birthdays magical.',
      descBn: 'স্পেশাল ডেকরেশন ও স্পেশাল সার্ভিসের মাধ্যমে আপনার জন্মদিন বা বিবাহবার্ষিকী করুন চিরস্মরণীয়।',
      image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=800&q=80',
      icon: Heart,
      tag: 'Celebrations'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F7F3E9] text-[#252A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32]/10 text-[#173F32] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E98738]" />
            {language === 'bn' ? 'রেস্টুরেন্ট অভিজ্ঞতা' : 'Atmosphere & Moments'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#173F32]">
            {language === 'bn' ? 'স্কাই বাইটের অনন্য অভিজ্ঞতা' : 'Every Visit is a Memorable Story'}
          </h2>
          <p className="mt-3 text-base text-[#252A27]/70">
            {language === 'bn'
              ? 'ব্যক্তিগত একান্ত সময় হোক বা পুরো পরিবারের মিলনমেলা, আমাদের পরিবেশ প্রতিটি মুহূর্তকে করে তোলে অনন্য।'
              : 'Designed to elevate your dining from ordinary eating to an extraordinary rooftop memory.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-[#173F32]/10 flex flex-col hover:-translate-y-1"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={exp.image}
                    alt={exp.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#173F32]/90 text-[#E98738] border border-[#E98738]/30 backdrop-blur-sm">
                    {exp.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#E98738] text-[#173F32] flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#173F32] group-hover:text-[#E98738] transition-colors font-display mb-2">
                      {language === 'bn' ? exp.titleBn : exp.titleEn}
                    </h3>
                    <p className="text-sm text-[#252A27]/70 leading-relaxed">
                      {language === 'bn' ? exp.descBn : exp.descEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner below */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#173F32] to-[#1a4738] p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#2d6f5a]">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-[#F7F3E9]">
              {language === 'bn' ? 'আজকের ডিনারের জন্য টেবিল বুক করতে চান?' : 'Planning an Evening Dinner or Celebration?'}
            </h3>
            <p className="text-[#F7F3E9]/80 mt-1 text-sm md:text-base max-w-xl">
              {language === 'bn'
                ? 'রুফটপের সেরা কর্নার বা ফ্যামিলি কেবিনটি আগে থেকেই নিশ্চিত করতে অনলাইনে বুকিং রিকোয়েস্ট পাঠান।'
                : 'Reserve your favorite rooftop view or celebratory table with instant confirmation.'}
            </p>
          </div>
          <button
            onClick={onBookTable}
            className="shrink-0 px-7 py-3.5 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-bold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            {language === 'bn' ? 'টেবিল বুকিং শুরু করুন' : 'Book a Table Now'}
          </button>
        </div>
      </div>
    </section>
  );
};
