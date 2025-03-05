
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ChefHat, Heart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Recipes', icon: <ChefHat className="h-4 w-4 mr-2" /> },
    { path: '/favorites', label: 'Favorites', icon: <Heart className="h-4 w-4 mr-2" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass py-3 border-b shadow-sm' : 'bg-transparent py-5'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">Recipe Explorer</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className="relative"
                size="sm"
              >
                {item.icon}
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-2"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex md:hidden items-center space-x-2">
          {navItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                size="icon"
                className="relative"
              >
                {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator-mobile"
                    className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
