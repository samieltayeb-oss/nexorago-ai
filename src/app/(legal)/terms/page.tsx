import React from "react";
import { BRANDING } from "@/config/branding";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        <h1 className="text-3xl font-extrabold font-display text-slate-900 border-b border-slate-100 pb-4">
          Terms of Service
        </h1>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using {BRANDING.productName}, operated by {BRANDING.legal.companyName}, you agree to comply with and be bound by these Terms of Service.
          </p>

          <h2 className="text-base font-bold text-slate-900">2. Third-Party Accommodations & Bookings</h2>
          <p>
            {BRANDING.productName} is an AI-powered travel decision engine and referral platform. Accommodation bookings are completed on third-party provider platforms (e.g. Booking.com, Expedia, or direct hotel websites). We are not an accommodation provider or property management agency.
          </p>

          <h2 className="text-base font-bold text-slate-900">3. Pricing Accuracy Disclaimer</h2>
          <p>
            While our engine performs true total cost calculations including base rates, taxes, cleaning fees, resort fees, and parking fees, room availability and rates are subject to real-time provider changes. Final pricing must be confirmed on the partner booking page.
          </p>
        </div>
      </div>
    </div>
  );
}
