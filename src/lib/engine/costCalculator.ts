import { AccommodationProperty } from "@/types";

export interface CostCalculationInput {
  nightlyBaseRate: number;
  nights: number;
  taxes: number; // Percentage or fixed amount
  cleaningFee: number;
  resortFee: number;
  parkingFeePerNight: number;
  adults: number;
  children: number;
}

export interface CostCalculationResult {
  baseTotal: number;
  taxTotal: number;
  cleaningFee: number;
  resortFeeTotal: number;
  parkingTotal: number;
  totalStayCost: number;
  effectiveCostPerNight: number;
  effectiveCostPerPerson: number;
}

/**
 * Deterministic calculation of true total stay cost.
 * Prevents hidden fee surprises by summing taxes, cleaning, resort, and parking fees.
 */
export function calculateTrueTotalCost(input: CostCalculationInput): CostCalculationResult {
  const nights = Math.max(1, input.nights);
  const totalTravellers = Math.max(1, input.adults + input.children);

  const baseTotal = input.nightlyBaseRate * nights;
  
  // Tax calculation (if percentage e.g. 0.11 for Alberta 5% GST + 4% Tourism Levy + 2% DMF/Local)
  const taxRate = input.taxes < 1 ? input.taxes : input.taxes / 100;
  const taxTotal = Math.round((baseTotal * (taxRate || 0.11)) * 100) / 100;

  const cleaningFee = Math.round(input.cleaningFee * 100) / 100;
  const resortFeeTotal = Math.round((input.resortFee * nights) * 100) / 100;
  const parkingTotal = Math.round((input.parkingFeePerNight * nights) * 100) / 100;

  const totalStayCost = Math.round(
    (baseTotal + taxTotal + cleaningFee + resortFeeTotal + parkingTotal) * 100
  ) / 100;

  const effectiveCostPerNight = Math.round((totalStayCost / nights) * 100) / 100;
  const effectiveCostPerPerson = Math.round((totalStayCost / totalTravellers) * 100) / 100;

  return {
    baseTotal,
    taxTotal,
    cleaningFee,
    resortFeeTotal,
    parkingTotal,
    totalStayCost,
    effectiveCostPerNight,
    effectiveCostPerPerson,
  };
}

/**
 * Enriches property with computed cost fields based on checkIn/checkOut and guest counts.
 */
export function enrichPropertyWithCosts(
  property: AccommodationProperty,
  nights: number,
  adults: number,
  children: number
): AccommodationProperty {
  const cost = calculateTrueTotalCost({
    nightlyBaseRate: property.nightlyBaseRate,
    nights,
    taxes: property.taxes || 11, // Default AB 11% tax/levy
    cleaningFee: property.cleaningFee || 0,
    resortFee: property.resortFee || 0,
    parkingFeePerNight: property.hasFreeParking ? 0 : (property.parkingFeePerNight || 0),
    adults,
    children,
  });

  return {
    ...property,
    totalStayCost: cost.totalStayCost,
    effectiveCostPerNight: cost.effectiveCostPerNight,
    effectiveCostPerPerson: cost.effectiveCostPerPerson,
  };
}
