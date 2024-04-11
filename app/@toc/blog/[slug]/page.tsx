import { postsCache } from "app/blog/[slug]/cache";
import { parseToc } from "app/components/mdx";
import TableOfContent from "app/components/toc";
import { cn } from "app/lib/utils";

export default function Toc({ params }) {
  const slug = params.slug;
  console.log(slug);
  if (!slug) return;
  const cache = postsCache().find((post) => post.slug === slug);
  if (!cache) return;
  const toc = parseToc(cache.content);
  return (
    <aside
      className={cn(
        "fixed top-page flex max-w-[220px] -translate-x-[230px] translate-y-[140px] flex-col",
        "transition-opacity lg:opacity-0",
        "md:relative md:top-0 md:-ml-2 md:mb-7 md:translate-x-0 md:opacity-100",
      )}
    >
      <TableOfContent
        data-animate
        className="px-2 text-sm md:hidden"
        toc={toc}
      />
    </aside>
  );
}
