"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRANDING } from "@/config/branding";
import {
  Compass,
  Calendar,
  Calculator,
  ShieldAlert,
  Globe,
  Menu,
  X,
  Home,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Plan a Trip", icon: Home },
  { href: "/search", label: "Find Stays", icon: Compass },
  { href: "/itinerary", label: "AI Itinerary", icon: Calendar },
  { href: "/budget", label: "Budget Planner", icon: Calculator },
  { href: "/advisories", label: "Park Rules", icon: ShieldAlert },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
    return () => document.body.classList.remove("scroll-locked");
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const firstLink = drawerRef.current?.querySelector("a");
      setTimeout(() => firstLink?.focus(), 50);
    }
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-md border-b border-[#C49A10]/15 shadow-nexora"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="NexoraGo AI home">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BRANDING.logo.imagePath}
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                className="object-contain mix-blend-lighten group-hover:scale-105 transition-transform w-full h-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-base sm:text-lg font-bold tracking-widest uppercase text-[#F2EDE4] leading-none">
                  NEXORA<span className="text-[#C49A10]">GO</span>
                </span>
                <span className="nexora-pill hidden xs:inline-flex text-[9px]">AI</span>
              </div>
              <p className="font-mono text-[8px] text-[#ADA89F] tracking-widest uppercase hidden sm:block leading-none mt-0.5">
                {BRANDING.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest transition-colors ${
                  isActive(href) ? "text-[#C49A10]" : "text-[#ADA89F] hover:text-[#C49A10]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${href === "/advisories" ? "text-amber-500" : "text-[#C49A10]"}`} aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#ADA89F] hover:text-[#F2EDE4] bg-[#111111] border border-[#C49A10]/20 px-3 py-2 rounded transition-colors"
              aria-label={`Language: ${lang === "en" ? "English" : "Français"}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#C49A10]" aria-hidden="true" />
              <span>{lang.toUpperCase()}</span>
            </button>
            <Link href="/search" className="btn-nexora-fill">
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden touch-target rounded-xl text-[#F2EDE4] hover:bg-[#111111] transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen
              ? <X className="w-6 h-6 text-[#C49A10]" aria-hidden="true" />
              : <Menu className="w-6 h-6 text-[#C49A10]" aria-hidden="true" />
            }
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 animate-backdrop lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#080808] border-l border-[#C49A10]/15 z-50 flex flex-col animate-slide-in-right lg:hidden"
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] shrink-0">
            <span className="font-sans text-sm font-bold tracking-widest uppercase text-[#F2EDE4]">
              NEXORA<span className="text-[#C49A10]">GO</span>
            </span>
            <button
              onClick={closeMenu}
              className="touch-target rounded-xl text-[#ADA89F] hover:text-[#F2EDE4] hover:bg-[#111111] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isActive(href) ? "page" : undefined}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-sans text-sm font-semibold transition-all ${
                  isActive(href)
                    ? "bg-[#C49A10]/10 text-[#C49A10] border border-[#C49A10]/20"
                    : "text-[#ADA89F] hover:bg-[#111111] hover:text-[#F2EDE4]"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${href === "/advisories" ? "text-amber-500" : "text-[#C49A10]"}`} aria-hidden="true" />
                <span>{label}</span>
                {isActive(href) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C49A10]" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>

          <div className="px-6 py-4 border-t border-[#1A1A1A] space-y-3 shrink-0">
            <Link href="/search" onClick={closeMenu} className="btn-nexora-fill-full">
              Plan Your Trip
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="w-full flex items-center justify-center gap-2 text-xs font-mono text-[#ADA89F] hover:text-[#F2EDE4] py-2 transition-colors"
            >
              <Globe className="w-4 h-4 text-[#C49A10]" aria-hidden="true" />
              {lang === "en" ? "Switch to Français" : "Switch to English"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
