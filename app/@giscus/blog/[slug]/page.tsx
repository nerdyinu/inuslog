import { GiscusSection } from "app/components/giscus";

export default function GiscusPage({ params }) {
  const slug = params.slug
  if (!slug) return null;
  console.log(`giscus:${slug}`)
  return (
    <GiscusSection className="mx-auto mt-20" />
  )

}
