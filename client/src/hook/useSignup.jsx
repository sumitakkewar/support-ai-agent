import { useState } from "react";
import { signupUser } from "../service/userService";

export function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function signup(name, email, password) {
    try {
      const user = await signupUser(name, email, password);
      return user;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { error, loading, signup };
}
