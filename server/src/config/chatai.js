import dotenv from 'dotenv';
import { tools } from '../tools/Tools.js';
dotenv.config();

export const apiKey = process.env.OPENROUTER_API_KEY
export const baseURL = process.env.OPENROUTER_BASE_URL
export const modelName = process.env.OPENROUTER_MODEL
export const systemPrompt = (process.env.AI_SYSTEM_PROMPT || '').replace('__TOOLS_DEFINITION__', JSON.stringify(tools))
