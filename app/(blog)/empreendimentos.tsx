"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { BuildingsQueryResult } from "@/sanity.types";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

gsap.registerPlugin([useGSAP]);

// const data = [
//   {
//     id: 1,
//     year: 2017,
//     title: "Joel Martins Residence",
//     description:
//       "Um residencial que marcou o início da trajetória da Martins Empreendimentos. Localizado no coração de Palhoça, o Joel Martins Residence entrega conforto, funcionalidade e um projeto pensado para o bem-estar das famílias.",
//     address: "R. Lorem Ipsum, 239 - Centro, Palhoça",
//     image: "",
//     type: "residencial",
//   },
//   {
//     id: 2,
//     year: 2018,
//     title: "Residencial Palhoça Garden",
//     description:
//       "O Palhoça Garden trouxe inovação e sofisticação para a cidade, oferecendo uma estrutura de lazer completa e um design moderno que atendeu as necessidades de muitas famílias.",
//     address: "R. Jardim das Flores, 105 - Palhoça",
//     image: "",
//     type: "residencial",
//   },
//   {
//     id: 3,
//     year: 2019,
//     title: "Edifício Central Park",
//     description:
//       "Com localização privilegiada, o Edifício Central Park se destaca pela sua arquitetura moderna e pelas opções de lazer e conforto para quem busca qualidade de vida.",
//     address: "Av. das Américas, 500 - Centro, Palhoça",
//     image: "",
//     type: "residencial",
//   },
//   {
//     id: 4,
//     year: 2020,
//     title: "Vila do Mar Residencial",
//     description:
//       "O Vila do Mar Residencial é um projeto que une qualidade e conforto, com vista para o mar e amplos espaços, oferecendo o equilíbrio perfeito entre lazer e tranquilidade.",
//     address: "R. Beira-Mar, 432 - Praia da Pinheira, Palhoça",
//     image: "",
//     type: "residencial",
//   },
//   {
//     id: 5,
//     year: 2021,
//     title: "Morro do Sol Residence",
//     description:
//       "Com uma localização estratégica no morro da cidade, o Morro do Sol Residence é um projeto inovador, que prioriza a sustentabilidade e o aproveitamento do clima local.",
//     address: "R. Sol Nascente, 123 - Morro do Meio, Palhoça",
//     image: "",
//     type: "residencial",
//   },
//   {
//     id: 6,
//     year: 2022,
//     title: "Viva Palhoça",
//     description:
//       "O Viva Palhoça é um residencial contemporâneo, que alia praticidade e conforto, com acesso rápido aos principais pontos da cidade e uma infraestrutura completa.",
//     address: "R. dos Pássaros, 87 - Centro, Palhoça",
//     image: "",
//     type: "residencial",
//   },
//   {
//     id: 7,
//     year: 2023,
//     title: "Residencial Horizonte Azul",
//     description:
//       "Com vista panorâmica e design sofisticado, o Horizonte Azul é ideal para quem busca um lugar tranquilo e com fácil acesso às principais vias da cidade.",
//     address: "Av. do Sol, 300 - Zona Sul, Palhoça",
//     image: "",
//     type: "residencial",
//   },
//   {
//     id: 8,
//     year: 2024,
//     title: "Solar das Palmeiras",
//     description:
//       "Um projeto arquitetônico que valoriza a estética e o bem-estar. O Solar das Palmeiras é um local onde conforto, beleza e praticidade se encontram.",
//     address: "R. Palmeiras, 150 - Bairro Estreito, Palhoça",
//     image: "",
//     type: "residencial",
//   },
//   {
//     id: 9,
//     year: 2025,
//     title: "Vila dos Sonhos",
//     description:
//       "O Vila dos Sonhos é o último projeto da Martins Empreendimentos, oferecendo um design inovador e várias opções de lazer para os moradores. Com uma localização privilegiada, promete ser o mais desejado da cidade.",
//     address: "R. Sonho Real, 200 - Centro, Palhoça",
//     image: "",
//     type: "residencial",
//   },
// ];

export default function Empreendimentos({
  data,
}: {
  data: BuildingsQueryResult;
}) {
  const [active, setActive] = useState(0);

  const imageRef = useRef(null);
  const infoRef = useRef(null);

  const handlePrevious = useCallback(() => {
    if (active > 0) {
      setActive(active - 1);
    }
  }, [active]);
  const handleNext = useCallback(() => {
    if (active < data.length - 1) {
      setActive(active + 1);
    }
  }, [active]);

  useGSAP(
    () => {
      gsap.from(imageRef.current, {
        top: "100%",
        delay: 0.3,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(infoRef.current, {
        opacity: 0,
        delay: 0.3,
        ease: "power3.out",
      });
    },
    { dependencies: [active], revertOnUpdate: true }
  );

  return (
    <section
      id="empreendimentos"
      className="h-screen min-h-fit max-h-[900px] container px-5 pt-10 mx-auto"
    >
      <h2 className="mx-auto w-fit text-white text-lg md:text-xl font-bold px-5 py-4 border border-green rounded-2xl">
        EMPREENDIMENTOS ENTREGUES
      </h2>

      <div className="mt-20 w-full min-h-[600px] flex flex-col lg:flex-row md:gap-10">
        <div className="text-white flex lg:flex-col gap-2 lg:gap-6 mr-auto font-semibold text-xl max-w-full max-lg:overflow-x-scroll">
          {[...new Set(data.map((proj) => new Date(proj.date).getFullYear()))]
            .sort()
            .map((date) => (
              <button
                onClick={() =>
                  setActive(
                    data.findIndex(
                      (d) => new Date(d.date).getFullYear() === date
                    )
                  )
                }
                className={
                  new Date(data[active].date).getFullYear() === date
                    ? "w-fit px-6 py-2 text-green bg-white/5 rounded-full border border-white/50"
                    : "text-white/50 border border-transparent hover:border-white/50 rounded-full w-fit px-6 py-2"
                }
                key={date}
              >
                {date}
              </button>
            ))}
        </div>
        <div className="flex-1 mt-10 lg:mt-0 text-white grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-5 lg:gap-10 p-5">
          <div className="flex flex-col">
            <div ref={infoRef}>
              <span className="uppercase w-fit bg-green text-dark-blue px-4 py-2 rounded-full">
                {data[active].type}
              </span>
              <h3 className="text-clamp-xl font-medium mt-12 leading-none">
                {data[active].title}
              </h3>
              <p className="mt-5 text-white/65 text-lg">
                {data[active].shortDescription}
              </p>
              <div className="mt-5 flex items-center gap-2 text-white/65">
                <MapPin />
                <span className="leading-none">{data[active].address}</span>
              </div>
            </div>
            <div className="mt-10 lg:mt-auto flex justify-between items-center">
              {active > 0 && (
                <button className="hover:underline" onClick={handlePrevious}>
                  {"<"} VER ANTERIOR
                </button>
              )}
              {active < data.length - 1 && (
                <button
                  className="hover:underline ml-auto"
                  onClick={handleNext}
                >
                  VER PRÓXIMO {">"}
                </button>
              )}
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div
              ref={imageRef}
              className="size-full absolute rounded-t-3xl overflow-hidden text-center"
            >
              <Image
                src={
                  urlForImage(data[active].image)
                    ?.width(800)
                    .height(800)
                    .url() as string
                }
                className="object-cover"
                alt={data[active].title}
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
