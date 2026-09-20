import { motion } from 'framer-motion';
import { useInView } from '../lib/hooks';

export default function BrandStory() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} id="about" className="relative py-32 lg:py-44 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/brand-story.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium">Our Story</span>
          <h2 className="mt-6 text-4xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Born from a belief that
            <span className="italic"> great design </span>
            should be
            <span className="italic"> effortless</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-white/60 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-light"
          >
            NOVA was founded in 2020 with a singular vision: to create clothing and accessories that 
            transcend seasons and trends. We believe in the power of thoughtful design, sustainable 
            practices, and uncompromising quality. Every piece tells a story of craftsmanship and care.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-12 lg:gap-20"
          >
            {[
              { number: '50+', label: 'Artisan Partners' },
              { number: '12', label: 'Countries' },
              { number: '100%', label: 'Sustainable' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-white">{stat.number}</div>
                <div className="text-white/50 text-xs tracking-[0.2em] uppercase mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
