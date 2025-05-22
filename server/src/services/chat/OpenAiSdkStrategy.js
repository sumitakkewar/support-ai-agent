import OpenAI from 'openai';
import dotenv from 'dotenv';
import { AIChatStrategy } from './AIChatStrategy.js';
import { apiKey, baseURL, modelName, systemPrompt } from './../../config/chatai.js'
import { siteName, siteUrl } from '../../config/app.js';
dotenv.config();


export class OpenAISdkStrategy extends AIChatStrategy {
  constructor() {
    super();
    this.openai = new OpenAI({
      apiKey,
      baseURL,
      defaultHeaders: {
        'HTTP-Referer': siteUrl,
        'X-Title': siteName,
      },
    });
  }

  async getReply(userMessage) {
    const completion = await this.openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
    });
    return completion.choices?.[0]?.message?.content || 'No response';
  }
}
