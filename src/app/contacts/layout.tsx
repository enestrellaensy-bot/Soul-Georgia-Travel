import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Связаться с командой авторских путешествий по Грузии.",
};

export default function ContactsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
