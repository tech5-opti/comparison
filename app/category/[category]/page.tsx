import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopNav from "@/app/components/TopNav";
import Newsletter from "@/app/components/Newsletter";
import SiteFooter from "@/app/components/SiteFooter";
import ComparisonCard from "@/app/components/ComparisonCard";
import {
  CATEGORY_META,
  categoryFromSlug,
  categorySlug,
  getComparisonsByCategory,
} from "@/app/lib/comparisons";

export function generateStaticParams() {
  return CATEGORY_META.map((c) => ({ category: categorySlug(c.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolved = categoryFromSlug(category);
  if (!resolved) return { title: "Not found — Versus" };
  return {
    title: `${resolved} comparisons — Versus`,
    description: `Side-by-side ${resolved} comparisons on Versus.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolved = categoryFromSlug(category);

  if (!resolved) notFound();

  const items = getComparisonsByCategory(resolved);
  const meta = CATEGORY_META.find((c) => c.name === resolved);

  return (
    <>
      <TopNav />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        <section className="pt-10 sm:pt-14">
          <Link
            href="/#blog"
            className="eyebrow text-ink-faint transition-colors hover:text-ink"
          >
            ← All comparisons
          </Link>

          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-5xl font-bold tracking-tight text-ink sm:text-7xl">
                {resolved}
              </h1>
              <p className="mt-3 text-sm text-ink-soft">
                {meta?.blurb} · {items.length}{" "}
                {items.length === 1 ? "comparison" : "comparisons"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORY_META.map((c) => {
                const isActive = c.name === resolved;
                return (
                  <Link
                    key={c.name}
                    href={`/category/${categorySlug(c.name)}`}
                    className={`eyebrow border px-3 py-1.5 transition-colors ${
                      isActive
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-soft hover:border-ink hover:text-ink"
                    }`}
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <hr className="mt-8 border-line" />

        <section className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.length > 0 ? (
            items.map((c) => <ComparisonCard key={c.slug} comparison={c} />)
          ) : (
            <p className="col-span-full py-12 text-center text-ink-faint">
              No comparisons in this category yet — check back soon.
            </p>
          )}
        </section>
      </main>

      <Newsletter />
      <SiteFooter />
    </>
  );
}
