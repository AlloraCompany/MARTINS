import BlogInline from "@/components/blog-inline";
import CategoryNav from "@/components/category-nav";
import { BlogPost } from "@/lib/types/blog-post";
import { sanityFetch } from "@/sanity/lib/fetch";
import { categoryPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ category?: string[] }>;
};

export default async function Page({ params }: Props) {
  const { category } = await params;
  const data = await sanityFetch({
    query: categoryPostsQuery,
    params: { category: category?.length ? category[0] : null },
  });
  return (
    <div className="bg-white min-h-screen">
      <div className="container px-5 mx-auto pt-10 md:pt-14">
        <div className="mx-auto ">
          <h4 className="font-medium text-xl mb-5">Busque por categoria:</h4>
          <CategoryNav selected={category ? category[0] : undefined} />
        </div>
        <div className="mt-10 md:mt-14">
          <BlogInline
            posts={data.map(
              (post: any) =>
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
        </div>
      </div>
    </div>
  );
}
