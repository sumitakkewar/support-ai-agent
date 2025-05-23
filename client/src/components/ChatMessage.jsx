import Markdown from "react-markdown";

export default function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`w-full px-4 py-2 ${
          isUser ? "text-right" : "text-left"
        } text-gray-900 border-b-2 border-gray-400`}
      >
        {/* <p>{message.content}</p> */}
        <Markdown>{message.content}</Markdown>
        <span className="text-xs text-gray-500 block mt-1">
          {new Date(message.createdAt).toLocaleDateString()}{" "}
          {new Date(message.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
