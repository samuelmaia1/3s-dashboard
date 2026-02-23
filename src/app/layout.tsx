import { ThemeContextProvider } from "@/contexts/ThemeContext";
import "./globals.scss";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthContextProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
