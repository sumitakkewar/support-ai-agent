import { useState } from "react";
import ChatWindow from "./ChatWindow";
import RecentChats from "./RecentChats";

export default function ChatContainer({ onSendMessage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState(null);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Call API to get AI reply
    const aiReply = await onSendMessage(input);

    const aiMsg = {
      id: (Date.now() + 1).toString(),
      sender: "ai",
      text: aiReply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);
  }

  const handleNewChat = (title) => {
    setCurrentChat({
      id: Date.now().toString(),
      title,
      createdAt: new Date(),
    });
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <RecentChats onNewChat={handleNewChat} />
      <ChatWindow
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        currentChat={currentChat}
      />
    </div>
  );
}
