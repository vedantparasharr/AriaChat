// ===== IMPORTS =====
import { useState, useEffect } from 'react'
import './App.css'
import newChatIcon from "./assets/images/add.png";
import botPFP from "./assets/images/bot.png"
import { ChatMessages } from './components/ChatMessages.jsx';
import { ChatInput } from "./components/ChatInput.jsx"

// ===== MAIN COMPONENT =====
function App() {

  // ===== STATES =====
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ===== LOAD CHAT HISTORY (on start only) =====
  useEffect(() => {
    const saved = localStorage.getItem('my-chat-history');
    if (saved) {
      setChatMessages(JSON.parse(saved));
    }
  }, []);

  // ===== SAVE CHAT HISTORY (every time chatMessages changes) =====
  useEffect(() => {
    localStorage.setItem('my-chat-history', JSON.stringify(chatMessages));
  }, [chatMessages])

  // ===== CLEAR CHAT =====
  function newChat() {
    setChatMessages([]);
    localStorage.removeItem('my-chat-history');
  }

  // ===== UI =====
  return (
    <div className="app-container">

      {/* HEADER BAR */}
      <div className="header-bar">
        <div className="header-info">
          <img className="header-avatar" src={botPFP} />
          <div className="header-name-card">
            <div className="header-name">Assistant</div>
            <div className="header-status">online</div>
          </div>
        </div>

        {/* NEW CHAT BUTTON */}
        <div>
          <button className="header-new-button" onClick={newChat}>
            <img src={newChatIcon} alt="new chat" />
          </button>
        </div>
      </div>

      {/* CHAT MESSAGES AREA */}
      <ChatMessages chatMessages={chatMessages} />

      {/* CHAT INPUT AREA */}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}

export default App
