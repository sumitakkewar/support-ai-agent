// hooks/useChatList.js
import { useContext, useEffect, useState } from "react";
import { fetchChats } from "../service/chatService";
import { AuthContext } from "../context/AuthContext";

export function useChatList(pageSize = 20) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const {
    user: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    fetchChats(token)
      .then(({ chats, hasMore }) => {
        setChats(chats);
        setHasMore(hasMore);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [page, pageSize, token]);

  function loadMore() {
    if (hasMore) setPage((prev) => prev + 1);
  }

  function updateChats(newChat) {
    setChats((prev) => [newChat, ...prev]);
  }

  return { chats, loading, error, updateChats, hasMore, loadMore };
}
