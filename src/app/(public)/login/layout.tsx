import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}