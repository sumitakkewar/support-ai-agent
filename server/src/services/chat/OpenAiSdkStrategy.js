import OpenAI from 'openai';
import { AIChatStrategy } from './AIChatStrategy.js';
import { apiKey, baseURL, modelName, systemPrompt } from './../../config/chatai.js'
import { siteName, siteUrl } from '../../config/app.js';
import { customerReportTools } from '../../tools/customerTools.js';
import { executeToolCall } from '../../tools/toolExecutor.js';
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

    const TOOL_CALL_PREFIX = 'TOOL_CALL:';

    const response = await this.openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ]
    });

    if (response.error) {
      console.log({ response })
      throw new AppError("something went wrong")
    }

    const choice = response.choices[0];
    const message = choice.message.content || ''

    for (let i = 0; i < response.choices.length; i++) {
      const cho = response.choices[i];
      console.log({ cho }, "choice " + i)
    }


    if (message.startsWith(TOOL_CALL_PREFIX)) {
      const [_, toolNameLine, ...rest] = message.split('\n');
      const toolName = toolNameLine.trim().replace(TOOL_CALL_PREFIX, '').trim();
      const toolPayload = rest.join('\n');

      const tool = customerReportTools.find(t => t.type && t.function.name === toolName);
      if (!tool) return `Tool ${toolName} not found`;

      const result = await executeToolCall({
        name: tool, arguments: JSON.stringify(toolPayload)
      }, userId);

      const responseNew = await this.getReply(
        userId,
        [
          ...messages,
          choice.message,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: result.toString()
          }
        ]
      )
      return responseNew.choices[0].message.content;
    }

    return choice.message.content || 'No response';
  }
}
