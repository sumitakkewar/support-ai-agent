import { useState } from "react";
import RecentChats from "./RecentChats";
import ChatWindow from "./ChatWindow";

export default function ChatContainer() {
  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <RecentChats
        onNewChat={setActiveChatId}
        onSelectChat={setActiveChatId}
      />
      <ChatWindow currentChat={activeChatId} />
    </div>
  );
}
