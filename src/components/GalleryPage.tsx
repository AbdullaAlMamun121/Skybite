import React, { useState } from 'react';
import { Sparkles, Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
  language: 'en' | 'bn';
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ galleryItems, language }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Photos', labelBn: 'সব ছবি' },
    { id: 'rooftop', labelEn: 'Rooftop & Views', labelBn: 'রুফটপ ভিউ' },
    { id: 'food', labelEn: 'Food Artistry', labelBn: 'খাবারের ছবি' },
    { id: 'interior', labelEn: 'Interior & Seating', labelBn: 'ইন্টেরিয়র ও সিটিং' },
    { id: 'events', labelEn: 'Events & Celebrations', labelBn: 'ইভেন্ট ও আয়োজন' },
  ];

  const filtered = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="py-12 md:py-20 bg-[#F7F3E9] text-[#252A27] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32]/10 text-[#173F32] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E98738]" />
            {language === 'bn' ? 'স্কাই বাইট ভিজ্যুয়াল গ্যালারি' : 'Visual Experience'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#173F32]">
            {language === 'bn' ? 'আমাদের রুফটপ ও খাবারের আলোকচিত্র' : 'Glances of Taste & Rooftop Atmosphere'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#252A27]/70 font-light">
            {language === 'bn'
              ? 'কুষ্টিয়া শহরের আকাশের নিচে কাটানো সুন্দর মুহূর্ত ও শেফদের শৈল্পিক খাবারের ঝলক।'
              : 'Explore the ambiance, night sky views, and gourmet creations waiting for you at Sky Bite Restaurant.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#173F32] text-[#F7F3E9] shadow-md'
                    : 'bg-white text-[#252A27]/80 hover:bg-[#eae5d8] border border-gray-200'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Bento / Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-[#173F32]/10 aspect-[4/3] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5" />

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E98738] text-[#173F32] inline-block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  {language === 'bn' && item.bengaliTitle ? item.bengaliTitle : item.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full cursor-pointer transition-colors z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer transition-colors z-10 hidden sm:block"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer transition-colors z-10 hidden sm:block"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[70vh] flex items-center justify-center">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-[70vh] max-w-full object-contain rounded-xl"
              />
            </div>
            <div className="mt-4 text-center text-white max-w-xl">
              <h3 className="text-xl font-bold font-display">
                {language === 'bn' && currentItem.bengaliTitle ? currentItem.bengaliTitle : currentItem.title}
              </h3>
              <p className="text-sm text-white/70 mt-1">{currentItem.caption}</p>
              <div className="text-xs text-[#E98738] mt-2">
                Photo {lightboxIndex! + 1} of {filtered.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
