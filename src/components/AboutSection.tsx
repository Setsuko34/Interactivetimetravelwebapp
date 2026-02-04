import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Shield, Clock, Award, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Sécurité Maximale',
    description: 'Nos capsules temporelles sont certifiées et garantissent votre retour en toute sécurité.',
  },
  {
    icon: Clock,
    title: 'Précision Temporelle',
    description: 'Technologie de pointe pour une précision à la seconde près dans vos voyages.',
  },
  {
    icon: Award,
    title: 'Expérience Premium',
    description: 'Des guides experts et des services de luxe pour une immersion totale.',
  },
  {
    icon: Users,
    title: 'Accompagnement Personnalisé',
    description: 'Chaque voyage est unique et adapté à vos envies et votre profil.',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
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
            Pourquoi Choisir{' '}
            <span className="text-[#8B5CF6]">TimeTravel Agency</span> ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pionniers du voyage temporel depuis 2145, nous sommes la première agence 
            certifiée à vous offrir une expérience authentique et sécurisée à travers les époques.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-[#8B5CF6]/50 transition-all duration-300">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-[#8B5CF6]/10 group-hover:bg-[#8B5CF6]/20 transition-colors">
                  <feature.icon className="size-6 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                initial={false}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/10 via-[#A855F7]/10 to-[#8B5CF6]/10 border border-[#8B5CF6]/20"
        >
          {[
            { value: '50K+', label: 'Voyageurs Satisfaits' },
            { value: '127', label: 'Destinations Temporelles' },
            { value: '100%', label: 'Taux de Retour' },
            { value: '24/7', label: 'Support Temporel' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl mb-2 text-[#8B5CF6]">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
