import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SanityLive } from "@/sanity/lib/live";
import MainLayout from '@/components/layouts/MainLayout'
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "ONE ACADEMY",
  description: "By ONE.ORG",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen flex flex-col">
          
          <MainLayout>{children}</MainLayout> 
        </div>
      </ThemeProvider>

      <SanityLive />
    </ClerkProvider>
  );
}