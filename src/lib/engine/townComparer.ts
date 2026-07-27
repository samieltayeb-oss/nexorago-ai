import { TownComparison } from "@/types";

export const CANADIAN_ROCKIES_TOWNS: Record<string, TownComparison> = {
  canmore: {
    destinationId: "canmore",
    name: "Canmore",
    advantages: [
      "Often 25%–40% less expensive than Banff hotels",
      "More multi-bedroom condo & chalet inventory with full kitchens",
      "No Parks Canada park pass required for staying or dining in town",
      "Excellent local restaurants, grocery stores (Safeway, Save-On-Foods), and breweries",
      "Free or easy parking at most accommodations",
    ],
    disadvantages: [
      "Requires a 18–22 minute drive to reach Banff townsite",
      "Kananaskis Conservation Pass required if visiting nearby K-Country trails",
    ],
    distanceToAttractions: {
      "Banff Townsite": "22 km (20 mins)",
      "Lake Louise": "80 km (55 mins)",
      "Moraine Lake Shuttle": "83 km (58 mins)",
      "Johnston Canyon": "45 km (35 mins)",
    },
    familySuitabilityScore: 9.5,
    diningScore: 9.0,
    groceryScore: 9.5,
    parkingDifficulty: "easy",
    nightlifeRating: "Vibrant pub & dining scene",
    scenicValue: "Stunning Three Sisters mountain views",
    affordabilityBadge: "Best overall value",
    isParkPassRequired: false,
    avgDriveTimeFromCalgaryMinutes: 70,
  },
  banff: {
    destinationId: "banff",
    name: "Banff",
    advantages: [
      "Walkable access to downtown shops, dining, and Banff Upper Hot Springs",
      "Direct transit (Roam Public Transit) to Johnston Canyon & Lake Louise",
      "Classic mountain town vibe surrounded by iconic peaks",
    ],
    disadvantages: [
      "Higher accommodation prices and resort fees",
      "Paid parking in downtown Banff; parking can be very busy in peak summer",
      "Parks Canada Discovery Pass required for all stay dates",
      "Fewer large multi-bedroom condo options with kitchens",
    ],
    distanceToAttractions: {
      "Banff Townsite": "0 km (Walkable)",
      "Lake Louise": "57 km (40 mins)",
      "Moraine Lake Shuttle": "60 km (45 mins)",
      "Johnston Canyon": "25 km (22 mins)",
    },
    familySuitabilityScore: 8.5,
    diningScore: 9.5,
    groceryScore: 8.0,
    parkingDifficulty: "difficult",
    nightlifeRating: "Lively bars & lounges",
    scenicValue: "Iconic Cascade Mountain backdrop",
    affordabilityBadge: "Luxury hub",
    isParkPassRequired: true,
    avgDriveTimeFromCalgaryMinutes: 85,
  },
  "lake-louise": {
    destinationId: "lake-louise",
    name: "Lake Louise",
    advantages: [
      "Closest stay location to Lake Louise shoreline and Moraine Lake shuttle hub",
      "Peaceful alpine environment with world-class hiking right outside your door",
      "Ideal for early morning lake views before day-trip crowds arrive",
    ],
    disadvantages: [
      "Limited accommodation choices (mostly premium lodges or high-end resorts)",
      "Very limited grocery stores and dining options",
      "Highest average nightly cost in the region",
    ],
    distanceToAttractions: {
      "Banff Townsite": "57 km (40 mins)",
      "Lake Louise": "4 km (5 mins)",
      "Moraine Lake Shuttle": "3 km (4 mins)",
      "Johnston Canyon": "33 km (25 mins)",
    },
    familySuitabilityScore: 8.0,
    diningScore: 6.5,
    groceryScore: 4.0,
    parkingDifficulty: "moderate",
    nightlifeRating: "Quiet alpine evening",
    scenicValue: "Unrivalled glacier lakes & peaks",
    affordabilityBadge: "Luxury hub",
    isParkPassRequired: true,
    avgDriveTimeFromCalgaryMinutes: 115,
  },
  "dead-mans-flats": {
    destinationId: "dead-mans-flats",
    name: "Dead Man's Flats",
    advantages: [
      "Significantly cheaper rates than Canmore and Banff",
      "Spacious modern mountain suites with kitchens and laundry",
      "Only 7 minutes drive east of Canmore on Trans-Canada Highway 1",
    ],
    disadvantages: [
      "No walkable town centre; limited local dining (1-2 restaurants)",
      "Requires driving to Canmore or Banff for groceries and entertainment",
    ],
    distanceToAttractions: {
      "Canmore Downtown": "8 km (7 mins)",
      "Banff Townsite": "30 km (25 mins)",
      "Lake Louise": "88 km (60 mins)",
    },
    familySuitabilityScore: 8.5,
    diningScore: 5.0,
    groceryScore: 4.0,
    parkingDifficulty: "easy",
    nightlifeRating: "Quiet residential area",
    scenicValue: "Bow Valley peak panorama",
    affordabilityBadge: "Cheapest nearby base",
    isParkPassRequired: false,
    avgDriveTimeFromCalgaryMinutes: 62,
  },
  "harvie-heights": {
    destinationId: "harvie-heights",
    name: "Harvie Heights",
    advantages: [
      "Situated right at the Banff National Park gate boundary",
      "Quiet chalet and cabin rentals with quick access to both Banff & Canmore",
    ],
    disadvantages: [
      "Minimal commercial amenities within walking distance",
    ],
    distanceToAttractions: {
      "Canmore Downtown": "4 km (5 mins)",
      "Banff Townsite": "18 km (16 mins)",
      "Lake Louise": "76 km (50 mins)",
    },
    familySuitabilityScore: 8.5,
    diningScore: 5.5,
    groceryScore: 5.0,
    parkingDifficulty: "easy",
    nightlifeRating: "Quiet hamlet",
    scenicValue: "Forest & mountain view",
    affordabilityBadge: "Cheapest nearby base",
    isParkPassRequired: false,
    avgDriveTimeFromCalgaryMinutes: 68,
  },
  kananaskis: {
    destinationId: "kananaskis",
    name: "Kananaskis Village",
    advantages: [
      "Serene wilderness setting away from Banff tour bus crowds",
      "Home to Kananaskis Nordic Spa, Nakiska Ski Resort, and family hiking trails",
    ],
    disadvantages: [
      "45-minute drive to Banff townsite",
      "Kananaskis Conservation Pass required ($15/day or $90/year per vehicle)",
    ],
    distanceToAttractions: {
      "Banff Townsite": "52 km (45 mins)",
      "Canmore": "48 km (40 mins)",
      "Calgary Airport": "95 km (75 mins)",
    },
    familySuitabilityScore: 9.0,
    diningScore: 7.0,
    groceryScore: 4.5,
    parkingDifficulty: "easy",
    nightlifeRating: "Resort fireside lounges",
    scenicValue: "Pristine mountain wilderness",
    affordabilityBadge: "Balanced",
    isParkPassRequired: false, // Requires Kananaskis Pass instead of Parks Canada Pass
    avgDriveTimeFromCalgaryMinutes: 75,
  },
  golden: {
    destinationId: "golden",
    name: "Golden, BC",
    advantages: [
      "Budget-friendly alternative for visiting Yoho and Lake Louise",
      "Access to Golden Skybridge, Kicking Horse Mountain Resort, and whitewater rafting",
      "No Alberta sales tax (BC PST applies), but generally lower room rates",
    ],
    disadvantages: [
      "Located in British Columbia, requiring a 1 hour drive through Kicking Horse Pass to Lake Louise",
      "Kicking Horse Canyon road construction delays can occur seasonally",
    ],
    distanceToAttractions: {
      "Lake Louise": "82 km (55 mins)",
      "Emerald Lake (Yoho)": "55 km (40 mins)",
      "Banff Townsite": "138 km (90 mins)",
    },
    familySuitabilityScore: 8.0,
    diningScore: 7.5,
    groceryScore: 8.0,
    parkingDifficulty: "easy",
    nightlifeRating: "Friendly mountain town pubs",
    scenicValue: "Columbia River & Purcell Mountains",
    affordabilityBadge: "Cheapest nearby base",
    isParkPassRequired: false,
    avgDriveTimeFromCalgaryMinutes: 160,
  },
};

export function generateAIRecommendationSummary(
  destinationsRequested: string[],
  totalGuests: number,
  childrenCount: number,
  bedroomsRequested: number,
  maxBudget?: number
): string {
  if (childrenCount > 0 || bedroomsRequested > 1) {
    return `Canmore offers the best overall value for your group of ${totalGuests}. Staying in Canmore provides larger multi-bedroom condo inventory with full kitchens and free parking while keeping Banff within a comfortable 20-minute drive. You also avoid daily national park pass requirements on days you stay local.`;
  }
  
  if (maxBudget && maxBudget < 600) {
    return `Dead Man's Flats or Harvie Heights provide the most affordable base near Banff. You can save up to 35% on accommodation costs while staying just 7 to 15 minutes from Banff National Park gates.`;
  }

  return `Banff townsite provides walking access to iconic dining and local transit, while Canmore remains the top value recommendation for multi-bedroom space, full kitchens, and mountain view chalets.`;
}
