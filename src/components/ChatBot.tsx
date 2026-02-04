import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, AlertCircle, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getChatbotResponse, createConversationMessage } from '../services/groqService';
import React from 'react';
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

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
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant TimeTravel. Comment puis-je vous aider à planifier votre voyage temporel ?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setConversationHistory((prev) => [...prev, createConversationMessage('user', inputValue)]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Obtenir la réponse de Groq
      const response = await getChatbotResponse(inputValue, conversationHistory);

      // Ajouter la réponse du bot
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setConversationHistory((prev) => [...prev, createConversationMessage('assistant', response)]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la communication avec le serveur';
      setError(errorMessage);

      // Afficher le message d'erreur dans le chat
      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `❌ ${errorMessage}`,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
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
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex gap-2"
                >
                  <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-500">{error}</p>
                </motion.div>
              )}

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

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="size-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                    <Loader className="size-4 text-[#8B5CF6] animate-spin" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl px-4 py-2 bg-muted">
                    <div className="flex gap-1">
                      <div className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

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
