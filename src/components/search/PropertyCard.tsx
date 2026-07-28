"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AccommodationProperty } from "@/types";
import { generateWorkingProviderLinks } from "@/lib/providers/mockProvider";
import { calculateTrueTripCost } from "@/lib/engine/budgetEngine";
import {
  Star,
  Bed,
  Users,
  Utensils,
  Car,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
} from "lucide-react";

interface PropertyCardProps {
  property: AccommodationProperty;
  onCompareToggle?: (prop: AccommodationProperty) => void;
  isCompared?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onCompareToggle,
  isCompared = false,
}) => {
  const [showFeeDetails, setShowFeeDetails] = useState(false);
  const [costViewMode, setCostViewMode] = useState<"family" | "adult" | "child" | "night">("family");

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "live_verified":
        return { label: "Live Verified Price", bg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" };
      case "recently_checked":
        return { label: "Recently Verified", bg: "bg-blue-950/80 text-blue-300 border-blue-500/40" };
      case "estimated":
        return { label: "Estimated Total", bg: "bg-amber-950/80 text-amber-300 border-amber-500/40" };
      default:
        return { label: "Partner Site Confirmation", bg: "bg-[#1A1A1A] text-[#ADA89F] border-[#5C5852]" };
    }
  };

  const searchParams = useSearchParams();
  const checkIn = searchParams.get("in") || "2026-08-10";
  const checkOut = searchParams.get("out") || "2026-08-13";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  
  const dIn = new Date(checkIn).getTime();
  const dOut = new Date(checkOut).getTime();
  const nights = Math.max(1, Math.ceil((dOut - dIn) / (1000 * 3600 * 24)));
  const totalPeople = adults + children;

  const confidenceInfo = getConfidenceBadge(property.priceConfidence);
  const links = generateWorkingProviderLinks(property.propertyName, property.destination, checkIn, checkOut, adults, children, property.maximumGuests);

  // Calculate True Trip Cost
  const budget = calculateTrueTripCost(property, checkIn, checkOut, adults, children);

  // Helper to format currency based on selected view mode
  const getDisplayCost = (totalAmount: number) => {
    switch (costViewMode) {
      case "adult":
        return Math.round(totalAmount / Math.max(1, adults));
      case "child":
        return Math.round(totalAmount / Math.max(1, totalPeople)); // spreading evenly as base approximation
      case "night":
        return Math.round(totalAmount / Math.max(1, nights));
      case "family":
      default:
        return Math.round(totalAmount);
    }
  };

  const displayGrandTotal = getDisplayCost(budget.grandTotal);

  return (
    <div className="bg-[#111111] rounded-3xl border border-[#C49A10]/20 shadow-nexora hover:border-[#C49A10]/50 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row group text-[#F2EDE4]">
      {/* Image & Badges Column */}
      <div className="relative w-full lg:w-80 h-64 lg:h-auto shrink-0 bg-[#080808] overflow-hidden">
        <img
          src={property.images[0] || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"}
          alt={property.propertyName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-[#080808]/90 text-[#F2EDE4] border border-[#C49A10]/30 backdrop-blur-md">
            {property.destination}
          </span>
          <span className={`font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded border backdrop-blur-md ${confidenceInfo.bg}`}>
            {confidenceInfo.label}
          </span>
        </div>

        {/* Guest Rating Overlay */}
        <div className="absolute bottom-3 left-3 bg-[#080808]/90 border border-[#C49A10]/20 backdrop-blur-md px-3 py-1.5 rounded flex items-center gap-1.5 shadow">
          <Star className="w-3.5 h-3.5 text-[#E5B830] fill-[#E5B830]" />
          <span className="font-mono font-bold text-[#F2EDE4] text-xs">{property.guestRating}</span>
          <span className="font-mono text-[10px] text-[#ADA89F]">({property.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Details Column */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div>
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ADA89F] mb-1">
                <span>{property.propertyType}</span>
                <span>•</span>
                <span>{property.address}</span>
              </div>
              <h3 className="text-2xl font-serif font-light text-[#F2EDE4] group-hover:text-[#C49A10] transition-colors">
                {property.propertyName}
              </h3>
            </div>

            {onCompareToggle && (
              <button
                type="button"
                onClick={() => onCompareToggle(property)}
                className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded border transition-all shrink-0 ${
                  isCompared
                    ? "bg-[#C49A10] text-[#080808] border-[#C49A10] font-bold"
                    : "bg-[#080808] text-[#ADA89F] hover:text-[#F2EDE4] border-[#1A1A1A]"
                }`}
              >
                {isCompared ? "✓ Compared" : "+ Compare"}
              </button>
            )}
          </div>

          {/* Quick Specs */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-[#ADA89F] my-3">
            <span className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded border border-[#1A1A1A]">
              <Users className="w-3.5 h-3.5 text-[#C49A10]" /> Up to {property.maximumGuests} Guests
            </span>
            <span className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded border border-[#1A1A1A]">
              <Bed className="w-3.5 h-3.5 text-[#C49A10]" /> {property.bedrooms} Bedroom(s)
            </span>
            {property.hasKitchen && (
              <span className="flex items-center gap-1.5 bg-emerald-950/40 text-emerald-400 px-3 py-1.5 rounded border border-emerald-500/30">
                <Utensils className="w-3.5 h-3.5 text-emerald-400" /> Full Kitchen
              </span>
            )}
            <span className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded border border-[#1A1A1A]">
              <Car className="w-3.5 h-3.5 text-[#C49A10]" /> {property.hasFreeParking ? "Free Parking" : `$${property.parkingFeePerNight}/night Parking`}
            </span>
          </div>

          {/* AI Recommendation Explanation */}
          {property.whyWeRecommend && (
            <div className="p-3 bg-[#080808] rounded-xl border border-[#C49A10]/20 text-xs text-[#ADA89F] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C49A10] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-xs uppercase text-[#C49A10] block mb-0.5">Nexora Recommendation:</span>
                {property.whyWeRecommend}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Multi-Provider Search Bar */}
        <div className="pt-4 border-t border-[#1A1A1A] space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
            <div className="w-full">
              {/* True Trip Cost Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-light text-[#F2EDE4]">
                    ${displayGrandTotal} <span className="text-[#C49A10] text-xl">CAD</span>
                  </span>
                  <span className="font-mono text-[10px] text-[#C49A10] uppercase tracking-wider font-bold bg-[#C49A10]/10 px-2 py-0.5 rounded border border-[#C49A10]/20">
                    True Trip Cost
                  </span>
                </div>

                {/* View Mode Tabs */}
                <div className="flex bg-[#080808] border border-[#1A1A1A] rounded-lg p-0.5 self-start">
                  <button onClick={() => setCostViewMode("family")} className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md transition-colors ${costViewMode === "family" ? "bg-[#111111] text-[#F2EDE4] font-bold border border-[#333]" : "text-[#5C5852] hover:text-[#ADA89F]"}`}>Family</button>
                  <button onClick={() => setCostViewMode("adult")} className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md transition-colors ${costViewMode === "adult" ? "bg-[#111111] text-[#F2EDE4] font-bold border border-[#333]" : "text-[#5C5852] hover:text-[#ADA89F]"}`}>Adult</button>
                  <button onClick={() => setCostViewMode("child")} className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md transition-colors ${costViewMode === "child" ? "bg-[#111111] text-[#F2EDE4] font-bold border border-[#333]" : "text-[#5C5852] hover:text-[#ADA89F]"}`}>Child</button>
                  <button onClick={() => setCostViewMode("night")} className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md transition-colors ${costViewMode === "night" ? "bg-[#111111] text-[#F2EDE4] font-bold border border-[#333]" : "text-[#5C5852] hover:text-[#ADA89F]"}`}>Night</button>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-[#ADA89F] mb-3">
                <span>Includes Hotel, Taxes, Fuel, Park Pass, Food & Activities.</span>
                <button
                  type="button"
                  onClick={() => setShowFeeDetails(!showFeeDetails)}
                  className="text-[#C49A10] font-bold hover:underline flex items-center gap-0.5 ml-auto sm:ml-1"
                >
                  Breakdown {showFeeDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Comprehensive Budget Engine Breakdown */}
              {showFeeDetails && (
                <div className="p-4 bg-[#080808] rounded-xl border border-[#C49A10]/20 text-xs font-mono text-[#ADA89F] mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                      <span>Accommodation:</span>
                      <span className="text-[#F2EDE4]">${getDisplayCost(budget.accommodationTotal)} CAD</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                      <span>Taxes & Fees:</span>
                      <span className="text-[#F2EDE4]">${getDisplayCost(budget.taxesAndFees)} CAD</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                      <span>Est. Fuel (RT + Local):</span>
                      <span className="text-[#F2EDE4]">${getDisplayCost(budget.fuelTotal)} CAD</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                      <span>National Park Pass:</span>
                      <span className="text-[#F2EDE4]">${getDisplayCost(budget.parkPassesTotal)} CAD</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                      <span>Food {property.hasKitchen && <span className="text-emerald-500/70">(Kitchen Savings)</span>}:</span>
                      <span className="text-[#F2EDE4]">${getDisplayCost(budget.foodTotal)} CAD</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                      <span>Activities:</span>
                      <span className="text-[#F2EDE4]">${getDisplayCost(budget.activitiesTotal)} CAD</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#333333] flex justify-between font-bold text-[#C49A10] text-sm">
                    <span>TOTAL TRUE TRIP COST (Per {costViewMode.charAt(0).toUpperCase() + costViewMode.slice(1)}):</span>
                    <span>${displayGrandTotal} CAD</span>
                  </div>
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col items-end gap-1.5 w-full lg:w-auto shrink-0 self-start lg:self-end mt-2 lg:mt-0 lg:-translate-y-9">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-wider px-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Hotel Base: ${Math.round(property.nightlyBaseRate)}/night
              </div>
              <a
                href={property.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nexora-fill flex items-center justify-center gap-2 w-full lg:w-auto shrink-0 shadow-[0_0_15px_rgba(20,184,166,0.15)] border border-emerald-500/30"
              >
                <Search className="w-4 h-4" /> Claim Exact Price
              </a>
            </div>
          </div>

          {/* Multi-Provider Live Search Bar */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-[#080808] rounded-xl border border-[#C49A10]/15">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#ADA89F] mr-1">
              Compare on:
            </span>
            <a
              href={links.googleHotels}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#C49A10] hover:text-[#E5B830] hover:underline bg-[#111111] px-2.5 py-1 rounded border border-[#C49A10]/20 transition-colors"
            >
              Google Hotels
            </a>
            <a
              href={links.bookingCom}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#C49A10] hover:text-[#E5B830] hover:underline bg-[#111111] px-2.5 py-1 rounded border border-[#C49A10]/20 transition-colors"
            >
              Booking.com
            </a>
            <a
              href={links.expedia}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#C49A10] hover:text-[#E5B830] hover:underline bg-[#111111] px-2.5 py-1 rounded border border-[#C49A10]/20 transition-colors"
            >
              Expedia
            </a>
            <a
              href={links.hotelsCom}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#C49A10] hover:text-[#E5B830] hover:underline bg-[#111111] px-2.5 py-1 rounded border border-[#C49A10]/20 transition-colors"
            >
              Hotels.com
            </a>
            <a
              href={links.trivago}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#C49A10] hover:text-[#E5B830] hover:underline bg-[#111111] px-2.5 py-1 rounded border border-[#C49A10]/20 transition-colors"
            >
              Trivago
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
