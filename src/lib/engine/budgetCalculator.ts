import { CompleteBudget, SearchCriteria, AccommodationProperty } from "@/types";

export function calculateCompleteTripBudget(
  criteria: SearchCriteria,
  selectedProperty?: AccommodationProperty
): CompleteBudget {
  const checkIn = new Date(criteria.checkIn || "2026-08-10");
  const checkOut = new Date(criteria.checkOut || "2026-08-13");
  const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
  
  const adults = criteria.adults || 2;
  const children = criteria.children || 0;
  const totalPeople = adults + children;

  // 1. Accommodation & Taxes
  const stayCost = selectedProperty ? selectedProperty.totalStayCost : (320 * nights);
  const accommodationTotal = selectedProperty ? selectedProperty.nightlyBaseRate * nights : (260 * nights);
  const taxesAndFees = selectedProperty ? (stayCost - accommodationTotal) : (60 * nights);
  const parkingTotal = selectedProperty ? (selectedProperty.parkingFeePerNight * nights) : 0;

  // 2. Fuel (Calgary to Banff & local driving approx ~350 km total)
  const isEV = criteria.constraints.isEV;
  const estimatedFuelCAD = isEV ? (25) : (55 + (nights * 12));

  // 3. Park Passes (Parks Canada Family Pass $151.25/year or $22.00/day for family, $11.00/day per adult)
  let parkPassesTotal = 0;
  const isBanffVisit = criteria.destinations.length === 0 || criteria.destinations.some(d => ["banff", "lake-louise", "field"].includes(d.toLowerCase()));
  if (isBanffVisit) {
    if (totalPeople > 2 || children > 0) {
      parkPassesTotal = Math.min(151.25, 22.00 * nights);
    } else {
      parkPassesTotal = Math.min(151.25, 11.00 * adults * nights);
    }
  }

  // 4. Shuttles (e.g. Moraine Lake Parks Canada shuttle $16.00 per adult, $8.00 per child)
  const incorporatesMoraine = true;
  const shuttlesTotal = incorporatesMoraine ? (16 * adults + 8 * children) : 0;

  // 5. Activities (Gondola $68/adult, $34/child; Hot Springs $17.50/adult, $10/child)
  const gondolaTotal = (68 * adults) + (34 * children);
  const hotSpringsTotal = (17.50 * adults) + (10 * children);
  const activitiesTotal = Math.round(gondolaTotal + hotSpringsTotal);

  // 6. Food & Dining ($65/adult/day, $35/child/day; reduced if kitchen available)
  const hasKitchen = selectedProperty ? selectedProperty.hasKitchen : true;
  const foodMultiplier = hasKitchen ? 0.75 : 1.0;
  const dailyFoodRate = ((65 * adults) + (35 * children)) * foodMultiplier;
  const foodTotal = Math.round(dailyFoodRate * (nights + 1));

  // 7. Emergency Buffer (10% of subtotal)
  const subtotal = stayCost + estimatedFuelCAD + parkPassesTotal + shuttlesTotal + activitiesTotal + foodTotal;
  const emergencyBuffer = Math.round(subtotal * 0.10);

  const grandTotal = Math.round(subtotal + emergencyBuffer);
  const costPerAdult = Math.round(grandTotal / (adults + (children * 0.5)));
  const costPerChild = Math.round(costPerAdult * 0.5);

  return {
    accommodationTotal,
    taxesAndFees,
    parkingTotal,
    fuelTotal: estimatedFuelCAD,
    parkPassesTotal,
    shuttlesTotal,
    activitiesTotal,
    foodTotal,
    emergencyBuffer,
    grandTotal,
    costPerAdult,
    costPerChild,
    confidenceLevel: selectedProperty ? "High" : "Estimated",
  };
}
