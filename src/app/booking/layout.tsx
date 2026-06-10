import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обсудить поездку",
  description:
    "Оставьте заявку на камерное путешествие по Грузии. Личный разговор перед бронированием, группа до восьми гостей.",
};

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
