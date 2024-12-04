import { CustomMDX, parseToc } from "app/components/mdx";
import { baseUrl } from "app/sitemap";
import { notFound } from "next/navigation";
import { formatDate } from "../date";
import { postsCache } from "./cache";
import Portal from "./portal";

export async function generateStaticParams() {
  let posts = postsCache();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const param = await params;
  let post = postsCache().find((post) => post.slug === param.slug);
  if (!post)
    return {
      title: "페이지를 찾을 수 없습니다",
      description: "페이지를 찾을 수 없습니다",
    };
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
export default async function Blog({ params }) {
  const param = await params;
  let post = postsCache().find((post) => post.slug === param.slug);
  if (!post) {
    notFound();
  }

  const toc = parseToc(post.content);

  return (
    <>
      <Portal toc={toc} />
      <section className="mx-auto max-w-2xl lg:max-w-[44rem] pt-6">
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
