export default function ChatBubble({ text, sender, time }) {
    const isUser = sender === "user";
  
    const bubbleStyles = isUser
      ? "bg-red-700 text-white rounded-2xl rounded-br-none"
      : "bg-red-100 text-gray-900 rounded-2xl rounded-bl-none";
  
    const avatar = isUser
      ? "https://cdn-icons-png.flaticon.com/512/847/847969.png" // user icon
      : "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"; // bot icon
  
    return (
      <div className={`flex items-start mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
        {!isUser && (
          <img src={avatar} className="w-8 h-8 mr-2 rounded-full border" alt="Bot" />
        )}
        <div className={`max-w-[75%] px-4 py-2 ${bubbleStyles}`}>
          <p>{text}</p>
          <p className="text-xs text-right mt-1 text-gray-500">{time}</p>
        </div>
        {isUser && (
          <img src={avatar} className="w-8 h-8 ml-2 rounded-full border" alt="You" />
        )}
      </div>
    );
  }
  