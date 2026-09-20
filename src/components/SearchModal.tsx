import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { products } from '../lib/data';

export default function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-100">
              <Search size={20} className="text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 text-base outline-none placeholder:text-neutral-400"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            {filtered.length > 0 && (
              <div className="max-h-[400px] overflow-y-auto p-4">
                {filtered.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{product.name}</h4>
                      <p className="text-xs text-neutral-400 capitalize">{product.category} • ${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {query.length > 1 && filtered.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-neutral-400 text-sm">No products found for "{query}"</p>
              </div>
            )}

            {query.length <= 1 && (
              <div className="p-6">
                <p className="text-xs text-neutral-400 tracking-[0.15em] uppercase mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Blazer', 'Leather Bag', 'Sneakers', 'Watch', 'Dress'].map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-neutral-50 rounded-full text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
