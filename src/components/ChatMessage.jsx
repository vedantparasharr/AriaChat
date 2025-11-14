import "./ChatMessage.css"

// ===== COMPONENT =====
export function ChatMessage({ message, sender }) {

  // ===== IF BOT IS TYPING =====
  if (sender === 'bot-loading') {
    return (
      <div className="typing-bubble">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    );
  }

  // ===== NORMAL MESSAGE =====
  return (
    <div className={sender === 'bot' ? "bot-message" : "user-message"}>
      {message}
    </div>
  )
}
