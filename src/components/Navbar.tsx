"use client";

import { useEffect, useState } from "react";
import { navLinks, storeInfo } from "@/utils/siteContent";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <a className="navbar__brand" href="#home" aria-label={`${storeInfo.name} home`}>
        <span className="navbar__mark" aria-hidden="true" />
        <span className="navbar__brand-text">
          <span>{storeInfo.name}</span>
          <span>Cycle House</span>
        </span>
      </a>

      <nav className="navbar__links" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="navbar__cta" href={storeInfo.mapUrl} target="_blank" rel="noreferrer">
        Get directions
      </a>

      <button
        className="navbar__menu"
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div className={`mobile-drawer ${isOpen ? "mobile-drawer--open" : ""}`}>
        {navLinks.map((link) => (
          <a href={link.href} key={link.href} onClick={() => setIsOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href={storeInfo.mapUrl} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
          Get directions
        </a>
      </div>
    </header>
  );
}
