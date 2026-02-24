import { ReactNode } from "react";
import { ProtectedContent } from "@components/auth/ProtectedContent/ProtectedContent";

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
