import { cache } from "react";
import { getBlogPosts } from "../utils";

export const postsCache = cache(getBlogPosts);
