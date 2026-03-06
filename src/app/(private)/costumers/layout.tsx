import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Visão geral do seu negócio",
};

export default function CostumersLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}