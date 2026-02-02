import "../globals.css";

import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || "Martins Empreendimentos";
  const description = settings?.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description && toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

import localFont from "next/font/local";

const gotham = localFont({
  src: [
    { path: "./fonts/Gotham-Bold.ttf", style: "normal", weight: "700" },
    { path: "./fonts/Gotham-BoldItalic.ttf", style: "italic", weight: "700" },
    { path: "./fonts/Gotham-Book.ttf", style: "normal", weight: "400" },
    { path: "./fonts/Gotham-BookItalic.ttf", style: "italic", weight: "400" },
    { path: "./fonts/Gotham-Light.ttf", style: "normal", weight: "300" },
    { path: "./fonts/Gotham-LightItalic.ttf", style: "italic", weight: "300" },
    { path: "./fonts/Gotham-Medium.ttf", style: "normal", weight: "500" },
    {
      path: "./fonts/Gotham-MediumItalic.ttf",
      style: "italic",
      weight: "500",
    },
    { path: "./fonts/Gotham-Medium_1.ttf", style: "normal", weight: "500" },
  ],
  variable: "--font-gotham",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });

  return (
    <html lang="en" className={`${gotham.variable} bg-white text-black`}>
      <body className="bg-dark-blue flex flex-col">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
