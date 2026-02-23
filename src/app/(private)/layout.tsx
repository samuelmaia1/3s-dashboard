import { ReactNode } from "react";
import { Header } from "@components/Header/Header";
import { ProtectedContent } from "@components/ProtectedContent/ProtectedContent";
import Sidebar from "@components/Sidebar/Sidebar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({
  children,
}: Readonly<RootLayoutProps>) {

  return (
    <>
      <ProtectedContent>{children}</ProtectedContent>
    </>
  );
}
