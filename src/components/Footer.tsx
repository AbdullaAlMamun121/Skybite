import React from 'react';
import { ChefHat, MapPin, Phone, Mail, Clock, Send, Heart, ShieldCheck, Lock } from 'lucide-react';
import { RestaurantSettings } from '../types';
import { getGoogleMapsUrl } from '../utils/formatters';

interface FooterProps {
  settings: RestaurantSettings;
  language: 'en' | 'bn';
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  language,
  setActiveTab,
  onOpenAdmin,
  onOpenReservation,
}) => {
  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#123328] text-[#F7F3E9] border-t border-[#1f5242] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1f5242]">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E98738] flex items-center justify-center text-[#173F32] font-black shadow">
                <ChefHat className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-display text-2xl font-bold tracking-wider text-[#F7F3E9]">
                  SKY BITE
                </span>
                <p className="text-[10px] tracking-widest text-[#E98738] uppercase font-semibold">
                  Rooftop Restaurant &bull; Kushtia
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F7F3E9]/75 font-light leading-relaxed">
              {settings.tagline} {language === 'bn' ? 'কুষ্টিয়ার প্রাণকেন্দ্র ৫ রাস্তার মোড়ে আধুনিক রুফটপ ভোজনালয়।' : 'Kushtia\'s premier rooftop dining destination for authentic Chinese, stone-baked Italian pizza and fresh seafood.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#173F32] border border-[#2d6f5a] text-[#E98738] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Halal
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#173F32] border border-[#2d6f5a] text-[#F7F3E9]/80">
                5 Rasta More Landmark
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#E98738]">
              {language === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F7F3E9]/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#E98738] transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'হোম' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-[#E98738] transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'ফুড মেনু' : 'Food Menu'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#E98738] transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'আমাদের গল্প' : 'About Us'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#E98738] transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'ফটোগ্যালারি' : 'Photo Gallery'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-[#E98738] transition-colors cursor-pointer text-[#E98738] font-semibold"
                >
                  {language === 'bn' ? 'টেবিল বুকিং' : 'Book a Table'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#E98738] transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Delivery */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#E98738]">
              {language === 'bn' ? 'খোলা থাকার সময়সূচি' : 'Hours & Service'}
            </h4>
            <div className="space-y-2 text-xs text-[#F7F3E9]/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E98738] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Everyday / প্রতিদিন:</p>
                  <p>{settings.openingHours}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 text-xs">
                <p className="text-[#E98738] font-semibold">Home Delivery Available:</p>
                <p>Kushtia Sadar Town (Delivery Charge: ৳{settings.deliveryChargeKushtiaSadar})</p>
              </div>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#E98738]">
              {language === 'bn' ? 'ঠিকানা ও বুকিং হেল্পলাইন' : 'Contact & Helpline'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#F7F3E9]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E98738] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E98738] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white font-semibold">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E98738] shrink-0" />
                <span>{settings.email}</span>
              </p>

              {/* Social Channels */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] border border-[#2d6f5a] font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] border border-[#2d6f5a] font-semibold text-xs transition-colors"
                >
                  Facebook Page
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F3E9]/60 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Sky Bite Restaurant, Kushtia. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#E98738] fill-current" /> for Kushtia
            </span>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={onOpenAdmin}
              className="text-[#F7F3E9]/60 hover:text-[#E98738] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login / Admin Panel</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
