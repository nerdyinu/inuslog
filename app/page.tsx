import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I'm a junior frontend developer, who is widely interested in 500 shades of programming. `}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
