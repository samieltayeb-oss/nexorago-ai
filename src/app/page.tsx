"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TripWizard } from "@/components/wizard/TripWizard";
import { TownComparisonSection } from "@/components/search/TownComparisonSection";
import { BRANDING } from "@/config/branding";
import {
  Sparkles,
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Users,
  Car,
  ChevronRight,
  HelpCircle,
  Mail,
  ShieldAlert,
  Award,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F2EDE4] space-y-20 pb-20 font-sans">
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#080808] via-[#111111] to-[#080808]">
        {/* Subtle Radial Mesh Gradient */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_70%_60%_at_50%_20%,#C49A10,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(196,154,16,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(196,154,16,.05)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Hero Headline */}
          <div className="text-center space-y-6 max-w-4xl mx-auto pt-4">
            <div className="inline-flex items-center gap-2 bg-[#111111] px-4 py-1.5 rounded-full border border-[#C49A10]/30 text-xs font-mono text-[#C49A10] uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#E5B830] animate-pulse" />
              <span>{BRANDING.productName} — Canadian Rockies AI Concierge</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-tight leading-none text-[#F2EDE4]">
              Plan the Rockies Smarter. <br />
              <span className="font-serif italic text-gradient-gold">
                Stay Better. Spend Less.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#ADA89F] max-w-2xl mx-auto font-light leading-relaxed">
              {BRANDING.secondaryMessage} Compare true total stay costs, find best-value bases near Banff, and build personalized itineraries.
            </p>
          </div>

          {/* Conversational Trip Wizard Container */}
          <TripWizard />
        </div>
      </section>

      {/* 2. HOW IT WORKS (3 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="nexora-pill">
            Simple 3-Step Process
          </span>
          <h2 className="text-4xl font-serif font-light text-[#F2EDE4]">
            How NexoraGo AI Elevates Your Trip
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111111] rounded-3xl p-8 border border-[#C49A10]/20 space-y-4 relative group hover:-translate-y-1 transition-all shadow-nexora">
            <div className="w-12 h-12 rounded-xl bg-[#080808] border border-[#C49A10]/40 text-[#C49A10] font-mono font-bold text-xl flex items-center justify-center shadow">
              01
            </div>
            <h3 className="text-2xl font-serif font-light text-[#F2EDE4]">
              Group & Travel Criteria
            </h3>
            <p className="text-xs font-sans text-[#ADA89F] leading-relaxed">
              Answer 15 quick questions about trip dates, group size, child ages, bedrooms, budget, and driving preferences.
            </p>
          </div>

          <div className="bg-[#111111] rounded-3xl p-8 border border-[#C49A10]/20 space-y-4 relative group hover:-translate-y-1 transition-all shadow-nexora">
            <div className="w-12 h-12 rounded-xl bg-[#080808] border border-[#C49A10]/40 text-[#C49A10] font-mono font-bold text-xl flex items-center justify-center shadow">
              02
            </div>
            <h3 className="text-2xl font-serif font-light text-[#F2EDE4]">
              True Total Cost & Location Analysis
            </h3>
            <p className="text-xs font-sans text-[#ADA89F] leading-relaxed">
              Our deterministic engine sums taxes, cleaning fees, resort fees, and parking costs while evaluating whether Canmore, Harvie Heights, or Banff offers the true best value.
            </p>
          </div>

          <div className="bg-[#111111] rounded-3xl p-8 border border-[#C49A10]/20 space-y-4 relative group hover:-translate-y-1 transition-all shadow-nexora">
            <div className="w-12 h-12 rounded-xl bg-[#080808] border border-[#C49A10]/40 text-[#C49A10] font-mono font-bold text-xl flex items-center justify-center shadow">
              03
            </div>
            <h3 className="text-2xl font-serif font-light text-[#F2EDE4]">
              Personalized AI Itinerary & Rules
            </h3>
            <p className="text-xs font-sans text-[#ADA89F] leading-relaxed">
              Receive a daily schedule with drive times, parking instructions, weather backups, and verified Parks Canada shuttle and pass advisories.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BANFF VS CANMORE COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TownComparisonSection />
      </section>

      {/* 4. BEST-VALUE NEARBY DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-[#F2EDE4] rounded-3xl p-8 sm:p-12 border border-[#C49A10]/20 shadow-nexora space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest">
              Smart Location Alternatives
            </span>
            <h2 className="text-4xl font-serif font-light text-[#F2EDE4]">
              Discover Less Expensive Bases Near Banff & Lake Louise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-[#080808] rounded-2xl border border-[#C49A10]/20 space-y-2">
              <span className="font-serif text-xl font-light text-[#C49A10] block">Dead Man's Flats</span>
              <p className="text-xs text-[#ADA89F] leading-relaxed">
                7 minutes east of Canmore. Modern multi-bedroom suites with kitchens up to 35% cheaper than Banff.
              </p>
            </div>

            <div className="p-5 bg-[#080808] rounded-2xl border border-[#C49A10]/20 space-y-2">
              <span className="font-serif text-xl font-light text-[#C49A10] block">Harvie Heights</span>
              <p className="text-xs text-[#ADA89F] leading-relaxed">
                Located right at Banff Park gate boundary. Quiet chalets with immediate Highway 1 access.
              </p>
            </div>

            <div className="p-5 bg-[#080808] rounded-2xl border border-[#C49A10]/20 space-y-2">
              <span className="font-serif text-xl font-light text-[#C49A10] block">Kananaskis Village</span>
              <p className="text-xs text-[#ADA89F] leading-relaxed">
                Pristine wilderness setting away from tour buses. Home to Nordic Spa & Nakiska ski area.
              </p>
            </div>

            <div className="p-5 bg-[#080808] rounded-2xl border border-[#C49A10]/20 space-y-2">
              <span className="font-serif text-xl font-light text-[#C49A10] block">Golden, BC</span>
              <p className="text-xs text-[#ADA89F] leading-relaxed">
                Budget-friendly gateway to Yoho National Park & Lake Louise via Kicking Horse Pass.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CURRENT SEASONAL TRAVEL ADVISORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-light text-xl text-[#F2EDE4]">
                Active Parks Canada Advisory Directive
              </h3>
            </div>
            <Link href="/advisories" className="font-mono text-xs text-[#C49A10] hover:underline flex items-center gap-1">
              View All Rules <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-[#ADA89F] leading-relaxed">
            <strong className="text-[#F2EDE4]">Moraine Lake Vehicle Ban:</strong> Personal commercial & private passenger vehicles are permanently prohibited on Moraine Lake Road. Access is strictly via Parks Canada Shuttle or Roam Transit.
          </p>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] rounded-3xl p-8 sm:p-12 border border-[#C49A10]/20 shadow-nexora space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-serif font-light text-[#F2EDE4]">
              Frequently Asked Questions
            </h2>
            <p className="font-mono text-xs text-[#ADA89F] uppercase tracking-wider">Everything you need to know about planning your trip.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 bg-[#080808] rounded-2xl border border-[#1A1A1A] space-y-2">
              <h3 className="font-serif text-lg text-[#F2EDE4]">Is it better to stay in Canmore or Banff?</h3>
              <p className="text-[#ADA89F] leading-relaxed">
                Canmore generally offers 25%–40% cheaper accommodation, more multi-bedroom condos with full kitchens, free parking, and no mandatory park pass requirements for staying in town.
              </p>
            </div>

            <div className="p-5 bg-[#080808] rounded-2xl border border-[#1A1A1A] space-y-2">
              <h3 className="font-serif text-lg text-[#F2EDE4]">Do I need a Parks Canada Pass?</h3>
              <p className="text-[#ADA89F] leading-relaxed">
                Yes, if you enter Banff National Park, Lake Louise, or Johnston Canyon. A Discovery Pass costs $22.00/day for a family vehicle or $151.25 for an annual pass.
              </p>
            </div>

            <div className="p-5 bg-[#080808] rounded-2xl border border-[#1A1A1A] space-y-2">
              <h3 className="font-serif text-lg text-[#F2EDE4]">How do I get to Moraine Lake?</h3>
              <p className="text-[#ADA89F] leading-relaxed">
                Personal vehicles are banned on Moraine Lake Road. You must book a Parks Canada Shuttle ticket ($16/adult) in advance or take Roam Transit Route 10 from Banff.
              </p>
            </div>

            <div className="p-5 bg-[#080808] rounded-2xl border border-[#1A1A1A] space-y-2">
              <h3 className="font-serif text-lg text-[#F2EDE4]">What does "True Total Cost" mean?</h3>
              <p className="text-[#ADA89F] leading-relaxed">
                Unlike generic booking sites that show base rates, our engine sums nightly rates, 11% Alberta taxes/levies, mandatory cleaning fees, resort fees, and parking fees upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EMAIL TRIP DEAL ALERTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] border border-[#C49A10]/30 rounded-3xl p-8 sm:p-12 shadow-nexora flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">Get Canadian Rockies Price-Drop Alerts</h2>
            <p className="text-xs font-mono text-[#ADA89F]">
              Receive notifications when accommodation prices drop in Canmore, Banff, or Lake Louise for your travel dates.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-3.5 rounded border border-[#C49A10]/30 bg-[#080808] text-[#F2EDE4] text-xs font-mono placeholder:text-[#5C5852] min-w-[260px]"
            />
            <button
              onClick={() => alert("Subscribed to NexoraGo AI price-drop alerts!")}
              className="btn-nexora-fill"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
