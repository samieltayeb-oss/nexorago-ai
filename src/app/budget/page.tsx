"use client";

import React, { useMemo, useState } from "react";
import { calculateCompleteTripBudget } from "@/lib/engine/budgetCalculator";
import { SearchCriteria } from "@/types";
import {
  Calculator,
  DollarSign,
  PieChart,
  ShieldCheck,
  Building,
  Car,
  Ticket,
  Utensils,
  Compass,
  Sparkles,
  Info,
} from "lucide-react";

export default function BudgetPage() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [nights, setNights] = useState(3);
  const [hasKitchen, setHasKitchen] = useState(true);

  const criteria: SearchCriteria = useMemo(() => ({
    departureCity: "Calgary",
    destinations: ["Banff", "Canmore"],
    checkIn: "2026-08-10",
    checkOut: "2026-08-13",
    adults,
    children,
    childrenAges: [6, 10],
    bedrooms: 2,
    budgetType: "total",
    stayTypes: ["condo"],
    priorities: ["kitchen"],
    travelMode: "personal_vehicle",
    activities: ["Scenic sightseeing", "Gondola"],
    pace: "balanced",
    constraints: {
      mobility: false,
      dietary: [],
      hasPet: false,
      hasStroller: true,
      hasSeniors: false,
      isEV: false,
    },
  }), [adults, children]);

  const budget = useMemo(() => calculateCompleteTripBudget(criteria), [criteria]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-alpine-900 via-alpine-800 to-glacial-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">
            <Calculator className="w-3.5 h-3.5 text-gold-400" />
            Complete Canadian Rockies Budget Calculator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            Real Total Trip Cost Calculator
          </h1>
          <p className="text-sm text-slate-200 leading-relaxed">
            Calculate exact total expenses including accommodation, taxes, fuel, park passes, shuttles, activities, dining, and emergency buffers.
          </p>
        </div>

        {/* Grand Total Badge */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block">Estimated Total Trip</span>
          <span className="text-3xl font-extrabold text-gold-400 font-display block">
            ${budget.grandTotal} CAD
          </span>
          <span className="text-[11px] text-slate-300">Confidence: {budget.confidenceLevel}</span>
        </div>
      </div>

      {/* Calculator Interactive Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Adults</label>
          <input
            type="number"
            min="1"
            max="10"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
            className="w-full p-3 rounded-xl border border-slate-200 font-bold text-slate-900"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Children</label>
          <input
            type="number"
            min="0"
            max="10"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
            className="w-full p-3 rounded-xl border border-slate-200 font-bold text-slate-900"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nights</label>
          <input
            type="number"
            min="1"
            max="14"
            value={nights}
            onChange={(e) => setNights(parseInt(e.target.value) || 1)}
            className="w-full p-3 rounded-xl border border-slate-200 font-bold text-slate-900"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Kitchen Meal Prep</label>
          <button
            onClick={() => setHasKitchen(!hasKitchen)}
            className={`w-full p-3 rounded-xl font-bold text-xs border transition-colors ${
              hasKitchen
                ? "bg-emerald-100 border-emerald-300 text-emerald-900"
                : "bg-slate-100 border-slate-300 text-slate-700"
            }`}
          >
            {hasKitchen ? "✓ Kitchen Included (-25% Food)" : "No Kitchen (Dining Out)"}
          </button>
        </div>
      </div>

      {/* Itemized Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Accommodation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Building className="w-4 h-4 text-alpine-800" /> Accommodation Base
            </span>
            <span className="font-bold text-alpine-900 text-base">${budget.accommodationTotal} CAD</span>
          </div>
          <p className="text-xs text-slate-500">
            Base nightly rate across {nights} night(s).
          </p>
        </div>

        {/* Taxes & Mandatory Fees */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-alpine-800" /> Taxes, Cleaning & Fees
            </span>
            <span className="font-bold text-alpine-900 text-base">${budget.taxesAndFees} CAD</span>
          </div>
          <p className="text-xs text-slate-500">
            5% GST + 4% AB Tourism Levy + cleaning fee + resort fees.
          </p>
        </div>

        {/* Fuel & Travel */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Car className="w-4 h-4 text-alpine-800" /> Estimated Fuel
            </span>
            <span className="font-bold text-alpine-900 text-base">${budget.fuelTotal} CAD</span>
          </div>
          <p className="text-xs text-slate-500">
            Calgary to Rockies round trip (~350 km) + local mountain driving.
          </p>
        </div>

        {/* Park Passes */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Ticket className="w-4 h-4 text-alpine-800" /> Parks Canada Pass
            </span>
            <span className="font-bold text-alpine-900 text-base">${budget.parkPassesTotal} CAD</span>
          </div>
          <p className="text-xs text-slate-500">
            Parks Canada Family Pass rate ($22.00/day family cap).
          </p>
        </div>

        {/* Shuttles */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-alpine-800" /> Moraine Lake Shuttles
            </span>
            <span className="font-bold text-alpine-900 text-base">${budget.shuttlesTotal} CAD</span>
          </div>
          <p className="text-xs text-slate-500">
            Parks Canada shuttle reservation ($16/adult, $8/child).
          </p>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-alpine-800" /> Activities & Gondola
            </span>
            <span className="font-bold text-alpine-900 text-base">${budget.activitiesTotal} CAD</span>
          </div>
          <p className="text-xs text-slate-500">
            Banff Gondola & Banff Upper Hot Springs entry fees.
          </p>
        </div>

        {/* Food & Dining */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Utensils className="w-4 h-4 text-alpine-800" /> Food & Dining
            </span>
            <span className="font-bold text-alpine-900 text-base">${budget.foodTotal} CAD</span>
          </div>
          <p className="text-xs text-slate-500">
            Estimated daily food budget ({hasKitchen ? "includes kitchen prep savings" : "full restaurant dining"}).
          </p>
        </div>

        {/* Emergency Contingency */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> 10% Emergency Buffer
            </span>
            <span className="font-bold text-amber-900 text-base">${budget.emergencyBuffer} CAD</span>
          </div>
          <p className="text-xs text-slate-500">
            Weather backup buffer & unexpected parking/snack expenses.
          </p>
        </div>
      </div>

      {/* Per Person & Household Summary */}
      <div className="bg-alpine-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="font-bold font-display text-xl text-gold-400">
          Cost Breakdown Per Traveller & Household
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15">
            <span className="text-slate-300 block mb-1">Cost Per Adult</span>
            <span className="text-2xl font-extrabold text-white font-display">${budget.costPerAdult} CAD</span>
          </div>
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15">
            <span className="text-slate-300 block mb-1">Cost Per Child</span>
            <span className="text-2xl font-extrabold text-white font-display">${budget.costPerChild} CAD</span>
          </div>
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15">
            <span className="text-slate-300 block mb-1">Total Household Estimate</span>
            <span className="text-2xl font-extrabold text-gold-400 font-display">${budget.grandTotal} CAD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
