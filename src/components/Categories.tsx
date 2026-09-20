import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '../lib/hooks';
import { categories } from '../lib/data';

export default function Categories() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium">Curated For You</span>
        <h2 className="mt-3 text-3xl lg:text-5xl font-light tracking-tight">Shop by Category</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/shop?category=${cat.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                <h3 className="text-white text-xl lg:text-2xl font-light tracking-wide">{cat.name}</h3>
                <p className="text-white/60 text-sm mt-1 font-light">{cat.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-white text-xs tracking-[0.15em] uppercase font-medium opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span>Explore</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
