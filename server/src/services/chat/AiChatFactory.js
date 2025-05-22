import { LangChainStrategy } from "./LangChainStrategy.js";
import { OpenAISdkStrategy } from "./OpenAiSdkStrategy.js";


export function createAIChatStrategy() {
  const strategyType = process.env.AI_CHAT_IMPL || 'sdk'; // default to SDK

  switch (strategyType) {
    case 'langchain':
      return new LangChainStrategy();
    default:
      return new OpenAISdkStrategy();
  }

}
