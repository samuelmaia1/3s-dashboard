import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contratos",
  description: "Visão geral do seu negócio",
};

export default function ContractsLayoyt({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}