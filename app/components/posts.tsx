import { getBlogPosts, Post } from "app/blog/utils";
import { format } from "date-fns";
import Link from "next/link";

type Metadata = Omit<Post, "content">;

export function BlogPosts() {
	let allBlogs = getBlogPosts();

	const yearList = Object.entries(
		allBlogs
			.map(({ metadata, slug }): Metadata => ({ metadata, slug }))
			.reduce<{ [year: string]: Metadata[] }>((ac, v) => {
				const year = new Date(v.metadata.publishedAt).getFullYear();
				if (!ac[year]) ac[year] = [];
				ac[year].push(v);
				return ac;
			}, {}),
	).sort(([yearA], [yearB]) => +yearB - +yearA);

	return yearList.map(([year, postList], index) => {
		return (
			<div className="group/year relative">
				<div className="absolute -left-20 -mx-1 select-none rounded-md px-1 transition group-hover/year:bg-selection group-hover/year:text-heading group-hover/year:!opacity-100 group-hover:opacity-40 sm:relative sm:left-0 sm:mb-2">
					<h3 className="font-serif">{year}</h3>
				</div>
				<ul
					data-animate
					data-animate-speed="fast"
					className="flex flex-col items-start gap-2"
				>
					{postList.map((post) => (
						<li style={{ "--start": `${index * 75}ms` } as React.CSSProperties}>
							<Link
								href={`/blog/${post.slug}`}
								className="-mx-1 flex items-center rounded-md px-1 transition hover:bg-selection hover:!opacity-100 group-hover:opacity-60"
							>
								<span className="text-heading">{post.metadata.title}</span>
								<span className="flex-shrink-0 px-2 text-sm text-second">
									{format(new Date(post.metadata.publishedAt), "MM. dd.")}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	});
}
