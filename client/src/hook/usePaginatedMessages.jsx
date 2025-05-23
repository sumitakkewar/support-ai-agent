import { useContext, useEffect, useState } from "react";
import { fetchMessagesByChatId } from "../service/chatService";
import { AuthContext } from "../context/AuthContext";

export default function usePaginatedMessages(chatId, pageSize = 20) {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    user: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    setMessages([]);
    setPage(1);
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;

    setLoading(true);
    fetchMessagesByChatId(chatId, page, pageSize, token)
      .then((res) => {
        if (page === 1) {
          setMessages(res.messages.reverse());
        } else {
          setMessages((prev) => [...res.messages.reverse(), ...prev]);
        }
        setHasMore(res.hasMore);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [chatId, page, pageSize, token]);

  function loadMore() {
    if (hasMore) setPage((prev) => prev + 1);
  }

  function appendMessages(newMessages) {
    setMessages((prev) => [...prev, newMessages]);
  }

  return { messages, loading, hasMore, loadMore, appendMessages };
}
