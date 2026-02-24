import { ReactNode } from "react";
import { PublicHeader } from "@components/PublicHeader/PublicHeader";
import { PublicContent } from "@components/auth/PublicContent/PublicContent";

interface RootLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <>
      <PublicContent>{children}</PublicContent>
    </>
  );
}
