import React from "react";
import { BRANDING } from "@/config/branding";
import { Info, ShieldAlert } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        <h1 className="text-3xl font-extrabold font-display text-slate-900 border-b border-slate-100 pb-4">
          Affiliate & Outdoor Safety Disclaimers
        </h1>

        <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="p-4 bg-alpine-50 rounded-2xl border border-alpine-200 space-y-2">
            <h2 className="text-sm font-bold text-alpine-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-alpine-800" /> Affiliate Transparency Disclosure
            </h2>
            <p>{BRANDING.legal.affiliateDisclosure}</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
            <h2 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" /> Outdoor & Wilderness Safety Advisory
            </h2>
            <p>{BRANDING.legal.safetyDisclaimer}</p>
            <p>
              Travellers are solely responsible for verifying real-time trail conditions, avalanche danger forecasts, highway weather alerts (Alberta 511), and carrying Parks Canada-approved bear spray.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
