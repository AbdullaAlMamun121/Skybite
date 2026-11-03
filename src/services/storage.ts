import { MenuItem, Review, GalleryItem, RestaurantSettings, Order, Reservation, LoyaltyAccount, LoyaltyTier } from '../types';
import { initialMenuItems, initialReviews, initialGallery, initialSettings, initialOrders, initialReservations } from '../data/initialData';

const STORAGE_KEYS = {
  MENU: 'skybite_menu_items_v1',
  REVIEWS: 'skybite_reviews_v1',
  GALLERY: 'skybite_gallery_v1',
  SETTINGS: 'skybite_settings_v1',
  ORDERS: 'skybite_orders_v1',
  RESERVATIONS: 'skybite_reservations_v1',
  ADMIN_AUTH: 'skybite_admin_auth_v1',
  LOYALTY: 'skybite_loyalty_account_v1',
};

const initialLoyaltyAccount: LoyaltyAccount = {
  points: 159,
  lifetimeEarned: 159,
  lifetimeRedeemed: 0,
  tier: 'Silver',
  transactions: [
    {
      id: 'tx-1',
      orderNumber: 'SB-ORD-1041',
      date: '2026-11-03 11:30 AM',
      points: 75,
      type: 'earned',
      description: 'Points earned for Dine-in Order #SB-ORD-1041 (৳1,500)',
    },
    {
      id: 'tx-2',
      orderNumber: 'SB-ORD-1042',
      date: '2026-11-03 12:15 PM',
      points: 84,
      type: 'earned',
      description: 'Points earned for Delivery Order #SB-ORD-1042 (৳1,690)',
    },
  ],
};

function getTierFromPoints(lifetimePoints: number): LoyaltyTier {
  if (lifetimePoints >= 500) return 'Platinum';
  if (lifetimePoints >= 250) return 'Gold';
  if (lifetimePoints >= 100) return 'Silver';
  return 'Bronze';
}

export const StorageService = {
  getMenuItems(): MenuItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MENU);
      return data ? JSON.parse(data) : initialMenuItems;
    } catch {
      return initialMenuItems;
    }
  },

  saveMenuItems(items: MenuItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save menu items', e);
    }
  },

  getReviews(): Review[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return data ? JSON.parse(data) : initialReviews;
    } catch {
      return initialReviews;
    }
  },

  saveReviews(reviews: Review[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
  },

  getGallery(): GalleryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return data ? JSON.parse(data) : initialGallery;
    } catch {
      return initialGallery;
    }
  },

  saveGallery(gallery: GalleryItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error('Failed to save gallery', e);
    }
  },

  getSettings(): RestaurantSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : initialSettings;
    } catch {
      return initialSettings;
    }
  },

  saveSettings(settings: RestaurantSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },

  getOrders(): Order[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : initialOrders;
    } catch {
      return initialOrders;
    }
  },

  saveOrders(orders: Order[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  },

  addOrder(order: Order) {
    const orders = this.getOrders();
    const updated = [order, ...orders];
    this.saveOrders(updated);
    return updated;
  },

  getReservations(): Reservation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return data ? JSON.parse(data) : initialReservations;
    } catch {
      return initialReservations;
    }
  },

  saveReservations(reservations: Reservation[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.error('Failed to save reservations', e);
    }
  },

  addReservation(reservation: Reservation) {
    const list = this.getReservations();
    const updated = [reservation, ...list];
    this.saveReservations(updated);
    return updated;
  },

  // LOYALTY POINTS SYSTEM
  getLoyaltyAccount(): LoyaltyAccount {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOYALTY);
      return data ? JSON.parse(data) : initialLoyaltyAccount;
    } catch {
      return initialLoyaltyAccount;
    }
  },

  saveLoyaltyAccount(account: LoyaltyAccount) {
    try {
      localStorage.setItem(STORAGE_KEYS.LOYALTY, JSON.stringify(account));
    } catch (e) {
      console.error('Failed to save loyalty account', e);
    }
  },

  calculateEarnablePoints(subtotalAmount: number): number {
    // 1 point per ৳20 spent
    if (subtotalAmount <= 0) return 0;
    return Math.floor(subtotalAmount / 20);
  },

  addLoyaltyPoints(
    orderNumber: string,
    pointsEarned: number,
    orderSubtotal: number,
    orderId?: string
  ): LoyaltyAccount {
    const account = this.getLoyaltyAccount();
    if (pointsEarned <= 0) return account;

    const newLifetime = (account.lifetimeEarned || 0) + pointsEarned;
    const newTier = getTierFromPoints(newLifetime);

    const updatedAccount: LoyaltyAccount = {
      ...account,
      points: account.points + pointsEarned,
      lifetimeEarned: newLifetime,
      tier: newTier,
      transactions: [
        {
          id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          orderId,
          orderNumber,
          date: new Date().toLocaleString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          points: pointsEarned,
          type: 'earned',
          description: `Earned for Order #${orderNumber} (৳${orderSubtotal})`,
        },
        ...account.transactions,
      ],
    };

    this.saveLoyaltyAccount(updatedAccount);
    return updatedAccount;
  },

  redeemLoyaltyPoints(
    pointsToRedeem: number,
    discountAmount: number,
    orderNumber?: string
  ): { success: boolean; account: LoyaltyAccount } {
    const account = this.getLoyaltyAccount();
    if (account.points < pointsToRedeem || pointsToRedeem <= 0) {
      return { success: false, account };
    }

    const updatedAccount: LoyaltyAccount = {
      ...account,
      points: account.points - pointsToRedeem,
      lifetimeRedeemed: (account.lifetimeRedeemed || 0) + pointsToRedeem,
      transactions: [
        {
          id: `tx-red-${Date.now()}`,
          orderNumber,
          date: new Date().toLocaleString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          points: -pointsToRedeem,
          type: 'redeemed',
          description: `Redeemed ${pointsToRedeem} pts for ৳${discountAmount} discount${
            orderNumber ? ` on Order #${orderNumber}` : ''
          }`,
        },
        ...account.transactions,
      ],
    };

    this.saveLoyaltyAccount(updatedAccount);
    return { success: true, account: updatedAccount };
  },

  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  setAdminAuthenticated(auth: boolean) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, auth ? 'true' : 'false');
  },

  resetToDefault() {
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
    localStorage.removeItem(STORAGE_KEYS.LOYALTY);
  }
};
