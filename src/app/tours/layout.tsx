import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наши туры — вино и гастрономия Грузии",
  description:
    "Вино-гастрономический тур по Грузии на 7 дней: Тбилиси, Мцхета, Кахетия, Болниси и Уплисцихе.",
};

export default function ToursLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
