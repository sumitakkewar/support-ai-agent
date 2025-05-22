import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import dotenv from 'dotenv';
import { AIChatStrategy } from './AIChatStrategy.js';
import { apiKey, baseURL, modelName, systemPrompt } from './../../config/chatai.js'
dotenv.config();


export class LangChainStrategy extends AIChatStrategy {
  constructor() {
    super();
    this.chatModel = new ChatOpenAI({
      apiKey,
      baseURL,
      modelName
    });
  }

  async getReply(userMessage) {
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userMessage),
    ];
    const response = await this.chatModel.invoke(messages);
    return response.content;
  }
}
