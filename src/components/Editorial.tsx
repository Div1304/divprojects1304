import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../lib/hooks';

export default function Editorial() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/editorial.jpg)' }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pl-8"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium">The Edit</span>
            <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-[1.1]">
              Where Form
              <br />
              <span className="italic">Meets Function</span>
            </h2>
            <p className="mt-6 text-neutral-500 text-base lg:text-lg leading-relaxed max-w-md font-light">
              Our latest editorial explores the intersection of minimalist design and everyday luxury. 
              Each piece is thoughtfully designed to elevate your daily rituals while standing the test of time.
            </p>
            <p className="mt-4 text-neutral-500 text-base lg:text-lg leading-relaxed max-w-md font-light">
              From sustainably sourced materials to precision craftsmanship, every detail matters.
            </p>
            <Link
              to="/shop"
              className="mt-10 inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm tracking-[0.12em] uppercase font-medium rounded-full hover:bg-neutral-800 transition-colors duration-300 group"
            >
              Discover the Collection
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
