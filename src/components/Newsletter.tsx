import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useInView } from '../lib/hooks';

export default function Newsletter() {
  const { ref, isInView } = useInView(0.2);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-neutral-950">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-neutral-500 text-xs tracking-[0.3em] uppercase font-medium">Stay Connected</span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-light text-white tracking-tight leading-tight">
            Be the first to discover
            <br />
            <span className="italic">what's next</span>
          </h2>
          <p className="mt-6 text-neutral-400 font-light">
            Subscribe to receive exclusive previews, early access to new collections, and curated style inspiration.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 flex items-center justify-center gap-3 text-emerald-400"
            >
              <Check size={20} />
              <span className="text-sm tracking-wide">Thank you for subscribing</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-4 rounded-full text-sm tracking-[0.1em] uppercase font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group"
              >
                Subscribe
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
