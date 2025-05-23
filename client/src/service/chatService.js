import { baseURL } from "../config/app";

export async function fetchChats(token) {
    const res = await fetch(`${baseURL}/chat`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to fetch chats');
    return res.json();
}

export async function fetchMessagesByChatId(chatId, page = 1, limit = 20, token) {
    const response = await fetch(`${baseURL}/chat/${chatId}/message?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch messages');
    }

    return response.json();
}

export async function createNewChat(title, token) {
    const res = await fetch(`${baseURL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title }),
    });
    return res.json();
}

