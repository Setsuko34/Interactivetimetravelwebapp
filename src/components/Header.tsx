import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <Clock className="size-8 text-[#8B5CF6]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                <div className="size-full rounded-full border-2 border-[#8B5CF6]/30 border-t-[#8B5CF6]" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TimeTravel Agency</h1>
              <p className="text-xs text-muted-foreground">Journey Through Time</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {['about', 'destinations', 'booking'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item)}
                className="text-sm capitalize text-muted-foreground hover:text-[#8B5CF6] transition-colors"
              >
                {item === 'about' ? 'À propos' : item === 'destinations' ? 'Destinations' : 'Réservation'}
              </motion.button>
            ))}
            <Button
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:opacity-90"
            >
              Réserver
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 flex flex-col gap-3 pb-4"
          >
            {['about', 'destinations', 'booking'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left px-4 py-2 text-sm capitalize text-muted-foreground hover:text-[#8B5CF6] hover:bg-accent rounded-lg transition-colors"
              >
                {item === 'about' ? 'À propos' : item === 'destinations' ? 'Destinations' : 'Réservation'}
              </button>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
