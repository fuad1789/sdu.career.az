import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SDU Karyera Portalı - Sumqayıt Dövlət Universiteti",
  description:
    "Sumqayıt Dövlət Universitetinin Karyera və Məzunlarla İş Mərkəzi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

