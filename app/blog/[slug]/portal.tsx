"use client"
import { GiscusSection } from "app/components/giscus";
import { TOCSection } from "app/components/mdx";
import TableOfContent from "app/components/toc";
import { PropsWithChildren, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function Portal({ toc, ...props }: { toc: TOCSection[] } & PropsWithChildren) {
  const tocEl = document.getElementById("toc");
  const giscusRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      giscusRef.current = document.createElement('div');
      footerElement.appendChild(giscusRef.current);
    }

    return () => {
      if (footerElement && giscusRef.current) {
        footerElement.removeChild(giscusRef.current);
      }
    };
  }, []);
  return (
    <>
      {
        ReactDOM.createPortal(<TableOfContent
          data-animate
          className="px-2 text-sm md:hidden"
          toc={toc}
        />, tocEl!!)
      }
      {giscusRef.current && ReactDOM.createPortal(<GiscusSection />, giscusRef.current)}
    </>
  )
}
