import { BlogPost } from "@/lib/types/blog-post";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <Image src={post.cover_image} alt="" fill className="object-cover" />
      </div>
      <Link
        href={`/blog/` + post.slug}
        className="-mt-12 w-full flex flex-col rounded-2xl text-lg font-medium bg-gradient-to-b from-white/55 to-white/5 backdrop-blur-md px-4 py-3 border border-dark-blue"
      >
        <h5 className="line-clamp-2 text-xl">{post.title}</h5>
        <p className="line-clamp-2 leading-tight h-[2.5em] text-sm">
          {post.excerpt}
        </p>
        <span className="underline ml-auto text-sm">LER MAIS</span>
      </Link>
    </div>
  );
}
