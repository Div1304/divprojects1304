import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Grid3X3, LayoutGrid } from 'lucide-react';
import { products, categories } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { useStore } from '../lib/store';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const { isInWishlist } = useStore();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');
  const viewParam = searchParams.get('view');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  const showWishlist = viewParam === 'wishlist';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (showWishlist) {
      result = result.filter(p => isInWishlist(p.id));
    } else {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'new-arrivals') {
          result = result.filter(p => p.isNew);
        } else {
          result = result.filter(p => p.category === selectedCategory);
        }
      }

      if (filterParam === 'new') {
        result = result.filter(p => p.isNew);
      }
      if (filterParam === 'sale') {
        result = result.filter(p => p.originalPrice);
      }
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategory, sortBy, filterParam, showWishlist, isInWishlist]);

  const pageTitle = showWishlist
    ? 'Your Wishlist'
    : selectedCategory === 'all'
    ? 'All Products'
    : categories.find(c => c.slug === selectedCategory)?.name || 'Shop';

  return (
    <div className="pt-24 lg:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl lg:text-5xl font-light tracking-tight">{pageTitle}</h1>
          <p className="mt-2 text-neutral-500 font-light">{filteredProducts.length} products</p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Category pills */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.1em] uppercase font-medium transition-all ${
                selectedCategory === 'all' && !showWishlist
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs tracking-[0.1em] uppercase font-medium transition-all hidden sm:block ${
                  selectedCategory === cat.slug
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-xs tracking-[0.1em] uppercase font-medium hover:bg-neutral-200 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 rounded-full bg-neutral-100 text-xs tracking-[0.05em] uppercase font-medium appearance-none cursor-pointer hover:bg-neutral-200 transition-colors pr-8"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <div className="hidden lg:flex items-center gap-1 border border-neutral-200 rounded-full p-1">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-full transition-colors ${gridCols === 3 ? 'bg-neutral-200' : 'hover:bg-neutral-100'}`}
                aria-label="Grid 3"
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-full transition-colors ${gridCols === 4 ? 'bg-neutral-200' : 'hover:bg-neutral-100'}`}
                aria-label="Grid 4"
              >
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-neutral-200 rounded-full">
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`p-3 rounded-xl text-sm text-left transition-all ${
                        selectedCategory === cat.slug
                          ? 'bg-black text-white'
                          : 'bg-white border border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div className="font-medium">{cat.name}</div>
                      <div className={`text-xs mt-0.5 ${selectedCategory === cat.slug ? 'text-white/70' : 'text-neutral-400'}`}>
                        {cat.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 lg:gap-6`}>
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg font-light">
              {showWishlist ? 'Your wishlist is empty' : 'No products found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
