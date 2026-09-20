import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-medium tracking-wide">Your Bag</h2>
                <span className="text-sm text-neutral-400">({cart.length})</span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-neutral-200 mb-4" />
                  <p className="text-neutral-500 font-light">Your bag is empty</p>
                  <Link
                    to="/shop"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 text-sm tracking-[0.1em] uppercase font-medium border-b border-black pb-1"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-medium">{item.product.name}</h3>
                            <p className="text-xs text-neutral-400 mt-0.5">
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <span className="text-sm font-medium">${item.product.price * item.quantity}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-neutral-200 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 rounded-l-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 rounded-r-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="text-xs text-neutral-400 hover:text-red-500 transition-colors underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-100 px-6 py-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-500">Subtotal</span>
                  <span className="text-lg font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-neutral-400 mb-5">Shipping and taxes calculated at checkout</p>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full bg-black text-white py-4 rounded-full text-sm tracking-[0.12em] uppercase font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  Checkout
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full mt-3 py-3 text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
