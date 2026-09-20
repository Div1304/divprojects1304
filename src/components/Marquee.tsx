import { motion } from 'framer-motion';
import { marqueeText } from '../lib/data';

export default function Marquee() {
  const items = Array(4).fill(marqueeText);

  return (
    <section className="py-12 lg:py-16 overflow-hidden border-y border-neutral-100">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {items.map((text, i) => (
          <span
            key={i}
            className="text-4xl lg:text-6xl xl:text-7xl font-extralight tracking-[0.05em] text-neutral-200 mx-4 flex-shrink-0 select-none"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
