
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CartTrigger Component
 * 
 * Floating cart button with item count badge.
 * Responsive sizing for mobile and desktop.
 * Touch-friendly with proper accessibility.
 */
const CartTrigger = ({ setIsCartOpen, variant = 'floating' }) => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (variant === 'header') {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative touch-target rounded-full hover:bg-secondary/20 transition-colors focus-ring"
        onClick={() => setIsCartOpen && setIsCartOpen(true)}
        aria-label={`Open shopping cart with ${itemCount} items`}
      >
        <ShoppingCart className="h-5 w-5 text-foreground" strokeWidth={2} />
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-background shadow-sm"
            >
              {itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    );
  }

  // Floating variant (mobile-first)
  return (
    <div className="fixed bottom-6 right-6 z-[1030] lg:hidden">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsCartOpen && setIsCartOpen(true)}
          size="icon"
          className="rounded-full h-14 w-14 sm:h-16 sm:w-16 bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 relative flex items-center justify-center focus-ring-gold touch-target-lg"
          aria-label={`Open shopping cart with ${itemCount} items`}
        >
          <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
          
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-background shadow-md"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};

export default CartTrigger;
