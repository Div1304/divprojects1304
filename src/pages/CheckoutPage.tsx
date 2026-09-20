import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Check } from 'lucide-react';
import { useStore } from '../lib/store';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState<'info' | 'payment' | 'complete'>('info');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const shipping = cartTotal > 200 ? 0 : 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('complete');
    clearCart();
  };

  if (cart.length === 0 && step !== 'complete') {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Your bag is empty</h1>
          <Link to="/shop" className="text-sm underline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-emerald-600" />
          </div>
          <h1 className="text-3xl font-light mb-3">Order Confirmed</h1>
          <p className="text-neutral-500 font-light mb-2">Thank you for your purchase!</p>
          <p className="text-sm text-neutral-400 mb-8">Order #NV-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm tracking-[0.1em] uppercase font-medium hover:bg-neutral-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-12">Checkout</h1>

        {/* Steps indicator */}
        <div className="flex items-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step === 'info' ? 'text-black' : 'text-neutral-400'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
              step === 'info' ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'
            }`}>1</span>
            <span className="text-sm font-medium">Information</span>
          </div>
          <div className="w-8 h-[1px] bg-neutral-200" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-black' : 'text-neutral-400'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
              step === 'payment' ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'
            }`}>2</span>
            <span className="text-sm font-medium">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === 'info' && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmitInfo}
                className="space-y-5"
              >
                <div>
                  <label className="text-sm font-medium block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="123 Street Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full text-sm tracking-[0.12em] uppercase font-medium hover:bg-neutral-800 transition-colors mt-6"
                >
                  Continue to Payment
                </button>
              </motion.form>
            )}

            {step === 'payment' && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmitPayment}
                className="space-y-5"
              >
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                  <Lock size={14} />
                  <span>Secure payment — your information is encrypted</span>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('info')}
                    className="px-8 py-4 rounded-full border border-neutral-200 text-sm tracking-[0.1em] uppercase font-medium hover:bg-neutral-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-4 rounded-full text-sm tracking-[0.12em] uppercase font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Place Order — ${total.toFixed(2)}
                  </button>
                </div>
              </motion.form>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8 sticky top-28">
              <h3 className="text-sm font-medium tracking-[0.1em] uppercase mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="w-14 h-16 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-neutral-400">{item.size} / {item.color} × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-3 border-t border-neutral-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
