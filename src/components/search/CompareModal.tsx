"use client";

import React from "react";
import { AccommodationProperty } from "@/types";
import { X, Check, Utensils, Car, ExternalLink, ShieldCheck } from "lucide-react";

interface CompareModalProps {
  properties: AccommodationProperty[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  properties,
  onClose,
  onRemove,
}) => {
  if (properties.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-[#F2EDE4]">
      <div className="bg-[#111111] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-nexora border border-[#C49A10]/30 p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
          <div>
            <h2 className="text-3xl font-serif font-light text-[#F2EDE4]">
              Side-by-Side Property Comparison
            </h2>
            <p className="text-xs font-mono text-[#ADA89F] uppercase tracking-wider">
              Comparing {properties.length} stay(s) based on true total cost, amenities, and family value.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#ADA89F] hover:text-[#F2EDE4] hover:bg-[#1A1A1A] transition-colors"
          >
            <X className="w-6 h-6 text-[#C49A10]" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_repeat(auto-fit,minmax(220px,1fr))] gap-4 text-xs font-mono">
          {/* Labels Column */}
          <div className="hidden md:flex flex-col space-y-6 font-bold text-[#ADA89F] uppercase tracking-widest pt-32 text-[10px]">
            <div className="h-10 flex items-center">Real Total Cost</div>
            <div className="h-8 flex items-center">Cost / Person</div>
            <div className="h-8 flex items-center">Location</div>
            <div className="h-8 flex items-center">Bedrooms / Beds</div>
            <div className="h-8 flex items-center">Kitchen</div>
            <div className="h-8 flex items-center">Parking</div>
            <div className="h-8 flex items-center">Rating</div>
            <div className="h-16 flex items-center">Nexora AI Rationale</div>
          </div>

          {/* Property Columns */}
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="p-4 bg-[#080808] rounded-2xl border border-[#C49A10]/20 space-y-4 flex flex-col justify-between relative group"
            >
              <button
                onClick={() => onRemove(prop.id)}
                className="absolute top-2 right-2 p-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-[#ADA89F] hover:text-rose-400"
                title="Remove from comparison"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="nexora-pill">
                  {prop.destination}
                </span>
                <h3 className="font-serif font-light text-[#F2EDE4] text-lg leading-snug line-clamp-2 mt-1">
                  {prop.propertyName}
                </h3>
              </div>

              {/* Real Total Cost */}
              <div className="p-3 bg-[#111111] rounded-xl border border-[#C49A10]/20">
                <div className="text-xl font-serif font-light text-[#C49A10]">
                  ${Math.round(prop.totalStayCost)} <span className="text-xs">CAD</span>
                </div>
                <span className="text-[9px] text-[#ADA89F] uppercase tracking-wider block mt-0.5">
                  Includes taxes, cleaning & fees
                </span>
              </div>

              {/* Specs */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="md:h-8 flex items-center justify-between border-b border-[#1A1A1A] pb-1">
                  <span className="md:hidden font-semibold text-[#ADA89F]">Cost / Person:</span>
                  <span className="font-bold text-[#F2EDE4]">${Math.round(prop.effectiveCostPerPerson)}</span>
                </div>

                <div className="md:h-8 flex items-center justify-between border-b border-[#1A1A1A] pb-1">
                  <span className="md:hidden font-semibold text-[#ADA89F]">Location:</span>
                  <span className="font-semibold text-[#F2EDE4]">{prop.destination}</span>
                </div>

                <div className="md:h-8 flex items-center justify-between border-b border-[#1A1A1A] pb-1">
                  <span className="md:hidden font-semibold text-[#ADA89F]">Bedrooms:</span>
                  <span className="font-semibold text-[#F2EDE4]">{prop.bedrooms} Bed / {prop.beds} Beds</span>
                </div>

                <div className="md:h-8 flex items-center justify-between border-b border-[#1A1A1A] pb-1">
                  <span className="md:hidden font-semibold text-[#ADA89F]">Kitchen:</span>
                  {prop.hasKitchen ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Full Kitchen
                    </span>
                  ) : (
                    <span className="text-[#5C5852]">None</span>
                  )}
                </div>

                <div className="md:h-8 flex items-center justify-between border-b border-[#1A1A1A] pb-1">
                  <span className="md:hidden font-semibold text-[#ADA89F]">Parking:</span>
                  <span className="font-semibold text-[#F2EDE4]">
                    {prop.hasFreeParking ? "Free" : `$${prop.parkingFeePerNight}/nt`}
                  </span>
                </div>

                <div className="md:h-8 flex items-center justify-between border-b border-[#1A1A1A] pb-1">
                  <span className="md:hidden font-semibold text-[#ADA89F]">Rating:</span>
                  <span className="font-bold text-[#E5B830]">{prop.guestRating}/10</span>
                </div>

                <div className="md:h-16 flex items-center p-2 bg-[#111111] rounded border border-[#1A1A1A] text-[10px] text-[#ADA89F] font-sans leading-snug">
                  {prop.whyWeRecommend}
                </div>
              </div>

              <a
                href={prop.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nexora-fill w-full flex items-center justify-center gap-1 mt-2 text-[10px]"
              >
                Book Now <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
