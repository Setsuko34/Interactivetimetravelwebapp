import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function HeroSection() {
  const scrollToDestinations = () => {
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1693645557367-630f7df75f4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHRpbWUlMjB0cmF2ZWwlMjBwb3J0YWx8ZW58MXx8fHwxNzcwMjEyNDcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Time Portal"
            className="size-full object-cover"
          />
        </div>
        
        {/* Animated Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-1 bg-[#8B5CF6] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30"
          >
            <Sparkles className="size-4 text-[#8B5CF6]" />
            <span className="text-sm text-[#8B5CF6]">Voyagez à travers les époques</span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-foreground via-[#8B5CF6] to-foreground bg-clip-text text-transparent"
        >
          Explorez l'Histoire
          <br />
          <span className="text-[#A855F7]">Comme Jamais Auparavant</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          TimeTravel Agency vous propose des voyages uniques à travers le temps. 
          De la Belle Époque parisienne à l'ère des dinosaures, vivez l'aventure de votre vie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToDestinations}
            size="lg"
            className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:opacity-90 text-lg px-8"
          >
            Découvrir les destinations
          </Button>
          <Button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            variant="outline"
            className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
          >
            En savoir plus
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
            onClick={scrollToDestinations}
          >
            <span className="text-sm">Scrollez pour découvrir</span>
            <ArrowDown className="size-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
