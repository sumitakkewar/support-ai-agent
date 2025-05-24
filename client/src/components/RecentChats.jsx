import React, { useContext, useState } from "react";
import ChatList from "./ChatList";
import useNewChat from "../hook/useNewChat";
import { useChatList } from "../hook/useChatList";
import { AuthContext } from "../context/AuthContext";

export default function RecentChats({ onNewChat, onSelectChat }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");
  const {
    chats,
    loading: chatListLoaing,
    error: chatListError,
    updateChats,
    hasMore,
    loadMore,
  } = useChatList();

  const {
    user: { token },
  } = useContext(AuthContext);

  const { createChat, loading, error } = useNewChat((newChat) => {
    updateChats(newChat);
    onSelectChat(newChat._id);
  });

  const handleCreateChat = async (e) => {
    e.preventDefault();
    if (newChatTitle.trim()) {
      setIsCreating(false);
      const newChat = await createChat(newChatTitle.trim(), token);
      if (!error) {
        onNewChat(newChat._id);
        setNewChatTitle("");
      }
    }
  };

  return (
    <div className="w-80 bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Recent Chats</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          New Chat
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateChat} className="mb-4">
          <input
            type="text"
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            placeholder="Enter chat title..."
            className="w-full px-3 py-2 border rounded mb-2"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setNewChatTitle("");
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <div className="p-4">Creating new chat...</div>}

      <ChatList
        onSelect={onSelectChat}
        chats={chats}
        loading={chatListLoaing}
        error={chatListError}
      />

      {hasMore && (
        <button
          className="mb-4 self-center text-sm text-blue-500 hover:underline"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
