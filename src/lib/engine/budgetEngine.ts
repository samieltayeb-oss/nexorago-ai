import { AccommodationProperty, CompleteBudget } from "@/types";

export function calculateTrueTripCost(
  property: AccommodationProperty,
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number
): CompleteBudget {
  const dIn = new Date(checkIn).getTime();
  const dOut = new Date(checkOut).getTime();
  const nights = Math.max(1, Math.ceil((dOut - dIn) / (1000 * 3600 * 24)));
  const days = nights + 1; // Assuming checking in on day 1 and checking out on day last, so days = nights + 1. Or we can just use nights. Let's use days = nights + 1.
  
  const totalPeople = adults + children;

  // 1. Accommodation (Base + Taxes + Cleaning + Resort)
  const accommodationTotal = property.nightlyBaseRate * nights;
  const taxesAndFees = property.taxes + property.cleaningFee + property.resortFee;

  // 2. Parking
  const parkingTotal = property.hasFreeParking ? 0 : property.parkingFeePerNight * nights;

  // 3. Fuel Estimate (Calgary to Banff RT + local exploring)
  const fuelTotal = 60 + (15 * days);

  // 4. Park Passes (National Park Pass required for every day inside the park)
  // Family/Group pass is max $22.60 per day for a car up to 7 people. 
  // Individual adult is $11.30. Youth (17 and under) are free.
  const groupPassDaily = 22.60;
  const individualDaily = adults * 11.30;
  const dailyPassCost = Math.min(groupPassDaily, individualDaily);
  const parkPassesTotal = dailyPassCost * days;

  // 5. Food Estimate
  // Base: $80/adult/day, $40/child/day. 
  // If property has a kitchen, families usually save 40% on food by eating breakfast/lunch in.
  const foodMultiplier = property.hasKitchen ? 0.6 : 1.0;
  const foodTotal = ((adults * 80) + (children * 40)) * days * foodMultiplier;

  // 6. Activities Estimate
  // Base: $100/adult/day, $50/child/day. 
  const activitiesTotal = ((adults * 100) + (children * 50)) * days;

  const shuttlesTotal = 0; // We could add this if we knew they were taking shuttles, for now 0.
  const emergencyBuffer = 0;

  const grandTotal = 
    accommodationTotal + 
    taxesAndFees + 
    parkingTotal + 
    fuelTotal + 
    parkPassesTotal + 
    foodTotal + 
    activitiesTotal;

  return {
    accommodationTotal,
    taxesAndFees,
    parkingTotal,
    fuelTotal,
    parkPassesTotal,
    shuttlesTotal,
    activitiesTotal,
    foodTotal,
    emergencyBuffer,
    grandTotal,
    costPerAdult: grandTotal / Math.max(1, adults), // rough estimate for adults
    costPerChild: grandTotal / Math.max(1, totalPeople), // Actually, just splitting total cost per person is better.
    confidenceLevel: "Estimated"
  };
}
