import dotenv from 'dotenv';
dotenv.config();

export const apiKey = process.env.OPENROUTER_API_KEY
export const baseURL = process.env.OPENROUTER_BASE_URL
export const modelName = process.env.OPENROUTER_MODEL
export const systemPrompt = process.env.AI_SYSTEM_PROMPT
