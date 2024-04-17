import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import "./global.css";
import { cn } from "./lib/utils";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Inu's blog",
		template: "%s | Inu's blog",
	},
	description: "Diary of Inu, a developer",
	openGraph: {
		title: "Inu's blog",
		description: "Diary of Inu, a developer",
		url: baseUrl,
		siteName: "Inuslog",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={cx(
				"text-black bg-white dark:text-white dark:bg-black",
				GeistSans.variable,
				GeistMono.variable,
			)}
		>
			<body className="antialiased flex justify-center mx-4 mt-8 lg:mx-auto">
				<aside
					id="toc"
					className={cn(
						"fixed top-page flex max-w-[220px] -translate-x-[230px] translate-y-[140px] flex-col",
						"transition-opacity lg:opacity-0",
						"md:relative md:top-0 md:-ml-2 md:mb-7 md:translate-x-0 md:opacity-100",
					)}
				></aside>
				<main className="max-w-xl flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
					<Navbar />
					{children}
					<Footer />
					<Analytics />
					<SpeedInsights />
				</main>
			</body>
		</html>
	);
}
