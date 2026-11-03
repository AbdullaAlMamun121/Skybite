import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem, Order, Reservation, Review, RestaurantSettings, OrderStatus, LoyaltyAccount } from './types';
import { StorageService } from './services/storage';
import { PromotionalBanner } from './components/PromotionalBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedMenuSection } from './components/FeaturedMenuSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { MenuPage } from './components/MenuPage';
import { AboutPage } from './components/AboutPage';
import { GalleryPage } from './components/GalleryPage';
import { ReservationPage } from './components/ReservationPage';
import { ContactPage } from './components/ContactPage';
import { CartDrawer } from './components/CartDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { FloatingWidgets } from './components/FloatingWidgets';
import { Footer } from './components/Footer';
import { Check, CheckCircle2, XCircle, CheckCheck, Bell, ArrowRight, ChefHat, Bike, Package } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  // Application Data States (persistent via StorageService)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => StorageService.getMenuItems());
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());
  const [reservations, setReservations] = useState<Reservation[]>(() => StorageService.getReservations());
  const [reviews, setReviews] = useState<Review[]>(() => StorageService.getReviews());
  const [galleryItems, setGalleryItems] = useState(() => StorageService.getGallery());
  const [settings, setSettings] = useState<RestaurantSettings>(() => StorageService.getSettings());
  const [loyaltyAccount, setLoyaltyAccount] = useState<LoyaltyAccount>(() => StorageService.getLoyaltyAccount());

  // UI States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(() => StorageService.isAdminAuthenticated());
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live User UI Notification for Reservation Status
  const [userReservationAlert, setUserReservationAlert] = useState<{
    title: string;
    message: string;
    type: 'confirmed' | 'cancelled' | 'completed';
    reservationNumber: string;
    customerName: string;
    timestamp: string;
  } | null>(null);
  const [recentReservationRef, setRecentReservationRef] = useState<string | null>(() => {
    return localStorage.getItem('skybite_last_reservation_ref');
  });

  // Live User UI Notification & Tracking for Customer Food Orders
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [selectedOrderRefForTracker, setSelectedOrderRefForTracker] = useState<string | null>(null);
  const [userOrderAlert, setUserOrderAlert] = useState<{
    title: string;
    message: string;
    type: OrderStatus;
    orderNumber: string;
    customerName: string;
    timestamp: string;
  } | null>(null);
  const [recentOrderRef, setRecentOrderRef] = useState<string | null>(() => {
    return localStorage.getItem('skybite_last_order_ref') || (orders.length > 0 ? orders[0].orderNumber : null);
  });

  const handleReservationNotifyUser = (notification: {
    title: string;
    message: string;
    type: 'confirmed' | 'cancelled' | 'completed';
    reservationNumber: string;
    customerName: string;
  }) => {
    const alertData = {
      ...notification,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setUserReservationAlert(alertData);
    setRecentReservationRef(notification.reservationNumber);
    localStorage.setItem('skybite_last_reservation_ref', notification.reservationNumber);
  };

  const handleOrderNotifyUser = (notification: {
    title: string;
    message: string;
    type: OrderStatus;
    orderNumber: string;
    customerName: string;
  }) => {
    const alertData = {
      ...notification,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setUserOrderAlert(alertData);
    setRecentOrderRef(notification.orderNumber);
    setSelectedOrderRefForTracker(notification.orderNumber);
    localStorage.setItem('skybite_last_order_ref', notification.orderNumber);
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem, notes?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + 1, specialNotes: notes || ci.specialNotes }
            : ci
        );
      }
      return [...prev, { item, quantity: 1, specialNotes: notes }];
    });

    // Show temporary toast notification
    const name = language === 'bn' && item.bengaliName ? item.bengaliName : item.name;
    setToastMessage(language === 'bn' ? `"${name}" ব্যাগে যোগ করা হয়েছে` : `Added "${name}" to order bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleUpdateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci))
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  // Handling Order Submission
  const handleOrderPlaced = (newOrder: Order) => {
    const updated = StorageService.addOrder(newOrder);
    setOrders(updated);
    setRecentOrderRef(newOrder.orderNumber);
    setSelectedOrderRefForTracker(newOrder.orderNumber);
    localStorage.setItem('skybite_last_order_ref', newOrder.orderNumber);

    // Process Loyalty Points Redemption & Earning
    if (newOrder.loyaltyPointsRedeemed && newOrder.loyaltyPointsRedeemed > 0) {
      StorageService.redeemLoyaltyPoints(
        newOrder.loyaltyPointsRedeemed,
        newOrder.discountFromPoints || 0,
        newOrder.orderNumber
      );
    }

    if (newOrder.loyaltyPointsEarned && newOrder.loyaltyPointsEarned > 0) {
      StorageService.addLoyaltyPoints(
        newOrder.orderNumber,
        newOrder.loyaltyPointsEarned,
        newOrder.subtotal,
        newOrder.id
      );
    }

    const refreshedLoyalty = StorageService.getLoyaltyAccount();
    setLoyaltyAccount(refreshedLoyalty);

    if (newOrder.loyaltyPointsEarned && newOrder.loyaltyPointsEarned > 0) {
      setToastMessage(
        language === 'bn'
          ? `🎉 অভিনন্দন! এই অর্ডারে +${newOrder.loyaltyPointsEarned} পয়েন্ট অর্জন করেছেন!`
          : `🎉 Congratulations! Earned +${newOrder.loyaltyPointsEarned} loyalty points on this order!`
      );
      setTimeout(() => setToastMessage(null), 3800);
    }
  };

  // Handling Reservation Submission
  const handleAddReservation = (newReservation: Reservation) => {
    const updated = StorageService.addReservation(newReservation);
    setReservations(updated);
    setRecentReservationRef(newReservation.reservationNumber);
    localStorage.setItem('skybite_last_reservation_ref', newReservation.reservationNumber);
  };

  // Handling Review Submission
  const handleAddReview = (newReview: Review) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    StorageService.saveReviews(updated);
  };

  // Admin sync helpers
  const handleUpdateMenuItems = (items: MenuItem[]) => {
    setMenuItems(items);
    StorageService.saveMenuItems(items);
  };

  const handleUpdateOrders = (ords: Order[]) => {
    setOrders(ords);
    StorageService.saveOrders(ords);
  };

  const handleUpdateReservations = (res: Reservation[]) => {
    setReservations(res);
    StorageService.saveReservations(res);
  };

  const handleUpdateReviews = (revs: Review[]) => {
    setReviews(revs);
    StorageService.saveReviews(revs);
  };

  const handleUpdateSettings = (sett: RestaurantSettings) => {
    setSettings(sett);
    StorageService.saveSettings(sett);
  };

  const handleAdminAuth = (auth: boolean) => {
    setIsAdminAuth(auth);
    StorageService.setAdminAuthenticated(auth);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3E9] text-[#252A27] font-sans selection:bg-[#E98738]/30 selection:text-[#173F32]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#173F32] text-[#F7F3E9] px-4 py-2.5 rounded-xl shadow-2xl border border-[#2d6f5a] flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-[#E98738] text-[#173F32] flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs text-[#E98738] font-bold underline cursor-pointer"
          >
            {language === 'bn' ? 'ব্যাগ দেখুন' : 'View Bag'}
          </button>
        </div>
      )}

      {/* Floating Live Reservation Status UI Notification */}
      {userReservationAlert && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] bg-white text-[#252A27] p-4 sm:p-5 rounded-2xl shadow-2xl border border-gray-200 animate-fadeIn space-y-3">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-white shadow ${
              userReservationAlert.type === 'confirmed'
                ? 'bg-emerald-600'
                : userReservationAlert.type === 'completed'
                ? 'bg-indigo-600'
                : 'bg-rose-600'
            }`}>
              {userReservationAlert.type === 'confirmed' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : userReservationAlert.type === 'completed' ? (
                <CheckCheck className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  userReservationAlert.type === 'confirmed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : userReservationAlert.type === 'completed'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  Table {userReservationAlert.type}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{userReservationAlert.timestamp}</span>
              </div>

              <h4 className="font-bold text-sm text-[#173F32] mt-1 font-display">
                {userReservationAlert.title}
              </h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                {userReservationAlert.message}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveTab('reservation');
                    setUserReservationAlert(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#E98738] hover:text-[#d67325] flex items-center gap-1 cursor-pointer underline"
                >
                  <span>View Live Table Status in UI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setUserReservationAlert(null)}
                  className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Live Customer Order Status UI Notification */}
      {userOrderAlert && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] bg-white text-[#252A27] p-4 sm:p-5 rounded-2xl shadow-2xl border border-gray-200 animate-fadeIn space-y-3">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-white shadow ${
              userOrderAlert.type === 'delivered'
                ? 'bg-emerald-600'
                : userOrderAlert.type === 'out_for_delivery'
                ? 'bg-[#E98738]'
                : userOrderAlert.type === 'preparing'
                ? 'bg-blue-600'
                : userOrderAlert.type === 'cancelled'
                ? 'bg-rose-600'
                : 'bg-amber-600'
            }`}>
              {userOrderAlert.type === 'delivered' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : userOrderAlert.type === 'out_for_delivery' ? (
                <Bike className="w-5 h-5" />
              ) : userOrderAlert.type === 'preparing' ? (
                <ChefHat className="w-5 h-5" />
              ) : userOrderAlert.type === 'cancelled' ? (
                <XCircle className="w-5 h-5" />
              ) : (
                <Package className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  userOrderAlert.type === 'delivered'
                    ? 'bg-emerald-100 text-emerald-800'
                    : userOrderAlert.type === 'out_for_delivery'
                    ? 'bg-amber-100 text-amber-900'
                    : userOrderAlert.type === 'preparing'
                    ? 'bg-blue-100 text-blue-800'
                    : userOrderAlert.type === 'cancelled'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Order {userOrderAlert.type.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{userOrderAlert.timestamp}</span>
              </div>

              <h4 className="font-bold text-sm text-[#173F32] mt-1 font-display">
                {userOrderAlert.title}
              </h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                {userOrderAlert.message}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedOrderRefForTracker(userOrderAlert.orderNumber);
                    setIsOrderTrackerOpen(true);
                    setUserOrderAlert(null);
                  }}
                  className="text-xs font-bold text-[#E98738] hover:text-[#d67325] flex items-center gap-1 cursor-pointer underline"
                >
                  <span>Track Live Food Progress in UI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setUserOrderAlert(null)}
                  className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dismissible Promotional Banner (Top of App) */}
      <PromotionalBanner
        settings={settings}
        language={language}
        onCtaClick={() => {
          setActiveTab('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => {
          setActiveTab('reservation');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        settings={settings}
        language={language}
        setLanguage={setLanguage}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTrackOrder={() => setIsOrderTrackerOpen(true)}
        loyaltyAccount={loyaltyAccount}
        onOpenLoyalty={() => setIsLoyaltyModalOpen(true)}
      />

      {/* Main Page Rendering */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              settings={settings}
              language={language}
              onExploreMenu={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookTable={() => {
                setActiveTab('reservation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <FeaturedMenuSection
              items={menuItems}
              language={language}
              onAddToCart={handleAddToCart}
              onSelectItem={(item) => setSelectedItemForModal(item)}
              onViewAllMenu={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <WhyChooseUsSection language={language} />

            <ExperienceSection
              language={language}
              onBookTable={() => {
                setActiveTab('reservation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <ReviewsSection
              reviews={reviews}
              language={language}
              onAddReview={handleAddReview}
            />

            <LocationHoursSection
              settings={settings}
              language={language}
            />
          </>
        )}

        {activeTab === 'menu' && (
          <MenuPage
            menuItems={menuItems}
            language={language}
            onAddToCart={handleAddToCart}
            onSelectItem={(item) => setSelectedItemForModal(item)}
            selectedItem={selectedItemForModal}
            onCloseDetailModal={() => setSelectedItemForModal(null)}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            settings={settings}
            language={language}
            onBookTable={() => {
              setActiveTab('reservation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreMenu={() => {
              setActiveTab('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage
            galleryItems={galleryItems}
            language={language}
          />
        )}

        {activeTab === 'reservation' && (
          <ReservationPage
            settings={settings}
            language={language}
            reservations={reservations}
            onAddReservation={handleAddReservation}
            activeReservationRef={recentReservationRef}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            settings={settings}
            language={language}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        settings={settings}
        language={language}
        onOrderPlaced={handleOrderPlaced}
        onTrackOrder={(orderNum) => {
          setSelectedOrderRefForTracker(orderNum);
          setIsOrderTrackerOpen(true);
        }}
        loyaltyAccount={loyaltyAccount}
        onOpenLoyalty={() => setIsLoyaltyModalOpen(true)}
      />

      {/* Staff / Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        onUpdateMenuItems={handleUpdateMenuItems}
        orders={orders}
        onUpdateOrders={handleUpdateOrders}
        reservations={reservations}
        onUpdateReservations={handleUpdateReservations}
        reviews={reviews}
        onUpdateReviews={handleUpdateReviews}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        isAuthenticated={isAdminAuth}
        onAuthenticate={handleAdminAuth}
        onNotifyUser={handleReservationNotifyUser}
        onNotifyOrderUpdate={handleOrderNotifyUser}
      />

      {/* Customer Live Food Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        orders={orders}
        initialOrderRef={selectedOrderRefForTracker || recentOrderRef}
        restaurantPhone={settings.phone}
        restaurantWhatsApp={settings.whatsapp}
        language={language}
        loyaltyAccount={loyaltyAccount}
        onOpenLoyalty={() => setIsLoyaltyModalOpen(true)}
      />

      {/* Sky Bite Customer Loyalty Rewards & Discount Modal */}
      <LoyaltyModal
        isOpen={isLoyaltyModalOpen}
        onClose={() => setIsLoyaltyModalOpen(false)}
        loyaltyAccount={loyaltyAccount}
        language={language}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Sticky & Floating Action Widgets */}
      <FloatingWidgets
        settings={settings}
        language={language}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => {
          setActiveTab('reservation');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateMenu={() => {
          setActiveTab('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer
        settings={settings}
        language={language}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenReservation={() => {
          setActiveTab('reservation');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
