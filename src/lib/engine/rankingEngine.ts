import { AccommodationProperty, SearchCriteria } from "@/types";

export function scoreAndRankProperties(
  properties: AccommodationProperty[],
  criteria: SearchCriteria
): AccommodationProperty[] {
  const totalGuests = criteria.adults + criteria.children;
  const requestedBedrooms = criteria.bedrooms || 1;

  const scored = properties.map((property) => {
    let score = 50; // Base score
    const reasons: string[] = [];

    // 1. Capacity & Bedrooms match
    if (property.maximumGuests >= totalGuests) {
      score += 15;
    } else {
      score -= 50; // Insufficient capacity
    }

    if (property.bedrooms >= requestedBedrooms) {
      score += 10;
      reasons.push(`Provides ${property.bedrooms} bedroom(s) matching your request`);
    } else if (property.bedrooms < requestedBedrooms) {
      score -= 10;
    }

    // 2. Budget match
    if (criteria.maxBudgetCAD) {
      const budget = criteria.maxBudgetCAD;
      if (property.totalStayCost <= budget) {
        score += 20;
        const savings = budget - property.totalStayCost;
        if (savings > 100) {
          reasons.push(`$${Math.round(savings)} below your maximum budget`);
        }
      } else {
        const over = property.totalStayCost - budget;
        score -= Math.min(30, (over / budget) * 50);
      }
    }

    // 3. Priorities & Amenities
    if (criteria.priorities.includes("kitchen") || criteria.children > 0) {
      if (property.hasKitchen) {
        score += 15;
        reasons.push("Full kitchen ideal for preparing meals and saving on dining");
      }
    }

    if (criteria.priorities.includes("free_parking")) {
      if (property.hasFreeParking) {
        score += 10;
        reasons.push("Includes free on-site parking");
      } else {
        score -= 5;
      }
    }

    if (criteria.priorities.includes("pool") && property.hasPool) {
      score += 8;
      reasons.push("Features swimming pool");
    }

    if (criteria.priorities.includes("hot_tub") && property.hasHotTub) {
      score += 8;
      reasons.push("Features relaxing hot tub");
    }

    if (criteria.constraints.hasPet) {
      if (property.isPetFriendly) {
        score += 25;
        reasons.push("Verified pet-friendly property");
      } else {
        score -= 100; // Unsuitable
      }
    }

    if (criteria.constraints.mobility && property.isAccessible) {
      score += 20;
      reasons.push("Step-free accessible accommodation");
    }

    // 4. Rating & Reviews
    if (property.guestRating >= 9.0) {
      score += 12;
      reasons.push(`Exceptional ${property.guestRating}/10 guest rating`);
    } else if (property.guestRating >= 8.0) {
      score += 8;
    }

    // 5. Town value logic
    if (property.destination === "Canmore") {
      reasons.push("Located in Canmore (no national park pass required for staying in town)");
    } else if (property.destination === "Dead Man's Flats" || property.destination === "Harvie Heights") {
      reasons.push(`Affordable base in ${property.destination} just minutes from Canmore & Banff`);
    }

    // Default recommendation reason if empty
    if (reasons.length === 0) {
      reasons.push(`Great ${property.propertyType} choice in ${property.destination}`);
    }

    return {
      ...property,
      matchScore: Math.round(score),
      whyWeRecommend: reasons.slice(0, 3).join(". ") + ".",
    };
  });

  // Filter out completely unfit properties (score < 0) and sort descending by matchScore
  return scored
    .filter((p) => p.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}
