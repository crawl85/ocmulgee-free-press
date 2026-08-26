import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Ocmulgee Free Press",
    template: "%s | The Ocmulgee Free Press",
  },
  description: "Independent public-interest journalism serving Macon-Bibb and Middle Georgia.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "The Ocmulgee Free Press",
    title: "The Ocmulgee Free Press",
    description: "Independent public-interest journalism serving Macon-Bibb and Middle Georgia.",
    images: [
      {
        url: "/images/ocmulgee-free-press-logo.png",
        width: 1200,
        height: 400,
        alt: "The Ocmulgee Free Press",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ocmulgee Free Press",
    description: "Independent public-interest journalism serving Macon-Bibb and Middle Georgia.",
    images: ["/images/ocmulgee-free-press-logo.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
        <script async src="https://news.google.com/swg/js/v1/publisher.js" />
      </head>
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <Header />
        <div id="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
