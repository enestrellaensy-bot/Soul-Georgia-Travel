import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Истории гостей",
  description: "Впечатления гостей от путешествий по Тбилиси, Кахетии и Казбеги.",
};

export default function ReviewsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
