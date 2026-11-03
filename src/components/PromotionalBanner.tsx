import React, { useState, useEffect } from 'react';
import { RestaurantSettings } from '../types';
import { Tag, Sparkles, X, ArrowRight, Flame } from 'lucide-react';

interface PromotionalBannerProps {
  settings: RestaurantSettings;
  language?: 'en' | 'bn';
  onCtaClick?: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  settings,
  language = 'en',
  onCtaClick,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastDismissedMsg, setLastDismissedMsg] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('skybite_promo_dismissed');
    } catch {
      return null;
    }
  });

  // Re-enable banner if the admin updates or changes the special offer message!
  useEffect(() => {
    const currentMsg = settings.announcementBanner?.trim();
    if (lastDismissedMsg && lastDismissedMsg !== currentMsg) {
      setIsDismissed(false);
      try {
        sessionStorage.removeItem('skybite_promo_dismissed');
      } catch {
        // ignore
      }
    }
  }, [settings.announcementBanner, lastDismissedMsg]);

  // If banner is disabled by admin in settings or has empty text or user dismissed this exact offer
  if (!settings.bannerActive || !settings.announcementBanner || !settings.announcementBanner.trim()) {
    return null;
  }

  if (isDismissed || (lastDismissedMsg && lastDismissedMsg === settings.announcementBanner.trim())) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    setLastDismissedMsg(settings.announcementBanner.trim());
    try {
      sessionStorage.setItem('skybite_promo_dismissed', settings.announcementBanner.trim());
    } catch {
      // ignore
    }
  };

  const badgeText = settings.promoBadge?.trim() || (language === 'bn' ? 'স্পেশাল অফার' : 'SPECIAL OFFER');
  const buttonText = settings.promoButtonText?.trim() || (language === 'bn' ? 'অর্ডার করুন' : 'Order Now');

  return (
    <div
      role="banner"
      aria-label="Promotional Announcement"
      className="relative z-50 bg-gradient-to-r from-[#E98738] via-[#e27c2b] to-[#d67222] text-[#173F32] shadow-md border-b border-[#c86318] transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left / Center Promo Content */}
        <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 text-center sm:text-left min-w-0">
          {/* Badge */}
          <span className="inline-flex items-center gap-1 bg-[#173F32] text-[#F7F3E9] text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm shrink-0">
            <Flame className="w-3 h-3 text-[#E98738] animate-pulse" />
            <span>{badgeText}</span>
          </span>

          {/* Offer Copy */}
          <p className="text-xs sm:text-sm font-bold text-[#173F32] leading-snug drop-shadow-sm line-clamp-2 sm:line-clamp-1">
            {settings.announcementBanner}
          </p>

          {/* Optional Action CTA */}
          {onCtaClick && (
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-1 ml-1 text-xs font-extrabold text-[#173F32] bg-white/40 hover:bg-white/70 px-2.5 py-0.5 rounded-full border border-[#173F32]/20 transition-all cursor-pointer shrink-0 shadow-xs"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Right Dismiss Button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={handleDismiss}
            aria-label="Dismiss promotional banner"
            title="Dismiss special offer banner"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#173F32] hover:bg-[#173F32]/15 active:bg-[#173F32]/25 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
