import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useInView, useDragScroll } from '../lib/hooks';
import { products } from '../lib/data';
import { useStore } from '../lib/store';

export default function BestSellers() {
  const { ref, isInView } = useInView(0.1);
  const { containerRef, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = useDragScroll();
  const { addToCart } = useStore();
  const bestSellers = products.filter(p => p.isBestSeller);

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-12 px-6 lg:px-12"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium">Most Loved</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-light tracking-tight">Best Sellers</h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase font-medium text-neutral-600 hover:text-black transition-colors group"
          >
            Shop All
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          className="flex gap-5 overflow-x-auto px-6 lg:px-12 pb-4 scrollbar-hide cursor-grab select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] group"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100 mb-4">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); addToCart(product, product.sizes[0], product.colors[0].name); }}
                    className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-sm text-white text-xs tracking-[0.12em] uppercase py-3 rounded-lg flex items-center justify-center gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 font-medium"
                  >
                    Quick Add
                  </button>
                </div>
              </Link>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} fill="currentColor" className="text-amber-500" />
                  <span className="text-xs text-neutral-500">{product.rating}</span>
                </div>
                <span className="text-sm font-medium mt-1 block">${product.price}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
