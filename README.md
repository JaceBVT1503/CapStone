# Role Prompting AI Experiment Platform

## Project Overview

This is a research platform designed to study how providing AI assistants with specific roles affects user perception and interaction quality. The experiment requires participants to complete two tasks using an AI chatbot assistant. For one of the tasks, the AI is randomly assigned a specific role (e.g., tutor, colleague, expert), while the other task has a neutral AI assistant. The platform includes features for highlighting and annotating important parts of the conversation for research analysis.

## Features

- **Two-Task Experiment**: Participants complete two distinct tasks with AI assistance
- **Random Role Assignment**: One task randomly assigns a role to the AI assistant to test the effect on user perception
- **Interactive Chat Interface**: Real-time conversation with AI powered by OpenAI GPT or Google Gemini
- **Text Highlighting & Annotation**: Participants can highlight parts of the conversation and add comments for research purposes
- **Study Tracking**: Participant data and chat history stored in Supabase database
- **Responsive UI**: Clean, intuitive interface built with Next.js and React

## Prerequisites

Before running this project, you'll need:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **API Keys**:
  - OpenAI API key (for GPT models) OR Google Gemini API key
  - Supabase project credentials (database URL and anon key)
- **Environment Variables**: A `.env.local` file with API keys (see Configuration below)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CapStone
cd my-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

The repository includes a `.env.local` file in the `my-app` directory with the necessary API key configuration. No additional setup is required to run the application.

If you need to use different API keys or providers, you can modify the `.env.local` file:

```env
# Choose ONE AI provider
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
# OR
NEXT_PUBLIC_GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can obtain these keys from:
- **OpenAI**: https://platform.openai.com/account/api-keys
- **Google Gemini**: https://aistudio.google.com/apikey
- **Supabase**: Your Supabase project dashboard

### 4. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`. Open this URL in your browser to access the platform.

## Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Project Structure

```
my-app/
├── src/
│   ├── app/              # Next.js app directory with pages and API routes
│   │   ├── api/          # Backend API routes (chat, backend endpoints)
│   │   ├── components/   # React components (StudyWizard, ChatSection, etc.)
│   │   └── page.tsx      # Main experiment page
│   ├── lib/              # Utility functions and contracts
│   │   ├── chatContract.ts    # Chat API interface
│   │   ├── prompts.ts         # AI role prompts and configurations
│   │   ├── types.ts           # TypeScript type definitions
│   │   └── useHighlights.ts   # Custom hook for highlighting feature
│   ├── store/            # Zustand store for state management
│   ├── utils/            # Helper utilities
│   └── public/           # Static assets
└── package.json          # Project dependencies and scripts
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm start` - Run production build
- `npm run lint` - Run ESLint to check code quality

### Technologies Used

- **Next.js 16** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Supabase** - Database and authentication
- **OpenAI / Google Gemini** - AI model providers
- **Zustand** - State management
- **ESLint** - Code linting

## Third-Party APIs & Libraries

### Production Dependencies

| Library/API | Version | Purpose |
|---|---|---|
| **next** | 16.1.7 | Core React framework providing server-side rendering, API routes, and optimized production builds |
| **react** | 19.2.3 | UI library for building interactive components and managing component state |
| **react-dom** | 19.2.3 | React package for rendering components to the browser DOM |
| **@openai/openai** | 6.32.0 | Official OpenAI API client for accessing GPT models (language generation for AI assistant responses) |
| **@google/genai** | 1.46.0 | Google Gemini API client for accessing Google's generative AI models (alternative AI provider) |
| **@supabase/supabase-js** | 2.99.2 | Supabase JavaScript client for database operations, real-time features, and backend services (stores participant data, chat history, and study responses) |
| **zustand** | 5.0.12 | Lightweight state management library for managing global application state (participant info, chat state, study progress) |

### Development Dependencies

| Library | Version | Purpose |
|---|---|---|
| **@types/react** | 19.2.14 | TypeScript type definitions for React components and hooks |
| **eslint** | 9 | JavaScript linter for code quality and style consistency |
| **eslint-config-next** | 16.1.6 | ESLint configuration tailored for Next.js projects |

### External Services & APIs

| Service | Purpose | Required Setup |
|---|---|---|
| **OpenAI API** | Powers the AI assistant with GPT language models for chat responses | Requires API key from https://platform.openai.com/account/api-keys |
| **Google Gemini API** | Alternative AI provider using Google's generative models | Requires API key from https://aistudio.google.com/apikey |
| **Supabase** | Backend database and services for storing participant data, chat history, and experiment responses | Requires Supabase project URL and anonymous key from Supabase dashboard |
