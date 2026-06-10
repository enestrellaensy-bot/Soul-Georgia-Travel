import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Places, landscapes and moments from journeys through Georgia.",
};

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
