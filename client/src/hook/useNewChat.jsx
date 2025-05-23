import { useState } from "react";
import { createNewChat } from "../service/chatService";

export default function useNewChat(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createChat = async (title, token) => {
    setLoading(true);
    setError(null);
    try {
      const newChat = await createNewChat(title, token);
      onSuccess?.(newChat);
      return newChat;
    } catch (err) {
      setError(err.message || "Failed to create chat");
    } finally {
      setLoading(false);
    }
  };

  return { createChat, loading, error };
}
