import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/util";
import { ToastProvider } from "@/components/Common/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Packr | Smarter Trip Packing Lists",
  description: "Guided wizard for building personalized travel packing checklists."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background text-foreground", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">{children}</div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
