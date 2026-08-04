import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    username: "",
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

      await register(form);

      showToast(
        "Account created! Please log in.",
        "success"
      );

      navigate("/login");

    } catch (err: any) {
      console.error(err);

      showToast(
        err.response?.data?.message ||
          "Registration failed",
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

        <p
          className="
            text-center
            text-green-500
            font-bold
            tracking-widest
            uppercase
            text-sm
            mb-2
          "
        >
          SPOTIFY
        </p>

        <h1 className="text-4xl font-black text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mt-3 mb-8">
          Join SPOTIFY and start listening to
          your favorite music.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
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
              placeholder="Create a password"
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
              ? "Creating your account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 hover:text-green-400 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}