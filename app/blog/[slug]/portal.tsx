"use client";
import { GiscusSection } from "app/components/giscus";
import { TOCSection } from "app/components/mdx";
import TableOfContent from "app/components/toc";
import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function Portal({
	toc,
	...props
}: { toc: TOCSection[] } & PropsWithChildren) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	return isMounted ? (
		<>
			{ReactDOM.createPortal(
				<TableOfContent
					data-animate
					className="px-2 text-sm md:hidden"
					toc={toc}
				/>,
				document.getElementById("toc") as HTMLElement,
			)}
			{ReactDOM.createPortal(
				<GiscusSection className="mx-auto mt-20" />,
				document.getElementById("footer") as HTMLElement,
			)}
		</>
	) : null;
}
