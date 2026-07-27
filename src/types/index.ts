export type PriceConfidence =
  | "live_verified"
  | "recently_checked"
  | "estimated"
  | "partner_site"
  | "manual_required"
  | "sold_out"
  | "unknown";

export type StayType =
  | "hotel"
  | "resort"
  | "cabin"
  | "chalet"
  | "condo"
  | "apartment"
  | "entire_home"
  | "hostel"
  | "bed_and_breakfast"
  | "campground"
  | "any";

export type PriorityOption =
  | "cheapest_total"
  | "best_family_value"
  | "closest_attractions"
  | "luxury"
  | "mountain_view"
  | "kitchen"
  | "free_parking"
  | "pool"
  | "hot_tub"
  | "pet_friendly"
  | "accessible"
  | "walkable"
  | "quiet"
  | "flexible_cancellation";

export type TravelMode =
  | "personal_vehicle"
  | "rental_vehicle"
  | "public_transit"
  | "tour_shuttle"
  | "undecided";

export type TripPace = "relaxed" | "balanced" | "see_everything";

export interface SearchCriteria {
  departureCity: string;
  destinations: string[];
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
  childrenAges: number[];
  bedrooms: number;
  maxBudgetCAD?: number;
  budgetType: "total" | "nightly";
  stayTypes: StayType[];
  priorities: PriorityOption[];
  travelMode: TravelMode;
  activities: string[];
  pace: TripPace;
  constraints: {
    mobility: boolean;
    dietary: string[];
    hasPet: boolean;
    hasStroller: boolean;
    hasSeniors: boolean;
    isEV: boolean;
    maxDriveTimeMinutes?: number;
    specialOccasion?: string;
  };
}

export interface AccommodationProperty {
  id: string;
  provider: string;
  providerPropertyId: string;
  propertyName: string;
  propertyType: StayType;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  destination: string;
  images: string[];
  starRating: number;
  guestRating: number;
  reviewCount: number;
  maximumGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  hasKitchen: boolean;
  hasFreeParking: boolean;
  hasPool: boolean;
  hasHotTub: boolean;
  isPetFriendly: boolean;
  isAccessible: boolean;
  cancellationPolicy: string;
  nightlyBaseRate: number;
  taxes: number;
  cleaningFee: number;
  resortFee: number;
  parkingFeePerNight: number;
  currency: string;
  priceConfidence: PriceConfidence;
  lastCheckedAt: string;
  bookingUrl: string;
  affiliateDisclosure: string;
  attribution: string;
  // Computed fields
  totalStayCost: number;
  effectiveCostPerNight: number;
  effectiveCostPerPerson: number;
  distanceToAttractionsMinutes: Record<string, number>;
  whyWeRecommend: string;
  matchScore: number;
}

export interface TownComparison {
  destinationId: string;
  name: string;
  advantages: string[];
  disadvantages: string[];
  distanceToAttractions: Record<string, string>;
  familySuitabilityScore: number; // 1-10
  diningScore: number; // 1-10
  groceryScore: number; // 1-10
  parkingDifficulty: "easy" | "moderate" | "difficult";
  nightlifeRating: string;
  scenicValue: string;
  affordabilityBadge: "Best overall value" | "Cheapest nearby base" | "Luxury hub" | "Balanced";
  isParkPassRequired: boolean;
  avgDriveTimeFromCalgaryMinutes: number;
}

export interface Advisory {
  id: string;
  title: string;
  summary: string;
  destination: string;
  applicableSeason: string[];
  effectiveDate: string;
  expiryDate?: string;
  officialSource: string;
  sourceUrl: string;
  severity: "info" | "warning" | "critical";
  affectedUserGroups: string[];
  callToAction: string;
  lastVerifiedDate: string;
}

export interface ItineraryItem {
  id: string;
  timeOfDay: "morning" | "lunch" | "afternoon" | "dinner" | "evening";
  title: string;
  description: string;
  locationName: string;
  coordinates?: { lat: number; lng: number };
  estimatedDriveTimeMinutes: number;
  parkingOrShuttleNotes: string;
  estimatedDurationHours: number;
  estimatedCostCAD: number;
  reservationRequired: boolean;
  recommendedClothing: string;
  weatherConsideration: string;
  childSuitabilityNotes: string;
  accessibilityNotes: string;
  weatherBackupOption: string;
}

export interface DailyItinerary {
  dayNumber: number;
  date: string;
  theme: string;
  items: ItineraryItem[];
  totalDayDriveTimeMinutes: number;
  totalDayCostCAD: number;
}

export interface TripItinerary {
  tripId: string;
  destinationSummary: string;
  calgaryDepartureGuide: {
    recommendedDepartureTime: string;
    estimatedDriveDurationMinutes: number;
    suggestedRoute: string;
    groceryStop: string;
    coffeeStop: string;
    fuelStop: string;
    evChargers: string[];
    roadWarning: string;
    parkEntryGuidance: string;
  };
  days: DailyItinerary[];
  totalEstimatedActivitiesCostCAD: number;
}

export interface CompleteBudget {
  accommodationTotal: number;
  taxesAndFees: number;
  parkingTotal: number;
  fuelTotal: number;
  parkPassesTotal: number;
  shuttlesTotal: number;
  activitiesTotal: number;
  foodTotal: number;
  emergencyBuffer: number;
  grandTotal: number;
  costPerAdult: number;
  costPerChild: number;
  confidenceLevel: "High" | "Medium" | "Estimated";
}
