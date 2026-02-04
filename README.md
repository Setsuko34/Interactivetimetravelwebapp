
  # Interactive Time Travel Webapp

  This is a code bundle for Interactive Time Travel Webapp. The original project is available at https://www.figma.com/design/RRAjnHe3Z2EIO0h7luu6qA/Interactive-Time-Travel-Webapp.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Groq IA Chatbot Configuration

  ### Quick Start

  1. **Get your Groq API Key**:
     - Visit https://console.groq.com/
     - Create an account or sign in
     - Click on "API keys" in the left menu
     - Click "Create New Secret Key"
     - Copy the generated API key

  2. **Configure your local environment**:
     - Open `.env.local` in the project root
     - Replace `gsk_YOUR_API_KEY_HERE` with your actual Groq API key:
     ```
     VITE_GROQ_API_KEY=gsk_your_actual_key_here
     ```

  3. **Start the Development Server**:
     ```bash
     npm run dev
     ```
     The chatbot will now use your Groq API key for intelligent responses.

  ### Environment Variables

  The project uses Vite's environment variable system. Variables prefixed with `VITE_` are available in the browser:

  - **VITE_GROQ_API_KEY**: Your Groq API key for the AI chatbot
    - Get it from: https://console.groq.com/
    - Required for chatbot functionality
    - Store it in `.env.local` (never commit this file)

  ### Features

  The AI chatbot uses **Groq's Llama-3.3-70b-versatile** model to provide intelligent, context-aware responses about:
  - TimeTravel Agency destinations (Paris 1889, Crétacé -65M, Florence 1504)
  - Booking information and pricing
  - Historical details about time periods
  - Personalized travel recommendations
  - Safety assurance and journey details
  - Natural conversation with conversation history

  ### How It Works

  - **Real-time AI Responses**: Leverages Groq's fast API for intelligent conversational AI
  - **Conversation History**: Maintains full context across multiple messages for coherent conversations
  - **Typing Indicators**: Shows loading state with animated dots while waiting for AI responses
  - **Error Handling**: Gracefully handles API errors with helpful user-friendly messages
  - **Fully Typed**: Complete TypeScript support for type safety
  - **Browser-Safe**: API calls work directly from the frontend with proper security

  ### Troubleshooting

  **Issue**: "VITE_GROQ_API_KEY non configurée"
  - **Solution**: Check that `.env.local` exists in the project root and contains your API key
  - Restart the dev server after adding the key
  - Ensure there are no spaces around the `=` sign in `.env.local`

  **Issue**: "Clé API Groq invalide ou expirée"
  - **Solution**: Verify your API key is correct on https://console.groq.com/
  - Generate a new key if the old one expired
  - Clear browser cache (Ctrl+Shift+Delete) and refresh

  **Issue**: "Erreur de connexion réseau"
  - **Solution**: Check your internet connection
  - Verify Groq API is not down: https://status.groq.com/
  - Try again in a few moments

  ## Architecture

  ### Overview
  
  Interactive Time Travel Webapp is a modern React application built with Vite, featuring a time-travel themed booking experience. The application is structured with a component-based architecture, utilizing Tailwind CSS for styling and Radix UI for accessible UI components.

  ### Tech Stack

  - **Framework**: React 18.3.1
  - **Build Tool**: Vite 6.3.5 with React SWC compiler for fast compilation
  - **Styling**: Tailwind CSS 4.1.3
  - **UI Components**: Radix UI (comprehensive accessible component library)
  - **Form Management**: React Hook Form 7.55.0
  - **Charts/Visualizations**: Recharts 2.15.2
  - **Carousel**: Embla Carousel React 8.6.0
  - **Notifications**: Sonner 2.0.3 (toast notifications)
  - **Theme Management**: Next Themes 0.4.6
  - **Icons**: Lucide React 0.487.0
  - **Date Picking**: React Day Picker 8.10.1
  - **AI/Chatbot**: Groq SDK - Llama-3.3-70b-versatile model for intelligent responses
  - **Utility Libraries**: clsx, class-variance-authority, tailwind-merge
  - **Accessibility**: Vaul (drawer primitives), Motion (animations)

  ### Project Structure

  ```
  src/
  ├── components/              # React components
  │   ├── AboutSection.tsx     # About/information section
  │   ├── BookingForm.tsx      # Main booking form component
  │   ├── ChatBot.tsx          # Interactive chatbot component
  │   ├── DestinationsGallery.tsx # Gallery of destinations
  │   ├── Footer.tsx           # Footer component
  │   ├── Header.tsx           # Navigation header
  │   ├── HeroSection.tsx      # Hero/banner section
  │   ├── figma/               # Figma-specific components
  │   │   └── ImageWithFallback.tsx # Image with fallback handling
  │   └── ui/                  # Reusable UI primitives (Radix UI based)
  │       ├── accordion.tsx
  │       ├── alert-dialog.tsx
  │       ├── avatar.tsx
  │       ├── badge.tsx
  │       ├── button.tsx
  │       ├── calendar.tsx
  │       ├── card.tsx
  │       ├── carousel.tsx
  │       ├── checkbox.tsx
  │       ├── dialog.tsx
  │       ├── dropdown-menu.tsx
  │       ├── form.tsx
  │       ├── input.tsx
  │       ├── select.tsx
  │       ├── sheet.tsx
  │       ├── tabs.tsx
  │       ├── textarea.tsx
  │       └── ... (other UI components)
  ├── styles/
  │   └── globals.css          # Global Tailwind CSS
  ├── assets/                  # Static images and media
  ├── App.tsx                  # Root component
  ├── main.tsx                 # Entry point
  └── index.css                # Tailwind CSS imports
  ```

  ### Key Features

  1. **Dark Mode by Default** - The app initializes with dark mode enabled via `next-themes`
  2. **Responsive Design** - Mobile-first approach using Tailwind CSS
  3. **Accessible Components** - Built on Radix UI primitives for WCAG compliance
  4. **Form Management** - React Hook Form for efficient form handling with validation
  5. **Interactive Elements** - Carousel, accordion, and collapsible components for rich UX
  6. **Toast Notifications** - Sonner for elegant notification system
  7. **Time Travel Theme** - Interactive experience centered around time travel concept

  ### Component Hierarchy

  ```
  App
  ├── Header
  ├── main
  │   ├── HeroSection
  │   ├── AboutSection
  │   ├── DestinationsGallery
  │   └── BookingForm
  ├── Footer
  ├── ChatBot
  └── Toaster (Sonner notifications)
  ```

  ### Build Configuration

  - **Output Directory**: `build/`
  - **Target**: ESNext (modern JavaScript)
  - **Dev Server Port**: 3000 (with auto-open in browser)
  - **Plugins**: 
    - `@vitejs/plugin-react-swc` for fast React compilation
  - **Path Aliases**: `@` maps to `src/` directory for cleaner imports

  ### Styling Approach

  - **Tailwind CSS v4.1.3**: Utility-first CSS framework
  - **CSS Variables**: Dark/light theme support via CSS variables
  - **Custom Components**: Tailored Radix UI components with Tailwind styling
  - **Responsive Classes**: Mobile-first, breakpoint-based design

  ### Development Workflow

  1. Start the dev server: `npm run dev`
  2. Components auto-reload with HMR (Hot Module Replacement)
  3. Build for production: `npm run build`
  4. Output is optimized and ready for deployment
  