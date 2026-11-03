import React, { useState } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  Settings,
  Star,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Sparkles,
  Phone,
  MessageSquare,
  Lock,
  Search,
  ExternalLink,
  ChevronRight,
  CheckCheck,
  Ban,
  Bell,
  Check,
  Send,
  UserCheck,
  AlertTriangle,
  Info,
  Bike,
  ChefHat,
  Package,
  Flame,
  Tag,
  Megaphone,
  RotateCcw,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { MenuItem, Order, Reservation, Review, RestaurantSettings, FoodCategory, OrderStatus, ReservationStatus } from '../types';
import { formatPrice, generateWhatsAppStatusUpdateUrl, generateWhatsAppOrderStatusUrl } from '../utils/formatters';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onUpdateMenuItems: (items: MenuItem[]) => void;
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
  reservations: Reservation[];
  onUpdateReservations: (res: Reservation[]) => void;
  reviews: Review[];
  onUpdateReviews: (reviews: Review[]) => void;
  settings: RestaurantSettings;
  onUpdateSettings: (settings: RestaurantSettings) => void;
  isAuthenticated: boolean;
  onAuthenticate: (auth: boolean) => void;
  onNotifyUser?: (notification: {
    title: string;
    message: string;
    type: 'confirmed' | 'cancelled' | 'completed';
    reservationNumber: string;
    customerName: string;
  }) => void;
  onNotifyOrderUpdate?: (notification: {
    title: string;
    message: string;
    type: OrderStatus;
    orderNumber: string;
    customerName: string;
  }) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  menuItems,
  onUpdateMenuItems,
  orders,
  onUpdateOrders,
  reservations,
  onUpdateReservations,
  reviews,
  onUpdateReviews,
  settings,
  onUpdateSettings,
  isAuthenticated,
  onAuthenticate,
  onNotifyUser,
  onNotifyOrderUpdate,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders' | 'reservations' | 'settings' | 'reviews'>('overview');

  // New / Edit Food Modal State
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [foodName, setFoodName] = useState('');
  const [foodBengaliName, setFoodBengaliName] = useState('');
  const [foodCategory, setFoodCategory] = useState<FoodCategory>('chinese');
  const [foodPrice, setFoodPrice] = useState(450);
  const [foodImage, setFoodImage] = useState('');
  const [foodDesc, setFoodDesc] = useState('');
  const [foodPrepTime, setFoodPrepTime] = useState('15-20 mins');
  const [foodIsBestSeller, setFoodIsBestSeller] = useState(false);
  const [foodIsChefSpecial, setFoodIsChefSpecial] = useState(false);
  const [foodSpiceLevel, setFoodSpiceLevel] = useState(1);

  // Settings State Form
  const [announcementText, setAnnouncementText] = useState(settings.announcementBanner);
  const [bannerActive, setBannerActive] = useState(settings.bannerActive);
  const [promoBadgeText, setPromoBadgeText] = useState(settings.promoBadge || '50% OFF FRIDAY');
  const [promoBtnText, setPromoBtnText] = useState(settings.promoButtonText || 'Order Now');
  const [contactPhone, setContactPhone] = useState(settings.phone);
  const [whatsappNum, setWhatsappNum] = useState(settings.whatsapp);
  const [hoursText, setHoursText] = useState(settings.openingHours);
  const [deliveryFee, setDeliveryFee] = useState(settings.deliveryChargeKushtiaSadar);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [bannerResetToast, setBannerResetToast] = useState(false);

  // Sync settings when props change
  React.useEffect(() => {
    setAnnouncementText(settings.announcementBanner);
    setBannerActive(settings.bannerActive);
    setPromoBadgeText(settings.promoBadge || '50% OFF FRIDAY');
    setPromoBtnText(settings.promoButtonText || 'Order Now');
    setContactPhone(settings.phone);
    setWhatsappNum(settings.whatsapp);
    setHoursText(settings.openingHours);
    setDeliveryFee(settings.deliveryChargeKushtiaSadar);
  }, [settings]);

  // Search filter for menu items
  const [menuSearch, setMenuSearch] = useState('');

  // Order Management States
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [editingOrderNoteId, setEditingOrderNoteId] = useState<string | null>(null);
  const [adminOrderNoteInput, setAdminOrderNoteInput] = useState('');
  const [adminOrderRiderInput, setAdminOrderRiderInput] = useState('');
  const [adminOrderEtaInput, setAdminOrderEtaInput] = useState('');

  // Reservation Management States
  const [reservationFilter, setReservationFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');
  const [reservationSearch, setReservationSearch] = useState('');
  const [editingNoteResId, setEditingNoteResId] = useState<string | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [adminNotificationToast, setAdminNotificationToast] = useState<{
    id: number;
    title: string;
    message: string;
    type: 'confirmed' | 'cancelled' | 'completed' | 'info' | OrderStatus;
  } | null>(null);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'skybite2026' || passwordInput.toLowerCase() === 'admin') {
      onAuthenticate(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    onAuthenticate(true);
    setAuthError(false);
  };

  // Toggle Food Availability
  const handleToggleAvailability = (id: string) => {
    const updated = menuItems.map((item) =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    );
    onUpdateMenuItems(updated);
  };

  // Delete Food Item
  const handleDeleteFood = (id: string) => {
    if (confirm('Are you sure you want to delete this food item?')) {
      const updated = menuItems.filter((i) => i.id !== id);
      onUpdateMenuItems(updated);
    }
  };

  // Open Edit Food Modal
  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFoodName(item.name);
    setFoodBengaliName(item.bengaliName || '');
    setFoodCategory(item.category);
    setFoodPrice(item.price);
    setFoodImage(item.image);
    setFoodDesc(item.description);
    setFoodPrepTime(item.preparationTime || '15-20 mins');
    setFoodIsBestSeller(!!item.isBestSeller);
    setFoodIsChefSpecial(!!item.isChefSpecial);
    setFoodSpiceLevel(item.spiceLevel || 0);
    setFoodModalOpen(true);
  };

  // Open New Food Modal
  const handleOpenNew = () => {
    setEditingItem(null);
    setFoodName('');
    setFoodBengaliName('');
    setFoodCategory('chinese');
    setFoodPrice(350);
    setFoodImage('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');
    setFoodDesc('');
    setFoodPrepTime('15-20 mins');
    setFoodIsBestSeller(false);
    setFoodIsChefSpecial(false);
    setFoodSpiceLevel(1);
    setFoodModalOpen(true);
  };

  // Save Food Item
  const handleSaveFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim() || !foodPrice) return;

    if (editingItem) {
      const updated = menuItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: foodName.trim(),
              bengaliName: foodBengaliName.trim(),
              category: foodCategory,
              price: Number(foodPrice),
              image: foodImage.trim() || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
              description: foodDesc.trim(),
              preparationTime: foodPrepTime,
              isBestSeller: foodIsBestSeller,
              isChefSpecial: foodIsChefSpecial,
              spiceLevel: foodSpiceLevel,
            }
          : item
      );
      onUpdateMenuItems(updated);
    } else {
      const newItem: MenuItem = {
        id: `food-${Date.now()}`,
        name: foodName.trim(),
        bengaliName: foodBengaliName.trim(),
        category: foodCategory,
        price: Number(foodPrice),
        image: foodImage.trim() || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: foodDesc.trim(),
        bengaliDescription: '',
        isAvailable: true,
        preparationTime: foodPrepTime,
        isBestSeller: foodIsBestSeller,
        isChefSpecial: foodIsChefSpecial,
        spiceLevel: foodSpiceLevel,
        tags: ['New Dish']
      };
      onUpdateMenuItems([newItem, ...menuItems]);
    }
    setFoodModalOpen(false);
  };

  // Change Order Status (Pending, Preparing, Out for Delivery, Delivered, Cancelled)
  const handleUpdateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    customNote?: string,
    riderName?: string,
    estimatedTime?: string
  ) => {
    const targetOrd = orders.find((o) => o.id === orderId);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nowDate = new Date().toLocaleDateString();
    const stamp = `${nowDate} ${nowTime}`;

    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status,
            adminNotes: customNote !== undefined ? customNote : o.adminNotes,
            riderName: riderName !== undefined ? riderName : o.riderName,
            estimatedDeliveryTime: estimatedTime !== undefined ? estimatedTime : o.estimatedDeliveryTime,
            statusUpdatedAt: stamp,
            notificationSent: true,
          }
        : o
    );
    onUpdateOrders(updated);

    // Provide UI Notification to the owner in the admin dashboard
    const customer = targetOrd?.customerName || 'Customer';
    const ref = targetOrd?.orderNumber || '';
    let notificationTitle = '';
    let notificationDesc = '';

    if (status === 'preparing') {
      notificationTitle = `Order In Kitchen (${ref})`;
      notificationDesc = `Order ${ref} for ${customer} is now PREPARING in the kitchen. Customer UI updated!`;
    } else if (status === 'out_for_delivery') {
      notificationTitle = `Order Out for Delivery (${ref})`;
      notificationDesc = `Order ${ref} for ${customer} is now OUT FOR DELIVERY in Kushtia Sadar. Customer UI updated!`;
    } else if (status === 'delivered') {
      notificationTitle = `Order Delivered (${ref})`;
      notificationDesc = `Order ${ref} for ${customer} marked as DELIVERED & COMPLETED. Customer notified!`;
    } else if (status === 'cancelled') {
      notificationTitle = `Order Cancelled (${ref})`;
      notificationDesc = `Order ${ref} marked as CANCELLED. Customer UI notified.`;
    } else {
      notificationTitle = `Order Status: ${status.toUpperCase()} (${ref})`;
      notificationDesc = `Order ${ref} reset to ${status}.`;
    }

    setAdminNotificationToast({
      id: Date.now(),
      title: notificationTitle,
      message: notificationDesc,
      type: status,
    });

    setTimeout(() => {
      setAdminNotificationToast(null);
    }, 4500);

    // Notify customer in-app via UI callback
    if (onNotifyOrderUpdate && targetOrd) {
      onNotifyOrderUpdate({
        title: notificationTitle,
        message: notificationDesc,
        type: status,
        orderNumber: ref,
        customerName: customer,
      });
    }
  };

  // Change Reservation Status (Confirmed, Cancelled, Completed, Pending)
  const handleUpdateReservationStatus = (
    resId: string,
    status: ReservationStatus,
    customNote?: string
  ) => {
    const targetRes = reservations.find((r) => r.id === resId);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nowDate = new Date().toLocaleDateString();
    const stamp = `${nowDate} ${nowTime}`;

    const updated = reservations.map((r) =>
      r.id === resId
        ? {
            ...r,
            status,
            adminNotes: customNote !== undefined ? customNote : r.adminNotes,
            statusUpdatedAt: stamp,
            notificationSent: true,
          }
        : r
    );
    onUpdateReservations(updated);

    // Provide UI Notification to the owner in the admin dashboard
    const customer = targetRes?.customerName || 'Guest';
    const ref = targetRes?.reservationNumber || '';
    let notificationTitle = '';
    let notificationDesc = '';

    if (status === 'confirmed') {
      notificationTitle = `Reservation Confirmed (${ref})`;
      notificationDesc = `Table booking for ${customer} marked as CONFIRMED. User notified via UI tracker!`;
    } else if (status === 'cancelled') {
      notificationTitle = `Reservation Cancelled (${ref})`;
      notificationDesc = `Reservation ${ref} marked as CANCELLED. Status updated across UI for the user.`;
    } else if (status === 'completed') {
      notificationTitle = `Reservation Completed (${ref})`;
      notificationDesc = `Visit for ${customer} marked as COMPLETED. User notified in UI!`;
    } else {
      notificationTitle = `Reservation Status Updated (${ref})`;
      notificationDesc = `Status reset to ${status}.`;
    }

    setAdminNotificationToast({
      id: Date.now(),
      title: notificationTitle,
      message: notificationDesc,
      type: (status === 'confirmed' || status === 'cancelled' || status === 'completed') ? status : 'info',
    });

    setTimeout(() => {
      setAdminNotificationToast(null);
    }, 4500);

    // Notify user via UI callback
    if (onNotifyUser && targetRes && (status === 'confirmed' || status === 'cancelled' || status === 'completed')) {
      onNotifyUser({
        title: notificationTitle,
        message: notificationDesc,
        type: status,
        reservationNumber: ref,
        customerName: customer,
      });
    }
  };

  // Toggle Review Approval
  const handleToggleReview = (revId: string) => {
    const updated = reviews.map((r) => (r.id === revId ? { ...r, isApproved: !r.isApproved } : r));
    onUpdateReviews(updated);
  };

  // Save Settings & Promo Banner
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: RestaurantSettings = {
      ...settings,
      announcementBanner: announcementText,
      bannerActive,
      promoBadge: promoBadgeText,
      promoButtonText: promoBtnText,
      phone: contactPhone,
      whatsapp: whatsappNum,
      openingHours: hoursText,
      deliveryChargeKushtiaSadar: Number(deliveryFee),
    };
    onUpdateSettings(updated);
    setSettingsSaved(true);
    try {
      sessionStorage.removeItem('skybite_promo_dismissed');
    } catch {
      // ignore
    }
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleApplyPromoPreset = (badge: string, message: string, btnText: string = 'Order Now') => {
    setPromoBadgeText(badge);
    setAnnouncementText(message);
    setPromoBtnText(btnText);
    setBannerActive(true);
  };

  const handleResetDismissedBanner = () => {
    try {
      sessionStorage.removeItem('skybite_promo_dismissed');
      setBannerResetToast(true);
      setTimeout(() => setBannerResetToast(false), 2500);
    } catch {
      // ignore
    }
  };

  // Calculate Metrics for Overview
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalAmount : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const pendingReservationsCount = reservations.filter((r) => r.status === 'pending').length;
  const confirmedReservationsCount = reservations.filter((r) => r.status === 'confirmed').length;
  const cancelledReservationsCount = reservations.filter((r) => r.status === 'cancelled' || r.status === 'rejected').length;
  const completedReservationsCount = reservations.filter((r) => r.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md flex flex-col animate-fadeIn">
      {/* Top Bar */}
      <div className="bg-[#173F32] border-b border-[#2d6f5a] px-4 sm:px-6 py-3 flex items-center justify-between text-[#F7F3E9]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E98738] text-[#173F32] flex items-center justify-center font-black text-xs">
            SB
          </div>
          <div>
            <h2 className="text-base font-bold font-display flex items-center gap-2">
              <span>Sky Bite Restaurant &mdash; Management Panel</span>
              <span className="text-[10px] uppercase font-sans font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Staff Control
              </span>
            </h2>
            <p className="text-[11px] text-[#F7F3E9]/60">
              5 Rasta More, Kushtia Sadar &bull; Internal System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={() => onAuthenticate(false)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#123328] hover:bg-[#1a4738] border border-white/10 text-white/80 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Panel</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#E98738] text-[#173F32] font-bold text-xs hover:bg-[#d8782a] cursor-pointer shadow"
          >
            Exit to Website
          </button>
        </div>
      </div>

      {/* In-UI Notification Feedback Banner for Owners */}
      {adminNotificationToast && (
        <div className={`px-4 py-3 flex items-center justify-between text-xs font-semibold shadow-md animate-fadeIn border-b ${
          adminNotificationToast.type === 'confirmed' || adminNotificationToast.type === 'delivered'
            ? 'bg-emerald-900/90 text-emerald-100 border-emerald-600'
            : adminNotificationToast.type === 'cancelled'
            ? 'bg-rose-900/90 text-rose-100 border-rose-600'
            : adminNotificationToast.type === 'out_for_delivery'
            ? 'bg-amber-950/90 text-amber-100 border-amber-600'
            : adminNotificationToast.type === 'preparing'
            ? 'bg-blue-950/90 text-blue-100 border-blue-600'
            : adminNotificationToast.type === 'completed'
            ? 'bg-indigo-900/90 text-indigo-100 border-indigo-600'
            : 'bg-[#173F32] text-[#F7F3E9] border-[#E98738]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
              adminNotificationToast.type === 'confirmed' || adminNotificationToast.type === 'delivered' ? 'bg-emerald-500 text-white' :
              adminNotificationToast.type === 'cancelled' ? 'bg-rose-500 text-white' :
              adminNotificationToast.type === 'out_for_delivery' ? 'bg-[#E98738] text-[#173F32]' :
              adminNotificationToast.type === 'preparing' ? 'bg-blue-500 text-white' :
              adminNotificationToast.type === 'completed' ? 'bg-indigo-500 text-white' : 'bg-[#E98738] text-[#173F32]'
            }`}>
              {adminNotificationToast.type === 'confirmed' || adminNotificationToast.type === 'delivered' ? '✓' :
               adminNotificationToast.type === 'cancelled' ? '✕' :
               adminNotificationToast.type === 'out_for_delivery' ? '🛵' :
               adminNotificationToast.type === 'preparing' ? '🍳' : '★'}
            </div>
            <div>
              <span className="font-extrabold underline decoration-white/30 mr-1.5">
                {adminNotificationToast.title}:
              </span>
              <span>{adminNotificationToast.message}</span>
              <span className="ml-2 text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono font-bold">
                ✓ UI Notification Dispatched
              </span>
            </div>
          </div>

          <button
            onClick={() => setAdminNotificationToast(null)}
            className="text-white/70 hover:text-white p-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex bg-gray-100">
        {!isAuthenticated ? (
          /* Authentication Shield */
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#173F32] text-[#E98738] flex items-center justify-center mx-auto shadow-lg">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-display text-[#173F32]">
                  Authorized Staff Access
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Enter manager passcode to manage daily menu, prices, incoming WhatsApp orders, and table bookings.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                    Passcode
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password (e.g. skybite2026)"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                  {authError && (
                    <p className="text-xs text-red-500 mt-1">
                      Incorrect passcode. Use default: <strong>skybite2026</strong>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] font-bold text-sm shadow cursor-pointer transition-colors"
                >
                  Unlock Admin Portal
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Demo Passcode: <code className="text-[#173F32] font-mono font-bold">skybite2026</code></span>
                <button
                  onClick={handleQuickDemoLogin}
                  className="text-[#E98738] font-bold hover:underline cursor-pointer"
                >
                  1-Click Unlock &rarr;
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white border-r border-gray-200 p-4 shrink-0 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto">
              <div className="space-y-1.5 w-full">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-[#E98738]" />
                  <span>Overview & Sales</span>
                </button>

                <button
                  onClick={() => setActiveTab('menu')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                    activeTab === 'menu'
                      ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UtensilsCrossed className="w-4 h-4 text-[#E98738]" />
                    <span>Food Menu Items</span>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-md font-mono">
                    {menuItems.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#E98738]" />
                    <span>Orders</span>
                  </div>
                  {pendingOrdersCount > 0 && (
                    <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
                      {pendingOrdersCount} new
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                    activeTab === 'reservations'
                      ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#E98738]" />
                    <span>Table Bookings</span>
                  </div>
                  {pendingReservationsCount > 0 && (
                    <span className="text-[10px] bg-[#E98738] text-[#173F32] px-2 py-0.5 rounded-full font-bold">
                      {pendingReservationsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Star className="w-4 h-4 text-[#E98738]" />
                  <span>Reviews Moderation</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Megaphone className="w-4 h-4 text-[#E98738]" />
                    <span>Promo & Settings</span>
                  </div>
                  {bannerActive && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-700 px-1.5 py-0.5 rounded font-extrabold uppercase">
                      Live
                    </span>
                  )}
                </button>
              </div>

              {/* Status info */}
              <div className="hidden md:block pt-4 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
                <p className="font-semibold text-[#173F32]">Sky Bite POS & Web</p>
                <p>Location: Kushtia Sadar</p>
                <p className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Live Sync Active
                </p>
              </div>
            </div>

            {/* Main Tab View Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-[#173F32]">
                      Dashboard Overview
                    </h3>
                    <p className="text-xs text-gray-500">
                      Real-time restaurant operational snapshot for today.
                    </p>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase">Total Revenue</span>
                      <h4 className="text-2xl font-extrabold text-[#173F32]">
                        {formatPrice(totalRevenue)}
                      </h4>
                      <p className="text-[11px] text-emerald-600 font-semibold">From recorded orders</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase">Total Orders</span>
                      <h4 className="text-2xl font-extrabold text-[#173F32]">
                        {orders.length}
                      </h4>
                      <p className="text-[11px] text-amber-600 font-semibold">{pendingOrdersCount} pending kitchen action</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase">Rooftop Bookings</span>
                      <h4 className="text-2xl font-extrabold text-[#173F32]">
                        {reservations.length}
                      </h4>
                      <p className="text-[11px] text-[#E98738] font-semibold">{pendingReservationsCount} awaiting confirmation</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase">Active Menu Items</span>
                      <h4 className="text-2xl font-extrabold text-[#173F32]">
                        {menuItems.filter((i) => i.isAvailable).length} / {menuItems.length}
                      </h4>
                      <p className="text-[11px] text-gray-500">In stock on public menu</p>
                    </div>
                  </div>

                  {/* Current Active Promotional Banner Quick Card */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E98738] text-[#173F32] flex items-center justify-center shrink-0 font-bold shadow-sm">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase text-[#173F32]">
                            Top Promotional Banner
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                            settings.bannerActive
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {settings.bannerActive ? 'Active on Website' : 'Currently Hidden'}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 mt-0.5 line-clamp-1">
                          {settings.announcementBanner || 'No active promotional message set.'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('settings')}
                      className="px-3.5 py-1.5 rounded-xl bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] text-xs font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Edit Offer & Banner</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E98738]" />
                    </button>
                  </div>

                  {/* Recent Orders Preview */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-[#173F32]">Recent Orders</h4>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-bold text-[#E98738] hover:underline"
                      >
                        Manage All Orders &rarr;
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {orders.slice(0, 3).map((ord) => (
                        <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-[#173F32]">{ord.orderNumber}</span>
                            <span className="text-gray-400 mx-2">&bull;</span>
                            <span className="text-gray-700 font-medium">{ord.customerName}</span>
                            <span className="text-gray-400 mx-2">&bull;</span>
                            <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-gray-100 font-bold">
                              {ord.orderType}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#173F32]">{formatPrice(ord.totalAmount)}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                ord.status === 'delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ord.status === 'preparing'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MENU MANAGEMENT */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold font-display text-[#173F32]">
                        Food Menu Management
                      </h3>
                      <p className="text-xs text-gray-500">
                        Add, modify prices, update availability or delete items. Changes apply immediately.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenNew}
                      className="px-4 py-2.5 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-black text-xs sm:text-sm flex items-center gap-2 shadow cursor-pointer transition-all shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Food Item</span>
                    </button>
                  </div>

                  {/* Search in Menu */}
                  <div className="relative max-w-md">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      placeholder="Search dish to edit or change price..."
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                    />
                  </div>

                  {/* Menu Items Table / Grid */}
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#173F32] text-[#F7F3E9] uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3.5">Food Item</th>
                            <th className="p-3.5">Category</th>
                            <th className="p-3.5">Price (৳)</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5">Highlights</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {menuItems
                            .filter((item) =>
                              menuSearch
                                ? item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                                  item.category.includes(menuSearch.toLowerCase())
                                : true
                            )
                            .map((item) => (
                              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="p-3.5">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                    />
                                    <div>
                                      <p className="font-bold text-[#173F32] text-xs">{item.name}</p>
                                      {item.bengaliName && (
                                        <p className="text-[10px] text-gray-500">{item.bengaliName}</p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3.5 capitalize text-gray-600 font-medium">
                                  {item.category.replace('-', ' ')}
                                </td>
                                <td className="p-3.5 font-bold text-[#173F32]">
                                  {formatPrice(item.price)}
                                </td>
                                <td className="p-3.5">
                                  <button
                                    onClick={() => handleToggleAvailability(item.id)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                      item.isAvailable
                                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                    }`}
                                  >
                                    {item.isAvailable ? 'In Stock' : 'Sold Out'}
                                  </button>
                                </td>
                                <td className="p-3.5">
                                  <div className="flex gap-1">
                                    {item.isBestSeller && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                                        Best
                                      </span>
                                    )}
                                    {item.isChefSpecial && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                                        Chef
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => handleOpenEdit(item)}
                                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                                      title="Edit item"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteFood(item.id)}
                                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                                      title="Delete item"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold font-display text-[#173F32] flex items-center gap-2">
                        <span>Customer Order Management</span>
                        <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                          Live UI Tracker
                        </span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Update individual customer orders: <strong>Pending</strong> &rarr; <strong>Preparing</strong> &rarr; <strong>Out for Delivery</strong> &rarr; <strong>Delivered</strong>. Customers track status live in the UI!
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Total Orders:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-bold text-[#173F32]">
                        {orders.length}
                      </span>
                    </div>
                  </div>

                  {/* Search and Status Filters */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder="Search by order # (e.g. SB-ORD-1042), customer name, phone, or address..."
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => setOrderFilter('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          orderFilter === 'all'
                            ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        All ({orders.length})
                      </button>

                      <button
                        onClick={() => setOrderFilter('pending')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          orderFilter === 'pending'
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                      >
                        Pending ({orders.filter((o) => o.status === 'pending').length})
                      </button>

                      <button
                        onClick={() => setOrderFilter('preparing')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          orderFilter === 'preparing'
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        }`}
                      >
                        Preparing ({orders.filter((o) => o.status === 'preparing').length})
                      </button>

                      <button
                        onClick={() => setOrderFilter('out_for_delivery')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          orderFilter === 'out_for_delivery'
                            ? 'bg-[#E98738] text-[#173F32] shadow'
                            : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                        }`}
                      >
                        Out for Delivery ({orders.filter((o) => o.status === 'out_for_delivery').length})
                      </button>

                      <button
                        onClick={() => setOrderFilter('delivered')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          orderFilter === 'delivered'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        Delivered ({orders.filter((o) => o.status === 'delivered').length})
                      </button>

                      <button
                        onClick={() => setOrderFilter('cancelled')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          orderFilter === 'cancelled'
                            ? 'bg-rose-600 text-white shadow'
                            : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        Cancelled ({orders.filter((o) => o.status === 'cancelled').length})
                      </button>
                    </div>
                  </div>

                  {/* Orders List */}
                  <div className="space-y-4">
                    {orders
                      .filter((ord) => {
                        const matchesFilter =
                          orderFilter === 'all' ? true : ord.status === orderFilter;
                        const query = orderSearch.toLowerCase();
                        const matchesSearch =
                          ord.orderNumber.toLowerCase().includes(query) ||
                          ord.customerName.toLowerCase().includes(query) ||
                          ord.customerPhone.includes(query) ||
                          (ord.customerAddress && ord.customerAddress.toLowerCase().includes(query)) ||
                          ord.items.some((i) => i.item.name.toLowerCase().includes(query));
                        return matchesFilter && matchesSearch;
                      })
                      .map((ord) => {
                        const isNoteEditing = editingOrderNoteId === ord.id;

                        return (
                          <div
                            key={ord.id}
                            className={`bg-white rounded-2xl border p-5 shadow-sm space-y-4 transition-all ${
                              ord.status === 'delivered'
                                ? 'border-emerald-200/80 bg-emerald-50/10'
                                : ord.status === 'out_for_delivery'
                                ? 'border-[#E98738]/50 bg-amber-50/10'
                                : ord.status === 'preparing'
                                ? 'border-blue-200 bg-blue-50/10'
                                : ord.status === 'cancelled'
                                ? 'border-rose-200 bg-rose-50/15 opacity-75'
                                : 'border-gray-200'
                            }`}
                          >
                            {/* Order Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono font-black text-[#173F32] text-sm sm:text-base">
                                  {ord.orderNumber}
                                </span>
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                                  {ord.orderType}
                                </span>
                                <span className="text-xs text-gray-400">{ord.createdAt}</span>

                                {ord.statusUpdatedAt && (
                                  <span className="text-[10px] text-gray-500 font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-[#E98738]" />
                                    <span>Updated: {ord.statusUpdatedAt}</span>
                                  </span>
                                )}
                              </div>

                              {/* Status Badge */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 font-semibold">Live Status:</span>
                                <span
                                  className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                                    ord.status === 'delivered'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                      : ord.status === 'out_for_delivery'
                                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                      : ord.status === 'preparing'
                                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                      : ord.status === 'cancelled'
                                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                                  }`}
                                >
                                  {ord.status === 'delivered' && <CheckCircle className="w-3.5 h-3.5" />}
                                  {ord.status === 'out_for_delivery' && <Bike className="w-3.5 h-3.5" />}
                                  {ord.status === 'preparing' && <ChefHat className="w-3.5 h-3.5" />}
                                  {ord.status === 'cancelled' && <Ban className="w-3.5 h-3.5" />}
                                  {ord.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                                  <span>{ord.status.replace('_', ' ')}</span>
                                </span>
                              </div>
                            </div>

                            {/* Core Action: 4 Individual Order Status Buttons */}
                            <div className="bg-[#F7F3E9]/80 p-3 sm:p-4 rounded-xl border border-gray-200 space-y-2">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                <span className="text-xs font-bold text-[#173F32] flex items-center gap-1.5">
                                  <Bell className="w-3.5 h-3.5 text-[#E98738]" />
                                  <span>Update Status & Notify Customer in UI:</span>
                                </span>
                                <span className="text-[11px] text-gray-500">
                                  Clicking changes status & triggers customer tracker banner
                                </span>
                              </div>

                              <div className="flex items-center gap-2 flex-wrap">
                                {/* 1. Pending */}
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'pending')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    ord.status === 'pending'
                                      ? 'bg-amber-600 text-white shadow ring-2 ring-amber-400'
                                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-amber-50 hover:text-amber-700'
                                  }`}
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>Pending</span>
                                </button>

                                {/* 2. Preparing */}
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'preparing')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    ord.status === 'preparing'
                                      ? 'bg-blue-600 text-white shadow ring-2 ring-blue-400'
                                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:text-blue-700'
                                  }`}
                                >
                                  <ChefHat className="w-3.5 h-3.5" />
                                  <span>Preparing in Kitchen</span>
                                </button>

                                {/* 3. Out for Delivery */}
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'out_for_delivery')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    ord.status === 'out_for_delivery'
                                      ? 'bg-[#E98738] text-[#173F32] shadow ring-2 ring-[#173F32]'
                                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-orange-50 hover:text-orange-800'
                                  }`}
                                >
                                  <Bike className="w-3.5 h-3.5" />
                                  <span>Out for Delivery</span>
                                </button>

                                {/* 4. Delivered */}
                                <button
                                  type="button"
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'delivered')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    ord.status === 'delivered'
                                      ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-400'
                                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:text-emerald-700'
                                  }`}
                                >
                                  <CheckCheck className="w-3.5 h-3.5" />
                                  <span>Delivered</span>
                                </button>

                                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>

                                {/* Cancel */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to cancel order ${ord.orderNumber}?`)) {
                                      handleUpdateOrderStatus(ord.id, 'cancelled');
                                    }
                                  }}
                                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                    ord.status === 'cancelled'
                                      ? 'bg-rose-600 text-white shadow'
                                      : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50'
                                  }`}
                                >
                                  <Ban className="w-3 h-3" />
                                  <span>Cancel</span>
                                </button>

                                {/* WhatsApp Customer Notify Button */}
                                <a
                                  href={generateWhatsAppOrderStatusUrl(
                                    ord.customerName,
                                    ord.customerPhone,
                                    ord.orderNumber,
                                    ord.status,
                                    ord.orderType,
                                    ord.totalAmount,
                                    ord.adminNotes
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-auto px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                                  title="Send instant WhatsApp message to customer phone with order progress"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                  <span>Send WhatsApp Notice</span>
                                </a>
                              </div>
                            </div>

                            {/* Customer & Order Details Breakdown */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              {/* Customer Information */}
                              <div className="space-y-2">
                                <div className="p-3 bg-white rounded-xl border border-gray-100 space-y-1">
                                  <p className="font-semibold text-gray-800">
                                    Customer: <strong className="text-[#173F32] text-sm">{ord.customerName}</strong>
                                  </p>
                                  <p className="text-gray-600 flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-[#E98738]" />
                                    <a href={`tel:${ord.customerPhone}`} className="hover:underline font-semibold">
                                      {ord.customerPhone}
                                    </a>
                                  </p>
                                  {ord.customerAddress && (
                                    <p className="text-gray-600">
                                      <strong>Address:</strong> {ord.customerAddress}
                                    </p>
                                  )}
                                  {ord.tableNumber && (
                                    <p className="text-gray-600">
                                      <strong>Table:</strong> Table #{ord.tableNumber}
                                    </p>
                                  )}
                                  {ord.specialNotes && (
                                    <p className="text-amber-800 italic bg-amber-50 p-2 rounded-lg mt-1 border border-amber-200/50">
                                      Special Note: {ord.specialNotes}
                                    </p>
                                  )}
                                </div>

                                {/* Kitchen & Rider Notes Editor */}
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-[11px] text-[#173F32] flex items-center gap-1">
                                      <ChefHat className="w-3.5 h-3.5 text-[#E98738]" />
                                      <span>Kitchen Note / Rider Info:</span>
                                    </span>
                                    {!isNoteEditing ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingOrderNoteId(ord.id);
                                          setAdminOrderNoteInput(ord.adminNotes || '');
                                          setAdminOrderRiderInput(ord.riderName || '');
                                          setAdminOrderEtaInput(ord.estimatedDeliveryTime || '');
                                        }}
                                        className="text-[11px] font-bold text-[#E98738] hover:underline flex items-center gap-1 cursor-pointer"
                                      >
                                        <Edit className="w-3 h-3" />
                                        <span>{ord.adminNotes ? 'Edit Note' : 'Add Note'}</span>
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => setEditingOrderNoteId(null)}
                                        className="text-[11px] text-gray-500 hover:underline cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    )}
                                  </div>

                                  {!isNoteEditing ? (
                                    <div>
                                      {ord.adminNotes || ord.riderName || ord.estimatedDeliveryTime ? (
                                        <div className="space-y-1">
                                          {ord.adminNotes && (
                                            <p className="text-gray-700 bg-white p-2 rounded border border-gray-200">
                                              {ord.adminNotes}
                                            </p>
                                          )}
                                          <div className="flex items-center gap-3 text-[11px] text-gray-500">
                                            {ord.riderName && (
                                              <span>Rider: <strong className="text-gray-800">{ord.riderName}</strong></span>
                                            )}
                                            {ord.estimatedDeliveryTime && (
                                              <span>ETA: <strong className="text-gray-800">{ord.estimatedDeliveryTime}</strong></span>
                                            )}
                                          </div>
                                        </div>
                                      ) : (
                                        <p className="text-[11px] text-gray-400 italic">
                                          No custom note yet. Click &quot;Add Note&quot; to assign rider or kitchen note.
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      <textarea
                                        rows={2}
                                        value={adminOrderNoteInput}
                                        onChange={(e) => setAdminOrderNoteInput(e.target.value)}
                                        placeholder="e.g. Cooking extra spicy, assigned to rider Kabir (01712-XXXXXX)"
                                        className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#173F32] bg-white"
                                      />
                                      <div className="grid grid-cols-2 gap-2">
                                        <input
                                          type="text"
                                          value={adminOrderRiderInput}
                                          onChange={(e) => setAdminOrderRiderInput(e.target.value)}
                                          placeholder="Rider name (e.g. Kabir)"
                                          className="p-1.5 text-xs rounded-lg border border-gray-300 focus:outline-none bg-white"
                                        />
                                        <input
                                          type="text"
                                          value={adminOrderEtaInput}
                                          onChange={(e) => setAdminOrderEtaInput(e.target.value)}
                                          placeholder="ETA (e.g. 25 mins)"
                                          className="p-1.5 text-xs rounded-lg border border-gray-300 focus:outline-none bg-white"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleUpdateOrderStatus(
                                            ord.id,
                                            ord.status,
                                            adminOrderNoteInput.trim(),
                                            adminOrderRiderInput.trim(),
                                            adminOrderEtaInput.trim()
                                          );
                                          setEditingOrderNoteId(null);
                                        }}
                                        className="w-full py-1.5 rounded-lg bg-[#173F32] text-white text-xs font-bold hover:bg-[#1f5242] transition-colors cursor-pointer"
                                      >
                                        Save Note & Sync to Customer UI
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Items Breakdown */}
                              <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-gray-200 space-y-2">
                                <span className="font-bold text-[11px] text-[#173F32] block border-b border-gray-200 pb-1 flex justify-between items-center">
                                  <span>Items Ordered:</span>
                                  <span className="text-gray-500 font-normal">{ord.items.length} items</span>
                                </span>
                                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                                  {ord.items.map((ci, idx) => (
                                    <div key={idx} className="flex justify-between text-[11px]">
                                      <span className="truncate pr-2">
                                        {ci.item.name} <strong className="text-[#173F32]">x {ci.quantity}</strong>
                                      </span>
                                      <span className="font-semibold shrink-0">
                                        {formatPrice(ci.item.price * ci.quantity)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-xs text-[#173F32]">
                                  <span>Total (incl. delivery):</span>
                                  <span className="text-[#E98738] text-sm">{formatPrice(ord.totalAmount)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {orders.length === 0 && (
                      <p className="text-xs text-gray-500 bg-white p-8 rounded-2xl text-center">
                        No orders recorded yet. Place an order from the menu to test!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: RESERVATIONS */}
              {activeTab === 'reservations' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold font-display text-[#173F32] flex items-center gap-2">
                        <span>Table Reservation Management</span>
                        <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                          Live UI Sync
                        </span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Mark reservations as <strong>Confirmed</strong>, <strong>Cancelled</strong>, or <strong>Completed</strong> to instantly notify the user via the UI.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Total:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-bold text-[#173F32]">
                        {reservations.length} Bookings
                      </span>
                    </div>
                  </div>

                  {/* Filter Pills & Search */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {/* Search Bar */}
                      <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={reservationSearch}
                          onChange={(e) => setReservationSearch(e.target.value)}
                          placeholder="Search by customer name, phone, reference (e.g. SB-RES-4921)..."
                          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                        />
                        {reservationSearch && (
                          <button
                            onClick={() => setReservationSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black cursor-pointer"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Summary Badges */}
                      <div className="flex items-center gap-2 shrink-0 text-xs">
                        <span className="text-emerald-700 font-bold">
                          {confirmedReservationsCount} Confirmed
                        </span>
                        <span className="text-gray-300">&bull;</span>
                        <span className="text-indigo-700 font-bold">
                          {completedReservationsCount} Completed
                        </span>
                        <span className="text-gray-300">&bull;</span>
                        <span className="text-rose-700 font-bold">
                          {cancelledReservationsCount} Cancelled
                        </span>
                      </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-gray-100 pt-2 no-scrollbar">
                      {[
                        { id: 'all', label: 'All Bookings', count: reservations.length },
                        { id: 'pending', label: 'Pending Review', count: pendingReservationsCount, color: 'text-amber-700' },
                        { id: 'confirmed', label: 'Confirmed', count: confirmedReservationsCount, color: 'text-emerald-700' },
                        { id: 'completed', label: 'Completed', count: completedReservationsCount, color: 'text-indigo-700' },
                        { id: 'cancelled', label: 'Cancelled', count: cancelledReservationsCount, color: 'text-rose-700' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setReservationFilter(tab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                            reservationFilter === tab.id
                              ? 'bg-[#173F32] text-[#F7F3E9] shadow'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                            reservationFilter === tab.id ? 'bg-[#E98738] text-[#173F32]' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {tab.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reservation Cards List */}
                  {reservations
                    .filter((res) => {
                      if (reservationFilter === 'pending' && res.status !== 'pending') return false;
                      if (reservationFilter === 'confirmed' && res.status !== 'confirmed') return false;
                      if (reservationFilter === 'completed' && res.status !== 'completed') return false;
                      if (reservationFilter === 'cancelled' && (res.status !== 'cancelled' && res.status !== 'rejected')) return false;

                      if (reservationSearch.trim()) {
                        const q = reservationSearch.toLowerCase();
                        const matchName = res.customerName.toLowerCase().includes(q);
                        const matchPhone = res.customerPhone.includes(q);
                        const matchRef = res.reservationNumber.toLowerCase().includes(q);
                        const matchSeating = res.seatingPreference.toLowerCase().includes(q);
                        if (!matchName && !matchPhone && !matchRef && !matchSeating) return false;
                      }
                      return true;
                    })
                    .length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-xs text-gray-500 space-y-2">
                      <Calendar className="w-10 h-10 text-gray-300 mx-auto" />
                      <p className="font-bold text-gray-700">No reservations found for this view</p>
                      <p>Try changing the filter or search keyword.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {reservations
                        .filter((res) => {
                          if (reservationFilter === 'pending' && res.status !== 'pending') return false;
                          if (reservationFilter === 'confirmed' && res.status !== 'confirmed') return false;
                          if (reservationFilter === 'completed' && res.status !== 'completed') return false;
                          if (reservationFilter === 'cancelled' && (res.status !== 'cancelled' && res.status !== 'rejected')) return false;

                          if (reservationSearch.trim()) {
                            const q = reservationSearch.toLowerCase();
                            const matchName = res.customerName.toLowerCase().includes(q);
                            const matchPhone = res.customerPhone.includes(q);
                            const matchRef = res.reservationNumber.toLowerCase().includes(q);
                            const matchSeating = res.seatingPreference.toLowerCase().includes(q);
                            if (!matchName && !matchPhone && !matchRef && !matchSeating) return false;
                          }
                          return true;
                        })
                        .map((res) => {
                          const isConfirmed = res.status === 'confirmed';
                          const isCancelled = res.status === 'cancelled' || res.status === 'rejected';
                          const isCompleted = res.status === 'completed';
                          const isPending = res.status === 'pending';

                          return (
                            <div
                              key={res.id}
                              className={`bg-white rounded-2xl border p-5 shadow-sm space-y-4 transition-all ${
                                isConfirmed
                                  ? 'border-emerald-300 ring-1 ring-emerald-200/50'
                                  : isCompleted
                                  ? 'border-indigo-300 ring-1 ring-indigo-200/50'
                                  : isCancelled
                                  ? 'border-rose-300 opacity-80'
                                  : 'border-amber-300'
                              }`}
                            >
                              {/* Header */}
                              <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold text-[#E98738]">
                                      {res.reservationNumber}
                                    </span>
                                    <span className="text-gray-300">&bull;</span>
                                    <span className="text-[11px] text-gray-500 font-medium">
                                      {res.createdAt}
                                    </span>
                                  </div>
                                  <h4 className="font-bold text-base text-[#173F32] mt-0.5">
                                    {res.customerName}
                                  </h4>
                                </div>

                                {/* Status Badge */}
                                <div className="text-right">
                                  {isConfirmed && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-sm">
                                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                      Confirmed
                                    </span>
                                  )}
                                  {isCompleted && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300 flex items-center gap-1 shadow-sm">
                                      <CheckCheck className="w-3.5 h-3.5 text-indigo-600" />
                                      Completed
                                    </span>
                                  )}
                                  {isCancelled && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1 shadow-sm">
                                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                      Cancelled
                                    </span>
                                  )}
                                  {isPending && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 shadow-sm animate-pulse">
                                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                                      Pending
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-2 gap-2.5 text-xs text-gray-700">
                                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Contact</span>
                                  <a href={`tel:${res.customerPhone}`} className="font-bold text-[#173F32] hover:underline flex items-center gap-1 mt-0.5">
                                    <Phone className="w-3 h-3 text-[#E98738]" />
                                    <span>{res.customerPhone}</span>
                                  </a>
                                </div>

                                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Schedule</span>
                                  <p className="font-bold text-[#173F32] mt-0.5">
                                    {res.date} &bull; {res.time}
                                  </p>
                                </div>

                                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Party Size</span>
                                  <p className="font-bold text-[#173F32] mt-0.5">
                                    👥 {res.guests} Guest(s)
                                  </p>
                                </div>

                                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Seating Zone</span>
                                  <p className="font-bold text-[#173F32] capitalize mt-0.5 truncate">
                                    🪑 {res.seatingPreference.replace('-', ' ')}
                                  </p>
                                </div>
                              </div>

                              {/* Special Request */}
                              {res.specialRequests && (
                                <div className="text-xs bg-amber-50 border border-amber-200/70 p-2.5 rounded-xl text-amber-900">
                                  <span className="font-bold block text-[10px] uppercase text-amber-800">Guest Special Request:</span>
                                  <p className="italic mt-0.5">"{res.specialRequests}"</p>
                                </div>
                              )}

                              {/* Admin Table Notes / Custom Note */}
                              <div className="bg-blue-50/70 border border-blue-200/80 p-2.5 rounded-xl text-xs space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-[10px] uppercase text-blue-900 flex items-center gap-1">
                                    <Info className="w-3 h-3 text-blue-600" />
                                    Manager / Table Assignment Note:
                                  </span>
                                  {editingNoteResId !== res.id && (
                                    <button
                                      onClick={() => {
                                        setEditingNoteResId(res.id);
                                        setAdminNoteInput(res.adminNotes || '');
                                      }}
                                      className="text-[10px] font-bold text-blue-700 hover:underline cursor-pointer"
                                    >
                                      {res.adminNotes ? 'Edit Note' : '+ Add Table Note'}
                                    </button>
                                  )}
                                </div>

                                {editingNoteResId === res.id ? (
                                  <div className="flex items-center gap-2 pt-1">
                                    <input
                                      type="text"
                                      value={adminNoteInput}
                                      onChange={(e) => setAdminNoteInput(e.target.value)}
                                      placeholder="e.g. Table 4 booked, candle arranged, rooftop open air"
                                      className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-blue-300 bg-white focus:outline-none"
                                    />
                                    <button
                                      onClick={() => {
                                        handleUpdateReservationStatus(res.id, res.status, adminNoteInput.trim());
                                        setEditingNoteResId(null);
                                      }}
                                      className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingNoteResId(null)}
                                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs cursor-pointer"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ) : (
                                  <p className="text-blue-950 font-medium">
                                    {res.adminNotes || <span className="text-gray-400 italic font-normal">No table/manager note added yet. Click "+ Add Table Note" to specify table # or instructions.</span>}
                                  </p>
                                )}

                                {res.statusUpdatedAt && (
                                  <p className="text-[10px] text-gray-500 pt-0.5">
                                    Last status update: <span className="font-mono text-gray-700">{res.statusUpdatedAt}</span>
                                  </p>
                                )}
                              </div>

                              {/* MARK STATUS & NOTIFY USER ACTIONS */}
                              <div className="pt-2 border-t border-gray-100 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                    Mark Status & Notify User:
                                  </span>
                                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Live UI Update
                                  </span>
                                </div>

                                {/* Three Main Action Buttons Requested by User */}
                                <div className="grid grid-cols-3 gap-2">
                                  {/* MARK CONFIRMED */}
                                  <button
                                    onClick={() => handleUpdateReservationStatus(res.id, 'confirmed', res.adminNotes)}
                                    className={`py-2 px-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                      isConfirmed
                                        ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300'
                                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200'
                                    }`}
                                    title="Mark as Confirmed and notify the customer via UI"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>Confirmed</span>
                                  </button>

                                  {/* MARK COMPLETED */}
                                  <button
                                    onClick={() => handleUpdateReservationStatus(res.id, 'completed', res.adminNotes)}
                                    className={`py-2 px-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                      isCompleted
                                        ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                                        : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-600 hover:text-white border border-indigo-200'
                                    }`}
                                    title="Mark as Completed after dining and notify customer"
                                  >
                                    <CheckCheck className="w-3.5 h-3.5" />
                                    <span>Completed</span>
                                  </button>

                                  {/* MARK CANCELLED */}
                                  <button
                                    onClick={() => handleUpdateReservationStatus(res.id, 'cancelled', res.adminNotes)}
                                    className={`py-2 px-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                      isCancelled
                                        ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300'
                                        : 'bg-rose-50 text-rose-800 hover:bg-rose-600 hover:text-white border border-rose-200'
                                    }`}
                                    title="Mark as Cancelled and notify customer in UI"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                    <span>Cancelled</span>
                                  </button>
                                </div>

                                {/* Quick WhatsApp Status Notification link */}
                                <div className="pt-1 flex items-center justify-between">
                                  <a
                                    href={generateWhatsAppStatusUpdateUrl(
                                      res.customerName,
                                      res.customerPhone,
                                      res.reservationNumber,
                                      (res.status === 'confirmed' || res.status === 'cancelled' || res.status === 'completed') ? res.status : 'confirmed',
                                      res.date,
                                      res.time,
                                      res.guests,
                                      res.seatingPreference,
                                      res.adminNotes
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-emerald-600 hover:text-emerald-800 font-bold hover:underline flex items-center gap-1.5"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Send WhatsApp "{res.status.toUpperCase()}" Notice</span>
                                  </a>

                                  {!isPending && (
                                    <button
                                      onClick={() => handleUpdateReservationStatus(res.id, 'pending')}
                                      className="text-[11px] text-gray-400 hover:text-gray-700 underline cursor-pointer"
                                    >
                                      Reset to Pending
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: REVIEWS MODERATION */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-[#173F32]">
                      Customer Reviews Moderation
                    </h3>
                    <p className="text-xs text-gray-500">
                      Show or hide customer reviews on the public website.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-sm text-[#173F32]">{rev.authorName}</h4>
                            <p className="text-[10px] text-gray-400">{rev.authorLocation} &bull; {rev.date}</p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              rev.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {rev.isApproved ? 'Visible' : 'Hidden'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[#E98738]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        <p className="text-xs text-gray-700 italic">"{rev.comment}"</p>

                        <div className="pt-2 border-t border-gray-100 flex justify-end">
                          <button
                            onClick={() => handleToggleReview(rev.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                              rev.isApproved
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            {rev.isApproved ? 'Hide from Website' : 'Approve & Display'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: WEBSITE SETTINGS & PROMOTIONAL BANNER */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-[#173F32] flex items-center gap-2">
                      <Megaphone className="w-6 h-6 text-[#E98738]" />
                      <span>Website & Promotional Banner Settings</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Control the dismissible Promotional Banner at the top of the app, broadcast special offers (e.g. 50% off Friday), and configure contact info.
                    </p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    {/* PROMOTIONAL BANNER CARD */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#E98738]/15 text-[#E98738] flex items-center justify-center font-bold">
                            <Tag className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-[#173F32]">
                              Top Promotional Banner
                            </h4>
                            <p className="text-[11px] text-gray-500">
                              Dismissible special offer strip displayed across the very top of the app.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            bannerActive
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-gray-100 text-gray-600 border border-gray-300'
                          }`}>
                            {bannerActive ? '● Active on Website' : '○ Banner Hidden'}
                          </span>

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={bannerActive}
                              onChange={(e) => setBannerActive(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#173F32]"></div>
                          </label>
                        </div>
                      </div>

                      {/* Special Offer Copy */}
                      <div>
                        <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                          Special Offer Announcement Message *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={announcementText}
                          onChange={(e) => setAnnouncementText(e.target.value)}
                          placeholder="e.g., 50% off on all items this Friday!"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32] font-medium leading-relaxed"
                        />
                        <p className="text-[11px] text-gray-500 mt-1">
                          Example: <code className="text-[#173F32] font-semibold">50% off on all items this Friday! Use coupon ROOFTOP50</code>. Visitors can dismiss this banner with one click.
                        </p>
                      </div>

                      {/* Badge Tag & Button Label */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                            Offer Badge Label
                          </label>
                          <input
                            type="text"
                            value={promoBadgeText}
                            onChange={(e) => setPromoBadgeText(e.target.value)}
                            placeholder="e.g. 50% OFF FRIDAY"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                            Action Button Text
                          </label>
                          <input
                            type="text"
                            value={promoBtnText}
                            onChange={(e) => setPromoBtnText(e.target.value)}
                            placeholder="e.g. Order Now"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                          />
                        </div>
                      </div>

                      {/* Quick 1-Click Offer Presets */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-bold text-[#173F32] uppercase flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#E98738]" />
                            <span>Quick Offer Presets</span>
                          </label>
                          <span className="text-[10px] text-gray-400">Click to apply template</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleApplyPromoPreset(
                                '50% OFF FRIDAY',
                                '🎉 50% off on all items this Friday! Taste Kushtia\'s premier rooftop delights with special savings.',
                                'Order Now'
                              )
                            }
                            className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-left transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                                <Flame className="w-3.5 h-3.5 text-[#E98738]" />
                                50% Off Friday
                              </span>
                              <span className="text-[10px] text-amber-700 font-bold group-hover:underline">Apply &rarr;</span>
                            </div>
                            <p className="text-[11px] text-amber-800/80 truncate mt-0.5">
                              50% off on all items this Friday! Taste Kushtia's...
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleApplyPromoPreset(
                                'SUNSET SPECIAL',
                                '🍹 Buy 1 Get 1 Free on all Mocktails & Shakes between 5:00 PM – 7:00 PM everyday!',
                                'View Menu'
                              )
                            }
                            className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-left transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                Sunset Rooftop Deal
                              </span>
                              <span className="text-[10px] text-indigo-700 font-bold group-hover:underline">Apply &rarr;</span>
                            </div>
                            <p className="text-[11px] text-indigo-800/80 truncate mt-0.5">
                              Buy 1 Get 1 Free on all Mocktails & Shakes...
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleApplyPromoPreset(
                                'FREE DELIVERY',
                                '🛵 Free home delivery across Kushtia Sadar on all orders over ৳800!',
                                'Order Now'
                              )
                            }
                            className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-left transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                                <Bike className="w-3.5 h-3.5 text-emerald-600" />
                                Free Delivery Kushtia
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold group-hover:underline">Apply &rarr;</span>
                            </div>
                            <p className="text-[11px] text-emerald-800/80 truncate mt-0.5">
                              Free delivery across Kushtia Sadar on orders over ৳800...
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleApplyPromoPreset(
                                'WEEKEND FEAST',
                                '🔥 Flat 20% off on our Signature Mixed Grilled Sizzler & Seafood Platters this weekend!',
                                'Book Table'
                              )
                            }
                            className="p-2.5 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-left transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-rose-900 flex items-center gap-1">
                                <ChefHat className="w-3.5 h-3.5 text-rose-500" />
                                Weekend Sizzler Feast
                              </span>
                              <span className="text-[10px] text-rose-700 font-bold group-hover:underline">Apply &rarr;</span>
                            </div>
                            <p className="text-[11px] text-rose-800/80 truncate mt-0.5">
                              Flat 20% off on Grilled Sizzler & Seafood Platters...
                            </p>
                          </button>
                        </div>
                      </div>

                      {/* LIVE BANNER PREVIEW */}
                      <div className="pt-2 border-t border-gray-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#173F32] uppercase flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-[#E98738]" />
                            <span>Live Customer View Preview</span>
                          </label>
                          <span className="text-[10px] text-gray-500">
                            {bannerActive ? 'Showing simulated top banner' : 'Banner currently toggled OFF'}
                          </span>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-[#E98738]/40 shadow-sm">
                          <div className={`bg-gradient-to-r from-[#E98738] via-[#e27c2b] to-[#d67222] text-[#173F32] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 ${
                            !bannerActive ? 'opacity-50 grayscale-50' : ''
                          }`}>
                            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                              <span className="inline-flex items-center gap-1 bg-[#173F32] text-[#F7F3E9] text-[10px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 shadow-xs">
                                <Flame className="w-2.5 h-2.5 text-[#E98738]" />
                                <span>{promoBadgeText || 'SPECIAL OFFER'}</span>
                              </span>
                              <span className="text-xs font-bold truncate">
                                {announcementText || 'Your special offer copy will appear here...'}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-white/40 px-2 py-0.5 rounded-full shrink-0">
                                <span>{promoBtnText || 'Order Now'}</span>
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>

                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#173F32]/10 text-[#173F32] shrink-0 font-bold text-xs" title="Dismiss Button">
                              ✕
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <p className="text-[11px] text-gray-500">
                            Tip: Users can dismiss this bar anytime; saving changes here will make it re-appear.
                          </p>
                          <button
                            type="button"
                            onClick={handleResetDismissedBanner}
                            className="text-xs text-[#173F32] hover:text-[#E98738] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset Dismissed Status for My Browser</span>
                          </button>
                        </div>

                        {bannerResetToast && (
                          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 animate-fadeIn flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Dismissed status reset! The promotional banner is now visible in your browser.</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* GENERAL RESTAURANT CONTACT & DELIVERY CARD */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                        <div className="w-8 h-8 rounded-lg bg-[#173F32]/10 text-[#173F32] flex items-center justify-center font-bold">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#173F32]">
                            Restaurant Contact & Delivery Info
                          </h4>
                          <p className="text-[11px] text-gray-500">
                            Customer service contacts and local Kushtia delivery rates.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                            Customer Support Phone
                          </label>
                          <input
                            type="text"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                            Official WhatsApp Number
                          </label>
                          <input
                            type="text"
                            value={whatsappNum}
                            onChange={(e) => setWhatsappNum(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                            Opening Hours Display
                          </label>
                          <input
                            type="text"
                            value={hoursText}
                            onChange={(e) => setHoursText(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                            Delivery Fee Inside Kushtia Sadar (৳)
                          </label>
                          <input
                            type="number"
                            value={deliveryFee}
                            onChange={(e) => setDeliveryFee(Number(e.target.value))}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SAVE BUTTON & FEEDBACK */}
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-[#E98738]" />
                        <span>{settingsSaved ? 'Saved Successfully!' : 'Save & Publish Promotional Banner'}</span>
                      </button>

                      {settingsSaved && (
                        <span className="text-xs font-bold text-emerald-700 animate-fadeIn">
                          ✓ Live website updated!
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Food Modal */}
      {foodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-base font-display text-[#173F32]">
                {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
              </h3>
              <button
                onClick={() => setFoodModalOpen(false)}
                className="text-gray-400 hover:text-black cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFood} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Food Name (English) *</label>
                <input
                  type="text"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g. Garlic Butter Prawns"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Food Name (Bengali)</label>
                <input
                  type="text"
                  value={foodBengaliName}
                  onChange={(e) => setFoodBengaliName(e.target.value)}
                  placeholder="e.g. গার্লিক বাটার প্রন"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category *</label>
                  <select
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value as FoodCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  >
                    <option value="chinese">Chinese</option>
                    <option value="italian">Italian & Pizza</option>
                    <option value="seafood">Seafood</option>
                    <option value="appetizers">Appetizers</option>
                    <option value="main-course">Main Course</option>
                    <option value="beverages">Beverages</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (৳ BDT) *</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={foodPrice}
                    onChange={(e) => setFoodPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={foodImage}
                  onChange={(e) => setFoodImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={foodDesc}
                  onChange={(e) => setFoodDesc(e.target.value)}
                  placeholder="Appetizing description of ingredients and taste..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Preparation Time</label>
                  <input
                    type="text"
                    value={foodPrepTime}
                    onChange={(e) => setFoodPrepTime(e.target.value)}
                    placeholder="15-20 mins"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Spice Level (0-3)</label>
                  <select
                    value={foodSpiceLevel}
                    onChange={(e) => setFoodSpiceLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  >
                    <option value={0}>0 (No Spice)</option>
                    <option value={1}>1 (Mild)</option>
                    <option value={2}>2 (Medium)</option>
                    <option value={3}>3 (Fiery Hot)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={foodIsBestSeller}
                    onChange={(e) => setFoodIsBestSeller(e.target.checked)}
                  />
                  <span>Best Seller Tag</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={foodIsChefSpecial}
                    onChange={(e) => setFoodIsChefSpecial(e.target.checked)}
                  />
                  <span>Chef's Special Tag</span>
                </label>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFoodModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E98738] text-[#173F32] font-black shadow"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
