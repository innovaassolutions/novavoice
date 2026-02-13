import ClientLayout from "../components/ClientLayout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChakraProviders from "../components/ChakraProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NovaVoice - AI Phone Agent | Never Miss a Call Again",
    template: "%s | NovaVoice",
  },
  description:
    "NovaVoice is an AI phone agent that answers every call, books appointments, and never misses a business opportunity — 24/7/365. Built for restaurants, home services, healthcare, and more.",
  keywords: [
    "AI phone agent",
    "AI receptionist",
    "automated phone answering",
    "appointment booking AI",
    "NovaVoice",
    "business phone automation",
    "missed calls solution",
    "24/7 call answering",
    "AI voice agent",
    "small business phone",
    "Innovaas Solutions",
  ],
  metadataBase: new URL("https://novavoice.innovaas.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NovaVoice - AI Phone Agent | Never Miss a Call Again",
    description:
      "AI phone agents that answer every call, book appointments, and never miss a business opportunity — 24/7/365.",
    url: "https://novavoice.innovaas.co",
    siteName: "NovaVoice",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/NovaVoiceHero.png",
        width: 1200,
        height: 630,
        alt: "NovaVoice – AI Phone Agent for Small Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaVoice - AI Phone Agent | Never Miss a Call Again",
    description:
      "AI phone agents that answer every call, book appointments, and never miss a business opportunity — 24/7/365.",
    images: ["/NovaVoiceHero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "NovaVoice",
  description:
    "AI phone agent that answers every call, books appointments, and never misses a business opportunity — 24/7/365.",
  url: "https://novavoice.innovaas.co",
  brand: {
    "@type": "Organization",
    name: "Innovaas Solutions",
    url: "https://innovaas.co",
  },
  offers: {
    "@type": "Offer",
    price: "639",
    priceCurrency: "USD",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0d1a21" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ChakraProviders>
          <Header />
          <ClientLayout>
            {children}
          </ClientLayout>
          <Footer />
        </ChakraProviders>
      </body>
    </html>
  );
}
