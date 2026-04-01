import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Aluguéis",
  description: "Visão geral do seu negócio",
};

export default function RentsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}