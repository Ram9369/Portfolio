import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setLocalError("");

    try {
      const res = await login(email, password);

      if (res.success) {
        navigate("/");
      } else {
        setLocalError(res.message || "Invalid email or password.");
      }
    } catch (err) {
      setLocalError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:28px_28px]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20">
            <LogIn className="text-cyan-400" size={30} />
          </div>

          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

          <p className="mt-2 text-gray-400">
            Login to continue your AI conversations.
          </p>
        </div>

        {localError && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-300 text-sm">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <label className="text-sm text-gray-300">Password</label>

              <Link
                to="/forgot-password"
                className="text-xs text-cyan-400 hover:text-cyan-300"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-12 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(59,130,246,.4)] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
