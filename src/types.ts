export type FoodCategory =
  | 'chinese'
  | 'italian'
  | 'seafood'
  | 'appetizers'
  | 'main-course'
  | 'beverages'
  | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  bengaliName: string;
  category: FoodCategory;
  price: number;
  description: string;
  bengaliDescription: string;
  image: string;
  isAvailable: boolean;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  spiceLevel?: number; // 0: None, 1: Mild, 2: Medium, 3: Hot
  preparationTime?: string;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialNotes?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'confirmed' | 'cancelled';
export type OrderType = 'delivery' | 'takeaway' | 'dine-in';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  orderType: OrderType;
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'cash' | 'bkash' | 'nagad';
  specialNotes?: string;
  statusUpdatedAt?: string;
  adminNotes?: string;
  estimatedDeliveryTime?: string;
  riderName?: string;
  createdAt: string;
  loyaltyPointsEarned?: number;
  loyaltyPointsRedeemed?: number;
  discountFromPoints?: number;
}

export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface LoyaltyTransaction {
  id: string;
  orderId?: string;
  orderNumber?: string;
  date: string;
  points: number;
  type: 'earned' | 'redeemed' | 'bonus';
  description: string;
}

export interface LoyaltyAccount {
  points: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  tier: LoyaltyTier;
  transactions: LoyaltyTransaction[];
}

export interface LoyaltyReward {
  id: string;
  pointsRequired: number;
  discountAmount: number;
  title: string;
  bengaliTitle: string;
  description: string;
  minOrderAmount: number;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rejected';
export type SeatingPreference = 'rooftop-open' | 'rooftop-covered' | 'family-corner' | 'window-view';

export interface Reservation {
  id: string;
  reservationNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: SeatingPreference;
  specialRequests?: string;
  status: ReservationStatus;
  statusUpdatedAt?: string;
  adminNotes?: string;
  notificationSent?: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  comment: string;
  date: string;
  isApproved: boolean;
  dishMentioned?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  bengaliTitle?: string;
  category: 'food' | 'rooftop' | 'interior' | 'events';
  image: string;
  caption: string;
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  headline: string;
  subheading: string;
  address: string;
  locationArea: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  announcementBanner: string;
  bannerActive: boolean;
  promoBadge?: string;
  promoButtonText?: string;
  deliveryChargeKushtiaSadar: number;
}
