import { motion } from "framer-motion";
import { Zap, Shield, BarChart2 } from "lucide-react";
import { ShortenForm } from "./ShortenForm";

const features = [
  { icon: Zap, label: "Instant", desc: "Links generated in milliseconds" },
  { icon: Shield, label: "Reliable", desc: "Hosted on global edge infrastructure" },
  { icon: BarChart2, label: "Tracked", desc: "Click counts updated in real-time" },
];

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-3 flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
        </span>
        Free forever · No sign-up required
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="mb-4 max-w-2xl text-center text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl"
      >
        Long URLs are{" "}
        <span className="gradient-text">ugly.</span>
        <br />
        Fix that instantly.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mb-10 max-w-md text-center text-base text-zinc-400"
      >
        Paste any URL and get a clean, shareable short link in one click — no account needed.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <ShortenForm />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {features.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-5 text-center"
          >
            <Icon size={20} className="text-violet-400" />
            <p className="text-sm font-medium text-zinc-200">{label}</p>
            <p className="text-xs text-zinc-500">{desc}</p>
          </div>
        ))}
      </motion.div>

      {/* subtle radial glow behind hero */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-3xl" />
      </div>
    </section>
  );
}
