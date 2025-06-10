import type { Metadata } from "next";
import MainLayout from '@/components/layouts/MainLayout'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs";


// Use www version since it's your canonical domain
const baseUrl = 'https://www.oneacademy.org/';
const title = "ONE.ORG One Academy";
const description = "ONE.org One-Academy is a platform for learning and sharing knowledge about global issues and solutions.";

export const metadata: Metadata = {
  title: "ONE.org One-Academy",
  description: "ONE.org One-Academy is a platform for learning and sharing knowledge about global issues and solutions.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ONE.org One-Academy',
    description: 'ONE.org One-Academy is a platform for learning and sharing knowledge about global issues and solutions.',
    url: 'https://www.oneacademy.org/',
    siteName: 'ONE.org One-Academy',
    images: [
      {
        url: 'https://www.oneacademy.org/one_logo/ONE_logo-black.png',
        width: 1200,
        height: 630,
        alt: 'ONE.org One-Academy',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONE.org One-Academy',
    description: 'ONE.org One-Academy is a platform for learning and sharing knowledge about global issues and solutions.',
    images: ['https://www.oneacademy.org/one_logo/ONE_logo-black.png'],
  },
  icons: {
    icon: [
      { url: './favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add script to detect touch devices early */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // Detect touch device early and add class to body
                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                  document.documentElement.classList.add('touch-device');
                } else {
                  document.documentElement.classList.add('no-touch-device');
                }
              } catch (e) {}
            })();
          `
        }} />
      </head>
      <body className="font-colfax">
				<ClerkProvider>
 					<ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <MainLayout>
            {children}
          </MainLayout>   
					</ThemeProvider>
					</ClerkProvider>
      </body>
    </html>
  );
}