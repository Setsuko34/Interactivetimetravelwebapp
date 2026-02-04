import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Calendar, MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

import imgParis from 'figma:asset/d8fe901dc308d8f6f4579fe191888ac45a5da035.png';
import imgCretace from 'figma:asset/d5f51606966379a323fdc80fe7898aa43747714e.png';
import imgFlorence from 'figma:asset/704e05320e814dfda7d6116688ade7225b5ec3e9.png';

const destinations = [
  {
    id: 1,
    title: 'Paris 1889',
    subtitle: 'La Belle Époque',
    era: 'XIXe siècle',
    image: imgParis,
    description: 'Découvrez Paris à l\'apogée de la Belle Époque',
    longDescription: 'Plongez dans l\'effervescence de l\'Exposition Universelle de 1889. Assistez à l\'inauguration de la Tour Eiffel, promenez-vous dans les boulevards haussmanniens, et vivez l\'âge d\'or de la culture parisienne. Rencontrez les grands artistes de l\'époque et savourez la gastronomie française dans toute sa splendeur.',
    highlights: [
      'Inauguration de la Tour Eiffel',
      'Exposition Universelle',
      'Cabarets de Montmartre',
      'Rencontre avec les Impressionnistes',
    ],
    price: '12,500€',
    duration: '7 jours',
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Crétacé -65M',
    subtitle: 'L\'Ère des Dinosaures',
    era: 'Préhistoire',
    image: imgCretace,
    description: 'Vivez une aventure préhistorique inoubliable',
    longDescription: 'Remontez 65 millions d\'années en arrière pour observer les derniers jours des dinosaures. Depuis nos capsules d\'observation sécurisées, admirez les Tyrannosaures, Tricératops et Ptérodactyles dans leur habitat naturel. Une expérience unique et scientifiquement fascinante.',
    highlights: [
      'Observation des T-Rex',
      'Forêts préhistoriques',
      'Capsule de sécurité ultra-protégée',
      'Guide paléontologue expert',
    ],
    price: '25,000€',
    duration: '5 jours',
    rating: 5.0,
  },
  {
    id: 3,
    title: 'Florence 1504',
    subtitle: 'La Renaissance Italienne',
    era: 'XVIe siècle',
    image: imgFlorence,
    description: 'Admirez les chefs-d\'œuvre de la Renaissance',
    longDescription: 'Visitez Florence au sommet de la Renaissance italienne. Rencontrez Michel-Ange au travail sur le David, explorez les ateliers des grands maîtres, et découvrez les secrets des Médicis. Une immersion totale dans l\'âge d\'or de l\'art et de la culture européenne.',
    highlights: [
      'Atelier de Michel-Ange',
      'Palais des Médicis',
      'Cathédrale Santa Maria del Fiore',
      'Marchés Renaissance',
    ],
    price: '15,800€',
    duration: '6 jours',
    rating: 4.8,
  },
];

export function DestinationsGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);

  return (
    <section id="destinations" ref={ref} className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl mb-4 text-foreground">
            Nos Destinations{' '}
            <span className="text-[#8B5CF6]">Temporelles</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choisissez parmi nos destinations phares et préparez-vous à vivre 
            l'expérience la plus extraordinaire de votre vie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-[#8B5CF6]/50 transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={destination.image}
                    alt={destination.title}
                    className="size-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#8B5CF6]/90 backdrop-blur-sm">
                    <span className="text-xs text-white">{destination.era}</span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl text-white mb-1">{destination.title}</h3>
                    <p className="text-sm text-white/80">{destination.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{destination.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-[#8B5CF6] text-[#8B5CF6]" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">À partir de</div>
                      <div className="text-2xl text-[#8B5CF6]">{destination.price}</div>
                    </div>
                    <Button
                      onClick={() => setSelectedDestination(destination)}
                      className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:opacity-90"
                    >
                      Découvrir
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedDestination && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-foreground">
                  {selectedDestination.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">
                  {selectedDestination.subtitle}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
                
                <div>
                  <h3 className="text-xl mb-2 text-foreground">Description</h3>
                  <p className="text-muted-foreground">{selectedDestination.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl mb-3 text-foreground">Points Forts</h3>
                  <ul className="space-y-2">
                    {selectedDestination.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="size-1.5 rounded-full bg-[#8B5CF6]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Prix par personne</div>
                    <div className="text-3xl text-[#8B5CF6]">{selectedDestination.price}</div>
                    <div className="text-sm text-muted-foreground">Durée: {selectedDestination.duration}</div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedDestination(null);
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:opacity-90"
                  >
                    Réserver maintenant
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
