import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О Soul Georgia Travel",
  description: "Камерные авторские путешествия по Грузии с полным сопровождением.",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
