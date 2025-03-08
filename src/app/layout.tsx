import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketVisa",
  description: "Transform your financial future with expert-led courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
