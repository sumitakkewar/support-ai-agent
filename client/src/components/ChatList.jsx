import { useState } from "react";

export default function ChatList({ onSelect, chats, loading, error }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) return <div className="p-4">Loading chats...</div>;
  if (error)
    return <div className="p-4 text-red-500">Failed to load chats</div>;

  return (
    <div className="h-full overflow-auto">
      <ul>
        {chats.map((chat) => (
          <li key={chat._id} className="mb-2">
            <button
              onClick={() => {
                onSelect(chat._id);
                setSelectedItem(chat._id);
              }}
              className={`w-full text-left p-2 bg-gray-100 shadow rounded hover:bg-gray-300 ${
                chat._id === selectedItem && "bg-gray-300"
              }`}
            >
              {chat.title || "Untitled Chat"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
