import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Visão geral do seu negócio",
};

export default function OrdersLayoyt({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}