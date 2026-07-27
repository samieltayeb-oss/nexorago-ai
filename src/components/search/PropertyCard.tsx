"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AccommodationProperty } from "@/types";
import { generateWorkingProviderLinks } from "@/lib/providers/mockProvider";
import {
  Star,
  Bed,
  Users,
  Utensils,
  Car,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Search,
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

  const confidenceInfo = getConfidenceBadge(property.priceConfidence);
  const links = generateWorkingProviderLinks(property.propertyName, property.destination, checkIn, checkOut, adults, children);

  return (
    <div className="bg-[#111111] rounded-3xl border border-[#C49A10]/20 shadow-nexora hover:border-[#C49A10]/50 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row group text-[#F2EDE4]">
      {/* Image & Badges Column */}
      <div className="relative w-full lg:w-80 h-64 lg:h-auto shrink-0 bg-[#080808] overflow-hidden">
        <Image
          src={property.images[0] || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"}
          alt={property.propertyName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
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
          {/* Price Breakdown */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-light text-[#F2EDE4]">
                  ${Math.round(property.totalStayCost)} <span className="text-[#C49A10] text-xl">CAD</span>
                </span>
                <span className="font-mono text-[10px] text-[#ADA89F] uppercase tracking-wider">True Total Stay</span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-[#ADA89F] mt-1">
                <span>${property.nightlyBaseRate}/night base</span>
                <span>•</span>
                <span>${Math.round(property.effectiveCostPerPerson)}/person</span>
                <button
                  type="button"
                  onClick={() => setShowFeeDetails(!showFeeDetails)}
                  className="text-[#C49A10] font-bold hover:underline flex items-center gap-0.5 ml-1"
                >
                  Breakdown {showFeeDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Fee Breakdown Drawer */}
              {showFeeDetails && (
                <div className="mt-3 p-3 bg-[#080808] rounded-xl border border-[#C49A10]/20 text-xs font-mono space-y-1 text-[#ADA89F]">
                  <div className="flex justify-between">
                    <span>Nightly Base:</span>
                    <span className="text-[#F2EDE4]">${property.nightlyBaseRate} CAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Taxes (11% AB Levy/GST):</span>
                    <span className="text-[#F2EDE4]">${Math.round(property.taxes)} CAD</span>
                  </div>
                  {property.cleaningFee > 0 && (
                    <div className="flex justify-between">
                      <span>Cleaning Fee:</span>
                      <span className="text-[#F2EDE4]">${property.cleaningFee} CAD</span>
                    </div>
                  )}
                  {property.resortFee > 0 && (
                    <div className="flex justify-between">
                      <span>Resort / Destination Fee:</span>
                      <span className="text-[#F2EDE4]">${property.resortFee} CAD</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Parking:</span>
                    <span className="text-[#F2EDE4]">
                      {property.hasFreeParking ? "Free" : `$${property.parkingFeePerNight}/night`}
                    </span>
                  </div>
                  <div className="pt-1 border-t border-[#1A1A1A] flex justify-between font-bold text-[#C49A10]">
                    <span>True Total Stay:</span>
                    <span>${Math.round(property.totalStayCost)} CAD</span>
                  </div>
                </div>
              )}
            </div>

            {/* Primary CTA → Direct to OTA to ensure exact dates and guests are pre-filled */}
            <a
              href={property.provider === 'expedia' ? links.expedia : links.bookingCom}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nexora-fill flex items-center justify-center gap-2 w-full lg:w-auto shrink-0"
            >
              <Search className="w-4 h-4" /> Check Live Availability on {property.provider === 'expedia' ? 'Expedia' : 'Booking.com'}
            </a>
          </div>

          {/* 7-Provider Live Search Bar */}
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
            <a
              href={links.tripAdvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#C49A10] hover:text-[#E5B830] hover:underline bg-[#111111] px-2.5 py-1 rounded border border-[#C49A10]/20 transition-colors"
            >
              TripAdvisor
            </a>
            <a
              href={links.airbnb}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#C49A10] hover:text-[#E5B830] hover:underline bg-[#111111] px-2.5 py-1 rounded border border-[#C49A10]/20 transition-colors"
            >
              Airbnb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
