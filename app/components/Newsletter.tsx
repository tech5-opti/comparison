// Pre-footer newsletter band: big editorial heading left, copy + form right,
// matching the reference "Get the latest news into your inbox" section.
export default function Newsletter() {
  return (
    <section id="newsletter" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div className="eyebrow text-ink-faint">Newsletter</div>

        <div className="lg:col-start-1 lg:row-start-2">
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Get the latest
            <br />
            news into your inbox
          </h2>
        </div>

        <div className="lg:col-start-2 lg:row-start-2 lg:self-end">
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">
            One sharp comparison a week — the differences that actually matter,
            with a clear verdict. No hype, no affiliate spam, unsubscribe
            anytime.
          </p>
          <form
            className="mt-6 flex max-w-md items-center border-b border-line-strong"
            action="#newsletter"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
              className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
            />
            <button
              type="submit"
              className="eyebrow h-9 shrink-0 bg-ink px-5 font-semibold text-paper transition-colors hover:bg-accent"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
