import OpenAI from 'openai';
import { AIChatStrategy } from './AIChatStrategy.js';
import { apiKey, baseURL, modelName, systemPrompt } from './../../config/chatai.js'
import { siteName, siteUrl } from '../../config/app.js';
import { toolFunctionMap } from '../../tools/customerTools.js';
import AppError from '../../utils/AppError.js';

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

  async getReply(userId, messages) {

    const response = await this.openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      response_format: {
        type: 'json_object'
      }
    });

    if (response.error) {
      console.log({ response })
      console.error({ error: response.error })
      console.error({ metadata: response.error.metadata })
      throw new AppError("something went wrong")
    }

    const choice = response.choices[0];
    let parsedContent = choice.message.content || '';

    console.debug("choice", { choice })

    if (typeof parsedContent === 'string') {
      try {
        const parsed = JSON.parse(parsedContent);
        if (parsed.type === 'chat' && parsed.content) {
          parsedContent = parsed.content;
        } else {
          parsedContent = parsed;
        }
      } catch (error) {
        console.error({ error })
      }
    }

    if (parsedContent.type === 'function') {
      const toolName = parsedContent.function;
      const toolPayload = parsedContent.input;

      const tool = toolFunctionMap[toolName];
      if (!tool) return `Tool ${toolName} not found`;

      const result = await tool({ ...toolPayload, userId })

      const responseNew = await this.getReply(
        userId,
        [
          ...messages,
          {
            role: 'assistant',
            content: choice.message.content
          },
          {
            role: "assistant",
            content: "Tools Response:" + result.toString()
          }
        ]
      );
      return responseNew;
    }

    if (parsedContent.type === 'chat') {
      return parsedContent;
    }

    return parsedContent
  }
}
