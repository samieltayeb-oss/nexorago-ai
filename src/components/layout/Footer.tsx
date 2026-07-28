"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRANDING } from "@/config/branding";
import { ShieldCheck, Heart, Info, ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type SubscribeState = "idle" | "submitting" | "success" | "error";

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
      setErrorMessage("Please check the box to provide consent.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consentGiven: consent, source: "footer_newsletter" })
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        setStatus("error");
        // Handle rate limit (429) specifically if we add it later
        setErrorMessage(data.error || "Temporary server error. Please try again later.");
      } else {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Temporary server error. Please try again later.");
    }
  };

  return (
    <footer className="bg-[#080808] text-[#ADA89F] border-t border-[#C49A10]/20 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#1A1A1A]">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image
                    src={BRANDING.logo.imagePath}
                    alt="NEXORA Logo"
                    width={36}
                    height={36}
                    className="object-contain mix-blend-lighten"
                  />
                </div>
                <span className="font-sans text-xl font-bold tracking-widest uppercase text-[#F2EDE4]">
                  NEXORA<span className="text-[#C49A10]">GO</span> AI
                </span>
              </div>
              <p className="text-xs text-[#ADA89F] max-w-md leading-relaxed">
                {BRANDING.secondaryMessage} Designed by NEXORA for families, couples, and group travellers planning seamless Calgary-to-Rockies trips.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <span className="nexora-pill">
                  <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-[#C49A10]" />
                  True Total Cost Guarantee
                </span>
              </div>
            </div>

            {/* Subscription Form */}
            <div className="bg-[#111111] border border-[#1A1A1A] p-4 rounded-xl space-y-3">
              <h4 className="text-[#F2EDE4] font-semibold text-sm">Join the NexoraGo List</h4>
              
              {status === "success" ? (
                <div aria-live="polite" className="flex items-start gap-2 text-[#C49A10] bg-[#C49A10]/10 p-3 rounded-lg border border-[#C49A10]/20">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm">You're on the list. Watch your inbox for Canadian Rockies inspiration from NexoraGo.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "submitting"}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-sm text-[#F2EDE4] focus:outline-none focus:border-[#C49A10] disabled:opacity-50"
                  />
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      disabled={status === "submitting"}
                      className="mt-1 shrink-0 accent-[#C49A10]"
                    />
                    <label htmlFor="consent" className="text-[10px] text-[#ADA89F] leading-tight">
                      Send me NexoraGo trip inspiration, travel updates and occasional offers. I can unsubscribe at any time.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full btn-nexora-fill py-2 text-sm flex justify-center items-center gap-2"
                  >
                    {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
                    Subscribe
                  </button>
                  {status === "error" && (
                    <div aria-live="assertive" className="flex items-start gap-1.5 text-red-400 text-xs mt-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Destinations */}
          <div className="lg:col-span-1">
            <h3 className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest mb-4">
              Destinations
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/search?dest=Banff" className="hover:text-[#C49A10]">Banff National Park</Link></li>
              <li><Link href="/search?dest=Canmore" className="hover:text-[#C49A10]">Canmore (Best Value)</Link></li>
              <li><Link href="/search?dest=Lake+Louise" className="hover:text-[#C49A10]">Lake Louise</Link></li>
              <li><Link href="/search?dest=Kananaskis" className="hover:text-[#C49A10]">Kananaskis Village</Link></li>
            </ul>
          </div>

          {/* Decision Tools */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest mb-4">
              Decision Engine
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/search" className="hover:text-[#C49A10]">Accommodation Finder</Link></li>
              <li><Link href="/itinerary" className="hover:text-[#C49A10]">AI Itinerary Builder</Link></li>
              <li><Link href="/budget" className="hover:text-[#C49A10]">Trip Budget Calculator</Link></li>
              <li><Link href="/advisories" className="hover:text-[#C49A10]">Parks Canada Rules & Passes</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="lg:col-span-1">
            <h3 className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest mb-4">
              Trust & Legal
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/privacy" className="hover:text-[#C49A10]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#C49A10]">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[#C49A10]">Affiliate Disclosure</Link></li>
              <li>
                <Link href="/admin" className="text-[#5C5852] hover:text-[#ADA89F] text-xs flex items-center gap-1 mt-3">
                  Admin <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclosures & Copyright */}
        <div className="pt-8 space-y-4 text-xs text-[#5C5852]">
          <div className="bg-[#111111] p-4 rounded-xl border border-[#C49A10]/20 flex gap-3 items-start">
            <Info className="w-4 h-4 text-[#C49A10] shrink-0 mt-0.5" />
            <div className="space-y-1 text-slate-300">
              <p className="font-semibold text-[#F2EDE4]">NEXORA Affiliate & Safety Transparency</p>
              <p>{BRANDING.legal.affiliateDisclosure}</p>
              <p>{BRANDING.legal.safetyDisclaimer}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1A1A1A]">
            <p>© {new Date().getFullYear()} {BRANDING.legal.companyName}. All rights reserved.</p>
            <p className="flex items-center gap-1 text-[#ADA89F] font-mono text-[10px]">
              Engineered by <span className="text-[#C49A10] font-bold">NEXORA</span> for Canadian Rockies Travellers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
