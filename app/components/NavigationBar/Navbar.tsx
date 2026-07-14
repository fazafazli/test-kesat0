"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookImage,
  HelpCircle,
  MapPin,
  Menu,
  X,
  Target,
} from "lucide-react";
import Image from "next/image";
import "./Navbar.css";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoToTop = (): void => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{
        opacity: 1,
        y: 0,
        borderRadius: scrolled ? "16px" : "0 0 16px 16px",
        margin: scrolled ? "12px 24px 0 24px" : "0",
        width: scrolled ? "calc(100% - 48px)" : "100%",
        top: scrolled ? "12px" : "0px",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo" onClick={handleGoToTop}>
          <Image
            src="/section1/LogoKesatria.svg"
            alt="Logo Pionir Kesatria"
            width={40}
            height={40}
          />
          <span className="logo-text">PIONIR KESATRIA 2026</span>
        </Link>

        {/* Menu Desktop */}
        <ul className="navbar-menu">
          {/* <li>
            <Link href="/" onClick={handleGoToTop}>
              <Home size={16} />
              BERANDA
            </Link>
          </li> */}
          <li>
            <Link href="/dokumentasi">
              <BookImage size={16} />
              DOKUMENTASI
            </Link>
          </li>
          <li>
            <Link href="/game">
              <Target size={16} />
              GAME
            </Link>
          </li>
          <li>
            <Link href="/faq">
              <HelpCircle size={16} />
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/peta">
              <MapPin size={16} />
              PETA
            </Link>
          </li>
        </ul>

        {/* Tombol Hamburger */}
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ display: "flex" }}
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ display: "flex" }}
              >
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="navbar-menu-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* <li>
              <Link href="/" onClick={handleGoToTop}>
                <Home size={16} />
                BERANDA
              </Link>
            </li> */}
            <li>
              <Link href="/dokumentasi" onClick={() => setIsOpen(false)}>
                <BookImage size={16} />
                DOKUMENTASI
              </Link>
            </li>
            <li>
              <Link href="/game" onClick={() => setIsOpen(false)}>
                <Target size={16} />
                GAME
              </Link>
            </li>
            <li>
              <Link href="/faq" onClick={() => setIsOpen(false)}>
                <HelpCircle size={16} />
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/peta" onClick={() => setIsOpen(false)}>
                <MapPin size={16} />
                PETA
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}