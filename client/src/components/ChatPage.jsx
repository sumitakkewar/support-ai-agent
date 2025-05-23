import { useNavigate } from "react-router";
import ChatContainer from "./ChatContiner";
import Header from "./Header";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ChatPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Check if user data is loaded from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signup");
    }
  }, [user, navigate]);

  // Show nothing while checking authentication
  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <ChatContainer />
    </>
  );
}
