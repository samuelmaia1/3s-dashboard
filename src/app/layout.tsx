import { ThemeContextProvider } from "@/contexts/ThemeContext";
import "./globals.scss";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) 
{

  return (
    <html lang="pt-BR">
      <body>
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
