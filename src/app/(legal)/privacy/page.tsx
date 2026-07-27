import React from "react";
import { BRANDING } from "@/config/branding";
import { ShieldCheck, Info } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <ShieldCheck className="w-8 h-8 text-alpine-800" />
          <div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900">
              Privacy Policy & PIPEDA Compliance
            </h1>
            <p className="text-xs text-slate-500">Last updated: July 2026</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900">1. Commitment to Canadian Privacy Standards</h2>
          <p>
            {BRANDING.legal.companyName} ("RockyGo AI") is committed to safeguarding personal information in accordance with the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA) and the Alberta Personal Information Protection Act (PIPA).
          </p>

          <h2 className="text-base font-bold text-slate-900">2. Minimal Collection of Traveller Data</h2>
          <p>
            We collect only the minimum information necessary to calculate stay totals and generate itineraries. When specifying children travelling in your group, we store child ages only. We do NOT collect or store exact birthdates of minor children.
          </p>

          <h2 className="text-base font-bold text-slate-900">3. How Information Is Used</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To score and rank accommodations matching your group capacity, budget, and location preferences.</li>
            <li>To estimate true total stay costs, taxes, cleaning fees, and parking fees.</li>
            <li>To construct personalized daily travel itineraries and Calgary departure guidance.</li>
          </ul>

          <h2 className="text-base font-bold text-slate-900">4. User Rights, Data Export & Deletion</h2>
          <p>
            Under PIPEDA, you maintain full right of access, rectification, export, and complete deletion of any saved trip profiles or search history. You may request data removal at any time by contacting support@rockygo.ai.
          </p>
        </div>
      </div>
    </div>
  );
}
