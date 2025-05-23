import { baseURL } from "../config/app";

export async function loginUser(email, password) {
    const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Login failed");
    }

    const data = await res.json();

    return data
}

export async function signupUser(name, email, password) {
    const res = await fetch(`${baseURL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Signup failed");
    }

    const data = await res.json();

    return data
}