import type { Metadata } from "next";
import "./globals.css";
import "./components/NavigationBar/Navbar.css";

export const metadata: Metadata = {
  title: "PIONIR KESATRIA 2026",
  description: "Website resmi kegiatan Pionir Kesatria 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}