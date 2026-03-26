import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Check, ExternalLink, RotateCcw, Loader2 } from "lucide-react";
import { useShorten } from "../hooks/useShorten";
import toast from "react-hot-toast";

export function ShortenForm() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { result, loading, shorten, reset } = useShorten();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    await shorten(trimmed);
  };

  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.short_url);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    reset();
    setUrl("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-zinc-700/60 bg-zinc-900/60 p-2 shadow-xl shadow-black/30 glow-ring focus-within:border-violet-500/50 transition-all duration-300">
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a long URL here…"
                className="flex-1 bg-transparent px-3 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none text-sm"
                autoFocus
                disabled={loading}
              />
              <motion.button
                type="submit"
                disabled={loading || !url.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Shorten <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="rounded-2xl border border-violet-500/30 bg-zinc-900/60 p-6 shadow-xl shadow-black/30"
          >
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
              Your short link
            </p>
            <div className="flex items-center justify-between gap-4">
              <a
                href={result.short_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text text-2xl font-semibold hover:opacity-80 transition-opacity flex items-center gap-2"
              >
                {result.short_url}
                <ExternalLink size={16} className="text-violet-400 mt-0.5 shrink-0" />
              </a>
              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-300 hover:border-violet-500/50 hover:text-violet-300 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check size={13} className="text-green-400" /> Copied
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-1.5"
                      >
                        <Copy size={13} /> Copy
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
                  title="Shorten another"
                >
                  <RotateCcw size={14} />
                </motion.button>
              </div>
            </div>

            <div className="mt-4 truncate text-xs text-zinc-500">
              → {result.original_url}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
