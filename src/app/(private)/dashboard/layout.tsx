import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Visão geral do seu negócio",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}