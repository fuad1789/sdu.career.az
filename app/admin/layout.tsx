import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - SDU Karyera Portalı",
  description: "SDU Karyera Portalı İdarəetmə Paneli",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

