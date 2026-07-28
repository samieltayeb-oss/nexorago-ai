"use client";

import React, { useState } from "react";
import { DEMO_ADVISORIES } from "@/lib/providers/advisoryProvider";
import {
  ShieldAlert,
  ExternalLink,
  AlertTriangle,
  Info,
  Sparkles,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertTriangle,
    label: "Critical",
    border: "border-rose-500/30",
    bg: "bg-rose-500/5",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    iconColor: "text-rose-400",
  },
  warning: {
    icon: ShieldAlert,
    label: "Warning",
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    iconColor: "text-amber-400",
  },
  info: {
    icon: Info,
    label: "Info",
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    iconColor: "text-blue-400",
  },
} as const;

type Severity = keyof typeof SEVERITY_CONFIG;

export default function AdvisoriesPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [aiSummary, setAiSummary] = useState<{ title: string; bullets: string[] } | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const filteredAdvisories = DEMO_ADVISORIES.filter(
    (adv) => filterSeverity === "all" || adv.severity === filterSeverity
  );

  const generateSummary = async () => {
    if (aiSummary) return;
    setIsGeneratingAI(true);
    setAiError(null);
    try {
      const res = await fetch("/api/advisory-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advisories: filteredAdvisories }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error?.message || "Failed to generate summary");
      setAiSummary(data.data);
    } catch (err: any) {
      setAiError(err.message || "Unable to generate summary. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 font-sans">
      
      {/* Page Header */}
      <header className="bg-[#111111] text-[#F2EDE4] rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-nexora border border-[#C49A10]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-500/20">
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
              Rockies Rules & Advisory Engine
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold font-serif leading-tight">
              Canadian Rockies{" "}
              <span className="text-gradient-gold font-light italic">Park Rules & Advisories</span>
            </h1>
            <p className="text-sm text-[#ADA89F] leading-relaxed font-light max-w-2xl">
              Verified, real-time guidance on Parks Canada passes, Moraine Lake shuttle restrictions, bear safety, Kananaskis passes, and seasonal road closures.
            </p>
          </div>

          <button
            onClick={generateSummary}
            disabled={isGeneratingAI || !!aiSummary}
            className="btn-nexora-fill-full sm:w-auto sm:self-start"
            aria-busy={isGeneratingAI}
            aria-label={isGeneratingAI ? "Generating AI summary..." : "Ask AI to summarize current risks"}
          >
            {isGeneratingAI
              ? <Sparkles className="w-5 h-5 animate-spin" aria-hidden="true" />
              : <Sparkles className="w-5 h-5" aria-hidden="true" />
            }
            {isGeneratingAI ? "Analyzing Threats..." : "Ask AI to Summarize Risks"}
          </button>
        </div>
      </header>

      {/* AI Summary */}
      {isGeneratingAI && !aiSummary && (
        <div aria-live="polite" className="bg-[#111111] border border-[#C49A10]/20 rounded-2xl p-6 space-y-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C49A10] animate-pulse" aria-hidden="true" />
            <p className="text-sm text-[#ADA89F] font-mono">Analyzing park advisories with AI…</p>
          </div>
          <div className="space-y-2">
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
          </div>
        </div>
      )}

      {aiError && (
        <div role="alert" aria-live="assertive" className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-5 text-rose-300 text-sm space-y-2">
          <p className="font-semibold">Could not generate summary</p>
          <p>{aiError}</p>
          <button onClick={() => { setAiError(null); generateSummary(); }} className="text-rose-300 underline text-sm">
            Try again
          </button>
        </div>
      )}

      {aiSummary && (
        <div aria-live="polite" className="bg-[#111111] border border-[#C49A10]/35 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-gold animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#C49A10,transparent_60%)] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C49A10]" aria-hidden="true" />
              <h2 className="text-xl sm:text-2xl font-serif text-[#F2EDE4]">{aiSummary.title}</h2>
            </div>
            <ul className="space-y-3" role="list">
              {aiSummary.bullets?.map((bullet: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#ADA89F]">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A10] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="bg-[#111111] rounded-2xl p-4 border border-[#C49A10]/15 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter advisories by severity">
          <span className="text-xs font-bold text-[#ADA89F] uppercase tracking-widest shrink-0">Filter:</span>
          {(["all", "critical", "warning", "info"] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              aria-pressed={filterSeverity === sev}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all min-h-[40px] ${
                filterSeverity === sev
                  ? "bg-[#1A1A1A] text-[#F2EDE4] border border-[#C49A10]/40 shadow-sm"
                  : "bg-transparent text-[#ADA89F] border border-transparent hover:text-[#F2EDE4] hover:bg-[#1A1A1A]"
              }`}
            >
              {sev === "all" ? "All" : sev.charAt(0).toUpperCase() + sev.slice(1)}
            </button>
          ))}
        </div>
        <span className="text-xs text-[#C49A10] font-mono" aria-live="polite">
          {filteredAdvisories.length} Active Directive{filteredAdvisories.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Advisory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list" aria-label="Park advisories">
        {filteredAdvisories.map((adv) => {
          const config = SEVERITY_CONFIG[adv.severity as Severity] || SEVERITY_CONFIG.info;
          const SeverityIcon = config.icon;
          return (
            <article
              key={adv.id}
              role="listitem"
              className={`bg-[#111111] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border shadow-nexora space-y-5 flex flex-col justify-between transition-all hover:-translate-y-1 ${config.border} ${config.bg}`}
            >
              <div className="space-y-4">
                {/* Badge + Icon severity + date */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border font-bold ${config.badge}`}>
                    <SeverityIcon className={`w-3.5 h-3.5 ${config.iconColor} shrink-0`} aria-hidden="true" />
                    <span>{config.label}</span>
                    <span aria-hidden="true">•</span>
                    <span>{adv.destination}</span>
                  </span>
                  <span className="text-xs font-mono text-[#5C5852] shrink-0">
                    Verified {adv.lastVerifiedDate}
                  </span>
                </div>

                <h2 className="text-lg sm:text-2xl font-serif text-[#F2EDE4] leading-snug">
                  {adv.title}
                </h2>

                <p className="text-sm text-[#ADA89F] leading-relaxed">{adv.summary}</p>

                {/* Required Action */}
                <div className="p-4 bg-[#080808] rounded-xl border border-[#1A1A1A] text-sm space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C49A10] block">
                    Required Action:
                  </span>
                  <span className="text-[#F2EDE4] font-medium">{adv.callToAction}</span>
                </div>
              </div>

              {/* Source link */}
              <div className="pt-4 border-t border-[#1A1A1A] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[#ADA89F] font-mono uppercase">Source: {adv.officialSource}</span>
                <a
                  href={adv.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C49A10] hover:text-[#E5B830] font-bold flex items-center gap-1.5 transition-colors min-h-[44px] py-2"
                  aria-label={`View official directive for ${adv.title} (opens in new tab)`}
                >
                  Official Directive
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {filteredAdvisories.length === 0 && (
        <div className="text-center py-16 space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#C49A10] mx-auto" aria-hidden="true" />
          <p className="text-[#F2EDE4] font-serif text-xl">No advisories for this filter</p>
          <p className="text-sm text-[#ADA89F]">Try selecting a different severity level.</p>
          <button onClick={() => setFilterSeverity("all")} className="btn-nexora-line text-xs mt-4">
            Show All Advisories
          </button>
        </div>
      )}
    </div>
  );
}
