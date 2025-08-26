import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../contexts/ThemeContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MindTracking",
  description: "Aplicação de rastreamento mental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen">
            <main className="flex-1 ml-16 md:ml-37.5 transition-all duration-300">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
