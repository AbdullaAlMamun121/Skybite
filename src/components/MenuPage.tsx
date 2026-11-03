import React, { useState, useMemo } from 'react';
import { Search, Plus, Star, Flame, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem, FoodCategory } from '../types';
import { formatPrice } from '../utils/formatters';

interface MenuPageProps {
  menuItems: MenuItem[];
  language: 'en' | 'bn';
  onAddToCart: (item: MenuItem, notes?: string) => void;
  onSelectItem: (item: MenuItem) => void;
  selectedItem: MenuItem | null;
  onCloseDetailModal: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  menuItems,
  language,
  onAddToCart,
  onSelectItem,
  selectedItem,
  onCloseDetailModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecial, setFilterSpecial] = useState<'all' | 'bestseller' | 'chef'>('all');
  const [modalCustomNote, setModalCustomNote] = useState('');
  const [modalQuantity, setModalQuantity] = useState(1);

  const categories: { id: string; labelEn: string; labelBn: string }[] = [
    { id: 'all', labelEn: 'All Dishes', labelBn: 'সকল খাবার' },
    { id: 'chinese', labelEn: 'Chinese', labelBn: 'চাইনিজ' },
    { id: 'italian', labelEn: 'Italian & Pizza', labelBn: 'ইতালিয়ান ও পিৎজা' },
    { id: 'seafood', labelEn: 'Seafood Special', labelBn: 'সিফুড স্পেশাল' },
    { id: 'appetizers', labelEn: 'Appetizers & Starters', labelBn: 'অ্যাপিটাইজার' },
    { id: 'main-course', labelEn: 'Main Course & Sizzlers', labelBn: 'মেইন কোর্স' },
    { id: 'beverages', labelEn: 'Drinks & Mocktails', labelBn: 'পানীয় ও মকটেল' },
    { id: 'desserts', labelEn: 'Desserts', labelBn: 'মিষ্টান্ন / ডেজার্ট' },
  ];

  // Filtered menu
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Special filter
      if (filterSpecial === 'bestseller' && !item.isBestSeller) return false;
      if (filterSpecial === 'chef' && !item.isChefSpecial) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchBnName = item.bengaliName?.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        if (!matchName && !matchBnName && !matchDesc && !matchCategory) {
          return false;
        }
      }

      return true;
    });
  }, [menuItems, selectedCategory, filterSpecial, searchQuery]);

  const handleModalAdd = () => {
    if (!selectedItem) return;
    for (let i = 0; i < modalQuantity; i++) {
      onAddToCart(selectedItem, modalCustomNote);
    }
    setModalCustomNote('');
    setModalQuantity(1);
    onCloseDetailModal();
  };

  return (
    <div className="py-10 md:py-16 bg-[#F7F3E9] min-h-screen text-[#252A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32]/10 text-[#173F32] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E98738]" />
            {language === 'bn' ? 'স্কাই বাইট ফুড মেনু' : 'Signature Culinary Selection'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#173F32]">
            {language === 'bn' ? 'আমাদের স্বাদের রাজত্ব' : 'Explore Our Handcrafted Menu'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#252A27]/70 font-light">
            {language === 'bn'
              ? 'তাজা উপাদান ও সেরা মশলার সংমিশ্রণে প্রস্তুত চাইনিজ, খাঁটি ইতালীয়, সামুদ্রিক মাছ ও সুস্বাদু মকটেল।'
              : 'From sizzling live woks to stone-baked Italian pizzas, select your dishes and order straight to WhatsApp or table.'}
          </p>
        </div>

        {/* Search Bar & Quick Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-[#173F32]/10 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'খাবারের নাম দিয়ে খুঁজুন (যেমন: পিৎজা, স্ন্যাপার, চাউমিন)...'
                    : 'Search food by name, ingredient (e.g. Szechuan, Prawns, Alfredo)...'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 p-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Highlighting Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterSpecial(filterSpecial === 'bestseller' ? 'all' : 'bestseller')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  filterSpecial === 'bestseller'
                    ? 'bg-[#E98738] text-[#173F32] shadow'
                    : 'bg-[#F7F3E9] text-[#252A27] hover:bg-gray-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'বেস্ট সেলার' : 'Best Sellers'}</span>
              </button>

              <button
                onClick={() => setFilterSpecial(filterSpecial === 'chef' ? 'all' : 'chef')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  filterSpecial === 'chef'
                    ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                    : 'bg-[#F7F3E9] text-[#252A27] hover:bg-gray-200'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-[#E98738] fill-current" />
                <span>{language === 'bn' ? 'শেফস স্পেশাল' : "Chef's Specials"}</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-gray-100">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? menuItems.length
                  : menuItems.filter((i) => i.category === (cat.id as FoodCategory)).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#173F32] text-[#F7F3E9] shadow-md'
                      : 'bg-[#F7F3E9] text-[#252A27]/80 hover:bg-[#eae5d8] hover:text-[#173F32]'
                  }`}
                >
                  <span>{language === 'bn' ? cat.labelBn : cat.labelEn}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-[#E98738] text-[#173F32] font-black'
                        : 'bg-black/5 text-[#252A27]/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#252A27]/70 px-1">
          <span>
            {language === 'bn'
              ? `${filteredItems.length} টি খাবার পাওয়া গেছে`
              : `Showing ${filteredItems.length} dishes`}
          </span>
          {searchQuery && (
            <span>
              Searching for: "<strong className="text-[#173F32]">{searchQuery}</strong>"
            </span>
          )}
        </div>

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#173F32]/10 max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-[#E98738] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#173F32]">
              {language === 'bn' ? 'কোনো খাবার পাওয়া যায়নি' : 'No Dishes Found'}
            </h3>
            <p className="text-xs text-[#252A27]/70 mt-1 mb-4">
              {language === 'bn'
                ? 'অনুগ্রহ করে অন্য কোনো কি-ওয়ার্ড দিয়ে সার্চ করুন অথবা ফিল্টার রিসেট করুন।'
                : 'Try searching with a different keyword or select another category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterSpecial('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#173F32] text-[#F7F3E9] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#173F32]/10 flex flex-col group hover:-translate-y-1"
              >
                {/* Food Image */}
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
                        {language === 'bn' ? 'জনপ্রিয়' : 'Best Seller'}
                      </span>
                    )}
                    {item.isChefSpecial && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#173F32] text-[#F7F3E9] flex items-center gap-1 shadow">
                        <Star className="w-3 h-3 fill-[#E98738] text-[#E98738]" />
                        {language === 'bn' ? 'শেফ স্পেশাল' : "Chef's Special"}
                      </span>
                    )}
                    {!item.isAvailable && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white shadow">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-[#173F32]/95 backdrop-blur-md text-[#E98738] px-3 py-1 rounded-xl font-extrabold text-base border border-[#E98738]/30 shadow">
                    {formatPrice(item.price)}
                  </div>

                  {/* Quick view button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white text-[#173F32] text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-4 h-4 text-[#E98738]" />
                      {language === 'bn' ? 'বিস্তারিত তথ্য' : 'Quick Details'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#E98738] uppercase tracking-wider mb-1">
                      <span>{item.category.replace('-', ' ')}</span>
                      {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                        <span className="text-red-500 font-normal">
                          {'🌶️'.repeat(item.spiceLevel)}
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-lg font-bold text-[#173F32] group-hover:text-[#E98738] transition-colors cursor-pointer font-display line-clamp-1"
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

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#F7F3E9] text-[#173F32] font-semibold px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Add to Cart */}
                  <div className="mt-5 pt-4 border-t border-[#173F32]/10 flex items-center justify-between">
                    <span className="text-xs text-[#252A27]/60">
                      {item.preparationTime ? `⏱ ${item.preparationTime}` : 'Fresh Cooked'}
                    </span>

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
                      <span>{item.isAvailable ? (language === 'bn' ? 'অর্ডার লিস্টে নিন' : 'Add to Order') : 'Unavailable'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Detail & Customization Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-[#173F32]/20 max-h-[90vh] flex flex-col">
            <div className="relative aspect-[16/9] w-full shrink-0">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={onCloseDetailModal}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full cursor-pointer transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-4 bg-[#173F32]/95 backdrop-blur-md px-3 py-1 rounded-xl text-[#E98738] font-black text-lg border border-[#E98738]/30">
                {formatPrice(selectedItem.price)}
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#E98738] tracking-wider">
                  {selectedItem.category.replace('-', ' ')}
                </span>
                <h2 className="text-2xl font-bold font-display text-[#173F32] mt-0.5">
                  {language === 'bn' && selectedItem.bengaliName ? selectedItem.bengaliName : selectedItem.name}
                </h2>
                <p className="text-sm text-[#252A27]/60 italic">{selectedItem.name}</p>
              </div>

              <div className="bg-[#F7F3E9] p-4 rounded-xl text-sm text-[#252A27]/80 leading-relaxed border border-[#173F32]/10">
                <p>{selectedItem.description}</p>
                {selectedItem.bengaliDescription && (
                  <p className="mt-2 text-xs text-[#173F32] font-medium border-t border-[#173F32]/10 pt-2">
                    {selectedItem.bengaliDescription}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500 block">Preparation Time:</span>
                  <strong className="text-[#173F32] text-sm">{selectedItem.preparationTime || '15-20 mins'}</strong>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500 block">Spice Level:</span>
                  <strong className="text-red-500 text-sm">
                    {selectedItem.spiceLevel ? '🌶️'.repeat(selectedItem.spiceLevel) + ` (${selectedItem.spiceLevel}/3)` : 'Mild / No Spice'}
                  </strong>
                </div>
              </div>

              {/* Special instructions */}
              <div>
                <label className="block text-xs font-semibold text-[#173F32] mb-1">
                  {language === 'bn' ? 'বিশেষ কোনো নির্দেশনা (অপশনাল)' : 'Special Cooking Request (Optional)'}
                </label>
                <input
                  type="text"
                  value={modalCustomNote}
                  onChange={(e) => setModalCustomNote(e.target.value)}
                  placeholder="e.g. Less spicy, extra sauce, allergy info..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                />
              </div>

              {/* Quantity and Add Button */}
              <div className="pt-2 flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#173F32]">
                    {modalQuantity}
                  </span>
                  <button
                    onClick={() => setModalQuantity(modalQuantity + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleModalAdd}
                  disabled={!selectedItem.isAvailable}
                  className="flex-1 py-3.5 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-black text-sm shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>
                    {language === 'bn' ? 'অর্ডার ব্যাগে যোগ করুন' : 'Add to Order'} &bull; {formatPrice(selectedItem.price * modalQuantity)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
