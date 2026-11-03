import { MenuItem, Review, GalleryItem, RestaurantSettings, Order, Reservation } from '../types';

export const initialSettings: RestaurantSettings = {
  name: 'Sky Bite Restaurant',
  tagline: 'Your Taste, Your Kitchen, Our Care.',
  headline: 'Good Food. Great Moments.',
  subheading: 'Experience delicious food, warm hospitality and memorable moments at Sky Bite Restaurant.',
  address: '5 Rasta More, 1 No. R. A. Khan Road, Kushtia, Bangladesh',
  locationArea: '5 Rasta More, Kushtia Sadar',
  phone: '+880 1712-345678',
  whatsapp: '+8801712345678',
  email: 'contact@skybiterestaurant.com',
  openingHours: '10:00 AM – 11:00 PM (Everyday)',
  announcementBanner: '🎉 50% off on all items this Friday! Taste Kushtia\'s premier rooftop delights with special weekend savings.',
  bannerActive: true,
  promoBadge: '50% OFF FRIDAY',
  promoButtonText: 'Order Now',
  deliveryChargeKushtiaSadar: 40,
};

export const initialMenuItems: MenuItem[] = [
  // SEAFOOD
  {
    id: 'sea-1',
    name: 'Grilled Red Snapper with Garlic Herb Butter',
    bengaliName: 'গার্লিক হার্ব বাটার গ্রিলড রেড স্ন্যাপার',
    category: 'seafood',
    price: 850,
    description: 'Fresh whole red snapper marinated with Mediterranean herbs, grilled to perfection and served with sautéed vegetables & herb butter sauce.',
    bengaliDescription: 'তাজা রেড স্ন্যাপার ভূমধ্যসাগরীয় মসলায় মেরিনেট করে পারফেক্ট গ্রিল করা, সাথে সবজি ও হার্ব বাটার সস।',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isChefSpecial: true,
    isBestSeller: true,
    spiceLevel: 1,
    preparationTime: '25-30 mins',
    tags: ['Fresh Catch', 'Chef Pick', 'Gluten Free']
  },
  {
    id: 'sea-2',
    name: 'Crispy Butter Garlic Prawns',
    bengaliName: 'ক্রিস্পি বাটার গার্লিক প্রন',
    category: 'seafood',
    price: 680,
    description: 'Jumbo king prawns tossed in roasted garlic butter sauce, finished with crushed chili flakes and fresh spring coriander.',
    bengaliDescription: 'রসালো কিং প্রন রোস্টেড গার্লিক বাটার সস ও সুগন্ধি ধনিয়াপাতায় টস করা।',
    image: 'https://images.unsplash.com/photo-1559742811-822863646698?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isBestSeller: true,
    spiceLevel: 1,
    preparationTime: '15-20 mins',
    tags: ['Best Seller', 'Jumbo Prawns']
  },
  {
    id: 'sea-3',
    name: 'Spicy Szechuan Calamari Ring',
    bengaliName: 'স্পাইসি সেচুয়ান ক্যালামারি রিংস',
    category: 'seafood',
    price: 520,
    description: 'Tender squid rings tossed in fiery Szechuan wok spices, bell peppers, and scallions.',
    bengaliDescription: 'নরম স্কুইড রিং খাঁটি সেচুয়ান মসলা ও ক্যাপসিকামে ভেজে তৈরি।',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 3,
    preparationTime: '15 mins',
    tags: ['Spicy', 'Crispy']
  },

  // CHINESE
  {
    id: 'chn-1',
    name: 'Sky Bite Signature Szechuan Chicken Wok',
    bengaliName: 'স্কাই বাইট সিগনেচার সেচুয়ান চিকেন ওক',
    category: 'chinese',
    price: 490,
    description: 'Sliced tender chicken breast wok-tossed with dried red chilies, roasted peanuts, crunchy peppers, and aromatic soy reduction.',
    bengaliDescription: 'মুচমুচে বাদাম ও লাল মরিচ সহযোগে ওক-টসে তৈরি সিগনেচার সেচুয়ান চিকেন।',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isBestSeller: true,
    isChefSpecial: true,
    spiceLevel: 2,
    preparationTime: '15-20 mins',
    tags: ['Signature', 'Best Seller']
  },
  {
    id: 'chn-2',
    name: 'Classic Chicken Hakka Chowmein',
    bengaliName: 'ক্লাসিক চিকেন হাক্কা চাউমিন',
    category: 'chinese',
    price: 380,
    description: 'Silky stir-fried egg noodles with shredded chicken, crunchy julienned cabbage, carrots, bell peppers, and savoury Chinese seasonings.',
    bengaliDescription: 'চিকেন, ক্যাপসিকাম এবং বিশেষ চাইনিজ সসে মেশানো জনপ্রিয় হাক্কা চাউমিন।',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isBestSeller: true,
    spiceLevel: 1,
    preparationTime: '15 mins',
    tags: ['Crowd Favorite', 'Kids Friendly']
  },
  {
    id: 'chn-3',
    name: 'Dragon Chili Beef with Capsicum',
    bengaliName: 'ড্রাগন চিলি বিফ উইথ ক্যাপসিকাম',
    category: 'chinese',
    price: 540,
    description: 'Marinated beef strips flash-fried crispy and coated in dark sweet chili glaze with spring onions.',
    bengaliDescription: 'নরম বিফ স্ট্রিপস ড্রাগন চিলি সস ও পেঁয়াজকলি সহযোগে ক্রিস্পি ফ্রাই।',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 2,
    preparationTime: '20 mins',
    tags: ['Beef Special']
  },
  {
    id: 'chn-4',
    name: 'Yangchow Special Egg Fried Rice',
    bengaliName: 'ইয়াংচৌ স্পেশাল এগ ফ্রাইড রাইস',
    category: 'chinese',
    price: 320,
    description: 'Fluffy fragrant jasmine rice wok-tossed with scrambled eggs, fresh green peas, and scallion oil.',
    bengaliDescription: 'সুগন্ধি চাল, ডিম ও কচি মটরশুটি দিয়ে তৈরি ক্লাসিক ফ্রাইড রাইস।',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 0,
    preparationTime: '12 mins',
    tags: ['Classic']
  },

  // ITALIAN
  {
    id: 'ita-1',
    name: 'Creamy Fettuccine Alfredo with Grilled Chicken',
    bengaliName: 'ক্রিমি ফেটুচিনি আলফ্রেডো উইথ গ্রিলড চিকেন',
    category: 'italian',
    price: 520,
    description: 'Handmade Italian fettuccine ribbons bathed in velvety parmesan cream sauce, cracked black pepper, and herb-grilled chicken slices.',
    bengaliDescription: 'খাঁটি পারমিজান চিজ এবং ফ্রেশ ক্রিমে রান্না করা সুস্বাদু ফেটুচিনি পাস্তা।',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isBestSeller: true,
    spiceLevel: 0,
    preparationTime: '15-20 mins',
    tags: ['Italian Authentic', 'Creamy']
  },
  {
    id: 'ita-2',
    name: 'Sky Bite Wood-Fired Margherita Pizza (12 inch)',
    bengaliName: 'স্কাই বাইট মার্গারিটা পিৎজা (১২ ইঞ্চি)',
    category: 'italian',
    price: 650,
    description: 'San Marzano tomato coulis, melted fresh mozzarella fior di latte, sweet Italian basil, and cold-pressed extra virgin olive oil.',
    bengaliDescription: 'তাজা টমেটো সস, মোজারেলা চিজ এবং ফ্রেশ তুলসী পাতার ক্লাসিক ইতালীয় পিৎজা।',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isChefSpecial: true,
    spiceLevel: 0,
    preparationTime: '20 mins',
    tags: ['Vegetarian', 'Cheesy Delight']
  },
  {
    id: 'ita-3',
    name: 'Fiery Penne Arrabbiata',
    bengaliName: 'স্পাইসি পেনে আরাবিয়াটা',
    category: 'italian',
    price: 430,
    description: 'Al dente penne pasta tossed in spicy crushed garlic, roasted red chili, San Marzano plum tomatoes, and parmesan shavings.',
    bengaliDescription: 'রসুন ও লাল মরিচের ঝাল টমেটো সসে রান্না করা খাঁটি ইতালীয় পেনে পাস্তা।',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 2,
    preparationTime: '15 mins',
    tags: ['Vegetarian', 'Spicy']
  },
  {
    id: 'ita-4',
    name: 'Smoked BBQ Chicken Pizza (12 inch)',
    bengaliName: 'স্মোকড বারবিকিউ চিকেন পিৎজা (১২ ইঞ্চি)',
    category: 'italian',
    price: 750,
    description: 'Loaded with smoky BBQ marinated chicken cubes, sweet caramelized onions, roasted bell peppers, and gooey mozzarella cheese.',
    bengaliDescription: 'স্মোকি বারবিকিউ চিকেন, ক্যারামেলাইজড অনিয়ন এবং মোজারেলা চিজ সমৃদ্ধ পিৎজা।',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isBestSeller: true,
    spiceLevel: 1,
    preparationTime: '20 mins',
    tags: ['Best Seller', 'Full Loaded']
  },

  // APPETIZERS
  {
    id: 'app-1',
    name: 'Sky Bite Crispy Chicken Wings (6 pcs)',
    bengaliName: 'স্কাই বাইট ক্রিস্পি চিকেন উইংস (৬ পিস)',
    category: 'appetizers',
    price: 360,
    description: 'Golden crunchy double-fried chicken wings glazed with choice of Honey Glaze or Hot Buffalo sauce, served with garlic mayo dip.',
    bengaliDescription: 'মচমচে ফ্রাইড উইংস স্পেশাল হানি গ্লেজ অথবা স্পাইসি বাফেলো সস এবং মেয়োনিজ সহ।',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isBestSeller: true,
    spiceLevel: 2,
    preparationTime: '12-15 mins',
    tags: ['Finger Food', 'Starter']
  },
  {
    id: 'app-2',
    name: 'Steamed Chicken Dim Sum Dumplings (6 pcs)',
    bengaliName: 'স্টিমড চিকেন ড্রিম ডাম্পলিংস (৬ পিস)',
    category: 'appetizers',
    price: 340,
    description: 'Delicate handmade wrappers stuffed with minced chicken, ginger, and scallions, served with spicy garlic chili oil.',
    bengaliDescription: 'তুলতুলে হাতে তৈরি মোমো/ডাম্পলিংস স্পাইসি চিলি অয়েল ও সয়া ডিপ সমেত।',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 1,
    preparationTime: '15 mins',
    tags: ['Steamed', 'Healthy']
  },
  {
    id: 'app-3',
    name: 'Golden Cheesy Garlic Bread (4 pcs)',
    bengaliName: 'গোল্ডেন চিজ গার্লিক ব্রেড (৪ পিস)',
    category: 'appetizers',
    price: 260,
    description: 'Oven-toasted French baguette slices smothered with garlic-herb compound butter and molten mozzarella cheese.',
    bengaliDescription: 'গার্লিক বাটার ও গলিত চিজের পারফেক্ট মুচমুচে ফ্রেঞ্চ ব্রেড।',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 0,
    preparationTime: '10 mins',
    tags: ['Vegetarian', 'Cheesy']
  },

  // MAIN COURSE
  {
    id: 'main-1',
    name: 'Sky Bite Mixed Grilled Sizzler Platter',
    bengaliName: 'স্কাই বাইট মিক্সড গ্রিলড সিজলার প্ল্যাটার',
    category: 'main-course',
    price: 920,
    description: 'Smokin’ hot platter with grilled chicken breast, tender beef skewer, butter prawns, grilled sausage, served on bed of aromatic rice & vegetables with pepper mushroom sauce.',
    bengaliDescription: 'ধোঁয়া ওঠা গরম সিজলিং তাওয়ায় চিকেন, বিফ স্কিউয়ার, প্রন, সসেজ ও স্পেশাল রাইস।',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isChefSpecial: true,
    isBestSeller: true,
    spiceLevel: 1,
    preparationTime: '25 mins',
    tags: ['Grand Platter', 'House Special']
  },
  {
    id: 'main-2',
    name: 'Grilled Beef Steak with Mashed Potatoes',
    bengaliName: 'গ্রিলড বিফ স্টেক উইথ ম্যাশড পটেটো',
    category: 'main-course',
    price: 880,
    description: '250g Prime cut tender beef steak cooked medium-well, served with creamy butter mashed potatoes, sautéed veggies, and black pepper demi-glace.',
    bengaliDescription: 'প্রাইম কাট বিফ স্টেক সাথে ক্রিমি ম্যাশড পটেটো ও ব্ল্যাক পেপার সস।',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isChefSpecial: true,
    spiceLevel: 1,
    preparationTime: '25 mins',
    tags: ['Steak Special']
  },
  {
    id: 'main-3',
    name: 'Tender Cashewnut Chicken Platter',
    bengaliName: 'টেন্ডার কাজুবাদাম চিকেন প্ল্যাটার',
    category: 'main-course',
    price: 540,
    description: 'Crispy chicken strips wok-fried with roasted cashewnuts, bell peppers, chili paste, served with aromatic butter rice.',
    bengaliDescription: 'মুচমুচে কাজুবাদাম, ক্যাপসিকাম ও চিকেন দিয়ে তৈরি সুস্বাদু কাজু চিকেন প্ল্যাটার।',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 1,
    preparationTime: '15-20 mins',
    tags: ['Popular in Kushtia']
  },

  // BEVERAGES
  {
    id: 'bev-1',
    name: 'Sky Bite Signature Blue Ocean Mocktail',
    bengaliName: 'স্কাই বাইট ব্লু ওশান মকটেল',
    category: 'beverages',
    price: 220,
    description: 'Refreshing tropical blend of Blue Curaçao citrus, sparkling lemonade, fresh mint leaves, and a dash of sweet lime.',
    bengaliDescription: 'ব্লু কিউরাকাও, লেমনেড এবং তাজা পুদিনা পাতার সতেজ রিফ্রেশিং মকটেল।',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isBestSeller: true,
    spiceLevel: 0,
    preparationTime: '5 mins',
    tags: ['Signature Drink', 'Chilled']
  },
  {
    id: 'bev-2',
    name: 'Fresh Virgin Mint Mojito',
    bengaliName: 'ভার্জিন পুদিনা মোহিতো',
    category: 'beverages',
    price: 180,
    description: 'Muddled fresh garden mint, zesty lime wedges, simple cane syrup, topped with effervescent soda and crushed ice.',
    bengaliDescription: 'তাজা লেবু, পুদিনা এবং ক্রাশড আইসের ঐতিহ্যবাহী ঠান্ডা মোহিতো।',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 0,
    preparationTime: '5 mins',
    tags: ['Summer Hit']
  },
  {
    id: 'bev-3',
    name: 'Creamy Hazelnut Iced Coffee',
    bengaliName: 'ক্রিমি হেজেলনাট কোল্ড কফি',
    category: 'beverages',
    price: 240,
    description: 'Double espresso pulled fresh, blended with roasted hazelnut syrup, creamy cold milk, and topped with chocolate swirl.',
    bengaliDescription: 'এসপ্রেসো কফি এবং হেজেলনাট স্বাদের চকোলেট টপিং কোল্ড কফি।',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    spiceLevel: 0,
    preparationTime: '7 mins',
    tags: ['Coffee Lovers']
  },

  // DESSERTS
  {
    id: 'des-1',
    name: 'Molten Belgian Choco Lava Cake',
    bengaliName: 'মোল্টেন বেলজিয়ান চকো লাভা কেক',
    category: 'desserts',
    price: 290,
    description: 'Warm dark Belgian chocolate cake with a molten decadent center, served with a scoop of French vanilla bean ice cream.',
    bengaliDescription: 'ভেতরে গলিত ডার্ক চকোলেট ও বাইরে নরম কেক, সাথে ভ্যানিলা আইসক্রিম।',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isBestSeller: true,
    spiceLevel: 0,
    preparationTime: '12 mins',
    tags: ['Sweet Tooth', 'Best Seller']
  },
  {
    id: 'des-2',
    name: 'Classic Italian Tiramisu Cup',
    bengaliName: 'ক্লাসিক ইতালিয়ান তিরামিশু কাপ',
    category: 'desserts',
    price: 320,
    description: 'Espresso-soaked ladyfinger biscuits layered with rich mascarpone cheese cream and dusted with fine Dutch cocoa powder.',
    bengaliDescription: 'কফি-ভেজা বিস্কুট এবং ক্রিমি মাস্কারপোন চিজের ঐতিহ্যবাহী ইতালীয় ডেজার্ট।',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isChefSpecial: true,
    spiceLevel: 0,
    preparationTime: '5 mins',
    tags: ['Authentic Italian']
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Tanvir Hossain',
    authorLocation: 'Kushtia Sadar',
    rating: 5,
    comment: 'Undoubtedly the best rooftop restaurant in Kushtia! The Grilled Red Snapper and wood-fired Margherita Pizza were phenomenal. The open-air evening breeze at 5 Rasta More gives you a peaceful luxury feeling.',
    date: 'Yesterday',
    isApproved: true,
    dishMentioned: 'Grilled Red Snapper'
  },
  {
    id: 'rev-2',
    authorName: 'Nusrat Jahan',
    authorLocation: 'Islamic University, Kushtia',
    rating: 5,
    comment: 'The interior is breathtaking and staff behavior is so polite! We ordered through their WhatsApp link and table was ready on our arrival. Their Fettuccine Alfredo is top notch.',
    date: '3 days ago',
    isApproved: true,
    dishMentioned: 'Fettuccine Alfredo'
  },
  {
    id: 'rev-3',
    authorName: 'Dr. Shahriar Rahman',
    authorLocation: 'Mojompur, Kushtia',
    rating: 5,
    comment: 'Came with my family for a birthday dinner. The rooftop view of Kushtia town lights at night is unforgettable. Sizzler platter and Blue Ocean mocktail made our celebration truly special!',
    date: '1 week ago',
    isApproved: true,
    dishMentioned: 'Mixed Grilled Sizzler'
  },
  {
    id: 'rev-4',
    authorName: 'Sadia Afroz',
    authorLocation: 'Court Para, Kushtia',
    rating: 5,
    comment: 'Finally a modern hygienic restaurant in Kushtia with authentic Chinese wok dishes! Cashewnut chicken and Hakka Chowmein had the real wok aroma. 10/10 recommended.',
    date: '2 weeks ago',
    isApproved: true,
    dishMentioned: 'Chicken Hakka Chowmein'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Enchanting Rooftop Dining at Night',
    bengaliTitle: 'রাত্রিকালীন মনোমুগ্ধকর রুফটপ ডাইনিং',
    category: 'rooftop',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Dine under the starry sky with 360-degree views of Kushtia town.'
  },
  {
    id: 'gal-2',
    title: 'Gourmet Red Snapper & Seafood Artistry',
    bengaliTitle: 'সুস্বাদু সিফুড ও মাছের বিশেষ পদ',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fresh river and coastal catch cooked with aromatic Mediterranean herbs.'
  },
  {
    id: 'gal-3',
    title: 'Luxury Private Corner & Family Booths',
    bengaliTitle: 'পরিবার নিয়ে নিরিবিলি আধুনিক ক্যাবিন',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Warm ambient lighting designed for cozy family dinners and quiet conversations.'
  },
  {
    id: 'gal-4',
    title: 'Handcrafted Wood-Fired Crust Pizzas',
    bengaliTitle: 'ইতালীয় ওভেন বেকড মুচমুচে পিৎজা',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
    caption: '100% Mozzarella cheese baked to bubbly golden crust perfection.'
  },
  {
    id: 'gal-5',
    title: 'Signature Mocktails & Refreshing Drinks',
    bengaliTitle: 'কালারফুল সতেজ রিফ্রেশিং মকটেল',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    caption: 'Artisan chilled beverages prepared freshly by our in-house barista.'
  },
  {
    id: 'gal-6',
    title: 'Celebrations, Birthdays & Group Gatherings',
    bengaliTitle: 'জন্মদিন ও বিশেষ অনুষ্ঠান উদযাপন',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Dedicated customized rooftop setups for birthdays and anniversaries.'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'SB-ORD-1042',
    customerName: 'Mohammad Farhan',
    customerPhone: '+8801712998877',
    customerAddress: 'House 14, College Road, Kushtia',
    orderType: 'delivery',
    items: [
      { item: initialMenuItems[3], quantity: 1 }, // Szechuan chicken
      { item: initialMenuItems[4], quantity: 2 }, // Chowmein
      { item: initialMenuItems[11], quantity: 2 } // Mocktail
    ],
    subtotal: 1690,
    deliveryCharge: 40,
    totalAmount: 1730,
    status: 'preparing',
    paymentMethod: 'cash',
    specialNotes: 'Please keep chili flakes extra in the chowmein.',
    createdAt: '2026-11-03 12:15 PM',
    loyaltyPointsEarned: 84
  },
  {
    id: 'ord-102',
    orderNumber: 'SB-ORD-1041',
    customerName: 'Anika Tabassum',
    customerPhone: '+8801819665544',
    customerAddress: 'Rooftop Table #7',
    orderType: 'dine-in',
    tableNumber: 'Table 7 (Rooftop Open)',
    items: [
      { item: initialMenuItems[0], quantity: 1 }, // Red Snapper
      { item: initialMenuItems[7], quantity: 1 }  // Margherita Pizza
    ],
    subtotal: 1500,
    deliveryCharge: 0,
    totalAmount: 1500,
    status: 'delivered',
    paymentMethod: 'bkash',
    createdAt: '2026-11-03 11:30 AM',
    loyaltyPointsEarned: 75
  }
];

export const initialReservations: Reservation[] = [
  {
    id: 'res-201',
    reservationNumber: 'SB-RES-4921',
    customerName: 'Engr. Rakibul Islam',
    customerPhone: '+8801912334455',
    customerEmail: 'rakib@gmail.com',
    date: '2026-11-04',
    time: '07:30 PM',
    guests: 4,
    seatingPreference: 'rooftop-open',
    specialRequests: 'Celebrating 5th wedding anniversary. Kindly arrange a quiet corner with candle lighting.',
    status: 'confirmed',
    createdAt: '2026-11-03 10:20 AM'
  },
  {
    id: 'res-202',
    reservationNumber: 'SB-RES-4922',
    customerName: 'Nabila Karim',
    customerPhone: '+8801755112233',
    customerEmail: 'nabila@yahoo.com',
    date: '2026-11-05',
    time: '08:00 PM',
    guests: 6,
    seatingPreference: 'family-corner',
    specialRequests: 'Birthday party with kids. High chair needed.',
    status: 'pending',
    createdAt: '2026-11-03 01:10 PM'
  }
];
