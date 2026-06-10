import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider } from "./preferences";

export const metadata: Metadata = {
  metadataBase: new URL("https://sakartvelo.travel"),
  title: {
    default: "Sakartvelo — авторские путешествия по Грузии",
    template: "%s | Sakartvelo",
  },
  description:
    "Авторские туры по Грузии: вино, гастрономия, история и небольшие группы.",
  keywords: [
    "авторские туры в Грузию",
    "вино-гастрономический тур Грузия",
    "Кахетия",
    "Уплисцихе",
    "мини-группа",
  ],
  openGraph: {
    title: "Sakartvelo — Грузия, которую проживают",
    description:
      "Вино-гастрономическое путешествие через Тбилиси, Мцхету, Кахетию, Болниси и Уплисцихе.",
    images: ["/georgia_hero.png"],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var language = localStorage.getItem("soul-georgia-language-v2");
                document.documentElement.dataset.language = language || "en";
                document.documentElement.lang = language || "en";
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
