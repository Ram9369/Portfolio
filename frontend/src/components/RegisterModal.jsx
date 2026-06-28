import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await register(name, email, password);
      if (res.success) {
        navigate("/login");
        onClose();
      } else {
        setError(res.message || "Registration failed.");
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
          <h3 className="text-2xl font-bold text-white">Create Account</h3>
          <p className="mt-1 text-sm text-slate-400">
            Join our community today
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="reg-name"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Full Name
            </label>
            <input
              id="reg-name"
              type="text"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="reg-email"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Email Address
            </label>
            <input
              id="reg-email"
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
              htmlFor="reg-password"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="reg-confirm-password"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Confirm Password
            </label>
            <input
              id="reg-confirm-password"
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold text-purple-400 hover:text-purple-300 hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
