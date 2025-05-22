import { createAIChatStrategy } from "./AiChatFactory.js";


const aiChat = createAIChatStrategy();

export async function getAIReply(message) {
  return await aiChat.getReply(message);
}
