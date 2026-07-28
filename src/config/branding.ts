export interface BrandingConfig {
  productName: string;
  tagline: string;
  secondaryMessage: string;
  logo: {
    text: string;
    subtext: string;
    imagePath: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
  contact: {
    email: string;
    phone: string;
    supportUrl: string;
  };
  social: {
    twitter: string;
    instagram: string;
    facebook: string;
  };
  legal: {
    companyName: string;
    registration: string;
    affiliateDisclosure: string;
    safetyDisclaimer: string;
  };
  supportedRegions: Array<{
    id: string;
    name: string;
    province: string;
    country: string;
    isCore: boolean;
  }>;
  supportedLanguages: Array<{
    code: string;
    name: string;
    isRtl: boolean;
  }>;
  defaultCurrency: string;
  defaultDepartureCity: string;
}

export const BRANDING: BrandingConfig = {
  productName: "NexoraGo AI",
  tagline: "Plan the Rockies smarter. Stay better. Spend less.",
  secondaryMessage: "Your personalized Canadian Rockies trip—from the best-value stay to the perfect daily plan.",
  logo: {
    text: "NEXORA",
    subtext: "Go AI",
    imagePath: "/images/logo-primary.png",
  },
  colors: {
    primary: "#080808", // Deep Dark Obsidian
    secondary: "#111111", // Surface Dark
    accent: "#C49A10", // Signature Gold
    background: "#080808",
    surface: "#1A1A1A",
  },
  contact: {
    email: "sami@nexorayyc.io",
    phone: "+1 (438) 874-9959",
    supportUrl: "https://nexorayyc.io/help",
  },
  social: {
    twitter: "https://twitter.com/nexorago_ai",
    instagram: "https://instagram.com/nexora.ai",
    facebook: "https://facebook.com/nexoragoai",
  },
  legal: {
    companyName: "NEXORA",
    registration: "Alberta Corporation #202688941",
    affiliateDisclosure: "NexoraGo AI participates in travel partner affiliate programs. We may earn a commission on bookings made through links on our site at no extra cost to you. True total pricing remains completely transparent.",
    safetyDisclaimer: "Canadian Rockies weather, wildlife, and trail conditions change rapidly. AI recommendations do not replace official Parks Canada, Alberta Parks, or emergency safety alerts.",
  },
  supportedRegions: [
    { id: "calgary", name: "Calgary", province: "AB", country: "Canada", isCore: true },
    { id: "cochrane", name: "Cochrane", province: "AB", country: "Canada", isCore: true },
    { id: "canmore", name: "Canmore", province: "AB", country: "Canada", isCore: true },
    { id: "dead-mans-flats", name: "Dead Man's Flats", province: "AB", country: "Canada", isCore: true },
    { id: "harvie-heights", name: "Harvie Heights", province: "AB", country: "Canada", isCore: true },
    { id: "kananaskis", name: "Kananaskis Village", province: "AB", country: "Canada", isCore: true },
    { id: "banff", name: "Banff", province: "AB", country: "Canada", isCore: true },
    { id: "lake-louise", name: "Lake Louise", province: "AB", country: "Canada", isCore: true },
    { id: "field", name: "Field", province: "BC", country: "Canada", isCore: true },
    { id: "golden", name: "Golden", province: "BC", country: "Canada", isCore: true },
    { id: "jasper", name: "Jasper", province: "AB", country: "Canada", isCore: false },
    { id: "waterton", name: "Waterton Lakes", province: "AB", country: "Canada", isCore: false },
    { id: "radium", name: "Radium Hot Springs", province: "BC", country: "Canada", isCore: false },
    { id: "invermere", name: "Invermere", province: "BC", country: "Canada", isCore: false },
    { id: "revelstoke", name: "Revelstoke", province: "BC", country: "Canada", isCore: false },
  ],
  supportedLanguages: [
    { code: "en", name: "English", isRtl: false },
    { code: "fr", name: "Français", isRtl: false },
    { code: "es", name: "Español", isRtl: false },
    { code: "de", name: "Deutsch", isRtl: false },
    { code: "ar", name: "العربية", isRtl: true },
    { code: "zh", name: "中文", isRtl: false },
  ],
  defaultCurrency: "CAD",
  defaultDepartureCity: "Calgary",
};
