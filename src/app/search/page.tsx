"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getMockPropertiesForSearch } from "@/lib/providers/mockProvider";
import { scoreAndRankProperties } from "@/lib/engine/rankingEngine";
import { generateAIRecommendationSummary } from "@/lib/engine/townComparer";
import { PropertyCard } from "@/components/search/PropertyCard";
import { TownComparisonSection } from "@/components/search/TownComparisonSection";
import { CompareModal } from "@/components/search/CompareModal";
import { SearchCriteria, AccommodationProperty } from "@/types";
import {
  Sparkles,
  Filter,
  SlidersHorizontal,
  MapPin,
  Calendar,
  Grid,
  Map,
  ShieldCheck,
  TrendingDown,
  Layers,
} from "lucide-react";

function SearchDashboardContent() {
  const searchParams = useSearchParams();

  // Parse params or fallback defaults
  const checkIn = searchParams.get("in") || "2026-08-10";
  const checkOut = searchParams.get("out") || "2026-08-13";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "2");
  const bedrooms = parseInt(searchParams.get("beds") || "2");
  const budgetMax = parseInt(searchParams.get("budget") || "1200");
  const destsParam = searchParams.get("dests") || "Banff,Canmore";
  const destinations = destsParam.split(",").filter(Boolean);

  const [selectedTownFilter, setSelectedTownFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("best_value");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [comparedProperties, setComparedProperties] = useState<AccommodationProperty[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Fetch live properties from API
  const [rawProperties, setRawProperties] = useState<AccommodationProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({
      dests: destsParam,
      in: checkIn,
      out: checkOut,
      adults: adults.toString(),
      children: children.toString()
    });
    
    fetch(`/api/hotels/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRawProperties(data);
        } else {
          console.error("API Error:", data);
          setRawProperties([]); // Fallback
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [destsParam, checkIn, checkOut, adults, children]);

  // Construct SearchCriteria object for ranking engine
  const searchCriteria: SearchCriteria = useMemo(() => ({
    departureCity: searchParams.get("city") || "Calgary",
    destinations,
    checkIn,
    checkOut,
    adults,
    children,
    childrenAges: [6, 10],
    bedrooms,
    maxBudgetCAD: budgetMax,
    budgetType: "total",
    stayTypes: ["condo", "chalet", "hotel"],
    priorities: ["best_family_value", "kitchen", "free_parking"],
    travelMode: "personal_vehicle",
    activities: ["Scenic sightseeing", "Lakes"],
    pace: "balanced",
    constraints: {
      mobility: false,
      dietary: [],
      hasPet: false,
      hasStroller: true,
      hasSeniors: false,
      isEV: false,
    },
  }), [destinations, checkIn, checkOut, adults, children, bedrooms, budgetMax, searchParams]);

  // Rank properties
  const rankedProperties = useMemo(() => {
    let filtered = rawProperties;

    if (selectedTownFilter !== "all") {
      filtered = filtered.filter(
        (p) => p.destination.toLowerCase() === selectedTownFilter.toLowerCase()
      );
    }

    const scored = scoreAndRankProperties(filtered, searchCriteria);

    if (sortBy === "cheapest_total") {
      return [...scored].sort((a, b) => a.totalStayCost - b.totalStayCost);
    }
    if (sortBy === "highest_rated") {
      return [...scored].sort((a, b) => b.guestRating - a.guestRating);
    }
    if (sortBy === "most_spacious") {
      return [...scored].sort((a, b) => b.bedrooms - a.bedrooms);
    }

    return scored; // Default: best_value
  }, [rawProperties, searchCriteria, selectedTownFilter, sortBy]);

  const recommendationSummary = generateAIRecommendationSummary(
    destinations,
    adults + children,
    children,
    bedrooms,
    budgetMax
  );

  const toggleCompare = (prop: AccommodationProperty) => {
    if (comparedProperties.some((p) => p.id === prop.id)) {
      setComparedProperties(comparedProperties.filter((p) => p.id !== prop.id));
    } else {
      if (comparedProperties.length < 4) {
        setComparedProperties([...comparedProperties, prop]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-nexora-dark py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top AI Summary Banner */}
      <div className="bg-nexora-card text-nexora-cream rounded-3xl p-6 sm:p-8 shadow-nexora border border-nexora-border relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              AI Recommendation Summary
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif leading-snug text-nexora-cream">
              Personalized Results for Your Group of {adults + children}
            </h1>
            <p className="text-sm text-nexora-cream-muted leading-relaxed font-normal">
              {recommendationSummary}
            </p>
          </div>

          <div className="bg-nexora-surface p-4 rounded-2xl border border-nexora-border text-xs space-y-1 shrink-0">
            <div className="flex items-center gap-2 text-nexora-cream-muted">
              <Calendar className="w-3.5 h-3.5 text-nexora-gold" />
              <span>{checkIn} to {checkOut}</span>
            </div>
            <div className="flex items-center gap-2 text-nexora-cream-muted">
              <MapPin className="w-3.5 h-3.5 text-nexora-gold" />
              <span>{destinations.join(", ") || "Canadian Rockies"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date Flexibility Alert */}
      <div className="bg-nexora-surface border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-nexora-cream shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm block text-emerald-400">Flexible Dates Opportunity</span>
            <p className="text-nexora-cream-muted">
              Shifting check-in from <strong className="text-nexora-cream">{checkIn}</strong> to midweek (Sunday–Wednesday) may reduce your total stay cost by up to <strong className="text-emerald-400">$140 CAD</strong> in Canmore.
            </p>
          </div>
        </div>
        <button
          onClick={() => alert("Searching nearby date shift combinations...")}
          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold px-4 py-2 rounded-xl shrink-0 transition-colors"
        >
          Check Date Shift Savings
        </button>
      </div>

      {/* Filter & Sort Controls */}
      <div className="bg-nexora-card rounded-2xl p-4 border border-nexora-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Town Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-nexora-cream-muted flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Town:
          </span>
          {["all", "Canmore", "Banff", "Lake Louise", "Dead Man's Flats", "Golden"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTownFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors capitalize border ${
                selectedTownFilter === t
                  ? "bg-nexora-gold text-nexora-dark border-nexora-gold shadow-[0_0_10px_rgba(196,154,16,0.3)]"
                  : "bg-nexora-surface text-nexora-cream-muted border-nexora-border hover:border-nexora-gold/50"
              }`}
            >
              {t === "all" ? "All Locations" : t}
            </button>
          ))}
        </div>        {/* Sort & Compare Launchers */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {comparedProperties.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="bg-nexora-gold hover:bg-nexora-gold-bright text-nexora-dark font-extrabold text-xs px-4 py-2 rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4" /> Compare ({comparedProperties.length})
            </button>
          )}

          <div className="flex items-center gap-2 bg-nexora-surface border border-nexora-border rounded-xl p-1">
            <SlidersHorizontal className="w-4 h-4 text-nexora-cream-muted ml-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-nexora-cream py-1.5 pr-8 pl-1 focus:ring-0 cursor-pointer outline-none"
            >
              <option value="best_value">Best Overall Value</option>
              <option value="cheapest_total">Lowest Total Cost</option>
              <option value="highest_rated">Highest Rated</option>
              <option value="most_spacious">Most Bedrooms</option>
            </select>
          </div>

          <div className="flex bg-nexora-surface border border-nexora-border rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-nexora-card text-nexora-gold shadow-sm" : "text-nexora-cream-muted hover:text-nexora-cream"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "map" ? "bg-nexora-card text-nexora-gold shadow-sm" : "text-nexora-cream-muted hover:text-nexora-cream"
              }`}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-nexora-surface" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-nexora-gold border-t-transparent animate-spin" />
            <Sparkles className="w-6 h-6 text-nexora-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-sm font-bold text-nexora-cream-muted uppercase tracking-widest animate-pulse">Scanning live inventory across 50+ providers...</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-nexora-cream-muted font-semibold px-1">
            <span>Showing {rankedProperties.length} verified accommodation option(s)</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> All totals include cleaning, taxes & parking fees
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {rankedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onCompareToggle={toggleCompare}
                isCompared={comparedProperties.some((p) => p.id === property.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Map View Overlay */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-display text-lg text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-alpine-800" /> Synchronized Map View
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Showing accommodation pins, attraction markers & transit hubs
            </span>
          </div>

          {/* Interactive Map Visual Mock */}
          <div className="w-full h-[500px] bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center p-6 text-white text-center">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#4A7C59_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 space-y-4 max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-alpine-800 flex items-center justify-center text-gold-400 mx-auto shadow-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-xl font-display">Interactive Rockies Map</h4>
              <p className="text-xs text-slate-300">
                Pins synchronized with {rankedProperties.length} stays, Banff, Canmore, Lake Louise, Moraine Lake Shuttle departure points, and Safeway grocery hubs.
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {rankedProperties.slice(0, 5).map((p) => (
                  <span key={p.id} className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gold-300 border border-white/20">
                    📍 {p.propertyName} (${Math.round(p.totalStayCost)})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Town Location Decision Engine Section */}
      <TownComparisonSection />

      {/* Side-by-Side Compare Modal */}
      {isCompareOpen && (
        <CompareModal
          properties={comparedProperties}
          onClose={() => setIsCompareOpen(false)}
          onRemove={(id) => setComparedProperties(comparedProperties.filter((p) => p.id !== id))}
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-12 text-slate-600 font-bold text-sm">
        Loading RockyGo AI Search Dashboard...
      </div>
    }>
      <SearchDashboardContent />
    </Suspense>
  );
}
