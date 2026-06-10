import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider } from "./preferences";

export const metadata: Metadata = {
  metadataBase: new URL("https://soul-georgia-travel.vercel.app"),
  title: {
    default: "Soul Georgia Travel",
    template: "%s | Soul Georgia Travel",
  },
  description:
    "Small-group journeys through Georgia, shaped around its people, food, wine, history and landscapes.",
  keywords: [
    "Georgia tours",
    "small group tours Georgia",
    "wine tour Georgia",
    "gastronomy tour Georgia",
    "Soul Georgia Travel",
  ],
  openGraph: {
    title: "Soul Georgia Travel",
    description:
      "Thoughtful small-group journeys through Georgia with personal support from arrival to departure.",
    images: ["/home-hero.webp"],
    locale: "en_US",
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
