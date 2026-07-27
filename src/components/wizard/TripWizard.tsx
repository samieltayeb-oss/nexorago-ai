"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchCriteria, StayType, PriorityOption, TravelMode, TripPace } from "@/types";
import {
  MapPin,
  Calendar,
  Users,
  Bed,
  Home,
  CheckCircle2,
  Car,
  Compass,
  Zap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  DollarSign,
  Utensils,
  Clock,
  Heart,
} from "lucide-react";

const INITIAL_CRITERIA: SearchCriteria = {
  departureCity: "Calgary",
  destinations: ["Banff", "Canmore"],
  checkIn: "2026-08-10",
  checkOut: "2026-08-13",
  adults: 2,
  children: 2,
  childrenAges: [6, 10],
  bedrooms: 2,
  maxBudgetCAD: 1200,
  budgetType: "total",
  stayTypes: ["condo", "chalet", "hotel"],
  priorities: ["best_family_value", "kitchen", "free_parking"],
  travelMode: "personal_vehicle",
  activities: ["Scenic sightseeing", "Lakes", "Gondola", "Hot springs", "Children's activities"],
  pace: "balanced",
  constraints: {
    mobility: false,
    dietary: [],
    hasPet: false,
    hasStroller: true,
    hasSeniors: false,
    isEV: false,
    maxDriveTimeMinutes: 45,
    specialOccasion: "",
  },
};

