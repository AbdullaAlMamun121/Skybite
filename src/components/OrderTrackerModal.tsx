import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Package,
  ChefHat,
  Bike,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  AlertCircle,
  MapPin,
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Order, OrderStatus, LoyaltyAccount } from '../types';
import { formatPrice } from '../utils/formatters';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialOrderRef?: string | null;
  restaurantPhone: string;
  restaurantWhatsApp: string;
  language: 'en' | 'bn';
  loyaltyAccount: LoyaltyAccount;
  onOpenLoyalty?: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderRef,
  restaurantPhone,
  restaurantWhatsApp,
  language,
  loyaltyAccount,
  onOpenLoyalty,
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderRef || '');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync initial ref or find latest order
  useEffect(() => {
    if (initialOrderRef) {
      setSearchInput(initialOrderRef);
      const matched = orders.find(
        (o) => o.orderNumber.toLowerCase() === initialOrderRef.toLowerCase()
      );
      if (matched) {
        setActiveOrder(matched);
      }
    } else if (orders.length > 0) {
      // Pick most recent order by default
      setActiveOrder(orders[0]);
      setSearchInput(orders[0].orderNumber);
    }
  }, [initialOrderRef, orders, isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    const matched = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === query ||
        o.customerPhone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, '')) ||
        o.customerName.toLowerCase().includes(query)
    );

    setActiveOrder(matched || null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (activeOrder) {
      const refreshed = orders.find((o) => o.id === activeOrder.id);
      if (refreshed) setActiveOrder(refreshed);
    }
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Steps definition for Order Stepper
  const steps: {
    status: OrderStatus;
    labelEn: string;
    labelBn: string;
    descEn: string;
    descBn: string;
    icon: React.ElementType;
  }[] = [
    {
      status: 'pending',
      labelEn: 'Order Received',
      labelBn: 'অর্ডার গৃহীত হয়েছে',
      descEn: 'Awaiting kitchen confirmation',
      descBn: 'কিচেন নিশ্চিতকরণের অপেক্ষায়',
      icon: Clock,
    },
    {
      status: 'preparing',
      labelEn: 'Cooking Fresh',
      labelBn: 'রান্না প্রস্তুত হচ্ছে',
      descEn: 'Chef preparing on rooftop kitchen',
      descBn: 'শেফ স্পেশাল মসলায় রান্না করছেন',
      icon: ChefHat,
    },
    {
      status: 'out_for_delivery',
      labelEn: 'Out for Delivery',
      labelBn: 'ডেলিভারিতে বের হয়েছে',
      descEn: 'Rider on way / Table service ready',
      descBn: 'রাইডার কুষ্টিয়া শহরে রওয়ানা দিয়েছেন',
      icon: Bike,
    },
    {
      status: 'delivered',
      labelEn: 'Delivered & Enjoyed',
      labelBn: 'সফলভাবে ডেলিভার্ড',
      descEn: 'Order completed. Bon appétit!',
      descBn: 'অর্ডারটি পৌঁছে দেওয়া হয়েছে। ধন্যবাদ!',
      icon: CheckCircle2,
    },
  ];

  const getStepProgress = (currentStatus: OrderStatus): number => {
    switch (currentStatus) {
      case 'pending':
        return 1;
      case 'confirmed':
        return 1.5;
      case 'preparing':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
        return -1;
      default:
        return 1;
    }
  };

  const currentStepNum = activeOrder ? getStepProgress(activeOrder.status) : 1;
  const isCancelled = activeOrder?.status === 'cancelled';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-[#F7F3E9] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#173F32]/20 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#173F32] text-[#F7F3E9] p-5 sm:p-6 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E98738] text-[#173F32] flex items-center justify-center font-bold shadow-md">
              <Package className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-display tracking-wide text-[#F7F3E9]">
                  {language === 'bn' ? 'লাইভ অর্ডার ট্র্যাকার' : 'Live Order Tracker'}
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Live UI Sync
                </span>
              </div>
              <p className="text-xs text-[#F7F3E9]/70 mt-0.5">
                {language === 'bn'
                  ? 'Sky Bite কিচেন থেকে আপনার দরজায় লাইভ ট্র্যাকিং'
                  : 'Track your food from Sky Bite kitchen to your doorstep'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-gray-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'অর্ডার নম্বর বা মোবাইল নাম্বার লিখুন (উদা: SB-ORD-1042)...'
                    : 'Enter Order # (e.g. SB-ORD-1042) or customer phone...'
                }
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F32] font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#173F32] text-[#F7F3E9] text-xs sm:text-sm font-bold hover:bg-[#1f5242] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>{language === 'bn' ? 'খুঁজুন' : 'Track'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Recent Badges with Points Earned */}
          {orders.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-[11px] text-gray-500">
              <span className="font-semibold text-gray-600">
                {language === 'bn' ? 'সাম্প্রতিক অর্ডার ও পয়েন্ট:' : 'Recent Orders & Points:'}
              </span>
              {orders.slice(0, 4).map((o) => {
                const pts = o.loyaltyPointsEarned ?? Math.floor(o.subtotal / 20);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      setSearchInput(o.orderNumber);
                      setActiveOrder(o);
                    }}
                    className={`px-2 py-0.5 rounded-lg border font-mono text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeOrder?.id === o.id
                        ? 'bg-[#173F32] text-[#F7F3E9] border-[#173F32]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                    }`}
                  >
                    <span>{o.orderNumber}</span>
                    <span className="text-[10px] text-amber-600 font-bold bg-amber-100/90 px-1 py-0.2 rounded">
                      +{pts} pts
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeOrder ? (
            <>
              {/* Order Status Banner */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isCancelled
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : activeOrder.status === 'delivered'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : activeOrder.status === 'out_for_delivery'
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-blue-50 border-blue-200 text-blue-950'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md ${
                        isCancelled
                          ? 'bg-rose-600'
                          : activeOrder.status === 'delivered'
                          ? 'bg-emerald-600'
                          : activeOrder.status === 'out_for_delivery'
                          ? 'bg-[#E98738]'
                          : 'bg-blue-600'
                      }`}
                    >
                      {isCancelled ? (
                        <X className="w-6 h-6" />
                      ) : activeOrder.status === 'delivered' ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : activeOrder.status === 'out_for_delivery' ? (
                        <Bike className="w-6 h-6" />
                      ) : (
                        <ChefHat className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-base sm:text-lg text-[#173F32]">
                          {activeOrder.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            isCancelled
                              ? 'bg-rose-100 text-rose-800'
                              : activeOrder.status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : activeOrder.status === 'out_for_delivery'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {activeOrder.status === 'out_for_delivery'
                            ? 'Out for Delivery'
                            : activeOrder.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {language === 'bn' ? 'অর্ডার ধরন:' : 'Type:'}{' '}
                        <strong className="capitalize text-[#173F32]">
                          {activeOrder.orderType}
                        </strong>{' '}
                        &bull; {activeOrder.createdAt}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer"
                    title="Refresh live status"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{language === 'bn' ? 'রিফ্রেশ' : 'Refresh Status'}</span>
                  </button>
                </div>

                {/* Status Last Updated Time Notice */}
                {activeOrder.statusUpdatedAt && (
                  <div className="mt-3 pt-3 border-t border-gray-200/70 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E98738]" />
                      <span>
                        {language === 'bn' ? 'স্ট্যাটাস আপডেট:' : 'Last Status Update:'}{' '}
                        <strong className="text-gray-800">{activeOrder.statusUpdatedAt}</strong>
                      </span>
                    </span>
                    {activeOrder.estimatedDeliveryTime && (
                      <span className="font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        ETA: {activeOrder.estimatedDeliveryTime}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* 4-Step Animated Progress Stepper */}
              {!isCancelled ? (
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
                    {language === 'bn' ? 'অর্ডার অগ্রগতি স্ট্যাটাস' : 'Live Order Progress'}
                  </h4>

                  <div className="relative">
                    {/* Stepper Connecting Line */}
                    <div className="absolute top-5 left-6 right-6 h-1 bg-gray-200 -z-0 hidden sm:block">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-[#E98738] transition-all duration-700"
                        style={{
                          width: `${Math.min(100, Math.max(0, ((currentStepNum - 1) / 3) * 100))}%`,
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative z-10">
                      {steps.map((step, idx) => {
                        const stepIndex = idx + 1;
                        const isDone = currentStepNum >= stepIndex;
                        const isCurrent =
                          (currentStepNum >= stepIndex && currentStepNum < stepIndex + 1) ||
                          (stepIndex === 4 && currentStepNum === 4);
                        const StepIcon = step.icon;

                        return (
                          <div
                            key={step.status}
                            className={`flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 p-2 sm:p-0 rounded-xl transition-all ${
                              isCurrent
                                ? 'bg-[#F7F3E9] sm:bg-transparent border sm:border-0 border-[#E98738]/40'
                                : ''
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-transform ${
                                isDone
                                  ? 'bg-[#173F32] text-[#F7F3E9] shadow-md scale-105'
                                  : 'bg-gray-100 text-gray-400 border border-gray-300'
                              } ${isCurrent ? 'ring-4 ring-[#E98738]/30 animate-pulse' : ''}`}
                            >
                              <StepIcon className="w-5 h-5" />
                            </div>

                            <div>
                              <p
                                className={`text-xs font-bold leading-tight ${
                                  isDone ? 'text-[#173F32]' : 'text-gray-400'
                                }`}
                              >
                                {language === 'bn' ? step.labelBn : step.labelEn}
                              </p>
                              <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                                {language === 'bn' ? step.descBn : step.descEn}
                              </p>
                              {isCurrent && (
                                <span className="inline-block mt-1 text-[9px] font-black uppercase text-[#E98738] bg-[#E98738]/10 px-1.5 py-0.5 rounded">
                                  Current Stage
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-rose-800 text-sm">
                    {language === 'bn' ? 'অর্ডারটি বাতিল করা হয়েছে' : 'Order Was Cancelled'}
                  </h4>
                  <p className="text-xs text-rose-700 max-w-md mx-auto">
                    {activeOrder.adminNotes ||
                      (language === 'bn'
                        ? 'কোনো কারণে অর্ডারটি সম্পন্ন করা সম্ভব হয়নি। বিস্তারিত জানতে কল বা হোয়াটসঅ্যাপ করুন।'
                        : 'This order was cancelled. Please contact our manager for details or reordering.')}
                  </p>
                </div>
              )}

              {/* Admin / Kitchen / Rider Notes Banner if available */}
              {activeOrder.adminNotes && !isCancelled && (
                <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#E98738] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-amber-900">
                      {language === 'bn' ? 'কিচেন ও রাইডার মেসেজ:' : 'Kitchen & Delivery Note:'}
                    </h5>
                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                      {activeOrder.adminNotes}
                    </p>
                    {activeOrder.riderName && (
                      <p className="text-[11px] font-semibold text-gray-700 mt-1">
                        Assigned Rider: <strong className="text-[#173F32]">{activeOrder.riderName}</strong>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Customer & Delivery Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <h5 className="font-bold text-[#173F32] uppercase tracking-wider text-[11px] flex items-center gap-1.5 pb-2 border-b border-gray-100">
                    <MapPin className="w-3.5 h-3.5 text-[#E98738]" />
                    <span>Customer & Delivery Details</span>
                  </h5>

                  <div className="space-y-1.5 pt-1 text-gray-700">
                    <p>
                      <strong>Recipient:</strong> {activeOrder.customerName}
                    </p>
                    <p>
                      <strong>Phone:</strong> {activeOrder.customerPhone}
                    </p>
                    {activeOrder.orderType === 'delivery' && (
                      <p>
                        <strong>Address:</strong> {activeOrder.customerAddress || 'Kushtia Sadar'}
                      </p>
                    )}
                    {activeOrder.orderType === 'dine-in' && (
                      <p>
                        <strong>Table Number:</strong> Table #{activeOrder.tableNumber || 'Rooftop'}
                      </p>
                    )}
                    {activeOrder.specialNotes && (
                      <p className="italic text-gray-500 bg-gray-50 p-2 rounded-lg">
                        Special Instructions: &quot;{activeOrder.specialNotes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Ordered Items Breakdown */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <h5 className="font-bold text-[#173F32] uppercase tracking-wider text-[11px] flex items-center gap-1.5 pb-2 border-b border-gray-100">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-[#E98738]" />
                    <span>Food Items ({activeOrder.items.length})</span>
                  </h5>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {activeOrder.items.map((ci, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-medium text-gray-800 truncate">
                            {ci.item.name}
                          </p>
                          <span className="text-[10px] text-gray-400">
                            {formatPrice(ci.item.price)} x {ci.quantity}
                          </span>
                        </div>
                        <span className="font-bold text-[#173F32]">
                          {formatPrice(ci.item.price * ci.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-gray-100 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal:</span>
                      <span>{formatPrice(activeOrder.subtotal)}</span>
                    </div>
                    {activeOrder.deliveryCharge > 0 && (
                      <div className="flex justify-between text-gray-500">
                        <span>Delivery Charge:</span>
                        <span>{formatPrice(activeOrder.deliveryCharge)}</span>
                      </div>
                    )}
                    {activeOrder.discountFromPoints && activeOrder.discountFromPoints > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Loyalty Discount ({activeOrder.loyaltyPointsRedeemed || 0} pts):</span>
                        <span>-{formatPrice(activeOrder.discountFromPoints)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-sm text-[#173F32] pt-1 border-t border-gray-200">
                      <span>Total Amount:</span>
                      <span className="text-[#E98738]">{formatPrice(activeOrder.totalAmount)}</span>
                    </div>

                    {/* Points Earned on this Order */}
                    <div className="mt-2 pt-2 border-t border-amber-100 flex items-center justify-between p-2 rounded-xl bg-amber-50/90 text-xs">
                      <span className="flex items-center gap-1.5 text-amber-900 font-semibold">
                        <span>🪙</span>
                        <span>{language === 'bn' ? 'অর্জিত লয়্যালটি পয়েন্ট:' : 'Points Earned on this Order:'}</span>
                      </span>
                      <span className="font-mono font-black text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-md">
                        +{activeOrder.loyaltyPointsEarned ?? Math.floor(activeOrder.subtotal / 20)} pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Loyalty & Discount Progress Card in Order History */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#173F32] to-[#123328] text-[#F7F3E9] shadow-md border border-[#2d6f5a] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E98738] text-[#173F32] flex items-center justify-center font-bold text-base shadow">
                      🪙
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white">
                          {language === 'bn' ? 'আপনার লয়্যালটি পয়েন্ট ও ডিসকাউন্ট ট্র্যাকার' : 'Your Loyalty Points & Discount Progress'}
                        </h4>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#E98738] text-[#173F32]">
                          {loyaltyAccount.tier}
                        </span>
                      </div>
                      <p className="text-xs text-[#F7F3E9]/75 mt-0.5">
                        {language === 'bn'
                          ? `বর্তমান ব্যালেন্স: ${loyaltyAccount.points} পয়েন্ট | মোট অর্জিত: ${loyaltyAccount.lifetimeEarned} পয়েন্ট`
                          : `Current Balance: ${loyaltyAccount.points} pts | Lifetime Earned: ${loyaltyAccount.lifetimeEarned} pts`}
                      </p>
                    </div>
                  </div>

                  {onOpenLoyalty && (
                    <button
                      onClick={onOpenLoyalty}
                      className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F7F3E9] text-xs font-bold border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{language === 'bn' ? 'রিওয়ার্ড তালিকা' : 'View Rewards'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E98738]" />
                    </button>
                  )}
                </div>

                {/* Progress Bar towards Next Milestone */}
                {(() => {
                  const milestones = [
                    { pts: 50, discount: 50, label: '৳50 Off' },
                    { pts: 100, discount: 100, label: '৳100 Off' },
                    { pts: 200, discount: 250, label: '৳250 VIP Off' },
                    { pts: 500, discount: 700, label: '৳700 Platinum Off' },
                  ];
                  const nextM = milestones.find((m) => m.pts > loyaltyAccount.points) || milestones[milestones.length - 1];
                  const prevPts = [...milestones].reverse().find((m) => m.pts <= loyaltyAccount.points)?.pts || 0;
                  const ptsNeeded = Math.max(0, nextM.pts - loyaltyAccount.points);
                  const pct = Math.min(
                    100,
                    Math.round(((loyaltyAccount.points - prevPts) / (nextM.pts - prevPts)) * 100) || 0
                  );

                  return (
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-amber-300">
                          {ptsNeeded > 0
                            ? `${ptsNeeded} pts needed to unlock ${nextM.label} Voucher!`
                            : `🎉 ${nextM.label} Voucher Unlocked!`}
                        </span>
                        <span className="font-mono font-bold text-amber-300">
                          {loyaltyAccount.points} / {nextM.pts} pts ({pct}%)
                        </span>
                      </div>

                      <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#E98738] transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-white/70">
                        <span>Earn 1 pt per ৳20 spent on any rooftop order</span>
                        {loyaltyAccount.points >= 50 && (
                          <span className="text-emerald-300 font-bold">
                            ✓ Ready to redeem at checkout!
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Points Earned Across Past Orders Table */}
                <div className="pt-3 border-t border-white/10">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-300/90 mb-2">
                    {language === 'bn' ? 'অর্ডার হিস্ট্রি থেকে অর্জিত পয়েন্ট:' : 'Points Earned Across Order History:'}
                  </h5>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {orders.map((ord) => {
                      const pts = ord.loyaltyPointsEarned ?? Math.floor(ord.subtotal / 20);
                      const isCurrent = activeOrder?.id === ord.id;
                      return (
                        <div
                          key={ord.id}
                          className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                            isCurrent
                              ? 'bg-white/15 border border-[#E98738]/50'
                              : 'bg-black/20 hover:bg-black/30'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white">{ord.orderNumber}</span>
                            <span className="text-[10px] text-white/60 capitalize">({ord.orderType})</span>
                            <span className="text-[10px] text-white/50">{ord.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono">
                            <span className="text-white/70 text-[11px]">{formatPrice(ord.totalAmount)}</span>
                            <span className="font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                              +{pts} pts
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 px-4 bg-white rounded-2xl border border-gray-200 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-[#E98738] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="font-bold font-display text-lg text-[#173F32]">
                  {language === 'bn' ? 'কোনো অর্ডার পাওয়া যায়নি' : 'No Order Found'}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'bn'
                    ? 'দয়া করে সঠিক অর্ডার নম্বর (উদা: SB-ORD-1042) বা যে মোবাইল নম্বর দিয়ে অর্ডার করেছেন তা দিয়ে সার্চ করুন।'
                    : 'Please check your Order ID (e.g. SB-ORD-1042) or mobile number, or choose a recent order above.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Hotlines */}
        <div className="p-4 sm:p-5 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Sky Bite Rooftop Support &bull; 5 Rasta More, Kushtia
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${restaurantPhone}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#173F32] font-bold cursor-pointer transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E98738]" />
              <span>Call Hotlines</span>
            </a>

            <a
              href={`https://wa.me/${restaurantWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                activeOrder
                  ? `Hello Sky Bite, I would like to check the status of my order ${activeOrder.orderNumber}.`
                  : 'Hello Sky Bite, I would like to track my order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Manager</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
