
import React, { useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Sparkles, Star, ShoppingBag, MapPin, BookOpen, HelpCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import SocialMediaLinks from '@/components/SocialMediaLinks.jsx';
import { Button } from '@/components/ui/button.jsx';

const MobileMenu = ({ isOpen, onClose, user, isAdmin, signOut }) => {
  const location = useLocation();
  const menuRef = useRef(null);

  // Navigation links
  const mainLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Horses', path: '/horses', icon: Sparkles },
    { name: 'Services', path: '/services', icon: Star },
    { name: 'Store', path: '/store', icon: ShoppingBag },
    { name: 'Locations', path: '/locations', icon: MapPin },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'FAQs', path: '/faqs', icon: HelpCircle },
    { name: 'About', path: '/about', icon: Info },
  ];

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-lg font-serif font-bold">
                  Titan <span className="text-[#D4AF37]">Stables</span>
                </span>
                <button
                  onClick={onClose}
                  className="touch-target rounded-full hover:bg-secondary/10 transition-colors focus-ring"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile navigation">
                <div className="flex flex-col space-y-1">
                  {mainLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path || 
                                   (location.pathname.startsWith(link.path + '/') && link.path !== '/');
                    
                    return (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className={cn(
                          "mobile-nav-item",
                          isActive 
                            ? "bg-secondary/20 text-primary border-l-4 border-primary" 
                            : "text-foreground/80 hover:bg-secondary/10 hover:text-primary"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "text-foreground/60")} />
                        <span className="font-medium">{link.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </nav>

              {/* Social Links */}
              <div className="border-t border-border p-4">
                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3">
                  Connect With Us
                </p>
                <SocialMediaLinks containerClass="justify-start gap-3" />
              </div>

              {/* Admin Section (if authenticated) */}
              {user && isAdmin && (
                <div className="border-t border-border p-4">
                  <div className="space-y-3">
                    <Link to="/admin" className="block">
                      <Button 
                        variant="secondary" 
                        className="w-full justify-start rounded-xl touch-target focus-ring"
                      >
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => {
                        signOut();
                        onClose();
                      }} 
                      variant="destructive" 
                      className="w-full justify-start rounded-xl touch-target focus-ring"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}

              {/* Footer Info */}
              <div className="border-t border-border p-4 bg-muted/30">
                <p className="text-xs text-muted-foreground text-center">
                  © {new Date().getFullYear()} Titan Stables
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
