import { sanityFetch } from "@/sanity/lib/fetch";
import { sobreQuery } from "@/sanity/lib/queries";
import { PortableTextBlock } from "next-sanity";
import PortableText from "../portable-text";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

export default async function Page() {
  const data = await sanityFetch({ query: sobreQuery });
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto py-20 max-w-screen-lg px-5">
        {data?.text_1?.length && (
          <PortableText
            className="mx-auto w-full !max-w-full"
            value={data.text_1 as PortableTextBlock[]}
          />
        )}
        {data?.image && (
          <div className="w-full mt-10 aspect-video relative rounded-2xl overflow-hidden">
            <Image
              className="object-cover"
              fill
              src={urlForImage(data.image)?.url() as string}
              alt="Martins Empreendimentos"
            />
          </div>
        )}
        {data?.text_2?.length && (
          <PortableText
            className="mx-auto mt-10 w-full !max-w-full"
            value={data.text_2 as PortableTextBlock[]}
          />
        )}
        {data?.frase_1 && (
          <h3 className="mt-10 text-clamp-lg w-[80%] mx-auto text-center leading-tight font-semibold">
            {data.frase_1}
          </h3>
        )}
        {data?.frase_2 && (
          <h4 className="mt-10 text-lg w-full mx-auto text-center leading-tight">
            {data.frase_2}
          </h4>
        )}
        {data?.frase_3 && (
          <h3 className="mt-10 text-clamp-lg w-full mx-auto text-center leading-tight font-semibold bg-dark-blue text-white py-6 px-10 rounded-2xl">
            {data.frase_3}
          </h3>
        )}
      </div>

      {/* <div className="container mx-auto px-5 mt-10 md:mt-14 min-h-[40vh]">
        <h1 className="text-clamp-xl font-medium text-white">Sobre nós</h1>
        <div className="mt-10 flex justify-between items-center">
          <div className="basis-1/2 text-lg md:text-xl flex flex-col pb-14">
            <p className="">
              Nossa história começa com uma ideia e muita coragem.
            </p>
            <p className="mt-5">
              A Martins Empreendimentos nasceu da visão de que Palhoça merecia
              mais. <br />
              Mais planejamento. Mais qualidade. Mais respeito por quem escolhe
              viver aqui.
            </p>
            <Link
              href=""
              className="mt-10 md:mt-14 bg-green px-6 py-3 rounded-xl w-fit"
            >
              ENTRAR EM CONTATO
            </Link>
          </div>
          <div className="relative basis-1/2 aspect-video rounded-t-3xl overflow-hidden bg-green">
            <Image src="/img/lancamento_1.png" alt="" fill />
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-10 md:py-14">
        <div className="mt-10 md:mt-14 prose-lg md:prose-xl prose mx-auto px-5">
          <p>
            Em 2017, ainda longe dos grandes holofotes da construção civil,
            começamos pequeno. Um projeto por vez, uma obra por vez, com
            dedicação e olhos atentos a cada detalhe. A cidade crescia. E a
            gente crescia junto.
          </p>
          <p>
            Mas mais do que acompanhar o ritmo, queríamos imprimir nossa marca.
            Pensar nos prédios como espaços de verdade onde as pessoas pudessem
            construir vidas, histórias, memórias.
          </p>
          <p>
            De lá pra cá, a Martins se tornou uma das construtoras mais
            reconhecidas da região. Com mais de 50 mil m² construídos, 13
            empreendimentos entregues e mais de mil vendas realizadas, temos
            orgulho de olhar para trás e ver o quanto evoluímos sem perder a
            essência.
          </p>
          <p>
            Somos uma empresa familiar, feita por quem vive a cidade e acredita
            no seu potencial. Uma construtora que respeita o tempo de cada obra,
            a vocação de cada bairro e o sonho de cada cliente.
          </p>
          <p>
            E é isso que nos move: fazer da construção uma ponte entre passado,
            presente e futuro. Entre tradição e inovação. Entre o que Palhoça
            foi, o que é e o que ainda pode ser.
          </p>
          <p>
            Porque para nós, cada obra não é um fim. É o começo de uma nova
            história.
          </p>
        </div>
      </div> */}
    </div>
  );
}
