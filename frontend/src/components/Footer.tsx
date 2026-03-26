import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} snip.ly</p>
        <p className="flex items-center gap-1">
          Built with <Heart size={13} className="text-violet-400 fill-violet-400" /> on FastAPI + React
        </p>
      </div>
    </footer>
  );
}
