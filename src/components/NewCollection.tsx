import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../lib/hooks';

export default function NewCollection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium">Just Dropped</span>
          <h2 className="mt-3 text-3xl lg:text-5xl font-light tracking-tight">New Collection</h2>
          <p className="mt-4 text-neutral-500 max-w-lg mx-auto font-light">
            Fresh silhouettes and refined details define this season's most anticipated release.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          {/* Large card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-7 relative aspect-[4/3] md:aspect-auto md:min-h-[500px] overflow-hidden rounded-2xl group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url(/images/new-collection-2.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-white/70 text-xs tracking-[0.2em] uppercase">Featured</span>
              <h3 className="text-white text-2xl lg:text-3xl font-light mt-2">The Atelier Series</h3>
              <p className="text-white/60 text-sm mt-2 max-w-sm font-light">Handcrafted pieces that celebrate the art of making.</p>
              <Link
                to="/shop"
                className="mt-4 inline-flex items-center gap-2 text-white text-xs tracking-[0.15em] uppercase font-medium border-b border-white/40 pb-1 hover:border-white transition-colors"
              >
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Stacked cards */}
          <div className="md:col-span-5 flex flex-col gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="relative flex-1 min-h-[240px] overflow-hidden rounded-2xl group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url(/images/new-collection.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white/70 text-xs tracking-[0.2em] uppercase">Essentials</span>
                <h3 className="text-white text-xl font-light mt-1">Monochrome Edit</h3>
                <Link to="/shop" className="mt-3 inline-flex items-center gap-2 text-white text-xs tracking-[0.15em] uppercase font-medium opacity-80 hover:opacity-100 transition-opacity">
                  Explore <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative flex-1 min-h-[240px] overflow-hidden rounded-2xl group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url(/images/product-7.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white/70 text-xs tracking-[0.2em] uppercase">Fragrance</span>
                <h3 className="text-white text-xl font-light mt-1">Essence Collection</h3>
                <Link to="/shop" className="mt-3 inline-flex items-center gap-2 text-white text-xs tracking-[0.15em] uppercase font-medium opacity-80 hover:opacity-100 transition-opacity">
                  Discover <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
