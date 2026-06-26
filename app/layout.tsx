import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LINEALIGN | Clear. Comfort. Confident.",
  description: "LINEALIGN offers orthodontic invisible clear aligners. Redesigning comfort, aesthetics, and precision orthodontic movement. We support aligner practice globally with online marketing, treatment simulations, and tracking.",
  keywords: "orthodontic aligners, clear aligners, invisible braces, teeth alignment, Vadodara, dental solutions, Linealign",
  metadataBase: new URL("https://linealign.com"),
  openGraph: {
    title: "LINEALIGN | Clear. Comfort. Confident.",
    description: "Reimagining orthodontic care with premium, invisible, and state-of-the-art clear aligners.",
    url: "https://linealign.com",
    siteName: "LINEALIGN",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "LINEALIGN logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LINEALIGN | Clear. Comfort. Confident.",
    description: "Reimagining orthodontic care with premium, invisible, and state-of-the-art clear aligners.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body 
        className="min-h-full flex flex-col bg-white text-dark select-text font-sans"
        suppressHydrationWarning={true}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
