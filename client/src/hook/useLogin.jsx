import { useState } from "react";
import { loginUser } from "../service/userService";

export function useLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function login(email, password) {
    try {
      const user = await loginUser(email, password);
      return user;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { error, loading, login };
}
