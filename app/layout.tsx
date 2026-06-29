import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "LINEALIGN DENTAL LAB | Premium Clear Aligners",
  description: "LINEALIGN DENTAL LAB is a premium clear aligner laboratory in Kasaragod, Kerala. We provide advanced orthodontic invisible aligners, CAD/CAM 3D simulations, and clinician support.",
  keywords: "orthodontic aligners, clear aligners, invisible braces, teeth alignment, Kasaragod, Kerala, dental solutions, Linealign Dental Lab, dental laboratory",
  metadataBase: new URL("https://linealign.com"),
  openGraph: {
    title: "LINEALIGN DENTAL LAB | Premium Clear Aligners",
    description: "Premium clear aligner laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.",
    url: "https://linealign.com",
    siteName: "Linealign Dental Lab",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 600,
        alt: "LINEALIGN Dental Lab logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LINEALIGN DENTAL LAB | Premium Clear Aligners",
    description: "Premium clear aligner laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.",
    images: ["/logo.jpeg"],
  },
};

import AuthProvider from "@/components/AuthProvider";
import { getSiteSettings, getNavbarConfig } from "@/app/actions/cms-actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch configurations dynamically
  const [settings, navbar] = await Promise.all([
    getSiteSettings(),
    getNavbarConfig(),
  ]);

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
        <AuthProvider>
          <Header config={navbar} settings={settings} />
          <main className="flex-grow">{children}</main>
          <Footer settings={settings} />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
