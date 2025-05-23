import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useSignup } from "../hook/useSignup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { user, signup: updateUser } = useContext(AuthContext);

  const { loading, error, signup } = useSignup();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!loading) {
      e.preventDefault();
      const user = await signup(form.name, form.email, form.password);
      updateUser(user);
      console.debug(user.name);
      user && navigate("/home");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      {error && (
        <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 mb-2 font-medium"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 mb-2 font-medium"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 mb-2 font-medium"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
          Login
        </Link>
      </p>
    </div>
  );
}
