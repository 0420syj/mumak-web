import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { ThemeProvider } from "@moomin-money/components/theme-provider";
import { SiteHeader } from "@moomin-money/components/header";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

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
    <html lang="ko" suppressHydrationWarning>
      <body className={notoSansKr.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
