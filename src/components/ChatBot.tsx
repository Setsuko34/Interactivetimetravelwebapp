import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Personality and knowledge base for the chatbot
const chatbotKnowledge = {
  personality: `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
  Ton ton est professionnel mais chaleureux, passionné d'histoire, toujours enthousiaste sans être trop familier.`,
  
  destinations: {
    'paris 1889': {
      name: 'Paris 1889 - La Belle Époque',
      price: '12,500€',
      duration: '7 jours',
      highlights: 'Tour Eiffel, Exposition Universelle, Cabarets de Montmartre',
    },
    'crétacé': {
      name: 'Crétacé -65M - L\'Ère des Dinosaures',
      price: '25,000€',
      duration: '5 jours',
      highlights: 'T-Rex, Tricératops, Forêts préhistoriques',
    },
    'florence 1504': {
      name: 'Florence 1504 - Renaissance Italienne',
      price: '15,800€',
      duration: '6 jours',
      highlights: 'Michel-Ange, Palais des Médicis, Cathédrale',
    },
  },
};

// Simple response generation
const generateResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  // Greetings
  if (message.match(/bonjour|salut|hello|hi|hey/)) {
    return "Bonjour ! 👋 Bienvenue chez TimeTravel Agency. Je suis ravi de vous accompagner dans la découverte de nos destinations temporelles. Comment puis-je vous aider aujourd'hui ?";
  }

  // Paris 1889
  if (message.match(/paris|1889|belle époque|tour eiffel/)) {
    return `🗼 Paris 1889 est une destination extraordinaire ! Vous vivrez l'effervescence de l'Exposition Universelle et assisterez à l'inauguration de la Tour Eiffel. Prix: ${chatbotKnowledge.destinations['paris 1889'].price} pour ${chatbotKnowledge.destinations['paris 1889'].duration}. Points forts: ${chatbotKnowledge.destinations['paris 1889'].highlights}. Souhaitez-vous en savoir plus ?`;
  }

  // Crétacé
  if (message.match(/crétacé|dinosaure|préhistoire|t-rex|tyrannosaure/)) {
    return `🦕 Le Crétacé est notre destination la plus spectaculaire ! Observez les dinosaures dans leur habitat naturel depuis nos capsules ultra-sécurisées. Prix: ${chatbotKnowledge.destinations['crétacé'].price} pour ${chatbotKnowledge.destinations['crétacé'].duration}. Une expérience unique garantie à 100% !`;
  }

  // Florence 1504
  if (message.match(/florence|renaissance|michel-ange|italie|art/)) {
    return `🎨 Florence 1504 vous plongera au cœur de la Renaissance italienne ! Rencontrez Michel-Ange et découvrez les chefs-d'œuvre de l'époque. Prix: ${chatbotKnowledge.destinations['florence 1504'].price} pour ${chatbotKnowledge.destinations['florence 1504'].duration}. Parfait pour les amateurs d'art et d'histoire !`;
  }

  // Prices
  if (message.match(/prix|tarif|coût|combien/)) {
    return "💰 Nos tarifs varient selon la destination:\n- Paris 1889: 12,500€\n- Crétacé -65M: 25,000€\n- Florence 1504: 15,800€\n\nTous nos voyages incluent l'accompagnement d'experts, l'hébergement premium et la garantie de retour à 100% !";
  }

  // Recommendations based on interests
  if (message.match(/recommand|conseill|choisir|meilleur|quel/)) {
    return "🤔 Je serais ravi de vous conseiller ! Que recherchez-vous ?\n- Pour l'art et la culture: Florence 1504\n- Pour l'élégance et le raffinement: Paris 1889\n- Pour l'aventure et la nature: Crétacé -65M\n\nQuel type d'expérience vous attire le plus ?";
  }

  // Safety
  if (message.match(/sécurité|sûr|danger|risque/)) {
    return "🛡️ La sécurité est notre priorité absolue ! Nos capsules temporelles sont certifiées avec un taux de retour de 100%. Nos guides experts vous accompagnent à chaque instant. Technologie de pointe garantissant précision et protection maximale.";
  }

  // Booking
  if (message.match(/réserv|book|partir|voyage/)) {
    return "📅 Excellent ! Pour réserver, vous pouvez utiliser notre formulaire de réservation sur cette page. Notre équipe vous contactera sous 24h pour finaliser votre voyage temporel. Des questions sur une destination en particulier ?";
  }

  // Duration
  if (message.match(/durée|combien de temps|jours/)) {
    return "⏰ Nos voyages durent entre 5 et 7 jours selon la destination:\n- Paris 1889: 7 jours\n- Crétacé -65M: 5 jours\n- Florence 1504: 6 jours\n\nChaque itinéraire est soigneusement optimisé pour une expérience complète !";
  }

  // Default response
  return "Je suis là pour vous aider à choisir votre destination temporelle idéale ! Je peux vous renseigner sur:\n- Nos 3 destinations (Paris 1889, Crétacé -65M, Florence 1504)\n- Les prix et durées de voyage\n- La sécurité de nos voyages\n- Des recommandations personnalisées\n\nQue souhaitez-vous savoir ?";
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant TimeTravel. Comment puis-je vous aider à planifier votre voyage temporel ?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Generate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white">Assistant TimeTravel</h3>
                  <p className="text-xs text-white/70">En ligne</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="size-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="size-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="size-4 text-[#8B5CF6]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/60' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="size-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez-moi vos questions..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:opacity-90"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] shadow-lg flex items-center justify-center group relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="size-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="size-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Dot */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 right-0 size-3 bg-red-500 rounded-full border-2 border-background"
          />
        )}
      </motion.button>
    </div>
  );
}
