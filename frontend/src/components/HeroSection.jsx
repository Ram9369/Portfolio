import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { ArrowDownRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

const highlights = [
  { label: "Responsive Systems", value: "Pixel Perfect" },
  { label: "Animation", value: "Motion First" },
  { label: "Delivery", value: "Production Ready" },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <SparklesIcon className="h-4 w-4 text-purple-300" />
            Available for freelance and full-time opportunities
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
              <span className="block bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Ram Pratap Maurya
              </span>
            </h1>
            <h3 className="text-xl font-black leading-tight text-white sm:text-3xl lg:text-5xl">
              <span className="block">I build modern web experiences.</span>
            </h3>

            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1500,
                "Backend Optimization...",
                1500,
                "AI Integration...",
                1500,
              ]}
              speed={50}
              repeat={Infinity}
              wrapper="div"
              className="text-xl font-semibold text-slate-200 sm:text-2xl"
            />

            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-300 lg:mx-0 lg:text-lg">
              I design and develop elegant, responsive interfaces with a strong
              focus on clarity, motion, and user experience.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start ">
            <a
              href="/images/Resume-res.pdf"
              download="Ram_Pratap_Resume.pdf"
              className="inline-flex items-center justify-center p-3 gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500  py-3 font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:-translate-y-2"
            >
              Download Resume
              <ArrowDownRightIcon className="h-5 w-5" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-pink-500 hover:bg-white/10 focus:outline-none focus:border-pink-500 focus:ring-2 transition hover:-translate-y-2 focus:ring-pink-500/30"
            >
              View Projects
            </a>
          </div>

          <div className="flex gap-5 ">
            <a
              href="https://github.com/Ram9369"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-13 w-13 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              <img src="/github-icon.svg" alt="GitHub" className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/ram-pratap-maurya-2a14772ab/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-13 w-13 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              <img
                src="/linkedin-icon.svg"
                alt="LinkedIn"
                className="h-5 w-5"
              />
            </a>
          </div>

          {/* Highlights */}
          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
              >
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto w-full max-w-lg transition hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
        >
          <div className="absolute -inset-4 rounded-[2.5rem]  bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-2rem border  border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="absolute inset-x-4 top-4 flex items-center justify-between rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs text-slate-300">
              <span>Open to Work</span>
              <span>Product Focused</span>
            </div>

            <div className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/60  h-auto transition duration-300 hover:-translate-y-1  ">
              <img
                src="/images/Ram_Img.png"
                alt="Hero"
                className="h-full w-full object-cover rounded-[1.5rem] transition duration-500 hover:scale-105"
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-purple-300">
                  Focus
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  • Software Development with AI Integration
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-pink-300">
                  Stack
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  React • Tailwind • Node.js • express.js • MongoDB
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
