import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ChatHeader from "./ui/ChatHeader.jsx";
import ChatBubble from "./ui/ChatBubble.jsx";
import InfoForm from "./ui/InfoForm.jsx";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      text: input,
      sender: "user",
      time: format(new Date(), "HH:mm"),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("https://chatbot-backend-production-03b4.up.railway.app/ask", { message: input });

      const botText = res.data.response;
      const botMsg = {
        text: botText,
        sender: "bot",
        time: format(new Date(), "HH:mm"),
      };
      setMessages((prev) => [...prev, botMsg]);

      // Example: trigger form when bot mentions "more info"
      if (botText.toLowerCase().includes("more information")) {
        setShowForm(true);
      }
    } catch (err) {
      setMessages((prev) => [...prev, {
        text: "⚠️ Something went wrong.",
        sender: "bot",
        time: format(new Date(), "HH:mm"),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto shadow-lg rounded-xl overflow-hidden border">
      <ChatHeader />

      <main className="flex-1 overflow-y-auto px-4 py-6 bg-white space-y-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} text={msg.text} sender={msg.sender} time={msg.time} />
        ))}
        {isTyping && (
          <ChatBubble text="Typing..." sender="bot" time={""} />
        )}
        {showForm && <InfoForm />}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-gray-50 border-t flex">
        <textarea
          className="flex-1 p-2 border rounded-xl resize-none"
          rows={1}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-red-700 text-white px-4 py-2 rounded-xl hover:bg-red-800"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
