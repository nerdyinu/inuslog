'use client'

import { PropsWithChildren, createContext, useState } from "react";
import { createPortal } from "react-dom";
import { TOCSection } from "./mdx";
import TableOfContent from "./toc";
const TocContext = createContext({
  setToc: () => void;
});
export function TocProvider({ children }: PropsWithChildren) {
  const [toc, setToc] = useState<TOCSection[]>();
  const tocEl = document.getElementById("toc")
  createPortal(<TableOfContent />, tocEl)
}
export function GiscusProvider({ children }: PropsWithChildren) {

}
