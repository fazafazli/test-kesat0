import type { Metadata } from "next";
import { Poppins, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "../src/components/NavigationBar/Navbar.css";
import "../src/components/audio/AudioButton.css";
import { AudioProvider } from "../src/components/audio/AudioProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
});

const firlest = localFont({
  src: "../public/fonts/firlest-regular.otf",
  display: "swap",
  variable: "--font-firlest",
});

export const metadata: Metadata = {
  title: "PIONIR KESATRIA 2026",
  description: "Website resmi kegiatan Pionir Kesatria 2026",
  openGraph: {
    title: "PIONIR KESATRIA 2026",
    description: "Website resmi kegiatan Pionir Kesatria 2026",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "PIONIR KESATRIA 2026",
    description: "Website resmi kegiatan Pionir Kesatria 2026",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${ebGaramond.variable} ${firlest.variable}`}>
      <body>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}