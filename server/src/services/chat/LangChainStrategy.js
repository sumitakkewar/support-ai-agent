import { AIChatStrategy } from './AIChatStrategy.js';
export class LangChainStrategy extends AIChatStrategy {
  constructor() {
    super();
  }

  async getReply(userId, previousMessages) {
    return "Implment Langchain logi";
  }
}
