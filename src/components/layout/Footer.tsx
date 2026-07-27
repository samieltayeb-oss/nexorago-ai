import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BRANDING } from "@/config/branding";
import { ShieldCheck, Heart, Info, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080808] text-[#ADA89F] border-t border-[#C49A10]/20 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1A1A1A]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
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

          {/* Destinations */}
          <div>
            <h3 className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest mb-4">
              Rockies Destinations
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/search?dest=Banff" className="hover:text-[#C49A10] transition-colors">
                  Banff National Park
                </Link>
              </li>
              <li>
                <Link href="/search?dest=Canmore" className="hover:text-[#C49A10] transition-colors">
                  Canmore (Best Value)
                </Link>
              </li>
              <li>
                <Link href="/search?dest=Lake+Louise" className="hover:text-[#C49A10] transition-colors">
                  Lake Louise
                </Link>
              </li>
              <li>
                <Link href="/search?dest=Dead+Mans+Flats" className="hover:text-[#C49A10] transition-colors">
                  Dead Man's Flats
                </Link>
              </li>
              <li>
                <Link href="/search?dest=Harvie+Heights" className="hover:text-[#C49A10] transition-colors">
                  Harvie Heights
                </Link>
              </li>
              <li>
                <Link href="/search?dest=Kananaskis" className="hover:text-[#C49A10] transition-colors">
                  Kananaskis Village
                </Link>
              </li>
              <li>
                <Link href="/search?dest=Golden" className="hover:text-[#C49A10] transition-colors">
                  Field & Golden, BC
                </Link>
              </li>
            </ul>
          </div>

          {/* Decision Tools */}
          <div>
            <h3 className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest mb-4">
              Decision Engine
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/search" className="hover:text-[#C49A10] transition-colors">
                  Accommodation Finder
                </Link>
              </li>
              <li>
                <Link href="/#town-comparison" className="hover:text-[#C49A10] transition-colors">
                  Canmore vs. Banff Analysis
                </Link>
              </li>
              <li>
                <Link href="/itinerary" className="hover:text-[#C49A10] transition-colors">
                  AI Itinerary Builder
                </Link>
              </li>
              <li>
                <Link href="/itinerary#calgary-departure" className="hover:text-[#C49A10] transition-colors">
                  Calgary Departure Planner
                </Link>
              </li>
              <li>
                <Link href="/budget" className="hover:text-[#C49A10] transition-colors">
                  Trip Budget Calculator
                </Link>
              </li>
              <li>
                <Link href="/advisories" className="hover:text-[#C49A10] transition-colors">
                  Parks Canada Rules & Passes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest mb-4">
              Trust & Legal
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#C49A10] transition-colors">
                  Privacy Policy (PIPEDA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C49A10] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#C49A10] transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/advisories" className="hover:text-[#C49A10] transition-colors">
                  Outdoor Safety Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#5C5852] hover:text-[#ADA89F] transition-colors text-xs flex items-center gap-1 mt-3">
                  Admin Portal <ArrowUpRight className="w-3 h-3" />
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
