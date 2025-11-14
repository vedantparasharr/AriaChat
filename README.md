# AriaChat 🤖💬

A friendly, conversational chatbot built with React and Google's Gemini AI. AriaChat features a clean, modern UI with persistent chat history and real-time responses.

## 🌐 Live Demo

Check out the live demo: [https://aria-chat-teal.vercel.app/](https://aria-chat-teal.vercel.app/)

## ✨ Features

- **AI-Powered Conversations** - Integrated with Google Gemini 2.0 Flash for intelligent responses
- **Persistent Chat History** - Conversations are saved locally and restored on reload
- **Real-time Typing Indicators** - Animated typing bubbles while the bot is thinking
- **Clean Modern UI** - iOS-inspired design with smooth animations
- **Keyboard Shortcuts** - Press Enter to send, Escape to clear input
- **Conversation Context** - Bot remembers the last 20 messages for contextual replies
- **New Chat Feature** - Start fresh conversations with one click

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vedantparasharr/AriaChat.git
cd AriaChat
```

2. Install dependencies:
```bash
npm install
```

3. Add your Gemini API key:
   - Open `src/components/ChatInput.jsx`
   - Replace the API_KEY value with your own key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Google Gemini AI** - Conversational AI model
- **CSS3** - Styling and animations
- **LocalStorage** - Chat history persistence

## 📁 Project Structure

```
AriaChat/
├── src/
│   ├── assets/
│   │   └── images/          # UI icons and avatars
│   ├── components/
│   │   ├── ChatInput.jsx    # Message input and send logic
│   │   ├── ChatInput.css
│   │   ├── ChatMessage.jsx  # Individual message bubble
│   │   ├── ChatMessage.css
│   │   ├── ChatMessages.jsx # Messages container
│   │   └── ChatMessages.css
│   ├── App.jsx              # Main app component
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Features Breakdown

### Chat History Persistence
Messages are automatically saved to localStorage and restored when you revisit the app.

### Contextual Conversations
The bot maintains context of the last 20 messages to provide relevant, coherent responses.

### Typing Indicators
Animated dots appear while the AI is processing your message, giving natural feedback.

### Responsive Design
Clean, mobile-friendly interface optimized for a 390x650 viewport.

## 🔧 Configuration

### Customizing the Bot Personality
Edit the system prompt in `ChatInput.jsx`:
```javascript
const systemPrompt = `
  You are a friendly, conversational chatbot...
  // Customize your bot's personality here
`;
```

### Adjusting Context Window
Change the number of messages remembered:
```javascript
const lastMessages = chatMessages
  .slice(-20)  // Change this number
  .map(m => `${m.sender === 'user' ? 'User ' : 'Assistant '}: ${m.message}`)
  .join("\n");
```

## 📝 Usage

1. Type your message in the input field
2. Press Enter or click the send button
3. Wait for Aria's response
4. Continue the conversation naturally
5. Click the "+" button to start a new chat

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vedant Parashar**
- GitHub: [@vedantparasharr](https://github.com/vedantparasharr)

## 🙏 Acknowledgments

- Google Gemini AI for powering the conversations
- React team for the amazing framework
- Icons from the project assets

---

Made with ❤️ while learning React
