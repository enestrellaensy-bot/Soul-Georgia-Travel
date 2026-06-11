import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { PreferencesProvider } from "./preferences";

const manrope = localFont({
  src: "../../public/fonts/manrope-variable.woff2",
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soul-georgia-travel.vercel.app"),
  title: {
    default: "Soul Georgia Travel — авторские туры по Грузии",
    template: "%s | Soul Georgia Travel",
  },
  description:
    "Авторские путешествия по Грузии: небольшие группы, продуманные маршруты, культура, кухня, вино и природа.",
  keywords: [
    "Georgia tours",
    "small group tours Georgia",
    "wine tour Georgia",
    "gastronomy tour Georgia",
    "Soul Georgia Travel",
  ],
  openGraph: {
    title: "Soul Georgia Travel — авторские туры по Грузии",
    description:
      "Небольшие группы, продуманные маршруты и настоящая Грузия — от Тбилиси до гор и виноградников.",
    images: [{ url: "/home-hero.webp", width: 1200, height: 630, alt: "Soul Georgia Travel" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Georgia Travel — авторские туры по Грузии",
    description: "Небольшие группы и продуманные путешествия по Грузии.",
    images: ["/home-hero.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={manrope.variable}>
      <body>
        <Script
          id="lang-script"
          strategy="beforeInteractive"
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
        <PreferencesProvider>{children}</PreferencesProvider>
        <footer className="site-footer site-footer-minimal global-site-footer">
          <span className="footer-copyright">© 2025–2026 Soul Georgia Travel™</span>
        </footer>
      </body>
    </html>
  );
}
