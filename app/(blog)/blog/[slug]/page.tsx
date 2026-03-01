import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import CoverImage from "../../cover-image";
import PortableText from "../../portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postQuery,
  recentPostsQuery,
  settingsQuery,
} from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import RecentPosts from "@/components/recent-posts";
import { category, getCategory } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import DateComponent from "@/components/date";
import Newsletter from "@/components/newsletter";

type Props = {
  params: Promise<{ slug: string }>;
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const [post, settings] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
    sanityFetch({ query: settingsQuery }),
  ]);

  const recents = await sanityFetch({
    query: recentPostsQuery,
    params: { skip: post?._id },
  });

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="container mx-auto px-5 pt-10 md:pt-14">
        <h2 className="text-clamp-lg font-medium">BLOG</h2>
        <div className="w-full flex flex-col-reverse md:flex-row gap-5 md:gap-10 lg:gap-14 xl:gap-20 mt-10 md:mt-14 pb-32">
          <div className="basis-2/5 lg:basis-1/4 max-w-52 flex flex-col gap-10 items-start">
            <div className="md:w-full flex flex-col">
              <span className="textl-lg font-medium bg-green w-full text-center rounded-full px-5 py-2">
                CATEGORIAS
              </span>
              <div className="flex flex-col gap-5 mt-5 pl-5">
                {category?.map((cat, ind) => (
                  <Link
                    key={ind}
                    href={"/blog/categoria/" + cat.value}
                    className="uppercase text-dark-blue/80 max-w-52 hover:text-dark-blue transition text-lg flex w-full justify-between items-center"
                  >
                    {cat.title}
                    <ChevronRight size={20} className="min-w-5" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:w-full md:flex flex-col">
              <span className="textl-lg font-medium bg-green w-full text-center rounded-full px-5 py-2">
                ÚLTIMOS POSTS
              </span>
              <div className="flex flex-col gap-5 mt-5 pl-5">
                {recents.map((p, ind) => (
                  <Link
                    key={p.slug}
                    href={"/blog/" + p.slug}
                    className="text-base text-dark-blue/80 max-w-52 hover:text-dark-blue"
                  >
                    <span className="!text-sm font-bold">
                      <DateComponent
                        dateString={p.date}
                        dateFormat="dd/MM/yyyy"
                      />
                    </span>
                    <br />
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <article className="flex-1">
            <div className="flex items-center gap-2">
              {post.category?.map((cat, ind) => (
                <div key={ind} className="flex items-center gap-2">
                  {ind > 0 && <span className="h-4 w-px bg-green" />}
                  <span className="text-green uppercase text-lg">
                    {getCategory(cat)}
                  </span>
                </div>
              ))}
            </div>
            <h1 className="mt-5 text-balance mb-12 text-clamp-xl font-semibold leading-tight tracking-tighter md:leading-none">
              {post.title}
            </h1>
            <div className="mb-8 sm:mx-0 rounded-3xl overflow-hidden">
              <CoverImage image={post.coverImage} priority />
            </div>
            {post.content?.length && (
              <PortableText
                className="mx-auto w-full !max-w-full"
                value={post.content as PortableTextBlock[]}
              />
            )}
          </article>
        </div>
      </div>
      <Newsletter />
      {/* <aside>
        <hr className="border-accent-2 mb-24 mt-28" />
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          Recent Stories
        </h2>
        <Suspense>
          <RecentPosts skip={post._id} />
        </Suspense>
      </aside> */}

      <div className="container mx-auto px-5 py-10 md:py-14">
        <h2 className="bg-green text-dark-blue my-10 rounded-full px-6 py-2 w-fit uppercase">
          Ultimos posts
        </h2>
        <RecentPosts skip={post._id} />
      </div>
    </div>
  );
}