export const TripWizard: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [criteria, setCriteria] = useState<SearchCriteria>(INITIAL_CRITERIA);

  const totalSteps = 15;

  const handleNext = () => {
    if (step < totalSteps) {
      if (step === 4) {
        // Auto-suggest bedrooms based on group size (approx 2 people per room)
        const totalGuests = criteria.adults + criteria.children;
        const recommendedBeds = Math.min(4, Math.max(1, Math.ceil(totalGuests / 2)));
        setCriteria((prev) => ({ ...prev, bedrooms: recommendedBeds }));
      }
      setStep(step + 1);
    } else {
      const queryParams = new URLSearchParams({
        city: criteria.departureCity,
        dests: criteria.destinations.join(","),
        in: criteria.checkIn,
        out: criteria.checkOut,
        adults: criteria.adults.toString(),
        children: criteria.children.toString(),
        beds: criteria.bedrooms.toString(),
        budget: criteria.maxBudgetCAD?.toString() || "1200",
      });
      router.push(`/search?${queryParams.toString()}`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateChildAge = (index: number, age: number) => {
    const updated = [...criteria.childrenAges];
    updated[index] = age;
    setCriteria({ ...criteria, childrenAges: updated });
  };

  const toggleArrayItem = <T,>(current: T[], item: T): T[] => {
    return current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#111111] rounded-3xl p-6 sm:p-10 shadow-nexora border border-[#C49A10]/25 relative overflow-hidden text-[#F2EDE4]">
      {/* Top Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase mb-2 text-[#ADA89F]">
          <span className="flex items-center gap-1.5 text-[#C49A10] font-bold">
            <Sparkles className="w-4 h-4 text-[#E5B830] animate-pulse" />
            Nexora AI Concierge Engine
          </span>
          <span>Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full bg-[#1A1A1A] rounded-full h-2 overflow-hidden border border-[#C49A10]/20">
          <div
            className="bg-gradient-to-r from-[#C49A10] to-[#E5B830] h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[380px] flex flex-col justify-between">
        {/* STEP 1: Departure */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  1. Where are you leaving from?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Default departure is Calgary. Select or enter your origin city.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {["Calgary", "Calgary International Airport (YYC)", "Edmonton", "Vancouver", "Other / Current Location"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setCriteria({ ...criteria, departureCity: city })}
                  className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                    criteria.departureCity === city
                      ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold ring-1 ring-[#C49A10]"
                      : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                  }`}
                >
                  <span>{city}</span>
                  {criteria.departureCity === city && <CheckCircle2 className="w-5 h-5 text-[#C49A10]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Destinations */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  2. Which destinations are you considering?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Select all regions you wish to explore or let AI suggest the best value.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                "Banff",
                "Canmore",
                "Lake Louise",
                "Kananaskis",
                "Dead Man's Flats",
                "Harvie Heights",
                "Field, BC",
                "Golden, BC",
                "Show me best-value location",
              ].map((dest) => {
                const selected = criteria.destinations.includes(dest);
                return (
                  <button
                    key={dest}
                    type="button"
                    onClick={() =>
                      setCriteria({
                        ...criteria,
                        destinations: toggleArrayItem(criteria.destinations, dest),
                      })
                    }
                    className={`p-3.5 rounded-2xl border text-left font-semibold text-xs sm:text-sm transition-all flex items-center justify-between ${
                      selected
                        ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold"
                        : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                    }`}
                  >
                    <span>{dest}</span>
                    {selected && <CheckCircle2 className="w-4 h-4 text-[#C49A10] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Dates */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  3. What are your trip check-in and check-out dates?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Select check-in and check-out dates for accurate total pricing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C49A10]">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={criteria.checkIn}
                  onChange={(e) => setCriteria({ ...criteria, checkIn: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-[#C49A10]/30 bg-[#080808] font-bold text-[#F2EDE4] focus:ring-2 focus:ring-[#C49A10]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C49A10]">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={criteria.checkOut}
                  onChange={(e) => setCriteria({ ...criteria, checkOut: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-[#C49A10]/30 bg-[#080808] font-bold text-[#F2EDE4] focus:ring-2 focus:ring-[#C49A10]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Group Size & Child Ages */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  4. How many adults and children are travelling?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Age information ensures suite capacity and park pass exemptions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-4 bg-[#080808] rounded-2xl border border-[#C49A10]/20 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#F2EDE4] text-sm">Adults</span>
                  <p className="text-xs font-mono text-[#ADA89F]">Ages 18+</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCriteria({ ...criteria, adults: Math.max(1, criteria.adults - 1) })}
                    className="w-9 h-9 rounded-xl bg-[#1A1A1A] font-bold text-[#C49A10] hover:bg-[#222222]"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#F2EDE4] w-6 text-center">{criteria.adults}</span>
                  <button
                    type="button"
                    onClick={() => setCriteria({ ...criteria, adults: criteria.adults + 1 })}
                    className="w-9 h-9 rounded-xl bg-[#1A1A1A] font-bold text-[#C49A10] hover:bg-[#222222]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#080808] rounded-2xl border border-[#C49A10]/20 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#F2EDE4] text-sm">Children</span>
                  <p className="text-xs font-mono text-[#ADA89F]">Ages 0–17</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const newCount = Math.max(0, criteria.children - 1);
                      setCriteria({
                        ...criteria,
                        children: newCount,
                        childrenAges: criteria.childrenAges.slice(0, newCount),
                      });
                    }}
                    className="w-9 h-9 rounded-xl bg-[#1A1A1A] font-bold text-[#C49A10] hover:bg-[#222222]"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#F2EDE4] w-6 text-center">{criteria.children}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newCount = criteria.children + 1;
                      setCriteria({
                        ...criteria,
                        children: newCount,
                        childrenAges: [...criteria.childrenAges, 8],
                      });
                    }}
                    className="w-9 h-9 rounded-xl bg-[#1A1A1A] font-bold text-[#C49A10] hover:bg-[#222222]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {criteria.children > 0 && (
              <div className="p-4 bg-[#1A1A1A] rounded-2xl border border-[#C49A10]/20 space-y-3">
                <h3 className="text-xs font-mono font-bold text-[#C49A10] uppercase tracking-wider">
                  Specify Child Ages
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {criteria.childrenAges.map((age, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className="text-xs text-[#ADA89F]">Child {idx + 1} Age</label>
                      <input
                        type="number"
                        min="0"
                        max="17"
                        value={age}
                        onChange={(e) => updateChildAge(idx, parseInt(e.target.value) || 0)}
                        className="w-full p-2.5 rounded-xl border border-[#C49A10]/30 bg-[#080808] text-center font-bold text-[#F2EDE4]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Bedrooms Required */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Bed className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  5. How many rooms or bedrooms are required?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Ensures space and privacy for your group.
                </p>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-[#C49A10]/30 flex items-start sm:items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#C49A10] shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-xs text-[#F2EDE4] font-medium leading-relaxed">
                <strong className="text-[#C49A10]">AI Recommendation:</strong> Based on your group of {criteria.adults + criteria.children}, we've pre-selected {Math.min(4, Math.max(1, Math.ceil((criteria.adults + criteria.children) / 2)))} bedrooms to ensure everyone has enough space.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { count: 1, label: "1 Bedroom / Studio" },
                { count: 2, label: "2 Bedrooms" },
                { count: 3, label: "3 Bedrooms" },
                { count: 4, label: "4+ Bedrooms / Chalet" },
              ].map(({ count, label }) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setCriteria({ ...criteria, bedrooms: count })}
                  className={`p-4 rounded-2xl border text-center font-bold text-sm transition-all ${
                    criteria.bedrooms === count
                      ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold ring-1 ring-[#C49A10]"
                      : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Budget Cap */}
        {step === 6 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  6. What is your maximum accommodation budget?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Target total stay budget in Canadian Dollars (CAD).
                </p>
              </div>
            </div>

            <div className="max-w-md pt-4 space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-3.5 font-bold text-[#C49A10]">$</span>
                <input
                  type="number"
                  step="50"
                  value={criteria.maxBudgetCAD || 1200}
                  onChange={(e) => setCriteria({ ...criteria, maxBudgetCAD: parseInt(e.target.value) || 0 })}
                  className="w-full pl-8 p-3.5 rounded-2xl border border-[#C49A10]/30 bg-[#080808] font-bold text-lg text-[#F2EDE4]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[600, 1000, 1500].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setCriteria({ ...criteria, maxBudgetCAD: b })}
                    className="p-2 bg-[#080808] border border-[#1A1A1A] rounded-xl text-xs font-mono text-[#ADA89F] hover:text-[#F2EDE4]"
                  >
                    ${b} CAD
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Preferred Stay Types */}
        {step === 7 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  7. What type of stay do you prefer?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Select all preferred accommodation types.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { type: "condo", label: "Condo / Suite" },
                { type: "chalet", label: "Mountain Chalet" },
                { type: "hotel", label: "Hotel" },
                { type: "resort", label: "Resort" },
                { type: "cabin", label: "Cabin" },
                { type: "entire_home", label: "Entire Home" },
                { type: "hostel", label: "Hostel" },
                { type: "any", label: "Any Type" },
              ].map(({ type, label }) => {
                const selected = criteria.stayTypes.includes(type as StayType);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setCriteria({
                        ...criteria,
                        stayTypes: toggleArrayItem(criteria.stayTypes, type as StayType),
                      })
                    }
                    className={`p-3.5 rounded-2xl border text-center font-semibold text-xs sm:text-sm transition-all ${
                      selected
                        ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold"
                        : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 8: Top Priorities */}
        {step === 8 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  8. What matters most to your group?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Select top priorities for transparent weighted ranking.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { id: "cheapest_total", label: "Cheapest total price" },
                { id: "best_family_value", label: "Best family value" },
                { id: "kitchen", label: "Full kitchen" },
                { id: "free_parking", label: "Free parking" },
                { id: "pool", label: "Pool" },
                { id: "hot_tub", label: "Hot tub" },
                { id: "pet_friendly", label: "Pet friendly" },
                { id: "mountain_view", label: "Mountain view" },
                { id: "flexible_cancellation", label: "Flexible cancellation" },
              ].map(({ id, label }) => {
                const selected = criteria.priorities.includes(id as PriorityOption);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      setCriteria({
                        ...criteria,
                        priorities: toggleArrayItem(criteria.priorities, id as PriorityOption),
                      })
                    }
                    className={`p-3.5 rounded-2xl border text-left font-semibold text-xs sm:text-sm transition-all flex items-center justify-between ${
                      selected
                        ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold"
                        : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                    }`}
                  >
                    <span>{label}</span>
                    {selected && <CheckCircle2 className="w-4 h-4 text-[#C49A10] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 9: Vehicle / Travel Mode */}
        {step === 9 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  9. Will you drive or take shuttles?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Determines parking calculations and transit guidance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                { mode: "personal_vehicle", label: "Personal Vehicle" },
                { mode: "rental_vehicle", label: "Rental Car" },
                { mode: "public_transit", label: "Public Transit / Roam" },
                { mode: "tour_shuttle", label: "Tour or Express Shuttle" },
              ].map(({ mode, label }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setCriteria({ ...criteria, travelMode: mode as TravelMode })}
                  className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                    criteria.travelMode === mode
                      ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold"
                      : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                  }`}
                >
                  <span>{label}</span>
                  {criteria.travelMode === mode && <CheckCircle2 className="w-5 h-5 text-[#C49A10]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 10: Activities */}
        {step === 10 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  10. What activities interest the group?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  We use these to build your daily AI itinerary.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                "Scenic sightseeing",
                "Easy walks",
                "Hiking",
                "Lakes",
                "Wildlife",
                "Gondola",
                "Hot springs",
                "Photography",
                "Children's activities",
                "Restaurants",
                "Shopping",
                "Spa and wellness",
              ].map((activity) => {
                const selected = criteria.activities.includes(activity);
                return (
                  <button
                    key={activity}
                    type="button"
                    onClick={() =>
                      setCriteria({
                        ...criteria,
                        activities: toggleArrayItem(criteria.activities, activity),
                      })
                    }
                    className={`p-3 rounded-2xl border text-left font-semibold text-xs sm:text-sm transition-all flex items-center justify-between ${
                      selected
                        ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold"
                        : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                    }`}
                  >
                    <span>{activity}</span>
                    {selected && <CheckCircle2 className="w-4 h-4 text-[#C49A10] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 11: Trip Pace */}
        {step === 11 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  11. What is your preferred trip pace?
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  How densely packed should your daily schedule be?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { pace: "relaxed", title: "Relaxed", desc: "Leisurely mornings, 1–2 main activities per day" },
                { pace: "balanced", title: "Balanced", desc: "Mix of sightseeing, dining, and outdoor walks" },
                { pace: "see_everything", title: "See As Much As Possible", desc: "Action-packed from sunrise to dusk" },
              ].map(({ pace, title, desc }) => (
                <button
                  key={pace}
                  type="button"
                  onClick={() => setCriteria({ ...criteria, pace: pace as TripPace })}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    criteria.pace === pace
                      ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold"
                      : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                  }`}
                >
                  <h3 className="font-bold text-base mb-1 text-[#F2EDE4]">{title}</h3>
                  <p className="text-xs text-[#ADA89F]">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 12: Accessibility & Constraints */}
        {step === 12 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  12. Special Accessibility & Group Constraints
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Customize for mobility, electric vehicles, strollers, or pets.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { key: "hasPet", label: "Pet Travelling" },
                { key: "hasStroller", label: "Stroller Friendly" },
                { key: "mobility", label: "Mobility Accessible" },
                { key: "isEV", label: "Electric Vehicle (EV)" },
                { key: "hasSeniors", label: "Senior Travellers" },
              ].map(({ key, label }) => {
                const checked = Boolean((criteria.constraints as unknown as Record<string, boolean>)[key]);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setCriteria({
                        ...criteria,
                        constraints: {
                          ...criteria.constraints,
                          [key]: !checked,
                        },
                      })
                    }
                    className={`p-3.5 rounded-2xl border text-left font-semibold text-xs sm:text-sm transition-all flex items-center justify-between ${
                      checked
                        ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold"
                        : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                    }`}
                  >
                    <span>{label}</span>
                    {checked && <CheckCircle2 className="w-4 h-4 text-[#C49A10] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 13: Dietary Requirements */}
        {step === 13 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  13. Dietary Requirements & Meal Prep
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Help us recommend appropriate dining options & grocery stops.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Dairy-Free", "Kid Friendly", "Full Kitchen Cooking"].map((diet) => {
                const selected = criteria.constraints.dietary.includes(diet);
                return (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => {
                      const updated = selected
                        ? criteria.constraints.dietary.filter((d) => d !== diet)
                        : [...criteria.constraints.dietary, diet];
                      setCriteria({
                        ...criteria,
                        constraints: { ...criteria.constraints, dietary: updated },
                      });
                    }}
                    className={`p-3.5 rounded-2xl border text-center font-semibold text-xs transition-all ${
                      selected
                        ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold"
                        : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                    }`}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 14: Driving Time Limit */}
        {step === 14 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  14. Maximum Acceptable Daily Driving Time
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  How much driving is acceptable per day between sights?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {[
                { time: 30, label: "Max 30 mins" },
                { time: 45, label: "Max 45 mins" },
                { time: 60, label: "Max 60 mins" },
                { time: 90, label: "No Limit (90+ mins)" },
              ].map(({ time, label }) => (
                <button
                  key={time}
                  type="button"
                  onClick={() =>
                    setCriteria({
                      ...criteria,
                      constraints: { ...criteria.constraints, maxDriveTimeMinutes: time },
                    })
                  }
                  className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all ${
                    criteria.constraints.maxDriveTimeMinutes === time
                      ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold ring-1 ring-[#C49A10]"
                      : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 15: Final Review & Generate */}
        {step === 15 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/30">
                <Heart className="w-6 h-6 text-[#E5B830]" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
                  15. Trip Summary & AI Analysis Launch
                </h2>
                <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                  Review your parameters before launching your custom dashboard.
                </p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-5 bg-[#080808] text-[#F2EDE4] rounded-2xl space-y-3 border border-[#C49A10]/30">
              <h3 className="text-xs font-mono font-bold text-[#C49A10] uppercase tracking-wider">
                NexoraGo AI Trip Criteria Summary
              </h3>
              <ul className="text-xs text-[#ADA89F] space-y-1.5 font-mono">
                <li>• Origin: <strong className="text-[#F2EDE4]">{criteria.departureCity}</strong></li>
                <li>• Destinations: <strong className="text-[#F2EDE4]">{criteria.destinations.join(", ")}</strong></li>
                <li>• Dates: <strong className="text-[#F2EDE4]">{criteria.checkIn} to {criteria.checkOut}</strong></li>
                <li>• Group: <strong className="text-[#F2EDE4]">{criteria.adults} Adult(s), {criteria.children} Child(ren)</strong></li>
                <li>• Bedrooms: <strong className="text-[#F2EDE4]">{criteria.bedrooms} Required</strong></li>
                <li>• Max Budget: <strong className="text-[#F2EDE4]">${criteria.maxBudgetCAD} CAD</strong></li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-[#1A1A1A]">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={`px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
              step === 1
                ? "text-[#5C5852] cursor-not-allowed"
                : "text-[#ADA89F] hover:bg-[#1A1A1A]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="btn-nexora-fill flex items-center gap-2"
          >
            {step === totalSteps ? (
              <>
                Generate Results Dashboard <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Continue to Step {step + 1} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
