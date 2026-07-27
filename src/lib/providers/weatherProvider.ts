export interface WeatherCondition {
  destination: string;
  temperatureC: number;
  condition: string;
  icon: string;
  highC: number;
  lowC: number;
  precipitationChance: number;
  uvIndex: number;
  airQualityIndex: string; // 'Good', 'Moderate', 'Smoke Alert'
  recommendation: string;
}

export const DEMO_WEATHER: Record<string, WeatherCondition> = {
  Banff: {
    destination: "Banff",
    temperatureC: 22,
    condition: "Partly Cloudy with Alpine Breezes",
    icon: "SunCloud",
    highC: 24,
    lowC: 9,
    precipitationChance: 15,
    uvIndex: 7,
    airQualityIndex: "Good (AQHI 2)",
    recommendation: "Excellent conditions for hiking and gondola rides. Pack layers for cool mountain evenings.",
  },
  Canmore: {
    destination: "Canmore",
    temperatureC: 24,
    condition: "Sunny and Warm",
    icon: "Sun",
    highC: 26,
    lowC: 11,
    precipitationChance: 10,
    uvIndex: 8,
    airQualityIndex: "Good (AQHI 2)",
    recommendation: "Ideal patio dining weather. Perfect for Grassi Lakes or Bow River pathway walks.",
  },
  "Lake Louise": {
    destination: "Lake Louise",
    temperatureC: 19,
    condition: "Clear Mountain Skies",
    icon: "Sun",
    highC: 21,
    lowC: 6,
    precipitationChance: 20,
    uvIndex: 7,
    airQualityIndex: "Good (AQHI 1)",
    recommendation: "Morning lake reflection views will be clear. Bring a light windbreaker for lakefront breezes.",
  },
  Kananaskis: {
    destination: "Kananaskis",
    temperatureC: 23,
    condition: "Sunny with Scattered Clouds",
    icon: "SunCloud",
    highC: 25,
    lowC: 10,
    precipitationChance: 10,
    uvIndex: 8,
    airQualityIndex: "Good (AQHI 2)",
    recommendation: "Great day for Nordic Spa relaxation or hiking Troll Falls.",
  },
};

export function getWeatherForDestination(destination: string): WeatherCondition {
  const key = Object.keys(DEMO_WEATHER).find((k) =>
    destination.toLowerCase().includes(k.toLowerCase())
  );
  return DEMO_WEATHER[key || "Canmore"];
}
