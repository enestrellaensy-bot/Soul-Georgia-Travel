import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Explore signature small-group routes through Georgia.",
};

export default function ToursLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
