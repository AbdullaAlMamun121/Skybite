import React, { useState } from 'react';
import { Phone, MessageCircle, ShoppingBag, Calendar, X } from 'lucide-react';
import { RestaurantSettings } from '../types';

interface FloatingWidgetsProps {
  settings: RestaurantSettings;
  language: 'en' | 'bn';
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onNavigateMenu: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  settings,
  language,
  cartCount,
  onOpenCart,
  onOpenReservation,
  onNavigateMenu,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanWhatsapp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Floating WhatsApp Quick Action Button (Desktop & Mobile) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
        {/* Friendly speech bubble */}
        {showTooltip && (
          <div className="bg-[#173F32] text-[#F7F3E9] text-xs font-semibold px-3 py-2 rounded-2xl shadow-xl border border-[#2d6f5a] flex items-center gap-2 max-w-[220px] animate-bounce">
            <span className="text-[11px] leading-tight">
              {language === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার বা প্রশ্ন করুন!' : 'Order or inquire on WhatsApp!'}
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#F7F3E9]/60 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Quick Call Action */}
          <a
            href={`tel:${settings.phone}`}
            className="w-12 h-12 rounded-full bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] border-2 border-white/20 shadow-xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            aria-label="Call Restaurant"
            title="Call Restaurant Directly"
          >
            <Phone className="w-5 h-5 text-[#E98738]" />
          </a>

          {/* Floating WhatsApp Icon */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
              'Hello Sky Bite Restaurant Kushtia! I would like to place an order / inquire about menu & table reservation.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer border-2 border-white/30"
            aria-label="WhatsApp Chat"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-8 h-8 fill-current" />
          </a>
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile Devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#173F32] border-t border-[#1f5242] p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={onNavigateMenu}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#1f5242] text-[#F7F3E9] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#2d6f5a] cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#E98738]" />
          <span>{language === 'bn' ? 'মেনু দেখুন' : 'Explore Menu'}</span>
        </button>

        <button
          onClick={onOpenCart}
          className="relative py-2.5 px-4 rounded-xl bg-[#E98738] text-[#173F32] font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{language === 'bn' ? 'ব্যাগ' : 'Bag'}</span>
          {cartCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#173F32] text-[#E98738] text-[10px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenReservation}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#1f5242] text-[#F7F3E9] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#2d6f5a] cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#E98738]" />
          <span>{language === 'bn' ? 'টেবিল বুকিং' : 'Book Table'}</span>
        </button>
      </div>
    </>
  );
};
