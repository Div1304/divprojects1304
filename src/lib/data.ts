export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isBestSeller?: boolean;
  details: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  productId?: string;
}

export const categories: Category[] = [
  {
    id: 'mens',
    name: "Men's",
    image: '/images/cat-mens.jpg',
    slug: 'mens',
    description: 'Refined essentials for the modern man',
  },
  {
    id: 'womens',
    name: "Women's",
    image: '/images/cat-womens.jpg',
    slug: 'womens',
    description: 'Elegance redefined for every occasion',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/images/cat-accessories.jpg',
    slug: 'accessories',
    description: 'The finishing touch to any look',
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    image: '/images/cat-new.jpg',
    slug: 'new-arrivals',
    description: 'Fresh designs, timeless appeal',
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Essential Cotton Tee',
    price: 89,
    originalPrice: 120,
    image: '/images/product-1.jpg',
    images: ['/images/product-1.jpg', '/images/product-6.jpg'],
    category: 'mens',
    rating: 4.8,
    reviews: 124,
    description: 'Crafted from premium organic cotton, this essential tee offers unparalleled comfort with a refined silhouette. Perfect for layering or wearing alone.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Stone', hex: '#C4B5A0' },
    ],
    isNew: true,
    isBestSeller: true,
    details: ['100% Organic Cotton', 'Relaxed fit', 'Machine washable', 'Made in Portugal'],
  },
  {
    id: 'p2',
    name: 'Noir Leather Bag',
    price: 345,
    image: '/images/product-2.jpg',
    images: ['/images/product-2.jpg', '/images/product-5.jpg'],
    category: 'accessories',
    rating: 4.9,
    reviews: 87,
    description: 'Handcrafted from Italian full-grain leather, this statement bag combines timeless design with modern functionality. Ages beautifully with use.',
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Cognac', hex: '#8B4513' },
    ],
    isBestSeller: true,
    details: ['Italian full-grain leather', 'Gold-tone hardware', 'Interior zip pocket', 'Dust bag included'],
  },
  {
    id: 'p3',
    name: 'Urban Runner',
    price: 225,
    originalPrice: 280,
    image: '/images/product-3.jpg',
    images: ['/images/product-3.jpg', '/images/product-1.jpg'],
    category: 'mens',
    rating: 4.7,
    reviews: 203,
    description: 'Where performance meets style. These modern sneakers feature a sleek silhouette with premium materials and all-day comfort technology.',
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Grey', hex: '#9CA3AF' },
    ],
    isNew: true,
    details: ['Premium leather upper', 'Cushioned insole', 'Rubber outsole', 'Handcrafted in Italy'],
  },
  {
    id: 'p4',
    name: 'Chronograph Elite',
    price: 595,
    image: '/images/product-4.jpg',
    images: ['/images/product-4.jpg', '/images/product-2.jpg'],
    category: 'accessories',
    rating: 4.9,
    reviews: 56,
    description: 'A masterpiece of precision engineering. This chronograph watch features Swiss movement, sapphire crystal, and a design that transcends trends.',
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    isBestSeller: true,
    details: ['Swiss quartz movement', 'Sapphire crystal', 'Water resistant 100m', '2-year warranty'],
  },
  {
    id: 'p5',
    name: 'Aviator Shades',
    price: 185,
    image: '/images/product-5.jpg',
    images: ['/images/product-5.jpg', '/images/product-4.jpg'],
    category: 'accessories',
    rating: 4.6,
    reviews: 142,
    description: 'Iconic aviator frames reimagined with modern materials. UV400 protection meets effortless style in these everyday essentials.',
    sizes: ['One Size'],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    isNew: true,
    details: ['UV400 protection', 'Polarized lenses', 'Titanium frame', 'Includes hard case'],
  },
  {
    id: 'p6',
    name: 'Tailored Blazer',
    price: 425,
    originalPrice: 520,
    image: '/images/product-6.jpg',
    images: ['/images/product-6.jpg', '/images/product-1.jpg'],
    category: 'womens',
    rating: 4.8,
    reviews: 91,
    description: 'Impeccably tailored with a modern slim fit. This blazer transitions seamlessly from boardroom to evening, crafted from premium Italian wool.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    isBestSeller: true,
    details: ['Italian wool blend', 'Fully lined', 'Two-button closure', 'Dry clean only'],
  },
  {
    id: 'p7',
    name: 'Essence Parfum',
    price: 165,
    image: '/images/product-7.jpg',
    images: ['/images/product-7.jpg', '/images/product-5.jpg'],
    category: 'accessories',
    rating: 4.7,
    reviews: 178,
    description: 'A sophisticated blend of bergamot, jasmine, and sandalwood. This unisex fragrance captures the essence of modern luxury in a minimalist bottle.',
    sizes: ['50ml', '100ml'],
    colors: [
      { name: 'Clear', hex: '#F5F5F5' },
    ],
    isNew: true,
    details: ['Eau de Parfum', 'Top: Bergamot, Pink Pepper', 'Heart: Jasmine, Iris', 'Base: Sandalwood, Musk'],
  },
  {
    id: 'p8',
    name: 'Silk Midi Dress',
    price: 385,
    image: '/images/product-8.jpg',
    images: ['/images/product-8.jpg', '/images/product-6.jpg'],
    category: 'womens',
    rating: 4.9,
    reviews: 64,
    description: 'Flowing silk meets architectural design in this stunning midi dress. The perfect statement piece for special occasions or elevated everyday styling.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Emerald', hex: '#50C878' },
    ],
    isNew: true,
    isBestSeller: true,
    details: ['100% Mulberry silk', 'Bias cut', 'Hidden side zip', 'Dry clean recommended'],
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Sophia Chen',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    text: 'NOVA has completely transformed my wardrobe. The quality is exceptional — every piece feels like it was made just for me. The attention to detail is unmatched.',
    date: '2 weeks ago',
  },
  {
    id: 'r2',
    name: 'Marcus Williams',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    text: 'I\'ve never experienced clothing this well-crafted. The Tailored Blazer is my go-to for every important meeting. Worth every penny.',
    date: '1 month ago',
  },
  {
    id: 'r3',
    name: 'Elena Rodriguez',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    text: 'The minimalist aesthetic combined with premium materials makes NOVA my absolute favorite brand. Their customer service is equally impressive.',
    date: '3 weeks ago',
  },
];

export const marqueeText = 'NOVA • NEW COLLECTION • PREMIUM DESIGN • SUSTAINABLE LUXURY • TIMELESS ELEGANCE • CRAFTED WITH CARE •';
