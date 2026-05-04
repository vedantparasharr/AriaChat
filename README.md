# AriaChat

AriaChat is a lightweight React chat interface powered by OpenRouter.
It includes message persistence, typing feedback, and a clean mobile-first layout.
  
## Live Demo
  
https://aria-chat-teal.vercel.app/

## Features

- Real-time chat UI with user and assistant message bubbles
- Assistant typing indicator while responses are loading
- Local chat history persistence using browser localStorage
- New chat action to clear conversation state
- Keyboard shortcuts:
  - Enter: send message
  - Escape: clear current input
- Context-aware prompting (includes recent messages)

## Tech Stack

- React 19 
- Vite 6
- OpenRouter Chat Completions API
- Plain CSS modules per component

## Project Structure

```text
AriaChat/
  public/
  src/
    assets/
      images/
    components/
      ChatInput.jsx
      ChatInput.css
      ChatMessage.jsx
      ChatMessage.css
      ChatMessages.jsx
      ChatMessages.css
    App.jsx
    App.css
    index.css
    main.jsx
  index.html
  package.json
  vite.config.js
  eslint.config.js
  README.md
```

## Prerequisites

- Node.js 18+
- npm
- An OpenRouter API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
VITE_API_KEY=your_openrouter_api_key_here
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## How It Works

- `App.jsx` manages global chat state and persistence:
  - Loads saved messages from localStorage key `my-chat-history`
  - Saves updates back to localStorage
  - Clears history when starting a new chat
- `ChatInput.jsx` handles:
  - User input state
  - Request lifecycle (loading state)
  - Building prompt context from the recent conversation
  - Calling OpenRouter with model `openai/gpt-4o-mini`
- `ChatMessages.jsx` renders the message list and auto-scrolls to the latest message
- `ChatMessage.jsx` renders either:
  - Regular user/bot message bubbles
  - Animated typing indicator for `bot-loading`

## Environment Variables

- `VITE_API_KEY`: OpenRouter bearer token used in request headers

Notes:

- Vite only exposes variables prefixed with `VITE_` to client code.
- Do not commit your `.env` file or API keys.

## API Request Details

The app sends requests to:

- `POST https://openrouter.ai/api/v1/chat/completions`

Current request configuration in code:

- Model: `openai/gpt-4o-mini`
- Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`

## Troubleshooting

- 401 Unauthorized:
  - Confirm `VITE_API_KEY` is set correctly
  - Restart dev server after editing `.env`
- No response or error fallback message:
  - Check browser DevTools Network tab for API error payload
  - Verify your OpenRouter key is active and has available credits
- Old messages keep appearing:
  - Click the new chat button or clear localStorage for `my-chat-history`

## Security Notes

This project currently calls the API directly from the client.
For production apps, proxy requests through a backend to keep secrets off the client whenever possible.

## License

MIT
