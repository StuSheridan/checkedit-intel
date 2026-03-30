import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Checkedit Intel",
  description: "Your compliance intelligence centre — powered by PolicyPulse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container px-4 sm:px-6 py-6 pb-24 lg:pb-6">
            <div className="mx-auto">
              {children}
            </div>
          </main>
          <MobileNav />
          <Footer />
        </div>
      </body>
    </html>
  );
}
