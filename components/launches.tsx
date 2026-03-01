import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { launchesQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

export default async function Launches() {
  const data = await sanityFetch({ query: launchesQuery });

  return (
    <section
      id="lancamentos"
      className="bg-white min-h-screen flex flex-col text-dark-blue py-10 md:py-20"
    >
      <h2 className="mx-auto text-center text-lg md:text-xl font-bold px-5 py-4 border border-green rounded-2xl">
        LANÇAMENTOS
      </h2>

      <div className="mt-10 md:mt-20 container px-5 mx-auto grid gap-10">
        {data.map((launch, ind) => (
          <div
            key={ind}
            className="flex flex-col xl:flex-row xl:h-[500px] items-center gap-4 xl:gap-10"
          >
            <div className="relative w-full basis-7/12 max-lg:aspect-video lg:min-h-[500px] bg-gray shadow-lg rounded-3xl overflow-hidden">
              <Image
                src={
                  urlForImage(launch.image)
                    ?.width(840)
                    .height(600)
                    .url() as string
                }
                alt={launch.title}
                fill
                className="object-cover"
              />
              <span className="uppercase absolute top-8 right-8 rounded-full text-lg font-medium bg-white/5 backdrop-blur-md px-4 py-3 border border-white/20">
                {launch.status}
              </span>
            </div>
            <div className="basis-5/12 h-full flex flex-col p-12 gap-8 justify-center border border-green rounded-3xl">
              <h3 className="text-clamp-xl leading-none font-medium line-clamp-2">
                {launch.title}
              </h3>
              <p className="text-lg lg:text-xl">{launch.shortDescription}</p>
              <div className="flex items-center gap-4 md:gap-8">
                {launch.externalLink && (
                  <Link
                    href={launch.externalLink}
                    target="_blank"
                    className="bg-green text-black font-semibold px-3 py-2 rounded-xl"
                  >
                    CONHECER
                  </Link>
                )}
                {launch.contactLink && (
                  <Link
                    href={launch.contactLink}
                    target="_blank"
                    className="underline font-medium"
                  >
                    ENTRAR EM CONTATO {">"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* <div className="flex flex-col xl:flex-row xl:h-[500px] items-center gap-4 xl:gap-10">
          <div className="relative w-full xl:w-auto basis-7/12 h-full min-h-[500px] bg-gray shadow-lg rounded-3xl overflow-hidden">
            <Image
              src="/img/lancamento_2.png"
              alt=""
              fill
              className="object-cover"
            />
            <span className="absolute top-8 right-8 rounded-full text-lg font-medium bg-white/5 backdrop-blur-md px-4 py-3 border border-white/20">
              LANÇAMENTO
            </span>
          </div>
          <div className="basis-5/12 h-full flex flex-col p-12 gap-8 justify-center border border-green rounded-3xl">
            <h3 className="text-clamp-xl leading-none font-medium line-clamp-2">
              Imperium 1894
            </h3>
            <p className="text-lg lg:text-xl">
              Imperium evoca grandeza, imponência e elegância. Atributos que se
              manifestam na arquitetura neoclássica do empreendimento, inspirada
              nos pilares atemporais da estética europeia.
            </p>
            <div className="flex items-center gap-4 md:gap-8">
              <Link
                href="/"
                className="bg-green text-black font-semibold px-3 py-2 rounded-xl"
              >
                CONHECER
              </Link>
              <Link href="/" className="underline font-medium">
                ENTRAR EM CONTATO {">"}
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
