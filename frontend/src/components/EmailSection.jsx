import React, { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

const EmailSection = ({ onOpenLogin }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  // Pre-populate name & email when user session starts/ends
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        Name: user.name || "",
        email: user.email || "",
      }));
    } else {
      setFormData({
        Name: "",
        email: "",
        number: "",
        subject: "",
        message: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      onOpenLogin();
      return;
    }

    setStatus("sending");

    try {
      // Map to backend fields: name, email, phone, subject, message
      const response = await API.post("/contact", {
        name: formData.Name,
        email: formData.email,
        phone: formData.number,
        subject: formData.subject,
        message: formData.message,
      });

      if (response.data && response.data.success) {
        setStatus("success");
        setFormData({
          Name: user.name || "",
          email: user.email || "",
          number: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative grid gap-10 py-16 md:grid-cols-[2.6fr_2.4fr] md:py-20"
    >
      <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
        <span className="rounded-full border mb-2  border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xl tracking-[0.3em] text-blue-400 uppercase">
          • Contact Me📬
        </span>
        <div className="pointer-events-none absolute -left-12 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl" />

        {/* Left Side */}
        <div className="relative z-10 space-y-6">
          <h5 className="text-3xl mt-7 font-bold text-white">
            Let's Build Something Amazing
          </h5>

          <div className="grid gap-8 sm:grid-cols-2 ">
            <div className="rounded-2xl  border w-50% border-white/10 bg-white/5 p-6 transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <p className="text-sm text-slate-400">Phone</p>

              <a
                href="tel:9369299456"
                className="mt-1 inline-flex items-center gap-2 text-white transition hover:text-purple-300"
              >
                <PhoneIcon className="h-5 w-5" />
                9369299456
              </a>
            </div>
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <p className="text-sm text-slate-400">Email</p>

              <a
                href="mailto:rampratap55174@gmail.com"
                className="mt-3 flex items-center gap-3 text-sm sm:text-base text-white transition hover:text-purple-300 break-all"
              >
                <EnvelopeIcon className="h-5 w-5" />
                rampratap55174@gmail.com
              </a>
            </div>

            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <p className="text-sm text-slate-400">GitHub</p>

              <a
                href="https://github.com/Ram9369"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 text-sm sm:text-base text-white transition hover:text-purple-300 break-all"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <FaLinkedin className="h-5 w-5" />
                </div>

                <span className="break-all">github.com/Ram9369</span>
              </a>
            </div>
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <p className="text-sm text-slate-400">LinkedIn</p>

              <a
                href="https://www.linkedin.com/in/ram-pratap-maurya-2a14772ab/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 text-sm sm:text-base text-white transition hover:text-purple-300 break-all"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <FaLinkedin className="h-5 w-5" />
                </div>

                <span className="break-all">
                  linkedin.com/in/ram-pratap-maurya-2a14772ab
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="relative rounded-[2rem] overflow-hidden transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 "
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Name
              </label>

              <input
                id="Name"
                name="Name"
                type="text"
                required
                placeholder="Your Full Name"
                value={formData.Name}
                onChange={handleChange}
                className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="number"
                className="mb-2 block text-sm font-medium text-white"
              >
                Phone Number
              </label>

              <input
                id="number"
                name="number"
                type="tel"
                required
                placeholder="123-456-7890"
                value={formData.number}
                onChange={handleChange}
                className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-white"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleChange}
                className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-white"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Let's talk about your project..."
              value={formData.message}
              onChange={handleChange}
              className="block w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:opacity-70 cursor-pointer"
          >
            {status === "sending"
              ? "Sending..."
              : !user
                ? "Sign In to Send Message"
                : "Send Message"}

            <ArrowRightIcon className="h-5 w-5" />
          </button>

          {status === "success" && (
            <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              Message sent successfully!
            </p>
          )}

          {status === "error" && (
            <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              Failed to send message.
            </p>
          )}
        </form>

        {/* Lock screen overlay when not authenticated */}
        {/*  
        {!user && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md rounded-[2rem] border border-white/10 text-center z-20">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg mb-4 select-none">
              🔒
            </span>
            <h4 className="text-xl font-bold text-white mb-2">
              Authentication Required
            </h4>
            <p className="text-sm text-slate-400 max-w-xs mb-6">
              Only authenticated users can send messages to prevent spam. Please
              sign in or register to get in touch.
            </p>
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] cursor-pointer"
            >
              Sign In to Send Message
            </button>
          </div>
        )} 
          */}
      </div>
    </section>
  );
};

export default EmailSection;
