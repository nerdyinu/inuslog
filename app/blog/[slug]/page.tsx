import { getBlogPosts } from "app/blog/utils";
import { CustomMDX, parseToc } from "app/components/mdx";
import { baseUrl } from "app/sitemap";
import { notFound } from "next/navigation";
import { formatDate } from "../date";
import { cn } from "app/lib/utils";
import TableOfContent from "app/components/toc";
export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) return;
  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    notFound();
  }
  const toc = parseToc(post.content);

  return (
    <>
      <aside
        className={cn(
          "fixed top-page flex max-w-[220px] -translate-x-[230px] translate-y-[140px] flex-col",
          "transition-opacity lg:opacity-0",
          "md:relative md:top-0 md:-ml-2 md:mb-7 md:translate-x-0 md:opacity-100",
        )}
      >
        <TableOfContent
          toc={toc}
          data-animate
          className="px-2 text-sm md:hidden"
        />
      </aside>
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "Inu Jung",
              },
            }),
          }}
        />
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
      </section>
    </>
  );
}
