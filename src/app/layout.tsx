import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevStash",
  description: "Centralized Developer Knowledge Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#f0f0f0] antialiased">{children}</body>
    </html>
  );
}
