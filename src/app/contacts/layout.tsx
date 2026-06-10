import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts",
  description: "Contact Soul Georgia Travel or leave a travel request.",
};

export default function ContactsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
