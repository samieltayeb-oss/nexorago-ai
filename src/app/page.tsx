"use client";

import React from "react";
import Link from "next/link";
import { TripWizard } from "@/components/wizard/TripWizard";
import { TownComparisonSection } from "@/components/search/TownComparisonSection";
import { BRANDING } from "@/config/branding";
import {
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F2EDE4] space-y-14 sm:space-y-20 pb-12 font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#080808] via-[#111111] to-[#080808]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_70%_60%_at_50%_20%,#C49A10,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(196,154,16,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(196,154,16,.05)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          {/* Headline */}
          <div className="text-center space-y-4 max-w-4xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 bg-[#111111] px-4 py-1.5 rounded-full border border-[#C49A10]/30 text-xs font-mono text-[#C49A10] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#E5B830]" aria-hidden="true" />
              <span>{BRANDING.productName} — Canadian Rockies AI Concierge</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-tight text-[#F2EDE4]">
              Plan the Rockies Smarter.{" "}
              <span className="font-serif italic text-gradient-gold block sm:inline">
                Stay Better. Spend Less.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-[#ADA89F] max-w-2xl mx-auto font-light leading-relaxed">
              {BRANDING.secondaryMessage} Compare true total stay costs, find best-value bases near Banff, and build personalized itineraries.
            </p>
          </div>

          {/* Trip Wizard */}
          <TripWizard />
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="nexora-pill">Simple 3-Step Process</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#F2EDE4]">
            How NexoraGo AI Elevates Your Trip
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "Group & Travel Criteria",
              desc: "Answer 15 quick questions about trip dates, group size, child ages, bedrooms, budget, and driving preferences.",
            },
            {
              num: "02",
              title: "True Total Cost & Location Analysis",
              desc: "Our engine sums taxes, cleaning fees, resort fees, and parking costs while evaluating whether Canmore, Harvie Heights, or Banff offers the true best value.",
            },
            {
              num: "03",
              title: "Personalized AI Itinerary & Rules",
              desc: "Receive a daily schedule with drive times, parking instructions, weather backups, and verified Parks Canada shuttle and pass advisories.",
            },
          ].map(({ num, title, desc }) => (
            <div key={num} className="bg-[#111111] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#C49A10]/20 space-y-3 group hover:-translate-y-1 transition-all shadow-nexora">
              <div className="w-11 h-11 rounded-xl bg-[#080808] border border-[#C49A10]/40 text-[#C49A10] font-mono font-bold text-lg flex items-center justify-center">
                {num}
              </div>
              <h3 className="text-lg sm:text-2xl font-serif font-light text-[#F2EDE4]">{title}</h3>
              <p className="text-sm text-[#ADA89F] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TOWN COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TownComparisonSection />
      </section>

      {/* 4. VALUE DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-[#F2EDE4] rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-[#C49A10]/20 shadow-nexora space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#C49A10] uppercase tracking-widest">
              Smart Location Alternatives
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#F2EDE4]">
              Discover Less Expensive Bases Near Banff & Lake Louise
            </h2>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Dead Man's Flats",
                desc: "7 minutes east of Canmore. Modern multi-bedroom suites with kitchens up to 35% cheaper than Banff.",
              },
              {
                name: "Harvie Heights",
                desc: "Located right at Banff Park gate boundary. Quiet chalets with immediate Highway 1 access.",
              },
              {
                name: "Kananaskis Village",
                desc: "Pristine wilderness setting away from tour buses. Home to Nordic Spa & Nakiska ski area.",
              },
              {
                name: "Golden, BC",
                desc: "Budget-friendly gateway to Yoho National Park & Lake Louise via Kicking Horse Pass.",
              },
            ].map(({ name, desc }) => (
              <div key={name} className="p-4 sm:p-5 bg-[#080808] rounded-2xl border border-[#C49A10]/20 space-y-2">
                <span className="font-serif text-lg sm:text-xl font-light text-[#C49A10] block">{name}</span>
                <p className="text-sm text-[#ADA89F] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ADVISORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] border border-amber-500/25 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20 shrink-0">
                <ShieldAlert className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="font-serif font-light text-lg sm:text-xl text-[#F2EDE4]">
                Active Parks Canada Advisory Directive
              </h2>
            </div>
            <Link href="/advisories" className="font-mono text-xs text-[#C49A10] hover:underline flex items-center gap-1 shrink-0">
              View All Rules <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-sm text-[#ADA89F] leading-relaxed">
            <strong className="text-[#F2EDE4]">Moraine Lake Vehicle Ban:</strong>{" "}
            Personal commercial & private passenger vehicles are permanently prohibited on Moraine Lake Road. Access is strictly via Parks Canada Shuttle or Roam Transit.
          </p>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-[#C49A10]/20 shadow-nexora space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#F2EDE4]">Frequently Asked Questions</h2>
            <p className="font-mono text-xs text-[#ADA89F] uppercase tracking-wider">
              Everything you need to know about planning your trip.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "Is it better to stay in Canmore or Banff?",
                a: "Canmore generally offers 25%–40% cheaper accommodation, more multi-bedroom condos with full kitchens, free parking, and no mandatory park pass requirements for staying in town.",
              },
              {
                q: "Do I need a Parks Canada Pass?",
                a: "Yes, if you enter Banff National Park, Lake Louise, or Johnston Canyon. A Discovery Pass costs $22.00/day for a family vehicle or $151.25 for an annual pass.",
              },
              {
                q: "How do I get to Moraine Lake?",
                a: "Personal vehicles are banned on Moraine Lake Road. You must book a Parks Canada Shuttle ticket ($16/adult) in advance or take Roam Transit Route 10 from Banff.",
              },
              {
                q: "What does \"True Total Cost\" mean?",
                a: "Unlike generic booking sites that show base rates, our engine sums nightly rates, 11% Alberta taxes/levies, mandatory cleaning fees, resort fees, and parking fees upfront.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="p-5 bg-[#080808] rounded-2xl border border-[#1A1A1A] space-y-2">
                <h3 className="font-serif text-base sm:text-lg text-[#F2EDE4]">{q}</h3>
                <p className="text-sm text-[#ADA89F] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EMAIL DEAL ALERTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] border border-[#C49A10]/25 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-nexora flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
              Get Canadian Rockies Price-Drop Alerts
            </h2>
            <p className="text-sm font-mono text-[#ADA89F]">
              Receive notifications when accommodation prices drop in Canmore, Banff, or Lake Louise for your travel dates.
            </p>
          </div>
          <div className="w-full sm:w-auto flex flex-col gap-3">
            <label className="sr-only" htmlFor="hero-email-alert">Email address for price alerts</label>
            <input
              id="hero-email-alert"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              className="w-full sm:w-72 p-4 rounded-xl border border-[#C49A10]/25 bg-[#080808] text-[#F2EDE4] placeholder:text-[#5C5852] focus:outline-none focus:border-[#C49A10] transition-colors"
              style={{ fontSize: "16px" }}
            />
            <Link href="/search" className="btn-nexora-fill text-center">
              Search Stays Instead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
