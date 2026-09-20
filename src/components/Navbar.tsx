import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/shop?category=new-arrivals' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'About', href: '/#about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Nav links - desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[13px] tracking-[0.08em] uppercase font-medium text-neutral-700 hover:text-black transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-auto lg:translate-x-0">
              <span className={`text-2xl lg:text-[26px] font-bold tracking-[0.25em] transition-colors duration-500 ${
                scrolled ? 'text-black' : 'text-black'
              }`}>
                NOVA
              </span>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <Search size={19} strokeWidth={1.8} />
              </button>
              <Link
                to="/shop?view=wishlist"
                className="p-2 hover:opacity-60 transition-opacity relative hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart size={19} strokeWidth={1.8} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:opacity-60 transition-opacity relative"
                aria-label="Cart"
              >
                <ShoppingBag size={19} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="pt-24 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    className="block py-4 text-2xl font-light tracking-wide border-b border-neutral-100"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
