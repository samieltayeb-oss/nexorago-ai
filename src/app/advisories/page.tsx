"use client";

import React, { useState } from "react";
import { DEMO_ADVISORIES } from "@/lib/providers/advisoryProvider";
import { ShieldAlert, ExternalLink, Filter, CheckCircle2, AlertTriangle, Info, Calendar, Sparkles } from "lucide-react";

export default function AdvisoriesPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const filteredAdvisories = DEMO_ADVISORIES.filter((adv) => {
    if (filterSeverity === "all") return true;
    return adv.severity === filterSeverity;
  });

  const generateSummary = async () => {
    if (aiSummary) return;
    setIsGeneratingAI(true);
    try {
      const res = await fetch("/api/advisory-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advisories: filteredAdvisories })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error?.message || "API returned an error");
      setAiSummary(data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexora-dark py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="bg-nexora-card text-nexora-cream rounded-3xl p-6 sm:p-10 shadow-nexora border border-nexora-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-500/20">
            <ShieldAlert className="w-4 h-4" />
            Rockies Rules & Advisory Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight">
            Canadian Rockies <br/>
            <span className="text-gradient-gold font-light italic">Park Rules & Advisories</span>
          </h1>
          <p className="text-sm text-nexora-cream-muted leading-relaxed font-light">
            Verified, real-time guidance on Parks Canada passes, Moraine Lake shuttle restrictions, bear safety, Kananaskis passes, and seasonal road closures.
          </p>
        </div>

        <div className="shrink-0 relative z-10 w-full md:w-auto">
          <button 
            onClick={generateSummary}
            disabled={isGeneratingAI}
            className="w-full md:w-auto bg-nexora-gold hover:bg-nexora-gold-bright text-nexora-dark font-extrabold px-6 py-4 rounded-2xl shadow-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingAI ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {isGeneratingAI ? "Analyzing Threats..." : "Ask AI to Summarize Risks"}
          </button>
        </div>
      </div>

      {/* AI Summary Banner */}
      {aiSummary && (
        <div className="bg-nexora-surface border border-nexora-gold/40 rounded-3xl p-6 md:p-8 shadow-gold animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-nexora-gold" />
              <h2 className="text-2xl font-serif text-nexora-cream">{aiSummary.title}</h2>
            </div>
            <ul className="space-y-3">
              {aiSummary.bullets?.map((bullet: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-nexora-cream-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-nexora-gold shrink-0 mt-2" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="bg-nexora-card rounded-2xl p-4 border border-nexora-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <Filter className="w-4 h-4 text-nexora-cream-muted shrink-0" />
          <span className="text-xs font-bold text-nexora-cream-muted shrink-0 uppercase tracking-widest">Filter:</span>
          {["all", "critical", "warning", "info"].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
                filterSeverity === sev
                  ? "bg-nexora-surface text-nexora-cream border border-nexora-gold/50 shadow-sm"
                  : "bg-transparent text-nexora-cream-muted border border-transparent hover:text-nexora-cream"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
        <span className="text-xs text-nexora-gold font-mono shrink-0">
          {filteredAdvisories.length} Active Directives
        </span>
      </div>

      {/* Advisories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAdvisories.map((adv) => {
          // Determine colors based on severity
          let borderColor = "border-nexora-border";
          let bgGlow = "";
          let badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";
          
          if (adv.severity === "critical") {
            borderColor = "border-rose-500/30";
            bgGlow = "bg-rose-500/5";
            badgeStyle = "bg-rose-500/10 text-rose-400 border-rose-500/20";
          } else if (adv.severity === "warning") {
            borderColor = "border-amber-500/30";
            bgGlow = "bg-amber-500/5";
            badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/20";
          }

          return (
            <div
              key={adv.id}
              className={`bg-nexora-card rounded-3xl p-6 sm:p-8 border shadow-nexora space-y-6 flex flex-col justify-between transition-all hover:-translate-y-1 ${borderColor} ${bgGlow}`}
            >
              <div className="space-y-4">
                {/* Badge & Destination */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border ${badgeStyle}`}>
                    {adv.severity} • {adv.destination}
                  </span>

                  <span className="text-[10px] font-mono text-nexora-cream-muted">
                    Verified {adv.lastVerifiedDate}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-nexora-cream leading-snug">
                  {adv.title}
                </h3>

                <p className="text-sm text-nexora-cream-muted leading-relaxed">
                  {adv.summary}
                </p>

                {/* Affected Groups & Action */}
                <div className="p-4 bg-nexora-surface rounded-2xl border border-nexora-border text-sm space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-nexora-gold block mb-1">Required Action:</span>
                  <span className="text-nexora-cream font-medium">{adv.callToAction}</span>
                </div>
              </div>

              {/* Official Source Link */}
              <div className="pt-4 border-t border-nexora-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-nexora-cream-muted font-mono uppercase">Source: {adv.officialSource}</span>
                <a
                  href={adv.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nexora-gold hover:text-nexora-gold-bright font-bold flex items-center gap-1.5 transition-colors"
                >
                  Official Directive <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
