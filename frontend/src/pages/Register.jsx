import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setLocalError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setLocalError("");

    try {
      const res = await register(name, email, password);

      if (res.success) {
        navigate("/login");
      } else {
        setLocalError(res.message || "Registration failed.");
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
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:28px_28px]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20">
            <UserPlus className="text-cyan-400" size={30} />
          </div>

          <h1 className="text-3xl font-bold text-white">Create Account</h1>

          <p className="mt-2 text-gray-400">
            Join and start chatting with your AI assistant.
          </p>
        </div>

        {localError && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-300 text-sm">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>

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

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-12 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
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
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
