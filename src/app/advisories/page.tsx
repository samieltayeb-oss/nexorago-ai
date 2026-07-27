"use client";

import React, { useState } from "react";
import { DEMO_ADVISORIES } from "@/lib/providers/advisoryProvider";
import { ShieldAlert, ExternalLink, Filter, CheckCircle2, AlertTriangle, Info, Calendar } from "lucide-react";

export default function AdvisoriesPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const filteredAdvisories = DEMO_ADVISORIES.filter((adv) => {
    if (filterSeverity === "all") return true;
    return adv.severity === filterSeverity;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-alpine-900 via-alpine-800 to-glacial-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Rockies Rules & Advisory Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            Canadian Rockies Park Rules & Advisories
          </h1>
          <p className="text-sm text-slate-200 leading-relaxed">
            Verified, real-time guidance on Parks Canada passes, Moraine Lake shuttle restrictions, bear safety, Kananaskis passes, and seasonal road closures.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">Filter Severity:</span>
          {["all", "critical", "warning", "info"].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                filterSeverity === sev
                  ? "bg-alpine-800 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 font-semibold hidden sm:block">
          {filteredAdvisories.length} Active Regional Advisory Directives
        </span>
      </div>

      {/* Advisories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAdvisories.map((adv) => (
          <div
            key={adv.id}
            className={`bg-white rounded-3xl p-6 border shadow-md space-y-4 flex flex-col justify-between ${
              adv.severity === "critical"
                ? "border-rose-200 bg-rose-50/20"
                : adv.severity === "warning"
                ? "border-amber-200 bg-amber-50/20"
                : "border-slate-200"
            }`}
          >
            <div className="space-y-3">
              {/* Badge & Destination */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                    adv.severity === "critical"
                      ? "bg-rose-100 text-rose-800 border-rose-300"
                      : adv.severity === "warning"
                      ? "bg-amber-100 text-amber-800 border-amber-300"
                      : "bg-blue-100 text-blue-800 border-blue-300"
                  }`}
                >
                  {adv.severity} • {adv.destination}
                </span>

                <span className="text-[11px] text-slate-400 font-semibold">
                  Verified {adv.lastVerifiedDate}
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-slate-900 leading-snug">
                {adv.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {adv.summary}
              </p>

              {/* Affected Groups & Action */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-700 block">Required Action:</span>
                <span className="text-alpine-900 font-semibold">{adv.callToAction}</span>
              </div>
            </div>

            {/* Official Source Link */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Source: {adv.officialSource}</span>
              <a
                href={adv.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-alpine-800 font-bold hover:underline flex items-center gap-1"
              >
                Official Directive <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
