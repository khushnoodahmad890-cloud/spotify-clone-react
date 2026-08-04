import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await login(form);

      showToast("Welcome back!", "success");

      navigate("/");

    } catch (err: any) {
      console.error(err);

      showToast(
        err.response?.data?.message ||
          "Login failed",
        "error"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-black
        via-neutral-900
        to-green-950
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-neutral-900/90
          backdrop-blur
          border
          border-neutral-800
          rounded-3xl
         shadow-2xl
         hover:shadow-green-500/10
         transition-all
         duration-300
          p-8
        "
      >
        <div className="flex justify-center mb-6">
          <div
            className="
              w-24
              h-24
              rounded-full
              bg-green-500
              flex
              items-center
              justify-center
            "
          >
            <Music2
              size={46}
              className="text-black"
            />
          </div>
        </div>

        <h1 className="text-4xl font-black text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-400 mt-3 mb-8">
          Sign in to continue listening on
          SPOTIFY.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="
                w-full
                bg-neutral-800
                border
                border-neutral-700
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-green-500
                focus:ring-2
                focus:ring-green-500/30
                transition
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="
                w-full
                bg-neutral-800
                border
                border-neutral-700
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-green-500
              "
            />
          </div>

          <button
            disabled={loading}
            className="
              w-full
              bg-green-500
              text-black
              font-bold
              py-3
              rounded-xl
              hover:bg-green-400
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Signing you in..."
              : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-500 hover:text-green-400 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}