import Link from "next/link";

// Top bar: wordmark left, primary nav + actions right — mirroring the
// reference editorial header.
export default function TopNav() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center border border-line-strong text-[10px]">
            ▢
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-tight text-ink">
            Versus
          </span>
        </Link>

        <Link
          href="/#newsletter"
          className="inline-flex items-center bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-accent"
        >
          Let&apos;s Talk
        </Link>
      </nav>
    </header>
  );
}
