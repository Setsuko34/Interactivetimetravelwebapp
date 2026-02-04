import Groq from 'groq-sdk';

// Initialiser le client Groq avec la clé API depuis les variables d'environnement
const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  console.warn(
    '⚠️ VITE_GROQ_API_KEY non configurée. ' +
    'Veuillez:\n' +
    '1. Aller sur https://console.groq.com/\n' +
    '2. Générer une clé API\n' +
    '3. Ajouter "VITE_GROQ_API_KEY=votre_clé" dans le fichier .env.local\n' +
    '4. Redémarrer le serveur de développement'
  );
}

const groq = new Groq({
  apiKey: apiKey || 'placeholder_key',
  dangerouslyAllowBrowser: true, // Permettre l'utilisation en frontend
});

// Contexte système pour le chatbot TimeTravel
const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe premium.

Caractéristiques de ta personnalité:
- Ton professionnel mais chaleureux
- Passionné d'histoire et de voyages
- Enthousiaste sans être trop familier
- Toujours courtois et bienveillant
- Expert en expériences temporelles

Destinations disponibles:
1. Paris 1889 - La Belle Époque (12,500€ - 7 jours)
   - Inauguration de la Tour Eiffel
   - Exposition Universelle
   - Cabarets de Montmartre
   - Rencontres avec les artistes de l'époque

2. Crétacé -65M - L'Ère des Dinosaures (25,000€ - 5 jours)
   - Observation des T-Rex et Tricératops
   - Exploration des forêts préhistoriques
   - Capsules ultra-sécurisées
   - Expérience de la nature sauvage

3. Florence 1504 - Renaissance Italienne (15,800€ - 6 jours)
   - Rencontre avec Michel-Ange
   - Palais des Médicis
   - Cathédrale de Florence
   - Immersion dans l'art et la culture

Informations importantes:
- Tous les voyages incluent accompagnement d'experts, hébergement premium
- Garantie de retour à 100%
- Sécurité certifiée avec technologie de pointe
- Assurance voyage complète incluse

Ton rôle:
- Aider les clients à choisir leur destination
- Répondre aux questions sur les détails des voyages
- Recommander basé sur les intérêts du client
- Rassurer sur la sécurité
- Diriger vers la réservation quand approprié
- Partager des anecdotes intéressantes sur les périodes historiques

Conseil: Sois naturel, engage une véritable conversation, pose des questions pour mieux comprendre les envies du client.`;

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function getChatbotResponse(
  userMessage: string,
  conversationHistory: ConversationMessage[] = []
): Promise<string> {
  try {
    // Construire l'historique des messages
    // Si c'est le premier message, ajouter le prompt système au début
    let messages: ConversationMessage[] = conversationHistory;

    if (conversationHistory.length === 1) {
      // Premier message - ajouter le contexte système en premier
      messages = [
        {
          role: 'user',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'assistant',
          content:
            'Compris ! Je suis l\'assistant TimeTravel Agency. Je suis prêt à vous aider avec vos questions sur nos destinations temporelles. Comment puis-je vous assister aujourd\'hui ?',
        },
        ...conversationHistory,
      ];
    }

    // Ajouter le nouveau message utilisateur
    messages = [
      ...messages,
      {
        role: 'user',
        content: userMessage,
      },
    ];

    // Appel à l'API Groq (SANS le paramètre 'system')
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile', // Modèle moderne et performant (mixtral est décommissionné)
      temperature: 0.7, // Créativité modérée pour des réponses naturelles
      max_tokens: 1024, // Limiter la longueur des réponses
    });

    // Extraire la réponse
    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('Pas de réponse reçue de Groq');
    }

    return response;
  } catch (error) {
    console.error('Erreur Groq API:', error);

    // Message de fallback en cas d'erreur
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('401')) {
        throw new Error(
          '🔑 Clé API Groq invalide. ' +
          'Veuillez vérifier votre clé API sur https://console.groq.com/'
        );
      }
      if (error.message.includes('unsupported')) {
        throw new Error(
          '⚠️ Erreur de configuration API. ' +
          'Le serveur Groq a rejeté la requête.'
        );
      }
      if (error.message.includes('network') || error.message.includes('Network')) {
        throw new Error(
          '🌐 Erreur de connexion réseau. Vérifiez votre connexion Internet.'
        );
      }
    }

    throw error;
  }
}

export function createConversationMessage(
  role: 'user' | 'assistant',
  content: string
): ConversationMessage {
  return { role, content };
}
