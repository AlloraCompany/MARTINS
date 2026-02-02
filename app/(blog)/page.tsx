import Image from "next/image";
import Link from "next/link";

import Empreendimentos from "./empreendimentos";
import Newsletter from "@/components/newsletter";
import Launches from "@/components/launches";
import HeroText from "@/components/hero-text";
import { sanityFetch } from "@/sanity/lib/fetch";
import { buildingsQuery, recentPostsQuery } from "@/sanity/lib/queries";
import RecentPosts from "@/components/recent-posts";
import HomeVideo from "@/components/video";

export default async function Page() {
  const [buildings] = await Promise.all([
    sanityFetch({ query: buildingsQuery }),
  ]);

  return (
    <div>
      <section className="container mx-auto px-5 py-10 lg:py-20 text-white flex flex-col">
        <HeroText />
        <div className="w-full aspect-video rounded-3xl bg-gray mt-5 md:mt-10 overflow-hidden">
          <HomeVideo />
        </div>
        <div className="w-full h-fit rounded-2xl mt-5 md:mt-10 py-5 bg-white/5 border border-white/20  flex items-center justify-evenly text-center [&_span]:text-green [&_span]:font-bold [&_span]:text-clamp-xl">
          <div>
            <span>13</span>
            <h3>
              PRÉDIOS <br />
              ENTREGUES
            </h3>
          </div>
          <div>
            <span>57MIL M²</span>
            <h3>JÁ CONSTRUÍDOS</h3>
          </div>
          <div>
            <span>1.184</span>
            <h3>
              SONHOS <br /> REALIZADOS
            </h3>
          </div>
        </div>
        <p className="mx-auto text-center max-w-2xl text-2xl mt-5 lg:mt-10 font-medium">
          Desde 2007, a Martins Empreendimentos transforma o cenário urbano de
          Palhoça com obras que unem qualidade, responsabilidade e propósito.
        </p>
        <Link href="/sobre" className="mt-10 mx-auto underline">
          CONHEÇA NOSSA HISTÓRIA COMPLETA {">"}
        </Link>
      </section>
      <Launches />

      <Empreendimentos data={buildings} />
      <section className="bg-white  flex flex-col text-dark-blue py-10 md:py-20">
        <div className="container mx-auto px-5 ">
          <div className="flex justify-between items-center mb-5 md:mb-10">
            <h2 className="mr-auto w-fit text-lg md:text-xl font-bold px-5 py-4 border border-green rounded-2xl">
              BLOG
            </h2>
            <Link href="/blog" className="underline text-lg font-medium">
              VER BLOG COMPLETO {">"}
            </Link>
          </div>
          <RecentPosts />
        </div>
      </section>
      <Newsletter />
      {/* <footer className="flex py-20 min-h-[400px]">
        <div className="logo"></div>
        <nav></nav>
        <div className="contato"></div>
      </footer> */}
    </div>
  );
}
