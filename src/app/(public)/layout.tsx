import { ReactNode } from "react";
import { PublicHeader } from "@components/PublicHeader/PublicHeader";

interface RootLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <>
      <PublicHeader />
      {children}
    </>
  );
}
