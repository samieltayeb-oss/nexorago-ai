import { Advisory } from "@/types";

export const DEMO_ADVISORIES: Advisory[] = [
  {
    id: "adv-moraine-lake-shuttle",
    title: "Moraine Lake Personal Vehicle Ban in Effect",
    summary: "Personal commercial & private passenger vehicles are permanently prohibited on Moraine Lake Road year-round. Access is exclusively via Parks Canada Shuttle, Roam Public Transit, or authorized commercial operators.",
    destination: "Lake Louise",
    applicableSeason: ["summer", "fall"],
    effectiveDate: "2026-06-01",
    officialSource: "Parks Canada Official Directive",
    sourceUrl: "https://parks.canada.ca/pn-np/ab/banff/visit/parkbus",
    severity: "critical",
    affectedUserGroups: ["All visitors planning to visit Moraine Lake"],
    callToAction: "Reserve Parks Canada shuttle tickets in advance via Parks Canada Reservation System.",
    lastVerifiedDate: "2026-07-27",
  },
  {
    id: "adv-national-park-pass",
    title: "Parks Canada Discovery Pass Required for Banff & Lake Louise",
    summary: "Every visitor staying in, driving through, or recreating within Banff National Park must hold a valid Parks Canada Pass. Staying in Canmore or Cochrane does NOT require a pass unless entering the national park boundary.",
    destination: "Banff",
    applicableSeason: ["all"],
    effectiveDate: "2026-01-01",
    officialSource: "Parks Canada Pass Fees",
    sourceUrl: "https://parks.canada.ca/pn-np/ab/banff/visit/tarifs-fees",
    severity: "warning",
    affectedUserGroups: ["Visitors entering Banff National Park, Lake Louise, or Johnston Canyon"],
    callToAction: "Purchase online or at the East Banff National Park Gate on Highway 1.",
    lastVerifiedDate: "2026-07-27",
  },
  {
    id: "adv-kananaskis-pass",
    title: "Kananaskis Conservation Pass Required in K-Country",
    summary: "Vehicles parked in Kananaskis Country and Provincial Parks require a Kananaskis Conservation Pass ($15 per day per vehicle). Canmore townsite parking does not require this pass unless travelling into Provincial Parks.",
    destination: "Kananaskis Village",
    applicableSeason: ["all"],
    effectiveDate: "2026-01-01",
    officialSource: "Alberta Parks",
    sourceUrl: "https://www.alberta.ca/kananaskis-conservation-pass.aspx",
    severity: "warning",
    affectedUserGroups: ["Visitors hiking, skiing, or staying in Kananaskis"],
    callToAction: "Register license plate online at Alberta Parks prior to arrival.",
    lastVerifiedDate: "2026-07-27",
  },
  {
    id: "adv-bear-safety",
    title: "Wildlife & Bear Spray Regulations",
    summary: "Grizzly and black bears are active throughout the Bow Valley. Carry Parks Canada-approved bear spray in an easily accessible holster (not inside backpacks) on all trails.",
    destination: "Banff",
    applicableSeason: ["summer", "fall", "spring"],
    effectiveDate: "2026-05-01",
    officialSource: "Parks Canada Wildlife Safety",
    sourceUrl: "https://parks.canada.ca/pn-np/ab/banff/securite-safety/ours-bears",
    severity: "info",
    affectedUserGroups: ["Hikers, walkers, campers, and outdoor recreators"],
    callToAction: "Rent or buy bear spray in Canmore or Banff before outdoor activities.",
    lastVerifiedDate: "2026-07-27",
  },
  {
    id: "adv-drone-prohibition",
    title: "Strict Drone Prohibition in Canadian National Parks",
    summary: "Recreational drone flying is illegal in all Canadian National Parks (Banff, Yoho, Kootenay, Jasper) without a special restricted research permit. Fines up to $25,000 apply.",
    destination: "Banff",
    applicableSeason: ["all"],
    effectiveDate: "2026-01-01",
    officialSource: "Transport Canada & Parks Canada",
    sourceUrl: "https://parks.canada.ca/pn-np/ab/banff/info/reglements-regulations",
    severity: "warning",
    affectedUserGroups: ["Photographers and drone hobbyists"],
    callToAction: "Leave recreational drones securely stored or at home.",
    lastVerifiedDate: "2026-07-27",
  },
];

export function getRelevantAdvisories(
  destinations: string[],
  season: string = "summer"
): Advisory[] {
  return DEMO_ADVISORIES.filter((adv) => {
    const isDestMatch =
      destinations.length === 0 ||
      destinations.some((d) => d.toLowerCase().includes(adv.destination.toLowerCase())) ||
      adv.destination === "Banff";
    const isSeasonMatch = adv.applicableSeason.includes("all") || adv.applicableSeason.includes(season);
    return isDestMatch && isSeasonMatch;
  });
}
