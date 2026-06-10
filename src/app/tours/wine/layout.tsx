import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wine & Gastronomy Tour",
  description:
    "A seven-day small-group journey through Tbilisi, Mtskheta, Kakheti, Bolnisi and Uplistsikhe.",
};

export default function WineTourLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
