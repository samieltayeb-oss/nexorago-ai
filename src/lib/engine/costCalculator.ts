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
  maximumGuests: number;
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
  const roomsNeeded = Math.max(1, Math.ceil(totalTravellers / (input.maximumGuests || 4)));

  // Base rate, cleaning, and resort fees are per room
  const baseTotal = input.nightlyBaseRate * nights * roomsNeeded;
  
  // Tax calculation (if percentage e.g. 0.11 for Alberta 5% GST + 4% Tourism Levy + 2% DMF/Local)
  const taxRate = input.taxes < 1 ? input.taxes : input.taxes / 100;
  const taxTotal = Math.round((baseTotal * (taxRate || 0.11)) * 100) / 100;

  const cleaningFee = Math.round(input.cleaningFee * roomsNeeded * 100) / 100;
  const resortFeeTotal = Math.round((input.resortFee * nights * roomsNeeded) * 100) / 100;
  
  // Parking is usually per vehicle. We'll estimate 1 vehicle per room.
  const parkingTotal = Math.round((input.parkingFeePerNight * nights * roomsNeeded) * 100) / 100;

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
    maximumGuests: property.maximumGuests,
  });

  return {
    ...property,
    totalStayCost: cost.totalStayCost,
    effectiveCostPerNight: cost.effectiveCostPerNight,
    effectiveCostPerPerson: cost.effectiveCostPerPerson,
  };
}
