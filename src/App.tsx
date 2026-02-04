import { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { DestinationsGallery } from './components/DestinationsGallery';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';

export default function App() {
  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />
      
      <main>
        <HeroSection />
        <AboutSection />
        <DestinationsGallery />
        <BookingForm />
      </main>

      <Footer />
      <ChatBot />
      <Toaster position="top-center" />
    </div>
  );
}
