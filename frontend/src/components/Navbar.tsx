import { Link2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-zinc-100 hover:text-violet-400 transition-colors">
          <Link2 size={20} className="text-violet-400" />
          <span className="font-semibold tracking-tight">snip.ly</span>
        </a>

        <nav className="flex items-center gap-6 text-sm text-zinc-400">
          <a
            href="https://github.com/musharrafazizk/urlshortener"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
