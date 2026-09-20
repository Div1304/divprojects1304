import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { label: "Men's", href: '/shop?category=mens' },
      { label: "Women's", href: '/shop?category=womens' },
      { label: 'Accessories', href: '/shop?category=accessories' },
      { label: 'New Arrivals', href: '/shop?category=new-arrivals' },
      { label: 'Sale', href: '/shop?filter=sale' },
    ],
    Support: [
      { label: 'Contact Us', href: '#' },
      { label: 'Shipping & Returns', href: '#' },
      { label: 'Size Guide', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Track Order', href: '#' },
    ],
    Company: [
      { label: 'About NOVA', href: '/#about' },
      { label: 'Sustainability', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Stores', href: '#' },
    ],
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-[0.25em]">
              NOVA
            </Link>
            <p className="mt-4 text-neutral-400 text-sm leading-relaxed max-w-sm font-light">
              Redefining modern luxury through thoughtful design, sustainable practices, and uncompromising quality.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors" aria-label="Pinterest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 12a4 4 0 1 1 8 0c0 4-3 6-3 6" /><path d="M12 12v9" /><circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium text-neutral-300 mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {currentYear} NOVA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
