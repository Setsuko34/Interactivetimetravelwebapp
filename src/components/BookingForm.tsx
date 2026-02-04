import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Calendar, Users, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

export function BookingForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Demande de réservation envoyée !', {
      description: 'Notre équipe vous contactera sous 24h pour finaliser votre voyage temporel.',
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="booking" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#8B5CF6]/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl mb-4 text-foreground">
            Réservez Votre{' '}
            <span className="text-[#8B5CF6]">Voyage Temporel</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Complétez ce formulaire et notre équipe vous contactera pour planifier 
            l'aventure de votre vie à travers le temps.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Jean"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jean.dupont@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+33 6 12 34 56 78"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Select name="destination" required>
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Choisissez votre destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris1889">Paris 1889 - La Belle Époque</SelectItem>
                    <SelectItem value="cretace">Crétacé -65M - Ère des Dinosaures</SelectItem>
                    <SelectItem value="florence1504">Florence 1504 - Renaissance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date de départ souhaitée</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      required
                      className="pl-10"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travelers">Nombre de voyageurs</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="travelers"
                      name="travelers"
                      type="number"
                      min="1"
                      max="10"
                      required
                      placeholder="2"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Dites-nous en plus sur vos attentes et préférences..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:opacity-90 text-lg py-6"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Demander un devis'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                En soumettant ce formulaire, vous acceptez d'être contacté par TimeTravel Agency 
                concernant votre demande de voyage temporel.
              </p>
            </form>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/10 to-[#A855F7]/10 border border-[#8B5CF6]/20">
              <h3 className="text-2xl mb-4 text-foreground">Informations Pratiques</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="size-2 rounded-full bg-[#8B5CF6]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-foreground">Réponse rapide</h4>
                    <p className="text-sm text-muted-foreground">
                      Notre équipe vous contacte sous 24h pour discuter de votre projet.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="size-2 rounded-full bg-[#8B5CF6]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-foreground">Devis personnalisé</h4>
                    <p className="text-sm text-muted-foreground">
                      Chaque voyage est unique et adapté à vos envies et budget.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="size-2 rounded-full bg-[#8B5CF6]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-foreground">Paiement sécurisé</h4>
                    <p className="text-sm text-muted-foreground">
                      Plusieurs options de paiement disponibles avec garantie totale.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="size-2 rounded-full bg-[#8B5CF6]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-foreground">Annulation flexible</h4>
                    <p className="text-sm text-muted-foreground">
                      Annulation gratuite jusqu'à 30 jours avant le départ.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-2xl mb-4 text-foreground">Nous Contacter</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="size-5 text-[#8B5CF6]" />
                  <span>contact@timetravel-agency.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="size-5 text-[#8B5CF6]" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="size-5 text-[#8B5CF6]" />
                  <span>42 Avenue du Temps<br />75008 Paris, France</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/20 to-[#A855F7]/20 border border-[#8B5CF6]/30 text-center">
              <p className="text-sm text-foreground">
                💎 <strong>Satisfaction garantie</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Plus de 50 000 voyageurs temporels satisfaits depuis 2145
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
