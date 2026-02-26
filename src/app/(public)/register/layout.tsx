import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Criar Conta",
  description: "Crie uma nova conta",
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}