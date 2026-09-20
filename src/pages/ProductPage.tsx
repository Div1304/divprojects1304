import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Minus, Plus, Truck, Shield, RotateCcw, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { products } from '../lib/data';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showShipping, setShowShipping] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Product not found</h1>
          <Link to="/shop" className="text-sm underline">Back to shop</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0].name;
    addToCart(product, size, color, quantity);
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-4">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:py-4"
          >
            {product.isNew && (
              <span className="inline-block text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium mb-3">New Arrival</span>
            )}
            <h1 className="text-3xl lg:text-4xl font-light tracking-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} className="text-amber-500" />
                ))}
              </div>
              <span className="text-sm text-neutral-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-2xl font-light">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="mt-6 text-neutral-500 leading-relaxed font-light">{product.description}</p>

            {/* Color selector */}
            <div className="mt-8">
              <span className="text-sm font-medium">Color: <span className="text-neutral-500 font-normal">{selectedColor || product.colors[0].name}</span></span>
              <div className="flex gap-3 mt-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      (selectedColor || product.colors[0].name) === color.name
                        ? 'border-black scale-110'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Size</span>
                <button className="text-xs text-neutral-500 underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-12 px-4 rounded-lg border text-sm transition-all ${
                      (selectedSize || product.sizes[0]) === size
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center border border-neutral-200 rounded-lg mt-3 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 rounded-full text-sm tracking-[0.12em] uppercase font-medium hover:bg-neutral-800 transition-colors"
              >
                Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                  wishlisted ? 'bg-black border-black text-white' : 'border-neutral-200 hover:border-black'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <button className="w-full mt-3 bg-neutral-100 text-black py-4 rounded-full text-sm tracking-[0.12em] uppercase font-medium hover:bg-neutral-200 transition-colors">
              Buy Now
            </button>

            {/* Accordion sections */}
            <div className="mt-10 border-t border-neutral-100">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between py-5 text-sm font-medium"
              >
                Product Details
                {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {showDetails && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pb-5">
                  <ul className="space-y-2">
                    {product.details.map((detail, i) => (
                      <li key={i} className="text-sm text-neutral-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <button
                onClick={() => setShowShipping(!showShipping)}
                className="w-full flex items-center justify-between py-5 text-sm font-medium border-t border-neutral-100"
              >
                Shipping & Returns
                {showShipping ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {showShipping && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pb-5">
                  <div className="space-y-3 text-sm text-neutral-500">
                    <p>Free standard shipping on orders over $200.</p>
                    <p>Express delivery: 1-2 business days.</p>
                    <p>Free returns within 30 days of purchase.</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Free Shipping' },
                { icon: Shield, label: '2-Year Warranty' },
                { icon: RotateCcw, label: '30-Day Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center py-4 bg-neutral-50 rounded-xl">
                  <Icon size={20} className="mx-auto text-neutral-400" />
                  <span className="text-[11px] text-neutral-500 mt-2 block">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 lg:mt-32">
            <h2 className="text-2xl lg:text-3xl font-light tracking-tight mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
