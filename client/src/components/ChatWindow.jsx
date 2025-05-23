import { useRef, useEffect, useState, useContext } from "react";
import ChatMessage from "./ChatMessage";
import usePaginatedMessages from "../hook/usePaginatedMessages";
import { getAIReply } from "../service/aiService";
import { AuthContext } from "../context/AuthContext";

function ChatWindow({ currentChat }) {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const {
    user: { token },
  } = useContext(AuthContext);

  const { messages, loading, hasMore, loadMore, appendMessages } =
    usePaginatedMessages(currentChat);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    // Call API to get AI reply
    const aiReply = await handleSendMessage(input);

    appendMessages(aiReply);
  }

  async function handleSendMessage(userMessage) {
    // Call your backend API which interacts with AI here
    try {
      const aiResponse = await getAIReply(currentChat, userMessage, token);
      return aiResponse;
    } catch (error) {
      console.error("AI Error:", error);
      return "Sorry, something went wrong.";
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
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;
