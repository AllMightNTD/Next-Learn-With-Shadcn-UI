import ThemeProvider from "@/lib/context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <html lang="en">
          <body className={roboto.className}>
            <div className="min-h-[100vh]"> {children}</div>
          </body>
        </html>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
