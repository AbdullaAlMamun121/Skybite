import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, Plus, Minus, ArrowRight, CheckCircle2, Bike, Store, UtensilsCrossed, Sparkles, Gift } from 'lucide-react';
import { CartItem, RestaurantSettings, Order, OrderType, LoyaltyAccount } from '../types';
import { formatPrice, generateWhatsAppOrderUrl } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  settings: RestaurantSettings;
  language: 'en' | 'bn';
  onOrderPlaced: (order: Order) => void;
  onTrackOrder?: (orderNumber: string) => void;
  loyaltyAccount: LoyaltyAccount;
  onOpenLoyalty?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  settings,
  language,
  onOrderPlaced,
  onTrackOrder,
  loyaltyAccount,
  onOpenLoyalty,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Loyalty Points Redemption State
  const [selectedRewardOption, setSelectedRewardOption] = useState<{
    points: number;
    discount: number;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const deliveryCharge = orderType === 'delivery' ? settings.deliveryChargeKushtiaSadar : 0;
  
  // Calculate potential discount
  const discountAmount = selectedRewardOption ? selectedRewardOption.discount : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const totalAmount = discountedSubtotal + deliveryCharge;

  // Calculate earnable loyalty points (1 point per ৳20 on final subtotal)
  const earnablePoints = Math.floor(discountedSubtotal / 20);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (orderType === 'delivery' && !customerAddress.trim()) return;

    const orderNumber = `SB-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: orderType === 'delivery' ? customerAddress.trim() : undefined,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber.trim() : undefined,
      items: [...items],
      subtotal,
      deliveryCharge,
      totalAmount,
      status: 'pending',
      paymentMethod: 'cash',
      specialNotes: specialNotes.trim() || undefined,
      createdAt: new Date().toLocaleString(),
      loyaltyPointsEarned: earnablePoints,
      loyaltyPointsRedeemed: selectedRewardOption ? selectedRewardOption.points : 0,
      discountFromPoints: discountAmount,
    };

    // Save to system & process points
    onOrderPlaced(newOrder);
    setLastPlacedOrder(newOrder);

    // Open WhatsApp with order details including loyalty summary
    const notesWithLoyalty = [
      specialNotes.trim(),
      selectedRewardOption
        ? `[Loyalty Discount: ৳${discountAmount} off applied using ${selectedRewardOption.points} pts]`
        : '',
      `[Earned: +${earnablePoints} SkyBite pts]`,
    ]
      .filter(Boolean)
      .join(' | ');

    const whatsappUrl = generateWhatsAppOrderUrl(
      items,
      customerName,
      customerPhone,
      customerAddress,
      orderType,
      discountedSubtotal,
      deliveryCharge,
      totalAmount,
      notesWithLoyalty,
      orderNumber,
      settings.whatsapp
    );

    window.open(whatsappUrl, '_blank');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 bg-[#173F32] text-[#F7F3E9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E98738] text-[#173F32] flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold font-display text-[#F7F3E9]">
                  {language === 'bn' ? 'আপনার অর্ডার ব্যাগ' : 'Your Order Bag'}
                </h2>
                <p className="text-[11px] text-[#F7F3E9]/70">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen if just placed */}
          {lastPlacedOrder ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#173F32]">
                {language === 'bn' ? 'অর্ডার প্রস্তুত হচ্ছে!' : 'Order Placed Successfully!'}
              </h3>
              <p className="text-xs text-[#252A27]/70 max-w-xs">
                {language === 'bn'
                  ? `আপনার অর্ডার আইডি: ${lastPlacedOrder.orderNumber}। তথ্যটি হোয়াটসঅ্যাপ ও আমাদের কিচেন ড্যাশবোর্ডে পাঠানো হয়েছে।`
                  : `Order ${lastPlacedOrder.orderNumber} is sent to WhatsApp & staff kitchen dashboard. We will confirm shortly.`}
              </p>

              <div className="bg-[#F7F3E9] p-4 rounded-xl text-left w-full text-xs space-y-1.5 border border-[#173F32]/10">
                <div className="flex justify-between font-bold text-[#173F32]">
                  <span>Total Amount:</span>
                  <span className="text-[#E98738]">{formatPrice(lastPlacedOrder.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Customer:</span>
                  <span>{lastPlacedOrder.customerName}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Type:</span>
                  <span className="uppercase font-semibold">{lastPlacedOrder.orderType}</span>
                </div>
              </div>

              <div className="w-full space-y-2">
                {onTrackOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      const num = lastPlacedOrder.orderNumber;
                      setLastPlacedOrder(null);
                      onClose();
                      onTrackOrder(num);
                    }}
                    className="w-full py-3 rounded-xl bg-[#E98738] text-[#173F32] font-bold text-sm cursor-pointer shadow-md hover:bg-[#d8782a] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{language === 'bn' ? 'অর্ডার স্ট্যাটাস ট্র্যাক করুন' : 'Track Order Status Live'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setLastPlacedOrder(null);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs cursor-pointer transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F7F3E9] flex items-center justify-center text-[#173F32]/40 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#173F32]">
                {language === 'bn' ? 'আপনার ব্যাগ খালি' : 'Your Bag is Empty'}
              </h3>
              <p className="text-xs text-[#252A27]/60 max-w-xs mt-1 mb-6">
                {language === 'bn'
                  ? 'মেনু থেকে আপনার পছন্দের চাইনিজ, ইতালিয়ান বা সিফুড আইটেম যোগ করুন।'
                  : 'Explore our gourmet dishes from the menu to build your delicious rooftop meal.'}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#E98738] text-[#173F32] font-bold text-sm cursor-pointer shadow"
              >
                {language === 'bn' ? 'মেনু দেখুন' : 'Explore Menu'}
              </button>
            </div>
          ) : (
            /* Items List & Checkout Form */
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Selected Dishes</span>
                  <button
                    onClick={onClearCart}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F3E9]/60 border border-gray-100"
                  >
                    <img
                      src={ci.item.image}
                      alt={ci.item.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#173F32] truncate">
                        {language === 'bn' && ci.item.bengaliName ? ci.item.bengaliName : ci.item.name}
                      </h4>
                      <p className="text-[11px] text-[#E98738] font-bold">
                        {formatPrice(ci.item.price)}
                      </p>
                      {ci.specialNotes && (
                        <p className="text-[10px] text-gray-400 truncate italic">
                          Note: {ci.specialNotes}
                        </p>
                      )}
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center border border-gray-200 bg-white rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(ci.item.id, ci.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#173F32]">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(ci.item.id, ci.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(ci.item.id)}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Type Selector */}
              <div>
                <label className="block text-xs font-bold text-[#173F32] uppercase mb-2">
                  Order Type / অর্ডারের ধরন
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#173F32] text-[#F7F3E9] border-[#173F32]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Bike className="w-4 h-4 text-[#E98738]" />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'bg-[#173F32] text-[#F7F3E9] border-[#173F32]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#E98738]" />
                    <span>Takeaway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      orderType === 'dine-in'
                        ? 'bg-[#173F32] text-[#F7F3E9] border-[#173F32]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <UtensilsCrossed className="w-4 h-4 text-[#E98738]" />
                    <span>Rooftop Dine-in</span>
                  </button>
                </div>
              </div>

              {/* Customer Details Form */}
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Customer Name / নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Farhan Hossain"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Phone Number / মোবাইল *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 01712-XXXXXX"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-bold text-[#173F32] mb-1">
                      Delivery Address / ঠিকানা (কুষ্টিয়া সদর) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="House / Flat, Road, Area (e.g. Court Para, Kushtia)..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                    />
                  </div>
                )}

                {orderType === 'dine-in' && (
                  <div>
                    <label className="block text-xs font-bold text-[#173F32] mb-1">
                      Table Number / টেবিল নম্বর
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Rooftop Table 5"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Please bring extra cutlery, call before arrival"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>
              </form>

              {/* Loyalty Points Earning & Redemption Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 p-3.5 rounded-2xl border border-amber-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🪙</span>
                    <div>
                      <span className="text-xs font-bold text-amber-950 block">
                        SkyBite Loyalty Club
                      </span>
                      <span className="text-[10px] text-amber-800">
                        Balance: <strong className="font-mono">{loyaltyAccount.points} pts</strong> ({loyaltyAccount.tier})
                      </span>
                    </div>
                  </div>

                  {onOpenLoyalty && (
                    <button
                      type="button"
                      onClick={onOpenLoyalty}
                      className="text-[11px] font-bold text-[#E98738] hover:text-[#d67325] underline cursor-pointer"
                    >
                      View Rewards
                    </button>
                  )}
                </div>

                {/* Earning indicator */}
                <div className="flex items-center justify-between text-xs bg-white/80 p-2 rounded-xl border border-amber-200/60">
                  <span className="text-gray-600">Points from this order:</span>
                  <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    +{earnablePoints} pts (1 pt / ৳20)
                  </span>
                </div>

                {/* Discount Redemption Selection if points available */}
                {loyaltyAccount.points >= 50 && (
                  <div className="pt-2 border-t border-amber-200/60 space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-950 block">
                      Redeem Points for Instant Discount:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedRewardOption(null)}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedRewardOption === null
                            ? 'bg-[#173F32] text-white border-[#173F32] font-bold'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="block text-[11px]">Save Points</span>
                        <span className="text-[10px] opacity-75">No discount</span>
                      </button>

                      {loyaltyAccount.points >= 50 && (
                        <button
                          type="button"
                          disabled={subtotal < 400}
                          onClick={() => setSelectedRewardOption({ points: 50, discount: 50 })}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                            selectedRewardOption?.points === 50
                              ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                              : subtotal < 400
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                              : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50/50'
                          }`}
                        >
                          <span className="block text-[11px] font-bold">50 pts &rarr; -৳50</span>
                          <span className="text-[10px] opacity-75">
                            {subtotal < 400 ? 'Min. ৳400' : 'Ready'}
                          </span>
                        </button>
                      )}

                      {loyaltyAccount.points >= 100 && (
                        <button
                          type="button"
                          disabled={subtotal < 800}
                          onClick={() => setSelectedRewardOption({ points: 100, discount: 100 })}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                            selectedRewardOption?.points === 100
                              ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                              : subtotal < 800
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                              : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50/50'
                          }`}
                        >
                          <span className="block text-[11px] font-bold">100 pts &rarr; -৳100</span>
                          <span className="text-[10px] opacity-75">
                            {subtotal < 800 ? 'Min. ৳800' : 'Ready'}
                          </span>
                        </button>
                      )}

                      {loyaltyAccount.points >= 200 && (
                        <button
                          type="button"
                          disabled={subtotal < 1200}
                          onClick={() => setSelectedRewardOption({ points: 200, discount: 250 })}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                            selectedRewardOption?.points === 200
                              ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                              : subtotal < 1200
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                              : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50/50'
                          }`}
                        >
                          <span className="block text-[11px] font-bold">200 pts &rarr; -৳250</span>
                          <span className="text-[10px] opacity-75">
                            {subtotal < 1200 ? 'Min. ৳1,200' : 'VIP Bonus'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Summary */}
              <div className="bg-[#F7F3E9] p-4 rounded-2xl border border-[#173F32]/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#173F32]">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Loyalty Reward Discount ({selectedRewardOption?.points} pts):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge (Kushtia Sadar):</span>
                    <span className="font-semibold text-[#173F32]">{formatPrice(deliveryCharge)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#173F32]/15 flex justify-between items-center text-sm font-bold text-[#173F32]">
                  <span>Total Payable:</span>
                  <span className="text-[#E98738] text-base font-black">{formatPrice(totalAmount)}</span>
                </div>
                <p className="text-[10px] text-gray-500 text-center pt-1">
                  Payment: Cash on Delivery or bKash on Arrival
                </p>
              </div>
            </div>
          )}

          {/* Footer Action Button */}
          {items.length > 0 && !lastPlacedOrder && (
            <div className="p-4 bg-white border-t border-gray-100">
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>
                  {language === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার পাঠান' : 'Order via WhatsApp'} &bull; {formatPrice(totalAmount)}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
