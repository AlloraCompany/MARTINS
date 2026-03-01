import { sanityFetch } from "@/sanity/lib/fetch";
import { recentPostsQuery } from "@/sanity/lib/queries";
import BlogInline from "./blog-inline";
import { BlogPost } from "@/lib/types/blog-post";
import { urlForImage } from "@/sanity/lib/utils";

export default async function RecentPosts({
  skip = null,
}: {
  skip?: string | null;
}) {
  const data = await sanityFetch({ query: recentPostsQuery, params: { skip } });

  return (
    <BlogInline
      posts={data.map(
        (post) =>
          ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            cover_image: urlForImage(post.coverImage)
              ?.width(590)
              .height(330)
              .url(),
          }) as BlogPost
      )}
    />
  );
}
