import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useInView } from '../lib/hooks';
import { reviews } from '../lib/data';

export default function Reviews() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium">Testimonials</span>
        <h2 className="mt-3 text-3xl lg:text-5xl font-light tracking-tight">What Our Clients Say</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="bg-white border border-neutral-100 rounded-2xl p-8 lg:p-10 hover:shadow-lg transition-shadow duration-500"
          >
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} size={14} fill="currentColor" className="text-amber-500" />
              ))}
            </div>
            <p className="text-neutral-600 leading-relaxed font-light text-[15px]">
              "{review.text}"
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-sm font-medium">{review.name}</div>
                <div className="text-xs text-neutral-400">{review.date}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
