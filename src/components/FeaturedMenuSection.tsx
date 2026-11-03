import React from 'react';
import { Plus, ArrowRight, Star, Flame, Eye, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { formatPrice } from '../utils/formatters';

interface FeaturedMenuSectionProps {
  items: MenuItem[];
  language: 'en' | 'bn';
  onAddToCart: (item: MenuItem) => void;
  onSelectItem: (item: MenuItem) => void;
  onViewAllMenu: () => void;
}

export const FeaturedMenuSection: React.FC<FeaturedMenuSectionProps> = ({
  items,
  language,
  onAddToCart,
  onSelectItem,
  onViewAllMenu,
}) => {
  // Show bestsellers and chef specials
  const featured = items
    .filter((item) => item.isBestSeller || item.isChefSpecial)
    .slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-[#F7F3E9] text-[#252A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32]/10 text-[#173F32] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E98738]" />
              {language === 'bn' ? 'জনপ্রিয় খাবার' : 'Curated Masterpieces'}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#173F32]">
              {language === 'bn' ? 'শেফের বিশেষ বাছাই ও বেস্ট সেলার' : "Chef's Recommendations & Bestsellers"}
            </h2>
            <p className="mt-2 text-base text-[#252A27]/70 max-w-xl">
              {language === 'bn'
                ? 'কুষ্টিয়ার ভোজনরসিকদের সবচেয়ে পছন্দের সিগনেচার ডিশসমূহ, যা তৈরি হয় খাঁটি উপাদানে।'
                : 'Discover our most celebrated seafood, Chinese wok specials, and authentic Italian pizzas.'}
            </p>
          </div>

          <button
            onClick={onViewAllMenu}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#173F32] hover:text-[#E98738] transition-colors cursor-pointer group"
          >
            <span>{language === 'bn' ? 'সম্পূর্ণ মেনু এক্সপ্লোর করুন' : 'View Full Menu (50+ Items)'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E98738]" />
          </button>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#173F32]/10 flex flex-col group hover:-translate-y-1"
            >
              {/* Food Image with Badges */}
              <div
                className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                onClick={() => onSelectItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.isBestSeller && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E98738] text-[#173F32] flex items-center gap-1 shadow">
                      <Flame className="w-3 h-3" />
                      {language === 'bn' ? 'বেস্ট সেলার' : 'Best Seller'}
                    </span>
                  )}
                  {item.isChefSpecial && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#173F32] text-[#F7F3E9] flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-[#E98738] text-[#E98738]" />
                      {language === 'bn' ? 'শেফ স্পেশাল' : "Chef's Special"}
                    </span>
                  )}
                </div>

                {/* Price Tag in Image */}
                <div className="absolute bottom-3 right-3 bg-[#173F32]/90 backdrop-blur-md text-[#E98738] px-3 py-1 rounded-xl font-extrabold text-base border border-[#E98738]/30 shadow">
                  {formatPrice(item.price)}
                </div>

                {/* Quick view button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white text-[#173F32] text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-4 h-4 text-[#E98738]" />
                    {language === 'bn' ? 'বিস্তারিত দেখুন' : 'Quick Details'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#E98738] uppercase tracking-wider mb-1">
                    {item.category.replace('-', ' ')}
                  </div>
                  <h3
                    className="text-lg font-bold text-[#173F32] group-hover:text-[#E98738] transition-colors cursor-pointer line-clamp-1 font-display"
                    onClick={() => onSelectItem(item)}
                  >
                    {language === 'bn' && item.bengaliName ? item.bengaliName : item.name}
                  </h3>
                  {language === 'bn' && (
                    <p className="text-xs text-[#252A27]/60 italic mb-1.5">{item.name}</p>
                  )}
                  <p className="text-sm text-[#252A27]/70 line-clamp-2 mt-1 leading-relaxed">
                    {language === 'bn' && item.bengaliDescription ? item.bengaliDescription : item.description}
                  </p>
                </div>

                {/* Bottom Bar: Quick Add to Cart */}
                <div className="mt-5 pt-4 border-t border-[#173F32]/10 flex items-center justify-between">
                  <div className="text-xs text-[#252A27]/60">
                    {item.preparationTime && <span>⏱ {item.preparationTime}</span>}
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    disabled={!item.isAvailable}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                      item.isAvailable
                        ? 'bg-[#173F32] hover:bg-[#E98738] text-[#F7F3E9] hover:text-[#173F32]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{item.isAvailable ? (language === 'bn' ? 'অর্ডার লিস্টে যোগ করুন' : 'Add to Order') : 'Sold Out'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
