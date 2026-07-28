export interface SeasonalContext {
  season: "Winter" | "Spring" | "Summer" | "Fall";
  closuresAndConstraints: string[];
}

export function getSeasonalContext(checkInDate: string): SeasonalContext {
  const date = new Date(checkInDate);
  const month = date.getMonth(); // 0 = Jan, 11 = Dec

  // Define seasons for the Canadian Rockies
  // Winter: Nov (10) - April (3)
  // Spring: May (4) - June (5)
  // Summer: July (6) - Sept (8)
  // Fall: Oct (9)

  if (month >= 10 || month <= 3) {
    return {
      season: "Winter",
      closuresAndConstraints: [
        "Moraine Lake Road is CLOSED to all vehicles. Recommend Peyto Lake, Lake Louise, or Johnston Canyon instead.",
        "Takakkaw Falls road is CLOSED.",
        "Most alpine hiking trails are buried in snow and require avalanche training.",
        "Recommend winter activities: Skiing, Snowshoeing, Banff Gondola, Hot Springs, Ice Skating at Lake Louise."
      ]
    };
  } else if (month === 4 || month === 5) {
    return {
      season: "Spring",
      closuresAndConstraints: [
        "Moraine Lake Road may still be closed until early June. Verify shuttle availability.",
        "Alpine lakes may still be partially frozen (Ice melt usually happens late May/early June).",
        "Many high-elevation trails are muddy or still snow-bound. Stick to lower valley trails."
      ]
    };
  } else if (month >= 6 && month <= 8) {
    return {
      season: "Summer",
      closuresAndConstraints: [
        "Peak season. Extremely high crowds.",
        "Moraine Lake and Lake Louise parking fills by 6 AM. MUST recommend Parks Canada Shuttles or Roam Transit.",
        "All roads and attractions are open.",
        "Wildfire smoke is possible in August."
      ]
    };
  } else {
    // month === 9 (October)
    return {
      season: "Fall",
      closuresAndConstraints: [
        "Larch season (Golden needles) is typically late Sept to early Oct.",
        "Moraine Lake Road closes after the Canadian Thanksgiving weekend (mid-Oct).",
        "Weather is highly unpredictable. Snow is possible at any time."
      ]
    };
  }
}
