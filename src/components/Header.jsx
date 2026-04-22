
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, X, Phone, Settings, ShoppingCart, LayoutDashboard, LogOut,
  Home, Sparkles, Star, ShoppingBag, MapPin, BookOpen, HelpCircle, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';
import { cn } from '@/lib/utils.js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';
import { useCart } from '@/hooks/useCart.jsx';
import MobileMenu from '@/components/MobileMenu.jsx';

/**
 * Header Component - Fully Responsive Navigation
 * 
 * Mobile-first design with hamburger menu < 1024px
 * Desktop horizontal navigation >= 1024px
 * Touch-friendly with proper accessibility
 * Smooth transitions and animations
 */
const Header = ({ setIsCartOpen }) => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'super_admin';

  // Main navigation links
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-[1020] w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 text-foreground shadow-sm">
        <div className="header-container container mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo - Clickable, Responsive Sizing */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 sm:space-x-3 group shrink-0 focus-ring rounded-md" 
            aria-label="Titan Stables Home"
          >
            <motion.div 
              className="relative transition-transform group-hover:scale-105 flex items-center justify-center shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ height: 'var(--logo-height-mobile)' }}
            >
              <img 
                src="https://horizons-cdn.hostinger.com/26e5af24-e95b-4c1d-b14c-1303ec73c93a/3ff94b3b66803dbf9ac97d0db5431ae1.jpg" 
                alt="Titan Stables Logo" 
                className="h-full w-auto object-contain rounded-sm" 
                loading="eager"
                width="50"
                height="50"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-serif font-bold tracking-tight leading-none">
                Titan <span className="text-[#D4AF37]">Stables</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">
                USA Import Experts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile/Tablet */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                             (location.pathname.startsWith(link.path + '/') && link.path !== '/');
              
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "nav-link focus-ring",
                    isActive ? "nav-link-active" : "nav-link-inactive"
                  )}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Actions - Hidden on Mobile/Tablet */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            {/* Call Now Button */}
            <a 
              href="tel:+14342535844" 
              className="inline-flex items-center justify-center rounded-full text-sm font-bold transition-all h-10 px-5 bg-[#D4AF37] text-white hover:bg-[#b5952f] shadow-md hover:shadow-lg hover:-translate-y-0.5 focus-ring-gold touch-target"
              aria-label="Call Titan Stables at +1 (434) 253-5844"
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" /> 
              Call Now
            </a>

            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative touch-target rounded-full hover:bg-secondary/20 transition-colors focus-ring"
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              aria-label={`Open shopping cart with ${cartItemCount} items`}
            >
              <ShoppingCart className="h-5 w-5 text-foreground" aria-hidden="true" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-background shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Admin Dropdown (if authenticated) */}
            {user && isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative touch-target rounded-full border border-border bg-background hover:bg-secondary/20 focus-ring"
                    aria-label="Admin settings menu"
                  >
                    <Settings className="h-5 w-5 text-foreground" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card text-foreground border-border" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer hover:bg-secondary/20 flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => signOut()} 
                    className="cursor-pointer text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Actions - Visible on Mobile/Tablet Only */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Call Button (Icon Only on Mobile) */}
            <a 
              href="tel:+14342535844" 
              className="inline-flex items-center justify-center rounded-full touch-target bg-[#D4AF37] text-white hover:bg-[#b5952f] shadow-sm focus-ring-gold" 
              aria-label="Call Titan Stables"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>

            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative touch-target rounded-full text-foreground hover:bg-secondary/20 focus-ring" 
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              aria-label={`Open shopping cart with ${cartItemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-background">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Hamburger Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-foreground hover:text-primary hover:bg-secondary/20 touch-target focus-ring"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Component */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        isAdmin={isAdmin}
        signOut={signOut}
      />
    </>
  );
};

export default Header;
