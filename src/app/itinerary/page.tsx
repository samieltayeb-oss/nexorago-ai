"use client";

import React, { useMemo } from "react";
import { generatePersonalizedItinerary } from "@/lib/ai/itineraryBuilder";
import { SearchCriteria } from "@/types";
import {
  Sparkles,
  Calendar,
  Clock,
  Car,
  MapPin,
  Coffee,
  ShoppingBag,
  Zap,
  ShieldAlert,
  Sun,
  CheckCircle2,
  DollarSign,
  Share2,
  Printer,
  Download,
  Info,
} from "lucide-react";

export default function ItineraryPage() {
  const criteria: SearchCriteria = {
    departureCity: "Calgary",
    destinations: ["Banff", "Canmore", "Lake Louise"],
    checkIn: "2026-08-10",
    checkOut: "2026-08-13",
    adults: 2,
    children: 2,
    childrenAges: [6, 10],
    bedrooms: 2,
    budgetType: "total",
    stayTypes: ["condo"],
    priorities: ["best_family_value", "kitchen"],
    travelMode: "personal_vehicle",
    activities: ["Scenic sightseeing", "Lakes", "Gondola", "Hot springs"],
    pace: "balanced",
    constraints: {
      mobility: false,
      dietary: [],
      hasPet: false,
      hasStroller: true,
      hasSeniors: false,
      isEV: true,
    },
  };

  const itinerary = useMemo(() => generatePersonalizedItinerary(criteria), []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-alpine-900 via-alpine-800 to-glacial-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            AI-Engineered Rockies Itinerary
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            Personalized Daily Canadian Rockies Itinerary
          </h1>
          <p className="text-sm text-slate-200 leading-relaxed">
            {itinerary.destinationSummary}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print / PDF
          </button>
          <button
            onClick={() => alert("Trip share link copied to clipboard!")}
            className="bg-gold-500 hover:bg-gold-400 text-alpine-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" /> Share Trip
          </button>
        </div>
      </div>

      {/* CALGARY DEPARTURE PLANNER */}
      <div id="calgary-departure" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-alpine-100 rounded-2xl text-alpine-800">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-900">
              Calgary Departure & Route Planner
            </h2>
            <p className="text-xs text-slate-500">
              Essential drive timing, coffee stops, fuel, EV chargers, and park entry rules.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Recommended Departure */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-alpine-800" /> Departure Target
            </span>
            <span className="font-bold text-slate-900 text-sm block">
              {itinerary.calgaryDepartureGuide.recommendedDepartureTime}
            </span>
            <span className="text-[11px] text-slate-500">Avoids Hwy 1 bottleneck</span>
          </div>

          {/* Grocery Stop */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-500 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-alpine-800" /> Recommended Grocery Stop
            </span>
            <span className="font-bold text-slate-900 text-sm block">
              {itinerary.calgaryDepartureGuide.groceryStop}
            </span>
            <span className="text-[11px] text-slate-500">Stock kitchen before Banff</span>
          </div>

          {/* Coffee & Fuel */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-500 flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-alpine-800" /> Coffee & Fuel
            </span>
            <span className="font-bold text-slate-900 text-xs block">
              {itinerary.calgaryDepartureGuide.coffeeStop}
            </span>
            <span className="text-[11px] text-slate-500">{itinerary.calgaryDepartureGuide.fuelStop}</span>
          </div>

          {/* EV Charging */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-500 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-gold-500" /> EV Fast Chargers
            </span>
            <span className="font-bold text-slate-900 text-xs block">
              {itinerary.calgaryDepartureGuide.evChargers.join(" • ")}
            </span>
            <span className="text-[11px] text-slate-500">Level 3 fast chargers available</span>
          </div>
        </div>

        {/* Advisory Warning Box */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-900">National Park Pass & Road Guidance:</span>
            <p>{itinerary.calgaryDepartureGuide.parkEntryGuidance}</p>
            <p className="text-[11px] text-amber-800">{itinerary.calgaryDepartureGuide.roadWarning}</p>
          </div>
        </div>
      </div>

      {/* DAILY TIMELINE CARDS */}
      <div className="space-y-8">
        {itinerary.days.map((day) => (
          <div
            key={day.dayNumber}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6"
          >
            {/* Day Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-alpine-800 text-gold-400 font-extrabold text-lg flex items-center justify-center font-display shadow">
                  D{day.dayNumber}
                </span>
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    Day {day.dayNumber}: {day.theme}
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">{day.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                <span>Est. Drive: <strong>{day.totalDayDriveTimeMinutes} mins</strong></span>
                <span>•</span>
                <span>Est. Day Cost: <strong className="text-alpine-900">${day.totalDayCostCAD} CAD</strong></span>
              </div>
            </div>

            {/* Items Timeline Grid */}
            <div className="space-y-6">
              {day.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3 hover:border-alpine-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-alpine-800 text-white">
                        {item.timeOfDay}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      {item.estimatedDriveTimeMinutes > 0 && (
                        <span className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-alpine-700" /> {item.estimatedDriveTimeMinutes}m drive
                        </span>
                      )}
                      <span>${item.estimatedCostCAD} CAD</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Operational Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-[11px]">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-0.5">
                      <span className="font-bold text-slate-700 block">Parking & Shuttle Instructions:</span>
                      <span className="text-slate-600">{item.parkingOrShuttleNotes}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-0.5">
                      <span className="font-bold text-slate-700 block">Recommended Clothing:</span>
                      <span className="text-slate-600">{item.recommendedClothing}</span>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-0.5">
                      <span className="font-bold text-emerald-900 block">Indoor / Rain Backup:</span>
                      <span className="text-emerald-800">{item.weatherBackupOption}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
