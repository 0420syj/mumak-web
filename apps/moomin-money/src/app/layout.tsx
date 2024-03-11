import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR as NotoSansKR } from 'next/font/google';
import { ThemeProvider } from '@moomin-money/components/theme-provider';
import { Header } from '@moomin-money/components/header';

const notoSansKr = NotoSansKR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '빵빚무 가계부',
  description: '빵빚무 가계부',
  applicationName: '빵빚무 가계부',
  authors: {
    name: 'Wan Sim',
    url: 'https://wannysim.me',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={notoSansKr.className}>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 my-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
