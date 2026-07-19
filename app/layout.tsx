import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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

const firlest = localFont({
  src: "../public/fonts/firlest-regular.otf",
  display: "swap",
  variable: "--font-firlest",
});

export const metadata: Metadata = {
  title: "PIONIR KESATRIA 2026",
  description: "Website resmi kegiatan Pionir Kesatria 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${firlest.variable}`}>
      <body>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}