import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollY } from '../lib/hooks';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollY = useScrollY();

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-neutral-50">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: scrollY * 0.3 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: 'url(/images/hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-white/80 text-xs tracking-[0.3em] uppercase mb-6 font-medium">
              Autumn/Winter 2026
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.95] tracking-tight"
            >
              Designed for
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.95] tracking-tight"
            >
              the Next
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.95] tracking-tight italic"
            >
              Generation
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 text-white/70 text-base lg:text-lg max-w-md leading-relaxed font-light"
          >
            Discover our latest collection — where minimalist design meets uncompromising quality. Crafted for those who define their own style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm tracking-[0.12em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-black hover:text-white"
            >
              <span className="relative z-10">Shop Collection</span>
              <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop?category=new-arrivals"
              className="inline-flex items-center gap-2 text-white text-sm tracking-[0.12em] uppercase font-medium border-b border-white/40 pb-1 hover:border-white transition-colors duration-300"
            >
              Explore
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-white/30"
        />
      </motion.div>
    </section>
  );
}
