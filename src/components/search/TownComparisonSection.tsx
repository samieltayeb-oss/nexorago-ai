"use client";

import React, { useState } from "react";
import { CANADIAN_ROCKIES_TOWNS } from "@/lib/engine/townComparer";
import { CheckCircle2, XCircle, MapPin, Car, ShoppingBag, Utensils, ShieldAlert, Sparkles } from "lucide-react";

export const TownComparisonSection: React.FC = () => {
  const [selectedTown, setSelectedTown] = useState("canmore");

  const activeTown = CANADIAN_ROCKIES_TOWNS[selectedTown] || CANADIAN_ROCKIES_TOWNS.canmore;

  return (
    <div id="town-comparison" className="bg-[#111111] rounded-3xl p-6 sm:p-10 border border-[#C49A10]/20 shadow-nexora space-y-8 text-[#F2EDE4]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="nexora-pill mb-2 w-fit">
            <Sparkles className="w-3 h-3 text-[#E5B830] inline mr-1" />
            Strategic Base Location Decision Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#F2EDE4]">
            Which Town Should You Stay In?
          </h2>
          <p className="text-xs text-[#ADA89F] font-mono max-w-2xl mt-1">
            Compare advantages, disadvantages, grocery access, parking rules, and drive times.
          </p>
        </div>
      </div>

      {/* Town Select Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(CANADIAN_ROCKIES_TOWNS).map(([id, town]) => {
          const isActive = id === selectedTown;
          return (
            <button
              key={id}
              onClick={() => setSelectedTown(id)}
              className={`px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-[#C49A10] text-[#080808] font-bold shadow-gold"
                  : "bg-[#080808] text-[#ADA89F] border border-[#1A1A1A] hover:border-[#C49A10]/40"
              }`}
            >
              <span>{town.name}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                isActive ? "bg-[#080808] text-[#C49A10]" : "bg-[#1A1A1A] text-[#ADA89F]"
              }`}>
                {town.affordabilityBadge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Town Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        {/* Pros & Cons */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif font-light text-[#F2EDE4] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C49A10]" />
              {activeTown.name} Overview
            </h3>
            <span className="font-mono text-xs text-[#ADA89F] bg-[#080808] px-3 py-1 rounded border border-[#1A1A1A]">
              ~{activeTown.avgDriveTimeFromCalgaryMinutes} mins from Calgary
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Advantages */}
            <div className="p-4 bg-[#080808] rounded-2xl border border-emerald-500/20 space-y-3">
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Advantages
              </h4>
              <ul className="space-y-2 text-xs text-[#ADA89F]">
                {activeTown.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C49A10] font-bold">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages */}
            <div className="p-4 bg-[#080808] rounded-2xl border border-rose-500/20 space-y-3">
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" /> Drawbacks
              </h4>
              <ul className="space-y-2 text-xs text-[#ADA89F]">
                {activeTown.disadvantages.map((dis, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Drive Time Matrix */}
          <div className="p-4 bg-[#080808] rounded-2xl border border-[#1A1A1A] space-y-3">
            <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-[#C49A10] flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#C49A10]" /> Drive Time to Key Attractions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {Object.entries(activeTown.distanceToAttractions).map(([attraction, dist]) => (
                <div key={attraction} className="p-2.5 bg-[#111111] rounded border border-[#1A1A1A]">
                  <span className="text-[#ADA89F] font-mono text-[10px] block truncate">{attraction}</span>
                  <span className="font-bold text-[#F2EDE4] text-xs">{dist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vital Stats & Rules */}
        <div className="bg-[#080808] text-[#F2EDE4] rounded-2xl p-6 space-y-6 flex flex-col justify-between border border-[#C49A10]/20">
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C49A10] border-b border-[#1A1A1A] pb-3">
              Town Vital Ratings
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#ADA89F] flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C49A10]" /> Grocery Access
                </span>
                <span className="font-mono font-bold text-[#F2EDE4]">{activeTown.groceryScore}/10</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#ADA89F] flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#C49A10]" /> Dining Options
                </span>
                <span className="font-mono font-bold text-[#F2EDE4]">{activeTown.diningScore}/10</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#ADA89F] flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#C49A10]" /> Parking Ease
                </span>
                <span className="font-mono font-bold text-[#F2EDE4] capitalize">{activeTown.parkingDifficulty}</span>
              </div>
            </div>

            {/* National Park Pass Alert */}
            <div className={`p-4 rounded text-xs space-y-1.5 border ${
              activeTown.isParkPassRequired
                ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
            }`}>
              <div className="flex items-center gap-2 font-bold text-[#F2EDE4]">
                <ShieldAlert className="w-4 h-4 text-[#C49A10]" />
                {activeTown.isParkPassRequired
                  ? "Parks Canada Pass Required"
                  : "No Park Pass Required for Town Stay"}
              </div>
              <p className="text-[11px] leading-relaxed text-[#ADA89F]">
                {activeTown.isParkPassRequired
                  ? "A valid Parks Canada Discovery Pass is mandatory for every day you stay in this town."
                  : "Staying and dining in town does not require a National Park Pass unless travelling into Banff Park boundaries."}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1A1A1A] text-center font-mono text-[10px]">
            <span className="text-[#5C5852]">Scenic Backdrop: </span>
            <span className="text-[#C49A10]">{activeTown.scenicValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
