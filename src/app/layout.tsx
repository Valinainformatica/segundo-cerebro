import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Segundo Cerebro",
  description: "Base de conocimiento - Valiña Informática",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-[#0a0a0a] text-[#e5e5e5] font-[family-name:var(--font-inter)]`}
      >
        {children}
      </body>
    </html>
  );
}
