import { createAIChatStrategy } from "./AiChatFactory.js";

const aiChat = createAIChatStrategy();

export async function getAIReply(userId, message) {
  return await aiChat.getReply(userId, message);
}
