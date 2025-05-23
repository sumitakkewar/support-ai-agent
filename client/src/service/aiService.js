import { baseURL } from "../config/app";

export async function getAIReply(chatId, userMessage, token) {
    const res = await fetch(`${baseURL}/chat/${chatId}/message`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: userMessage }),
    });

    if (!res.ok) {
        throw new Error('Failed to get AI reply');
    }

    const data = await res.json();
    return data;
}
