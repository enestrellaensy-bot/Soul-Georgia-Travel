import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description: "Original messages and stories from Soul Georgia Travel guests.",
};

export default function ReviewsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
