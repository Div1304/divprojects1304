import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../lib/store';
import type { Product } from '../lib/data';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100 mb-4">
        <Link to={`/product/${product.id}`}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full font-medium">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            wishlisted
              ? 'bg-black text-white'
              : 'bg-white/80 backdrop-blur-sm text-neutral-600 opacity-0 group-hover:opacity-100'
          } hover:scale-110`}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick add */}
        <button
          onClick={() => addToCart(product, product.sizes[0], product.colors[0].name)}
          className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-sm text-white text-xs tracking-[0.12em] uppercase py-3 rounded-lg flex items-center justify-center gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black font-medium"
        >
          <ShoppingBag size={14} />
          Quick Add
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium tracking-wide group-hover:text-neutral-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} fill="currentColor" className="text-amber-500" />
              <span className="text-xs text-neutral-500">{product.rating} ({product.reviews})</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through ml-2">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
