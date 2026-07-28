"use client";

import React, { useState, useEffect } from "react";
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
  DollarSign,
  Utensils,
  Clock,
  Heart,
} from "lucide-react";

const STORAGE_KEY = "nexorago_wizard_v2";

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

/** Large accessible counter control — 48×48px minimum touch target */
const Counter: React.FC<{
  label: string;
  sublabel?: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
  max?: number;
}> = ({ label, sublabel, value, onDecrement, onIncrement, min = 0, max = 99 }) => (
  <div className="p-4 bg-[#080808] rounded-2xl border border-[#C49A10]/20 flex items-center justify-between gap-4">
    <div>
      <span className="font-bold text-[#F2EDE4] text-sm block">{label}</span>
      {sublabel && <p className="text-xs font-mono text-[#ADA89F]">{sublabel}</p>}
    </div>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className="w-12 h-12 rounded-xl bg-[#1A1A1A] font-bold text-[#C49A10] text-xl hover:bg-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        −
      </button>
      <span className="font-bold text-[#F2EDE4] text-lg w-8 text-center tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className="w-12 h-12 rounded-xl bg-[#1A1A1A] font-bold text-[#C49A10] text-xl hover:bg-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        +
      </button>
    </div>
  </div>
);

export const TripWizard: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [criteria, setCriteria] = useState<SearchCriteria>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return { ...INITIAL_CRITERIA, ...JSON.parse(saved) };
      } catch {}
    }
    return INITIAL_CRITERIA;
  });

  const totalSteps = 15;

  // Persist state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(criteria));
    } catch {}
  }, [criteria]);

  const handleNext = () => {
    if (step < totalSteps) {
      if (step === 4) {
        const totalGuests = criteria.adults + criteria.children;
        const recommendedBeds = Math.min(4, Math.max(1, Math.ceil(totalGuests / 2)));
        setCriteria((prev) => ({ ...prev, bedrooms: recommendedBeds }));
      }
      setStep((s) => s + 1);
      // Scroll wizard back to top on mobile
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Clear wizard data after completion
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
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
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const updateChildAge = (index: number, age: number) => {
    const updated = [...criteria.childrenAges];
    updated[index] = age;
    setCriteria({ ...criteria, childrenAges: updated });
  };

  const toggleArrayItem = <T,>(current: T[], item: T): T[] =>
    current.includes(item) ? current.filter((i) => i !== item) : [...current, item];

  const progressPct = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#111111] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-nexora border border-[#C49A10]/25 relative text-[#F2EDE4]">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase mb-2 text-[#ADA89F]">
          <span className="flex items-center gap-1.5 text-[#C49A10] font-bold text-[10px] sm:text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B830]" aria-hidden="true" />
            <span className="hidden sm:inline">Nexora AI Concierge Engine</span>
            <span className="sm:hidden">NexoraGo AI</span>
          </span>
          <span aria-live="polite" aria-atomic="true">
            Step {step} / {totalSteps}
          </span>
        </div>
        <div
          className="w-full bg-[#1A1A1A] rounded-full h-2 overflow-hidden border border-[#C49A10]/15"
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Wizard progress: step ${step} of ${totalSteps}`}
        >
          <div
            className="bg-gradient-to-r from-[#C49A10] to-[#E5B830] h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="min-h-0">
        {/* STEP 1: Departure */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<MapPin className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                1. Where are you leaving from?
              </h2>
              <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                Default departure is Calgary.
              </p>
            </StepHeader>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 pt-2">
              {["Calgary", "Calgary International Airport (YYC)", "Edmonton", "Vancouver", "Other / Current Location"].map((city) => (
                <SelectButton
                  key={city}
                  selected={criteria.departureCity === city}
                  onClick={() => setCriteria({ ...criteria, departureCity: city })}
                >
                  {city}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Destinations */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Compass className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                2. Which destinations are you considering?
              </h2>
              <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                Select all regions to explore.
              </p>
            </StepHeader>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                "Banff", "Canmore", "Lake Louise", "Kananaskis",
                "Dead Man's Flats", "Harvie Heights", "Field, BC",
                "Golden, BC", "Show me best-value location",
              ].map((dest) => (
                <SelectButton
                  key={dest}
                  selected={criteria.destinations.includes(dest)}
                  onClick={() => setCriteria({ ...criteria, destinations: toggleArrayItem(criteria.destinations, dest) })}
                >
                  {dest}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Dates */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Calendar className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                3. What are your check-in and check-out dates?
              </h2>
              <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                Used for accurate total pricing.
              </p>
            </StepHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C49A10]" htmlFor="wizard-checkin">
                  Check-in Date
                </label>
                <input
                  id="wizard-checkin"
                  type="date"
                  value={criteria.checkIn}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setCriteria({ ...criteria, checkIn: e.target.value })}
                  className="w-full p-4 rounded-2xl border border-[#C49A10]/30 bg-[#080808] font-bold text-base text-[#F2EDE4] focus:ring-2 focus:ring-[#C49A10] focus:outline-none"
                  style={{ fontSize: "16px" /* Prevent iOS auto-zoom */ }}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C49A10]" htmlFor="wizard-checkout">
                  Check-out Date
                </label>
                <input
                  id="wizard-checkout"
                  type="date"
                  value={criteria.checkOut}
                  min={criteria.checkIn}
                  onChange={(e) => setCriteria({ ...criteria, checkOut: e.target.value })}
                  className="w-full p-4 rounded-2xl border border-[#C49A10]/30 bg-[#080808] font-bold text-base text-[#F2EDE4] focus:ring-2 focus:ring-[#C49A10] focus:outline-none"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Group Size */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Users className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                4. How many adults and children are travelling?
              </h2>
              <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                Age info ensures suite capacity and park pass exemptions.
              </p>
            </StepHeader>
            <div className="space-y-3 pt-2">
              <Counter
                label="Adults"
                sublabel="Ages 18+"
                value={criteria.adults}
                min={1}
                max={12}
                onDecrement={() => setCriteria({ ...criteria, adults: Math.max(1, criteria.adults - 1) })}
                onIncrement={() => setCriteria({ ...criteria, adults: criteria.adults + 1 })}
              />
              <Counter
                label="Children"
                sublabel="Ages 0–17"
                value={criteria.children}
                min={0}
                max={10}
                onDecrement={() => {
                  const n = Math.max(0, criteria.children - 1);
                  setCriteria({ ...criteria, children: n, childrenAges: criteria.childrenAges.slice(0, n) });
                }}
                onIncrement={() => {
                  const n = criteria.children + 1;
                  setCriteria({ ...criteria, children: n, childrenAges: [...criteria.childrenAges, 8] });
                }}
              />
            </div>
            {criteria.children > 0 && (
              <div className="p-4 bg-[#1A1A1A] rounded-2xl border border-[#C49A10]/20 space-y-3">
                <h3 className="text-xs font-mono font-bold text-[#C49A10] uppercase tracking-wider">
                  Child Ages
                </h3>
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-3">
                  {criteria.childrenAges.map((age, idx) => (
                    <div key={idx} className="space-y-1">
                      <label
                        className="text-xs text-[#ADA89F] block"
                        htmlFor={`child-age-${idx}`}
                      >
                        Child {idx + 1}
                      </label>
                      <input
                        id={`child-age-${idx}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min="0"
                        max="17"
                        value={age}
                        onChange={(e) => updateChildAge(idx, parseInt(e.target.value) || 0)}
                        className="w-full p-3 rounded-xl border border-[#C49A10]/30 bg-[#080808] text-center font-bold text-[#F2EDE4] focus:outline-none focus:ring-2 focus:ring-[#C49A10]"
                        style={{ fontSize: "16px" }}
                        aria-label={`Age of child ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Bedrooms */}
        {step === 5 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Bed className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                5. How many bedrooms are required?
              </h2>
            </StepHeader>
            <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-[#C49A10]/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#C49A10] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-[#F2EDE4] leading-relaxed">
                <strong className="text-[#C49A10]">AI Rec:</strong> Based on your group of {criteria.adults + criteria.children}, we suggest{" "}
                {Math.min(4, Math.max(1, Math.ceil((criteria.adults + criteria.children) / 2)))} bedrooms.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { count: 1, label: "1 Bedroom / Studio" },
                { count: 2, label: "2 Bedrooms" },
                { count: 3, label: "3 Bedrooms" },
                { count: 4, label: "4+ Bedrooms / Chalet" },
              ].map(({ count, label }) => (
                <SelectButton
                  key={count}
                  selected={criteria.bedrooms === count}
                  onClick={() => setCriteria({ ...criteria, bedrooms: count })}
                >
                  {label}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Budget */}
        {step === 6 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<DollarSign className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                6. What is your maximum accommodation budget?
              </h2>
              <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                Total stay budget in Canadian Dollars (CAD).
              </p>
            </StepHeader>
            <div className="space-y-4 pt-2">
              <div className="relative">
                <label className="sr-only" htmlFor="wizard-budget">Maximum budget in CAD</label>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#C49A10] text-lg" aria-hidden="true">$</span>
                <input
                  id="wizard-budget"
                  type="text"
                  inputMode="decimal"
                  value={criteria.maxBudgetCAD || 1200}
                  onChange={(e) => setCriteria({ ...criteria, maxBudgetCAD: parseInt(e.target.value.replace(/\D/g, "")) || 0 })}
                  className="w-full pl-10 p-4 rounded-2xl border border-[#C49A10]/30 bg-[#080808] font-bold text-xl text-[#F2EDE4] focus:outline-none focus:ring-2 focus:ring-[#C49A10]"
                  style={{ fontSize: "20px" }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[600, 1000, 1500, 2000, 3000, 5000].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setCriteria({ ...criteria, maxBudgetCAD: b })}
                    className="py-3 px-2 bg-[#080808] border border-[#1A1A1A] rounded-xl text-xs font-mono text-[#ADA89F] hover:text-[#F2EDE4] hover:border-[#C49A10]/30 transition-colors"
                  >
                    ${b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Stay Types */}
        {step === 7 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Home className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                7. What type of stay do you prefer?
              </h2>
            </StepHeader>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { type: "condo", label: "Condo / Suite" },
                { type: "chalet", label: "Mountain Chalet" },
                { type: "hotel", label: "Hotel" },
                { type: "resort", label: "Resort" },
                { type: "cabin", label: "Cabin" },
                { type: "entire_home", label: "Entire Home" },
                { type: "hostel", label: "Hostel" },
                { type: "any", label: "Any Type" },
              ].map(({ type, label }) => (
                <SelectButton
                  key={type}
                  selected={criteria.stayTypes.includes(type as StayType)}
                  onClick={() => setCriteria({ ...criteria, stayTypes: toggleArrayItem(criteria.stayTypes, type as StayType) })}
                >
                  {label}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 8: Priorities */}
        {step === 8 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Zap className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                8. What matters most to your group?
              </h2>
            </StepHeader>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { id: "cheapest_total", label: "Cheapest total price" },
                { id: "best_family_value", label: "Best family value" },
                { id: "kitchen", label: "Full kitchen" },
                { id: "free_parking", label: "Free parking" },
                { id: "pool", label: "Pool" },
                { id: "hot_tub", label: "Hot tub" },
                { id: "pet_friendly", label: "Pet friendly" },
                { id: "mountain_view", label: "Mountain view" },
                { id: "flexible_cancellation", label: "Flexible cancel" },
              ].map(({ id, label }) => (
                <SelectButton
                  key={id}
                  selected={criteria.priorities.includes(id as PriorityOption)}
                  onClick={() => setCriteria({ ...criteria, priorities: toggleArrayItem(criteria.priorities, id as PriorityOption) })}
                >
                  {label}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 9: Travel Mode */}
        {step === 9 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Car className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                9. Will you drive or take shuttles?
              </h2>
            </StepHeader>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 pt-2">
              {[
                { mode: "personal_vehicle", label: "Personal Vehicle" },
                { mode: "rental_vehicle", label: "Rental Car" },
                { mode: "public_transit", label: "Public Transit / Roam" },
                { mode: "tour_shuttle", label: "Tour or Express Shuttle" },
              ].map(({ mode, label }) => (
                <SelectButton
                  key={mode}
                  selected={criteria.travelMode === mode}
                  onClick={() => setCriteria({ ...criteria, travelMode: mode as TravelMode })}
                >
                  {label}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 10: Activities */}
        {step === 10 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Compass className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                10. What activities interest the group?
              </h2>
            </StepHeader>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                "Scenic sightseeing", "Easy walks", "Hiking", "Lakes",
                "Wildlife", "Gondola", "Hot springs", "Photography",
                "Children's activities", "Restaurants", "Shopping", "Spa & wellness",
              ].map((activity) => (
                <SelectButton
                  key={activity}
                  selected={criteria.activities.includes(activity)}
                  onClick={() => setCriteria({ ...criteria, activities: toggleArrayItem(criteria.activities, activity) })}
                >
                  {activity}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 11: Trip Pace */}
        {step === 11 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Calendar className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                11. What is your preferred trip pace?
              </h2>
            </StepHeader>
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                { pace: "relaxed", title: "Relaxed", desc: "Leisurely mornings, 1–2 main activities per day" },
                { pace: "balanced", title: "Balanced", desc: "Mix of sightseeing, dining, and outdoor walks" },
                { pace: "see_everything", title: "See As Much As Possible", desc: "Action-packed from sunrise to dusk" },
              ].map(({ pace, title, desc }) => (
                <button
                  key={pace}
                  type="button"
                  onClick={() => setCriteria({ ...criteria, pace: pace as TripPace })}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                    criteria.pace === pace
                      ? "border-[#C49A10] bg-[#1A1A1A] shadow-gold ring-1 ring-[#C49A10]/30"
                      : "border-[#1A1A1A] bg-[#080808] hover:border-[#C49A10]/40"
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-base text-[#F2EDE4] mb-1">{title}</h3>
                    <p className="text-xs text-[#ADA89F]">{desc}</p>
                  </div>
                  {criteria.pace === pace && <CheckCircle2 className="w-5 h-5 text-[#C49A10] shrink-0 mt-0.5" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 12: Accessibility */}
        {step === 12 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Sparkles className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                12. Special Accessibility & Constraints
              </h2>
              <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                Customize for mobility, EVs, strollers, or pets.
              </p>
            </StepHeader>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { key: "hasPet", label: "Pet Travelling" },
                { key: "hasStroller", label: "Stroller Friendly" },
                { key: "mobility", label: "Mobility Accessible" },
                { key: "isEV", label: "Electric Vehicle (EV)" },
                { key: "hasSeniors", label: "Senior Travellers" },
              ].map(({ key, label }) => {
                const checked = Boolean((criteria.constraints as Record<string, unknown>)[key]);
                return (
                  <SelectButton
                    key={key}
                    selected={checked}
                    onClick={() => setCriteria({ ...criteria, constraints: { ...criteria.constraints, [key]: !checked } })}
                  >
                    {label}
                  </SelectButton>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 13: Dietary */}
        {step === 13 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Utensils className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                13. Dietary Requirements & Meal Prep
              </h2>
            </StepHeader>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Dairy-Free", "Kid Friendly", "Full Kitchen Cooking"].map((diet) => (
                <SelectButton
                  key={diet}
                  selected={criteria.constraints.dietary.includes(diet)}
                  onClick={() => {
                    const updated = criteria.constraints.dietary.includes(diet)
                      ? criteria.constraints.dietary.filter((d) => d !== diet)
                      : [...criteria.constraints.dietary, diet];
                    setCriteria({ ...criteria, constraints: { ...criteria.constraints, dietary: updated } });
                  }}
                >
                  {diet}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 14: Drive Time */}
        {step === 14 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Clock className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                14. Maximum daily driving time?
              </h2>
            </StepHeader>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { time: 30, label: "Max 30 mins" },
                { time: 45, label: "Max 45 mins" },
                { time: 60, label: "Max 60 mins" },
                { time: 90, label: "No Limit (90+ mins)" },
              ].map(({ time, label }) => (
                <SelectButton
                  key={time}
                  selected={criteria.constraints.maxDriveTimeMinutes === time}
                  onClick={() => setCriteria({ ...criteria, constraints: { ...criteria.constraints, maxDriveTimeMinutes: time } })}
                >
                  {label}
                </SelectButton>
              ))}
            </div>
          </div>
        )}

        {/* STEP 15: Summary */}
        {step === 15 && (
          <div className="space-y-5 animate-fade-in">
            <StepHeader icon={<Heart className="w-5 h-5" />}>
              <h2 className="text-xl sm:text-3xl font-serif font-light text-[#F2EDE4]">
                15. Trip Summary & AI Analysis
              </h2>
              <p className="text-xs font-mono text-[#ADA89F] tracking-wider uppercase">
                Review before launching your dashboard.
              </p>
            </StepHeader>
            <div className="p-5 bg-[#080808] rounded-2xl space-y-3 border border-[#C49A10]/30">
              <h3 className="text-xs font-mono font-bold text-[#C49A10] uppercase tracking-wider">
                NexoraGo AI Trip Criteria Summary
              </h3>
              <ul className="text-sm text-[#ADA89F] space-y-2 font-mono" role="list">
                {[
                  ["Origin", criteria.departureCity],
                  ["Destinations", criteria.destinations.join(", ") || "Any"],
                  ["Dates", `${criteria.checkIn} → ${criteria.checkOut}`],
                  ["Group", `${criteria.adults} Adult(s), ${criteria.children} Child(ren)`],
                  ["Bedrooms", `${criteria.bedrooms} Required`],
                  ["Max Budget", `$${criteria.maxBudgetCAD} CAD`],
                ].map(([k, v]) => (
                  <li key={k}>
                    • {k}: <strong className="text-[#F2EDE4]">{v}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky Navigation Buttons ── */}
      <div className="sticky bottom-0 mt-6 pt-4 pb-2 bg-gradient-to-t from-[#111111] via-[#111111]/95 to-transparent flex items-center justify-between gap-3 border-t border-[#1A1A1A]">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 1}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all min-h-[44px] ${
            step === 1
              ? "text-[#5C5852] cursor-not-allowed"
              : "text-[#ADA89F] hover:bg-[#1A1A1A] hover:text-[#F2EDE4]"
          }`}
          aria-label={step === 1 ? "Already at first step" : `Go back to step ${step - 1}`}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="btn-nexora-fill flex-shrink-0 flex items-center gap-2"
          aria-label={step === totalSteps ? "Generate results dashboard" : `Continue to step ${step + 1}`}
        >
          {step === totalSteps ? (
            <>Generate Results <Sparkles className="w-4 h-4" aria-hidden="true" /></>
          ) : (
            <>Continue <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
          )}
        </button>
      </div>
    </div>
  );
};

/* ── Local sub-components ── */

const StepHeader: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <div className="flex items-start gap-3">
    <div className="p-2.5 bg-[#1A1A1A] rounded-2xl text-[#C49A10] border border-[#C49A10]/25 shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="space-y-1 min-w-0">{children}</div>
  </div>
);

const SelectButton: React.FC<{
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ selected, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-4 min-h-[52px] rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between gap-2 ${
      selected
        ? "border-[#C49A10] bg-[#1A1A1A] text-[#F2EDE4] shadow-gold ring-1 ring-[#C49A10]/30"
        : "border-[#1A1A1A] bg-[#080808] text-[#ADA89F] hover:border-[#C49A10]/40 hover:text-[#F2EDE4]"
    }`}
    aria-pressed={selected}
  >
    <span className="leading-tight">{children}</span>
    {selected && <CheckCircle2 className="w-4 h-4 text-[#C49A10] shrink-0" aria-hidden="true" />}
  </button>
);
