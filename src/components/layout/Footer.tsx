"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRANDING } from "@/config/branding";
import { ShieldCheck, Info, ArrowUpRight, Loader2, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

type SubscribeState = "idle" | "submitting" | "success" | "error";

const FOOTER_LINKS = [
  {
    title: "Destinations",
    links: [
      { href: "/search?dest=Banff", label: "Banff National Park" },
      { href: "/search?dest=Canmore", label: "Canmore (Best Value)" },
      { href: "/search?dest=Lake+Louise", label: "Lake Louise" },
      { href: "/search?dest=Kananaskis", label: "Kananaskis Village" },
    ],
  },
  {
    title: "Decision Engine",
    links: [
      { href: "/search", label: "Accommodation Finder" },
      { href: "/itinerary", label: "AI Itinerary Builder" },
      { href: "/budget", label: "Trip Budget Calculator" },
      { href: "/advisories", label: "Parks Canada Rules & Passes" },
    ],
  },
  {
    title: "Trust & Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/disclaimer", label: "Affiliate Disclosure" },
    ],
  },
];

const FooterSection: React.FC<{ title: string; links: { href: string; label: string }[] }> = ({ title, links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#111111] sm:border-0">
      {/* Mobile accordion header */}
      <button
        className="sm:hidden w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <h3 className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest">{title}</h3>
        <ChevronDown className={`w-4 h-4 text-[#ADA89F] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {/* Desktop always visible, mobile toggles */}
      <div className={`space-y-3 pb-4 sm:pb-0 sm:block ${open ? "block" : "hidden"}`}>
        {/* Desktop heading */}
        <h3 className="hidden sm:block font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest mb-4">{title}</h3>
        <ul className="space-y-3">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-sm text-[#ADA89F] hover:text-[#C49A10] transition-colors block py-1">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SubscribeState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setErrorMessage("Please check the consent box to continue.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/leads/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consentGiven: consent, source: "footer_newsletter" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Temporary server error. Please try again later.");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Temporary server error. Please try again later.");
    }
  };

  return (
    <footer
      className="bg-[#080808] text-[#ADA89F] border-t border-[#C49A10]/15 pt-12 pb-6 font-sans"
      style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-0 sm:gap-8 lg:gap-10 pb-8 border-b border-[#111111]">
          
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2 space-y-6 pb-6 sm:pb-0 border-b border-[#111111] sm:border-0">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={BRANDING.logo.imagePath}
                  alt=""
                  aria-hidden="true"
                  width={32}
                  height={32}
                  className="object-contain mix-blend-lighten opacity-90"
                />
                <span className="font-sans text-lg font-bold tracking-widest uppercase text-[#F2EDE4]">
                  NEXORA<span className="text-[#C49A10]">GO</span> AI
                </span>
              </div>
              <p className="text-sm text-[#ADA89F] leading-relaxed max-w-md">
                {BRANDING.secondaryMessage} Designed for families, couples, and group travellers planning seamless Calgary-to-Rockies trips.
              </p>
              <div>
                <span className="nexora-pill">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A10]" aria-hidden="true" />
                  True Total Cost Guarantee
                </span>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="bg-[#111111] border border-[#1A1A1A] p-4 rounded-2xl space-y-3">
              <h4 className="text-[#F2EDE4] font-semibold text-sm">Join the NexoraGo List</h4>
              {status === "success" ? (
                <div aria-live="polite" className="flex items-start gap-2 text-[#C49A10] bg-[#C49A10]/10 p-3 rounded-xl border border-[#C49A10]/20">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <p className="text-sm">You're on the list. Watch your inbox for Rockies inspiration.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3" noValidate>
                  <div>
                    <label className="sr-only" htmlFor="footer-email">Email address</label>
                    <input
                      id="footer-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "submitting"}
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2EDE4] placeholder:text-[#5C5852] focus:outline-none focus:border-[#C49A10] disabled:opacity-50 transition-colors"
                      style={{ fontSize: "16px" /* prevent iOS auto-zoom */ }}
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center mt-0.5">
                      <input
                        type="checkbox"
                        id="footer-consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        disabled={status === "submitting"}
                        className="w-5 h-5 rounded accent-[#C49A10] cursor-pointer"
                        aria-describedby="footer-consent-desc"
                      />
                    </div>
                    <label id="footer-consent-desc" htmlFor="footer-consent" className="text-xs text-[#ADA89F] leading-relaxed cursor-pointer">
                      Send me NexoraGo trip inspiration, travel updates and occasional offers. I can unsubscribe at any time. See our{" "}
                      <Link href="/privacy" className="text-[#C49A10] hover:underline">Privacy Policy</Link>.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-nexora-fill-full"
                    aria-busy={status === "submitting"}
                  >
                    {status === "submitting" && (
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    )}
                    {status === "submitting" ? "Subscribing..." : "Subscribe"}
                  </button>
                  {status === "error" && (
                    <div
                      aria-live="assertive"
                      role="alert"
                      className="flex items-start gap-1.5 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Link columns — accordion on mobile, always visible on sm+ */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-6">
            {FOOTER_LINKS.map((section) => (
              <FooterSection key={section.title} title={section.title} links={section.links} />
            ))}
            {/* Admin link — subtle */}
            <div className="hidden sm:block">
              <Link href="/admin" className="text-[#5C5852] hover:text-[#ADA89F] text-xs flex items-center gap-1 mt-6">
                Admin <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Disclosure */}
        <div className="pt-6 space-y-4 text-xs text-[#5C5852]">
          <div className="bg-[#111111] p-4 rounded-2xl border border-[#C49A10]/15 flex gap-3 items-start">
            <Info className="w-4 h-4 text-[#C49A10] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-semibold text-[#ADA89F]">NEXORA Affiliate & Safety Transparency</p>
              <p className="text-sm leading-relaxed">{BRANDING.legal.affiliateDisclosure}</p>
              <p className="text-sm leading-relaxed">{BRANDING.legal.safetyDisclaimer}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#111111]">
            <p className="text-sm">© {new Date().getFullYear()} {BRANDING.legal.companyName}. All rights reserved.</p>
            <p className="font-mono text-[11px] text-[#ADA89F]">
              Engineered by <a href="https://nexorayyc.io" target="_blank" rel="noopener noreferrer" className="text-[#C49A10] font-bold hover:text-[#E5B830] transition-colors">NEXORA</a> for Canadian Rockies Travellers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
