import { useRef, useEffect, useState, useContext } from "react";
import ChatMessage from "./ChatMessage";
import usePaginatedMessages from "../hook/usePaginatedMessages";
import { getAIReply } from "../service/aiService";
import { AuthContext } from "../context/AuthContext";

function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-4">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-sm text-gray-500">AI is typing...</span>
    </div>
  );
}

function ChatWindow({ currentChat }) {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const {
    user: { token },
  } = useContext(AuthContext);

  const { messages, loading, hasMore, loadMore, appendMessages } =
    usePaginatedMessages(currentChat);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      _id: Date.now().toString(),
      sender: "user",
      content: input,
      createdAt: new Date(),
    };

    appendMessages(userMsg);
    setInput("");
    setIsTyping(true);

    // Call API to get AI reply
    const aiReply = await handleSendMessage(input);
    setIsTyping(false);
    appendMessages(aiReply);
  }

  async function handleSendMessage(userMessage) {
    // Call your backend API which interacts with AI here
    try {
      const aiResponse = await getAIReply(currentChat, userMessage, token);
      return aiResponse;
    } catch (error) {
      console.error("AI Error:", error);
      return {
        _id: Date.now().toString(),
        sender: "ai",
        content: "Sorry, something went wrong.",
        createdAt: new Date(),
      };
    }
  }

  return (
    <div className="flex-1 flex flex-col border-r">
      {hasMore && (
        <button
          className="mb-4 self-center text-sm text-blue-500 hover:underline"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatMessage key={msg._id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex">
          <textarea
            type="text"
            className="flex-grow border rounded-l px-3 py-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r"
            disabled={isTyping}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;
