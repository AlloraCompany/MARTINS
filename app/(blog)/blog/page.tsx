import BlogCard from "@/components/blog-card";
import CategoryNav from "@/components/category-nav";
import RecentPosts from "@/components/recent-posts";

export default function Page() {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="container mx-auto px-5 pt-10 md:pt-14">
        <h1 className="text-clamp-lg font-medium">BLOG</h1>

        <h2 className="mt-10 md:mt-14 border border-green rounded-xl px-6 py-2 text-2xl w-fit">
          DESTAQUES
        </h2>

        <div className="mt-10 md:mt-14 w-full flex"></div>

        <h2 className="bg-green text-dark-blue my-10 rounded-full px-6 py-2 w-fit uppercase">
          Ultimos posts
        </h2>
        <RecentPosts />

        <div className="mx-auto">
          <h2 className="font-medium text-xl mb-5">Busque por categoria:</h2>
          <CategoryNav />
        </div>
      </div>
    </div>
  );
}
