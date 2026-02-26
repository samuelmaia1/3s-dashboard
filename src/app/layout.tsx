import { ThemeContextProvider } from "@/contexts/ThemeContext";
import "./globals.scss";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { FlashMessageProvider } from "@contexts/FlashMessageContext";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
      <body>
        <FlashMessageProvider>
          <AuthContextProvider>
            <ThemeContextProvider>{children}</ThemeContextProvider>
          </AuthContextProvider>
        </FlashMessageProvider>
      </body>
    </html>
  );
}
