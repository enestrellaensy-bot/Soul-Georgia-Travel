import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тур «Знакомство с Грузией»",
  description:
    "Восьмидневный тур по Тбилиси, Мцхете, Кахетии, Казбеги и Боржоми.",
};

export default function DiscoverGeorgiaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
