// ===== IMPORTS =====
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage.jsx";
import "./ChatMessages.css"

// ===== COMPONENT =====
export function ChatMessages({ chatMessages }) {

  // ===== REF TO SCROLL AREA =====
  const chatMessagesRef = useRef(null);

  // ===== AUTO SCROLL TO BOTTOM WHEN NEW MESSAGE =====
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages])

  // ===== UI =====
  return (
    <div className="chat-area" ref={chatMessagesRef}>

      {/* LOOP ALL MESSAGES */}
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        )
      })}

    </div>
  )
}
