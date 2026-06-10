import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Soul Georgia Travel and discover how we create personal small-group journeys.",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
