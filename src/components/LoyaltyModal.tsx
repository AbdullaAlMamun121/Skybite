import React, { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  TrendingUp,
  Gift,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Percent,
  Coins
} from 'lucide-react';
import { LoyaltyAccount, LoyaltyReward } from '../types';
import { formatPrice } from '../utils/formatters';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  loyaltyAccount: LoyaltyAccount;
  language: 'en' | 'bn';
  onOpenCart?: () => void;
}

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-50',
    pointsRequired: 50,
    discountAmount: 50,
    title: '৳50 Off Any Order',
    bengaliTitle: 'যেকোনো অর্ডারে ৫০ টাকা ছাড়',
    description: 'Instant ৳50 discount at checkout on orders of ৳400 or more.',
    minOrderAmount: 400,
  },
  {
    id: 'rew-100',
    pointsRequired: 100,
    discountAmount: 100,
    title: '৳100 Off Delicious Meal',
    bengaliTitle: '১০০ টাকা ইনস্ট্যান্ট ছাড়',
    description: 'Instant ৳100 discount at checkout on orders of ৳800 or more.',
    minOrderAmount: 800,
  },
  {
    id: 'rew-200',
    pointsRequired: 200,
    discountAmount: 250,
    title: '৳250 VIP Rooftop Treat (Bonus +৳50)',
    bengaliTitle: '২৫০ টাকা ভিআইপি রিওয়ার্ড',
    description: 'Super value voucher: Spend 200 pts to get ৳250 off on orders of ৳1,200 or more.',
    minOrderAmount: 1200,
  },
  {
    id: 'rew-500',
    pointsRequired: 500,
    discountAmount: 700,
    title: '৳700 Platinum Feast Coupon (Bonus +৳200)',
    bengaliTitle: '৭০০ টাকা প্ল্যাটিনাম ফিস্ট কুপন',
    description: 'Ultimate dining reward: 500 pts gives you ৳700 off any family banquet or celebration.',
    minOrderAmount: 2000,
  },
];

