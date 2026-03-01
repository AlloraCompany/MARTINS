import { BlogPost } from "@/lib/types/blog-post";
import BlogCard from "./blog-card";

export default function BlogInline({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 pb-10">
      {posts.map((post, ind) => (
        <BlogCard key={ind} post={post} />
      ))}
    </div>
  );
}
