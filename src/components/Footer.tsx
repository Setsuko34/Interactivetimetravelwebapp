import { motion } from 'motion/react';
import { Clock, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="size-6 text-[#8B5CF6]" />
              <div>
                <h3 className="text-lg text-foreground">TimeTravel Agency</h3>
                <p className="text-xs text-muted-foreground">Journey Through Time</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Pionniers du voyage temporel depuis 2145. Vivez l'histoire comme jamais auparavant.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="size-9 rounded-lg bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="size-4 text-[#8B5CF6]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="mb-4 text-foreground">Destinations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#destinations" className="hover:text-[#8B5CF6] transition-colors">
                  Paris 1889
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-[#8B5CF6] transition-colors">
                  Crétacé -65M
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-[#8B5CF6] transition-colors">
                  Florence 1504
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-[#8B5CF6] transition-colors">
                  Toutes les destinations
                </a>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="mb-4 text-foreground">Informations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-[#8B5CF6] transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8B5CF6] transition-colors">
                  Sécurité & Garanties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8B5CF6] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8B5CF6] transition-colors">
                  Conditions générales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-[#8B5CF6]" />
                <a href="mailto:contact@timetravel-agency.com" className="hover:text-[#8B5CF6] transition-colors">
                  contact@timetravel-agency.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-[#8B5CF6]" />
                <a href="tel:+33123456789" className="hover:text-[#8B5CF6] transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 text-[#8B5CF6] mt-0.5" />
                <span>42 Avenue du Temps<br />75008 Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} TimeTravel Agency. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#8B5CF6] transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-[#8B5CF6] transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-[#8B5CF6] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
