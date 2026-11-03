import React, { useState } from 'react';
import { Menu as MenuIcon, X, ShoppingBag, Phone, Calendar, Clock, MapPin, Sparkles, ChefHat, Package, Award } from 'lucide-react';
import { RestaurantSettings, LoyaltyAccount } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  settings: RestaurantSettings;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
  onOpenAdmin: () => void;
  onOpenTrackOrder?: () => void;
  loyaltyAccount: LoyaltyAccount;
  onOpenLoyalty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenReservation,
  settings,
  language,
  setLanguage,
  onOpenAdmin,
  onOpenTrackOrder,
  loyaltyAccount,
  onOpenLoyalty,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { id: 'menu', labelEn: 'Menu', labelBn: 'মেনু' },
    { id: 'about', labelEn: 'About Us', labelBn: 'আমাদের সম্পর্কে' },
    { id: 'gallery', labelEn: 'Gallery', labelBn: 'গ্যালারি' },
    { id: 'reservation', labelEn: 'Book & Track Table', labelBn: 'টেবিল বুকিং ও স্ট্যাটাস' },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#173F32] text-[#F7F3E9] shadow-lg border-b border-[#1f5242]">

      {/* Top Info Bar (Desktop) */}
      <div className="hidden lg:block bg-[#123328] py-1 px-6 text-xs text-[#F7F3E9]/80 border-b border-[#1b483a]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E98738]" />
              {settings.locationArea}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E98738]" />
              {settings.openingHours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 text-[#F7F3E9] hover:text-[#E98738] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E98738]" />
              {settings.phone}
            </a>
            <div className="h-3 w-px bg-white/20"></div>
            {/* Language Switcher */}
            <div className="flex items-center bg-[#173F32] rounded-full p-0.5 border border-white/10 text-[11px]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-[#E98738] text-[#173F32] font-bold shadow'
                    : 'text-[#F7F3E9]/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'bn'
                    ? 'bg-[#E98738] text-[#173F32] font-bold shadow'
                    : 'text-[#F7F3E9]/80 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-[#F7F3E9]/60 hover:text-[#E98738] transition-colors underline decoration-dotted ml-2"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E98738] to-[#d67325] flex items-center justify-center text-[#173F32] shadow-md group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-display text-2xl font-bold tracking-wider text-[#F7F3E9] flex items-center gap-1.5">
                <span>SKY BITE</span>
                <span className="text-[10px] font-sans font-medium px-1.5 py-0.5 bg-[#E98738] text-[#173F32] rounded font-bold uppercase tracking-normal">
                  Rooftop
                </span>
              </div>
              <p className="text-[11px] tracking-widest text-[#F7F3E9]/70 uppercase font-medium">
                Restaurant &bull; Kushtia
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1f5242] text-[#E98738] shadow-sm font-semibold'
                      : 'text-[#F7F3E9]/90 hover:text-white hover:bg-[#1a4738]'
                  }`}
                >
                  {language === 'bn' ? link.labelBn : link.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Loyalty Points Widget */}
            <button
              onClick={onOpenLoyalty}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-600/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-[#E98738]/50 text-[#F7F3E9] transition-all cursor-pointer shadow-sm hover:scale-[1.02] group"
              title="View Loyalty Points & Redeem Discounts"
              aria-label="Loyalty Points"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-[#E98738] text-[#173F32] flex items-center justify-center font-black text-xs shadow">
                🪙
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="font-mono text-amber-300 font-extrabold text-xs">
                  {loyaltyAccount.points} <span className="text-[10px] font-sans font-medium text-white/80">pts</span>
                </span>
                <span className="text-[8px] text-[#E98738] font-bold uppercase tracking-wider">
                  {loyaltyAccount.tier}
                </span>
              </div>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#1a4738] hover:bg-[#235d4b] text-[#F7F3E9] transition-all cursor-pointer border border-[#2d6f5a]"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#E98738]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E98738] text-[#173F32] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Live Track Order Button */}
            {onOpenTrackOrder && (
              <button
                onClick={onOpenTrackOrder}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a4738] hover:bg-[#235d4b] text-[#F7F3E9] text-xs font-bold border border-[#2d6f5a] transition-all cursor-pointer shadow-sm hover:border-[#E98738]/50"
                title="Track Live Food Order"
              >
                <Package className="w-4 h-4 text-[#E98738]" />
                <span className="hidden xl:inline">{language === 'bn' ? 'অর্ডার ট্র্যাক' : 'Track Order'}</span>
              </button>
            )}

            {/* Quick Reservation Button (Desktop) */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'bn' ? 'টেবিল বুকিং' : 'Book a Table'}</span>
            </button>

            {/* Quick Order Now Button */}
            <button
              onClick={() => handleNavClick('menu')}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/10 text-[#F7F3E9] border border-[#E98738]/60 font-semibold text-sm transition-all cursor-pointer"
            >
              <span>{language === 'bn' ? 'অনলাইন মেনু' : 'Order Now'}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#F7F3E9] hover:bg-[#1a4738] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#123328] border-b border-[#1f5242] px-4 pt-3 pb-6 animate-fadeIn">
          {/* Language Switcher on Mobile */}
          <div className="flex items-center justify-between py-2 border-b border-white/10 mb-3">
            <span className="text-xs text-[#F7F3E9]/70">Language / ভাষা:</span>
            <div className="flex items-center bg-[#173F32] rounded-full p-0.5 border border-white/10 text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full ${
                  language === 'en' ? 'bg-[#E98738] text-[#173F32] font-bold' : 'text-white/80'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 rounded-full ${
                  language === 'bn' ? 'bg-[#E98738] text-[#173F32] font-bold' : 'text-white/80'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Loyalty Points Widget in Mobile Drawer */}
          <div
            onClick={() => {
              onOpenLoyalty();
              setMobileMenuOpen(false);
            }}
            className="p-3 mb-3 rounded-2xl bg-gradient-to-r from-amber-950/70 via-[#1a4738] to-[#123328] border border-[#E98738]/40 flex items-center justify-between cursor-pointer hover:border-[#E98738] transition-all shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-[#E98738] text-[#173F32] flex items-center justify-center font-bold text-base shadow">
                🪙
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">
                    {language === 'bn' ? 'লয়্যালটি পয়েন্ট ব্যালেন্স' : 'Loyalty Points'}
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-[#E98738] text-[#173F32] rounded">
                    {loyaltyAccount.tier}
                  </span>
                </div>
                <p className="text-[11px] text-amber-300 font-mono font-bold mt-0.5">
                  {loyaltyAccount.points} pts &bull;{' '}
                  <span className="text-[#F7F3E9]/80 font-sans font-normal">
                    {language === 'bn' ? 'ডিসকাউন্ট দেখতে ট্যাপ করুন' : 'Track discount progress'}
                  </span>
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#E98738] bg-black/30 px-2.5 py-1 rounded-lg">
              {language === 'bn' ? 'রিওয়ার্ড' : 'Rewards'} &rarr;
            </span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-[#E98738] text-[#173F32] font-bold'
                      : 'text-[#F7F3E9] hover:bg-[#1a4738]'
                  }`}
                >
                  <span>{language === 'bn' ? link.labelBn : link.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-white/10 space-y-2">
            {onOpenTrackOrder && (
              <button
                onClick={() => {
                  onOpenTrackOrder();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#1a4738] text-[#F7F3E9] border border-[#2d6f5a] font-bold flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <Package className="w-4 h-4 text-[#E98738]" />
                <span>{language === 'bn' ? 'লাইভ অর্ডার ট্র্যাক করুন' : 'Track Food Order'}</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenReservation();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-[#E98738] text-[#173F32] font-bold flex items-center justify-center gap-2 shadow"
            >
              <Calendar className="w-5 h-5" />
              <span>{language === 'bn' ? 'টেবিল রিজার্ভেশন করুন' : 'Book a Table Now'}</span>
            </button>
            <a
              href={`tel:${settings.phone}`}
              className="w-full py-2.5 rounded-xl bg-[#173F32] text-[#F7F3E9] border border-white/20 font-medium flex items-center justify-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-[#E98738]" />
              <span>{language === 'bn' ? 'কল করুন: ' : 'Call Us: '}{settings.phone}</span>
            </a>
            <div className="text-center pt-2">
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#F7F3E9]/60 underline"
              >
                Staff Login / Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
