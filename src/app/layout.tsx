import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your daily expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <h1 className="text-xl font-bold text-gray-900">
              Expense Tracker
            </h1>
          </div>
        </nav>
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