export const LoyaltyModal: React.FC<LoyaltyModalProps> = ({
  isOpen,
  onClose,
  loyaltyAccount,
  language,
  onOpenCart,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'history'>('overview');

  if (!isOpen) return null;

  const currentPoints = loyaltyAccount.points;

  // Next milestone calculation
  const nextMilestone = LOYALTY_REWARDS.find((r) => r.pointsRequired > currentPoints) || {
    pointsRequired: 1000,
    discountAmount: 1500,
    title: 'Royal Ambassador Reward',
    bengaliTitle: 'রয়্যাল রিওয়ার্ড',
  };

  const prevMilestonePoints =
    [...LOYALTY_REWARDS]
      .reverse()
      .find((r) => r.pointsRequired <= currentPoints)?.pointsRequired || 0;

  const pointsNeeded = Math.max(0, nextMilestone.pointsRequired - currentPoints);
  const progressPercent = Math.min(
    100,
    Math.round(
      ((currentPoints - prevMilestonePoints) / (nextMilestone.pointsRequired - prevMilestonePoints)) *
        100
    ) || 0
  );

  const tierStyles = {
    Bronze: 'from-amber-700 via-amber-800 to-amber-950 text-amber-100 border-amber-600/40',
    Silver: 'from-slate-700 via-slate-800 to-slate-900 text-slate-100 border-slate-400/40',
    Gold: 'from-amber-500 via-yellow-600 to-amber-700 text-yellow-50 border-yellow-300/40',
    Platinum: 'from-emerald-800 via-teal-900 to-[#173F32] text-teal-100 border-teal-300/40',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#173F32] to-[#123328] p-5 sm:p-6 text-[#F7F3E9] flex items-center justify-between border-b border-[#1f5242]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E98738] text-[#173F32] flex items-center justify-center shadow-md">
              <Coins className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  {language === 'bn' ? 'স্কাই বাইট লয়্যালটি রিওয়ার্ডস' : 'Sky Bite Loyalty Rewards'}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E98738] text-[#173F32] px-2 py-0.5 rounded-full">
                  VIP Club
                </span>
              </div>
              <p className="text-xs text-[#F7F3E9]/75 mt-0.5">
                {language === 'bn'
                  ? 'প্রতি অর্ডারে পয়েন্ট অর্জন করুন এবং খাবারে ইনস্ট্যান্ট ডিসকাউন্ট নিন'
                  : 'Earn points on every meal & redeem instant cash discounts'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close loyalty modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 px-4 sm:px-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#E98738] text-[#173F32] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#E98738]" />
            <span>{language === 'bn' ? 'ব্যালেন্স ও প্রগ্রেস' : 'Balance & Progress'}</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rewards'
                ? 'border-[#E98738] text-[#173F32] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Gift className="w-4 h-4 text-[#E98738]" />
            <span>{language === 'bn' ? 'ডিসকাউন্ট রিওয়ার্ডস' : 'Reward Milestones'}</span>
            <span className="ml-1 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
              {LOYALTY_REWARDS.filter((r) => currentPoints >= r.pointsRequired).length} Ready
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-[#E98738] text-[#173F32] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4 text-[#E98738]" />
            <span>{language === 'bn' ? 'পয়েন্ট ইতিহাস' : 'Points History'}</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* VIP Member Digital Card */}
              <div
                className={`p-6 rounded-3xl bg-gradient-to-br ${
                  tierStyles[loyaltyAccount.tier] || tierStyles.Silver
                } shadow-xl border relative overflow-hidden`}
              >
                {/* Decorative background glow */}
                <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-44 h-44 rounded-full bg-[#E98738]/10 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#E98738]" />
                      <span className="text-xs font-bold tracking-widest uppercase opacity-80">
                        Sky Bite Kushtia Member
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold font-display mt-1 tracking-wide">
                      {loyaltyAccount.tier} Diner Tier
                    </h4>
                    <p className="text-xs opacity-75 mt-0.5">
                      Earn 1 pt per ৳20 spent on all Rooftop & Delivery dining
                    </p>
                  </div>

                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center sm:text-right min-w-[140px]">
                    <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
                      Current Balance
                    </span>
                    <div className="text-3xl font-black font-mono text-white mt-0.5 flex items-center justify-center sm:justify-end gap-1.5">
                      <span>{currentPoints}</span>
                      <span className="text-sm font-sans text-amber-400 font-bold">pts</span>
                    </div>
                    <span className="text-[10px] text-white/60 block mt-0.5">
                      Lifetime: {loyaltyAccount.lifetimeEarned} pts
                    </span>
                  </div>
                </div>

                {/* Next Milestone Progress Bar */}
                <div className="mt-6 pt-5 border-t border-white/15 relative z-10">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        Progress to next discount:{' '}
                        <strong className="text-amber-300">{nextMilestone.title}</strong>
                      </span>
                    </span>
                    <span className="font-mono font-bold text-amber-300">
                      {currentPoints} / {nextMilestone.pointsRequired} pts ({progressPercent}%)
                    </span>
                  </div>

                  <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 via-[#E98738] to-emerald-400 transition-all duration-700 shadow-sm"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] opacity-80">
                    {pointsNeeded > 0 ? (
                      <span>
                        Only <strong>{pointsNeeded} more points</strong> needed to unlock! (Spend ~
                        {formatPrice(pointsNeeded * 20)})
                      </span>
                    ) : (
                      <span className="text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Milestone reached! Ready to redeem at checkout!
                      </span>
                    )}
                    <span className="font-semibold">Goal: {nextMilestone.pointsRequired} pts</span>
                  </div>
                </div>
              </div>

              {/* Ready to Redeem Banner */}
              {currentPoints >= 50 ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      <Percent className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-emerald-950 text-sm">
                        {language === 'bn'
                          ? 'আপনি ডিসকাউন্ট রিডিম করতে প্রস্তুত!'
                          : 'You have redeemable discounts available!'}
                      </h5>
                      <p className="text-xs text-emerald-800 mt-0.5">
                        {language === 'bn'
                          ? `আপনার ${currentPoints} পয়েন্ট দিয়ে সরাসরি অর্ডার ব্যাগে ছাড় পাবেন।`
                          : `Use your ${currentPoints} points directly in the order drawer for instant cash off.`}
                      </p>
                    </div>
                  </div>

                  {onOpenCart && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenCart();
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'অর্ডার ব্যাগে যান' : 'Use in Cart'}</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[#E98738] shrink-0" />
                  <div className="text-xs text-amber-900">
                    <strong className="block text-amber-950 font-bold text-sm">
                      Earn Points with Every Meal
                    </strong>
                    Place your first order or add delicious dishes to your bag. 1 point for every ৳20
                    spent!
                  </div>
                </div>
              )}

              {/* Quick Earning Rules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#F7F3E9] p-3.5 rounded-2xl border border-gray-200/80">
                  <div className="w-7 h-7 rounded-lg bg-[#173F32] text-[#E98738] flex items-center justify-center font-bold text-xs mb-2">
                    1
                  </div>
                  <h6 className="font-bold text-[#173F32] text-xs">Order Food</h6>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                    Dine-in at Rooftop or fast delivery across Kushtia Sadar.
                  </p>
                </div>

                <div className="bg-[#F7F3E9] p-3.5 rounded-2xl border border-gray-200/80">
                  <div className="w-7 h-7 rounded-lg bg-[#173F32] text-[#E98738] flex items-center justify-center font-bold text-xs mb-2">
                    2
                  </div>
                  <h6 className="font-bold text-[#173F32] text-xs">Earn 1 pt / ৳20</h6>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                    Automatic points calculated directly from your order subtotal.
                  </p>
                </div>

                <div className="bg-[#F7F3E9] p-3.5 rounded-2xl border border-gray-200/80">
                  <div className="w-7 h-7 rounded-lg bg-[#173F32] text-[#E98738] flex items-center justify-center font-bold text-xs mb-2">
                    3
                  </div>
                  <h6 className="font-bold text-[#173F32] text-xs">Unlock Discounts</h6>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                    Redeem 50, 100, or 200+ points at checkout for instant cash discounts!
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h4 className="font-bold text-[#173F32] text-sm font-display">
                    {language === 'bn' ? 'উপলব্ধ রিওয়ার্ডস মাইলস্টোন' : 'Available Discount Milestones'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Your balance:{' '}
                    <strong className="text-[#173F32] font-mono">{currentPoints} points</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {LOYALTY_REWARDS.map((reward) => {
                  const isUnlocked = currentPoints >= reward.pointsRequired;
                  const remaining = Math.max(0, reward.pointsRequired - currentPoints);

                  return (
                    <div
                      key={reward.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isUnlocked
                          ? 'bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-200/50'
                          : 'bg-gray-50 border-gray-200 opacity-80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                              isUnlocked
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <Gift className="w-5 h-5" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-[#173F32] text-sm">
                                {language === 'bn' ? reward.bengaliTitle : reward.title}
                              </h5>
                              {isUnlocked ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                                  Unlocked
                                </span>
                              ) : (
                                <span className="bg-gray-200 text-gray-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                                  Needs {remaining} pts
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{reward.description}</p>
                            <span className="text-[11px] text-gray-400 mt-0.5 inline-block">
                              Requires min. food order of {formatPrice(reward.minOrderAmount)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center border-t sm:border-0 pt-2 sm:pt-0 border-gray-100 shrink-0">
                          <div className="text-right">
                            <span className="font-mono font-black text-lg text-[#173F32]">
                              {reward.pointsRequired}{' '}
                              <span className="text-xs font-sans text-gray-500">pts</span>
                            </span>
                            <span className="text-xs text-emerald-600 font-bold block">
                              Save {formatPrice(reward.discountAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h4 className="font-bold text-[#173F32] text-sm font-display">
                  {language === 'bn' ? 'পয়েন্ট লেনদেন ও হিস্ট্রি' : 'Points Activity & History'}
                </h4>
                <span className="text-xs text-gray-500 font-mono">
                  {loyaltyAccount.transactions.length} activities
                </span>
              </div>

              {loyaltyAccount.transactions.length > 0 ? (
                <div className="space-y-2.5">
                  {loyaltyAccount.transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3.5 bg-gray-50 hover:bg-gray-100/80 rounded-2xl border border-gray-200/80 flex items-center justify-between gap-3 text-xs transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                            tx.type === 'earned'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {tx.type === 'earned' ? '+' : '-'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{tx.description}</p>
                          <span className="text-[10px] text-gray-400 font-mono">{tx.date}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`font-mono font-black text-sm ${
                            tx.points > 0 ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 text-xs">
                  No points activity recorded yet.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Loyalty points are tied to your device & Kushtia phone number</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenCart && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{language === 'bn' ? 'মেনু থেকে অর্ডার করুন' : 'Order & Earn More'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
