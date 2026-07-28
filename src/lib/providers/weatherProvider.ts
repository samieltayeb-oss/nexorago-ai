export interface WeatherForecast {
  date: string;
  temperature: string; // e.g., "18°C"
  conditions: string; // e.g., "Sunny morning, Rain after 4 PM"
  precipitationChance: number; // e.g., 80
}

export function getMockWeatherForecast(dates: string[]): WeatherForecast[] {
  // A deterministic mock weather generator based on date strings
  return dates.map((date, index) => {
    // Generate some pseudo-random but deterministic conditions based on the index
    let temp = 15 + (index % 10);
    let conditions = "Partly Cloudy";
    let precip = 20;

    if (index % 4 === 0) {
      conditions = "Sunny all day";
      precip = 0;
      temp += 3;
    } else if (index % 3 === 0) {
      conditions = "Sunny morning, Heavy Rain after 3 PM";
      precip = 90;
      temp -= 2;
    } else if (index % 5 === 0) {
      conditions = "Overcast with light showers";
      precip = 60;
      temp -= 4;
    }

    return {
      date,
      temperature: `${temp}°C`,
      conditions,
      precipitationChance: precip
    };
  });
}
