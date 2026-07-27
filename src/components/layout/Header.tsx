"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRANDING } from "@/config/branding";
import { Compass, MapPin, Calendar, Calculator, ShieldAlert, Globe, Menu, X, User } from "lucide-react";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080808]/90 backdrop-blur-md border-b border-[#C49A10]/20 shadow-nexora">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Official NEXORA Logo & Product Name */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image
              src={BRANDING.logo.imagePath}
              alt="NEXORA Logo"
              width={40}
              height={40}
              className="object-contain mix-blend-lighten group-hover:scale-105 transition-transform"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xl font-bold tracking-widest uppercase text-[#F2EDE4]">
                NEXORA<span className="text-[#C49A10]">GO</span>
              </span>
              <span className="nexora-pill">
                AI
              </span>
            </div>
            <p className="font-mono text-[9px] text-[#ADA89F] tracking-widest uppercase hidden sm:block">
              {BRANDING.tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/search"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ADA89F] hover:text-[#C49A10] transition-colors"
          >
            <Compass className="w-4 h-4 text-[#C49A10]" />
            Find Stays
          </Link>
          <Link
            href="/#town-comparison"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ADA89F] hover:text-[#C49A10] transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#C49A10]" />
            Town Decision
          </Link>
          <Link
            href="/itinerary"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ADA89F] hover:text-[#C49A10] transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#C49A10]" />
            AI Itinerary
          </Link>
          <Link
            href="/budget"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ADA89F] hover:text-[#C49A10] transition-colors"
          >
            <Calculator className="w-4 h-4 text-[#C49A10]" />
            Budget Planner
          </Link>
          <Link
            href="/advisories"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ADA89F] hover:text-[#C49A10] transition-colors"
          >
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            Park Rules
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#ADA89F] hover:text-[#F2EDE4] bg-[#111111] border border-[#C49A10]/20 px-3 py-2 rounded transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#C49A10]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <Link
            href="/search"
            className="btn-nexora-fill"
          >
            Plan Your Trip
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded text-[#F2EDE4] hover:bg-[#111111] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#C49A10]" /> : <Menu className="w-6 h-6 text-[#C49A10]" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080808] border-b border-[#C49A10]/20 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded hover:bg-[#111111] text-[#F2EDE4] font-mono text-xs uppercase tracking-wider"
          >
            <Compass className="w-4 h-4 text-[#C49A10]" />
            Find Stays & Rates
          </Link>
          <Link
            href="/itinerary"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded hover:bg-[#111111] text-[#F2EDE4] font-mono text-xs uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4 text-[#C49A10]" />
            AI Daily Itinerary
          </Link>
          <Link
            href="/budget"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded hover:bg-[#111111] text-[#F2EDE4] font-mono text-xs uppercase tracking-wider"
          >
            <Calculator className="w-4 h-4 text-[#C49A10]" />
            Trip Budget Calculator
          </Link>
          <Link
            href="/advisories"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded hover:bg-[#111111] text-[#F2EDE4] font-mono text-xs uppercase tracking-wider"
          >
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            Park Rules & Advisories
          </Link>
          <div className="pt-3 border-t border-[#111111] flex items-center justify-between">
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="flex items-center gap-2 text-xs font-mono text-[#ADA89F]"
            >
              <Globe className="w-4 h-4 text-[#C49A10]" /> Language: {lang === "en" ? "English" : "Français"}
            </button>
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-xs font-mono text-[#C49A10] uppercase"
            >
              <User className="w-4 h-4" /> Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
