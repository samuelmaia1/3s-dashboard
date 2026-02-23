import { ReactNode } from "react";
import { Header } from "@components/Header/Header";

interface RootLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
