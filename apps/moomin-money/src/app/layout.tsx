import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "빵빚무 가계부",
};

export const viewport: Viewport = {
  themeColor: "#024280",
  initialScale: 1,
  width: "device-width",
  height: "device-height",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
