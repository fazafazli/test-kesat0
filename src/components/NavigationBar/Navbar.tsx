"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, type JSX } from "react";
import { BookImage, HelpCircle, MapPin, Menu, X, Target } from "lucide-react";
import Image from "next/image";
import "./Navbar.css";

export default function Navbar(): JSX.Element {
  const rawPathname = usePathname();
  const pathname =
    rawPathname !== "/" && rawPathname.endsWith("/")
      ? rawPathname.slice(0, -1)
      : rawPathname;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoToTop = (): void => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`navbar${scrolled ? " is-scrolled" : ""}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" onClick={handleGoToTop}>
          <Image src="/section2/logo.webp" alt="Logo Pionir Kesatria" width={46} height={40} />
          <span className="logo-text">PIONIR KESATRIA 2026</span>
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link href="/dokumentasi" className={pathname === "/dokumentasi" ? "active" : ""}>
              <BookImage size={16} />
              DOKUMENTASI
            </Link>
          </li>
          <li>
            <Link href="/game" className={pathname === "/game" ? "active" : ""}>
              <Target size={16} />
              GAME
            </Link>
          </li>
          <li>
            <Link href="/faq" className={pathname === "/faq" ? "active" : ""}>
              <HelpCircle size={16} />
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/peta" className={pathname === "/peta" ? "active" : ""}>
              <MapPin size={16} />
              PETA
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="hamburger"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="hamburger-icon-wrap">
            <X size={24} className={`hamburger-icon${isOpen ? " is-visible" : ""}`} />
            <Menu size={24} className={`hamburger-icon${isOpen ? "" : " is-visible"}`} />
          </span>
        </button>
      </div>

      <ul className={`navbar-menu-mobile${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
        <li>
          <Link
            href="/dokumentasi"
            onClick={() => setIsOpen(false)}
            className={pathname === "/dokumentasi" ? "active" : ""}
            tabIndex={isOpen ? 0 : -1}
          >
            <BookImage size={16} />
            DOKUMENTASI
          </Link>
        </li>
        <li>
          <Link
            href="/game"
            onClick={() => setIsOpen(false)}
            className={pathname === "/game" ? "active" : ""}
            tabIndex={isOpen ? 0 : -1}
          >
            <Target size={16} />
            GAME
          </Link>
        </li>
        <li>
          <Link
            href="/faq"
            onClick={() => setIsOpen(false)}
            className={pathname === "/faq" ? "active" : ""}
            tabIndex={isOpen ? 0 : -1}
          >
            <HelpCircle size={16} />
            FAQ
          </Link>
        </li>
        <li>
          <Link
            href="/peta"
            onClick={() => setIsOpen(false)}
            className={pathname === "/peta" ? "active" : ""}
            tabIndex={isOpen ? 0 : -1}
          >
            <MapPin size={16} />
            PETA
          </Link>
        </li>
      </ul>
    </nav>
  );
}