import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(false);

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-black/80">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-white/20 hover:text-white"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
          <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="font-semibold text-purple-400 hover:text-purple-300 hover:underline"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
