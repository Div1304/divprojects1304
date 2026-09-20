import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../lib/hooks';
import { products } from '../lib/data';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { ref, isInView } = useInView(0.1);
  const featured = products.slice(0, 8);

  return (
    <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex items-end justify-between mb-16"
      >
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium">Handpicked</span>
          <h2 className="mt-3 text-3xl lg:text-5xl font-light tracking-tight">Featured Pieces</h2>
        </div>
        <Link
          to="/shop"
          className="hidden sm:inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase font-medium text-neutral-600 hover:text-black transition-colors group"
        >
          View All
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      <div className="mt-12 text-center sm:hidden">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase font-medium border-b border-black pb-1"
        >
          View All Products
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
