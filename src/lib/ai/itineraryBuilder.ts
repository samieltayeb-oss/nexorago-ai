import { SearchCriteria, TripItinerary, DailyItinerary, ItineraryItem } from "@/types";

export function generatePersonalizedItinerary(criteria: SearchCriteria): TripItinerary {
  const checkIn = new Date(criteria.checkIn || "2026-08-10");
  const checkOut = new Date(criteria.checkOut || "2026-08-13");
  const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
  const daysCount = nights + 1;

  const isFamily = criteria.children > 0;
  const isPaced = criteria.pace === "relaxed";

  const days: DailyItinerary[] = [];

  for (let i = 1; i <= Math.min(daysCount, 5); i++) {
    const dayDate = new Date(checkIn);
    dayDate.setDate(checkIn.getDate() + (i - 1));
    const dateStr = dayDate.toISOString().split("T")[0];

    let theme = "";
    const items: ItineraryItem[] = [];

    if (i === 1) {
      theme = "Calgary Departure & Bow Valley Arrival";
      items.push({
        id: `day1-morn`,
        timeOfDay: "morning",
        title: "Depart Calgary & Scenic Highway 1 Drive",
        description: "Depart Calgary westward on Trans-Canada Highway 1 towards the Rocky Mountains. Take in the dramatic transition from rolling foothills to towering limestone peaks.",
        locationName: "Calgary to Canmore",
        estimatedDriveTimeMinutes: 70,
        parkingOrShuttleNotes: "Free highway travel. Stop at Cochrane or Yamnuska pullout for scenic photos.",
        estimatedDurationHours: 1.5,
        estimatedCostCAD: 0,
        reservationRequired: false,
        recommendedClothing: "Comfortable driving clothes & sunglasses",
        weatherConsideration: "Clear highway conditions expected",
        childSuitabilityNotes: isFamily ? "Great scenic drive; stop in Cochrane for famous MacKay's Ice Cream!" : "Scenic route",
        accessibilityNotes: "Accessible paved pullouts along Highway 1",
        weatherBackupOption: "In heavy rain, visit the Canmore Museum or Elevation Place indoor pool.",
      });

      items.push({
        id: `day1-lunch`,
        timeOfDay: "lunch",
        title: "Lunch & Grocery Stock-up in Canmore",
        description: "Enjoy a relaxed lunch in historic downtown Canmore. Pick up groceries at Safeway or Save-On-Foods to stock your kitchen and save on daily trail snacks.",
        locationName: "Canmore Downtown",
        estimatedDriveTimeMinutes: 5,
        parkingOrShuttleNotes: "Free 2-hour parking along 8th Street or town lot near Railway Ave.",
        estimatedDurationHours: 1.5,
        estimatedCostCAD: 45,
        reservationRequired: false,
        recommendedClothing: "Casual streetwear",
        weatherConsideration: "Patio dining available in warm weather",
        childSuitabilityNotes: "Very family friendly with wide pedestrian zones",
        accessibilityNotes: "Fully curb-cut accessible downtown sidewalk network",
        weatherBackupOption: "Dine indoors at The Grizzly Paw Pub.",
      });

      items.push({
        id: `day1-aft`,
        timeOfDay: "afternoon",
        title: "Grassi Lakes Walk or Bow River Loop",
        description: "Take an easy, rewarding walk along the turquoise Grassi Lakes or Bow River loop trail with view of Mount Rundle and Three Sisters peaks.",
        locationName: "Grassi Lakes Trail, Canmore",
        estimatedDriveTimeMinutes: 10,
        parkingOrShuttleNotes: "Kananaskis Conservation Pass required for Grassi Lakes parking lot.",
        estimatedDurationHours: 2.0,
        estimatedCostCAD: 15,
        reservationRequired: false,
        recommendedClothing: "Sturdy walking shoes or light hikers, water bottle, bear spray",
        weatherConsideration: "Shaded trail under evergreen canopy",
        childSuitabilityNotes: "Easy upper trail ideal for kids; stroller friendly along Bow River pathway",
        accessibilityNotes: "Bow River pathway is fully paved and wheelchair accessible",
        weatherBackupOption: "Indoor climbing or swimming at Elevation Place Canmore.",
      });

      items.push({
        id: `day1-din`,
        timeOfDay: "dinner",
        title: "Welcome Dinner in Canmore / Check-in",
        description: "Check into your stay, unpack, and savor artisan wood-fired pizza or AAA Alberta steak at a local mountain bistro.",
        locationName: "Rocky Mountain Flatbread Co, Canmore",
        estimatedDriveTimeMinutes: 8,
        parkingOrShuttleNotes: "Free on-site accommodation parking",
        estimatedDurationHours: 1.5,
        estimatedCostCAD: 70,
        reservationRequired: true,
        recommendedClothing: "Smart casual mountain attire",
        weatherConsideration: "Warm indoor ambience",
        childSuitabilityNotes: "High chairs and kids pizza-making available",
        accessibilityNotes: "Step-free restaurant entry",
        weatherBackupOption: "In-suite kitchen meal delivery.",
      });
    } else if (i === 2) {
      theme = "Banff Townsite & Iconic Lakes";
      items.push({
        id: `day2-morn`,
        timeOfDay: "morning",
        title: "Banff Gondola & Sulphur Mountain Boardwalk",
        description: "Ride the Banff Gondola to the summit of Sulphur Mountain for 360-degree panoramic views of six mountain ranges and the Bow Valley.",
        locationName: "Sulphur Mountain, Banff",
        estimatedDriveTimeMinutes: 25,
        parkingOrShuttleNotes: "Use free Banff Gondola Shuttle from Banff Ave or park in lower lot early.",
        estimatedDurationHours: 2.5,
        estimatedCostCAD: 68,
        reservationRequired: true,
        recommendedClothing: "Warm windproof jacket, summit is 5°C cooler than townsite",
        weatherConsideration: "High summit UV index; bring sunglasses and sunscreen",
        childSuitabilityNotes: "Gondola ride is thrilling and safe for children of all ages",
        accessibilityNotes: "Gondola cabins and summit boardwalk center are fully wheelchair accessible",
        weatherBackupOption: "Visit the Cave and Basin National Historic Site indoors.",
      });

      items.push({
        id: `day2-lunch`,
        timeOfDay: "lunch",
        title: "Lunch on Banff Avenue",
        description: "Stroll down Banff Avenue's pedestrian zone and enjoy lunch at Park Distillery or Bluebird Wood-fired Steakhouse.",
        locationName: "Banff Avenue Pedestrian Zone",
        estimatedDriveTimeMinutes: 8,
        parkingOrShuttleNotes: "Park at the free 9-hour Train Station Lot and walk or take Roam Transit.",
        estimatedDurationHours: 1.5,
        estimatedCostCAD: 55,
        reservationRequired: false,
        recommendedClothing: "Casual streetwear",
        weatherConsideration: "Sun hat and comfortable walking shoes",
        childSuitabilityNotes: "Pedestrian street zone means no vehicle traffic concerns for kids",
        accessibilityNotes: "Level paved pedestrian street with accessible curb ramps",
        weatherBackupOption: "Dine indoors at Banff Springs Hotel Cascade Lounge.",
      });

      items.push({
        id: `day2-aft`,
        timeOfDay: "afternoon",
        title: "Johnston Canyon Lower Falls Hike",
        description: "Walk along dramatic canyon catwalks suspended over rushing glacial waters to reach the roaring Lower Falls and cave viewpoint.",
        locationName: "Johnston Canyon, Bow Valley Parkway",
        estimatedDriveTimeMinutes: 22,
        parkingOrShuttleNotes: "Roam Transit Route 9 or park in free Johnston Canyon lot.",
        estimatedDurationHours: 2.0,
        estimatedCostCAD: 0,
        reservationRequired: false,
        recommendedClothing: "Sturdy footwear with good traction; light rain jacket for canyon mist",
        weatherConsideration: "Canyon catwalks can be cool and damp",
        childSuitabilityNotes: "Sturdy safety railings along entire catwalk; very popular with families",
        accessibilityNotes: "Paved catwalk up to Lower Falls accessible for sturdy all-terrain strollers",
        weatherBackupOption: "Banff Park Museum National Historic Site.",
      });

      items.push({
        id: `day2-din`,
        timeOfDay: "dinner",
        title: "Banff Upper Hot Springs Dip & Fireside Dinner",
        description: "Soak in authentic hot mineral waters surrounded by alpine peaks, followed by cozy fireside dining.",
        locationName: "Banff Upper Hot Springs",
        estimatedDriveTimeMinutes: 20,
        parkingOrShuttleNotes: "Roam Transit Route 1 directly to Hot Springs entry",
        estimatedDurationHours: 2.0,
        estimatedCostCAD: 35,
        reservationRequired: false,
        recommendedClothing: "Swimsuit, towel, and flip flops",
        weatherConsideration: "Steamy 38°C pool enjoyable in any weather condition",
        childSuitabilityNotes: "Kids love the warm pool; shallow areas available",
        accessibilityNotes: "Pool entry ramp and aquatic wheelchair available upon request",
        weatherBackupOption: "Indoor spa treatment or hotel hot tub.",
      });
    } else {
      theme = "Lake Louise & Moraine Lake Marvels";
      items.push({
        id: `day3-morn`,
        timeOfDay: "morning",
        title: "Parks Canada Shuttle to Moraine Lake & Lake Louise",
        description: "Board your pre-booked Parks Canada shuttle from the Lake Louise Park & Ride. Marvel at Moraine Lake's electric turquoise waters and the Valley of the Ten Peaks.",
        locationName: "Moraine Lake & Lake Louise",
        estimatedDriveTimeMinutes: 50,
        parkingOrShuttleNotes: "Park at Lake Louise Ski Resort Park & Ride lot. Reservation QR code required.",
        estimatedDurationHours: 3.5,
        estimatedCostCAD: 16,
        reservationRequired: true,
        recommendedClothing: "Morning layers, warm fleece, camera, bear spray",
        weatherConsideration: "Crisp mountain morning air at 1,880m elevation",
        childSuitabilityNotes: "Rockpile trail stairs require care; lower lakefront trail is easy for kids",
        accessibilityNotes: "Parks Canada shuttle buses equipped with wheelchair lifts",
        weatherBackupOption: "Chateau Lake Louise Heritage Hall & indoor tea lounge.",
      });

      items.push({
        id: `day3-lunch`,
        timeOfDay: "lunch",
        title: "Alpine Afternoon Tea / Lakeside Lunch",
        description: "Enjoy lunch overlooking the Victoria Glacier at Chateau Lake Louise or grab fresh sandwiches at Lake Louise Village Deli.",
        locationName: "Fairmont Chateau Lake Louise",
        estimatedDriveTimeMinutes: 10,
        parkingOrShuttleNotes: "Connector shuttle drops off right at Chateau lakeside entry",
        estimatedDurationHours: 1.5,
        estimatedCostCAD: 60,
        reservationRequired: true,
        recommendedClothing: "Resort casual attire",
        weatherConsideration: "Indoor dining with floor-to-ceiling lake views",
        childSuitabilityNotes: "Kids menu available at Fairview Bar & Restaurant",
        accessibilityNotes: "Fully step-free hotel lobby and dining rooms",
        weatherBackupOption: "Lake Louise Village indoor cafe.",
      });

      items.push({
        id: `day3-aft`,
        timeOfDay: "afternoon",
        title: "Canoeing on Lake Louise or Lakeshore Stroll",
        description: "Glide across emerald waters in a classic red canoe or take the flat 2km lakeshore trail to the end of the lake below Victoria Glacier.",
        locationName: "Lake Louise Boathouse",
        estimatedDriveTimeMinutes: 0,
        parkingOrShuttleNotes: "Walk directly from Chateau lakeside path",
        estimatedDurationHours: 2.0,
        estimatedCostCAD: 95,
        reservationRequired: false,
        recommendedClothing: "Lifejackets provided; bring sun hat and camera strap",
        weatherConsideration: "Water is extremely cold; stay seated and follow boathouse safety rules",
        childSuitabilityNotes: "Lifejackets sized for children provided by boathouse",
        accessibilityNotes: "Lakeshore trail is wide, flat, and wheelchair accessible for 2km",
        weatherBackupOption: "Explore Chateau Lake Louise historic photo gallery.",
      });

      items.push({
        id: `day3-din`,
        timeOfDay: "dinner",
        title: "Farewell Dinner & Sunset Drive to Calgary",
        description: "Enjoy a memorable final mountain meal before heading east on Highway 1 back to Calgary.",
        locationName: "Lake Louise / Canmore back to Calgary",
        estimatedDriveTimeMinutes: 80,
        parkingOrShuttleNotes: "Smooth evening traffic eastbound towards Calgary",
        estimatedDurationHours: 2.0,
        estimatedCostCAD: 65,
        reservationRequired: false,
        recommendedClothing: "Comfortable travel attire",
        weatherConsideration: "Golden hour sunset lighting over Bow Valley peaks",
        childSuitabilityNotes: "Kids can rest in the car after an active mountain day",
        accessibilityNotes: "Rest stops at Dead Man's Flats and Cochrane have accessible facilities",
        weatherBackupOption: "Extended dinner in Canmore before night drive.",
      });
    }

    days.push({
      dayNumber: i,
      date: dateStr,
      theme,
      items,
      totalDayDriveTimeMinutes: items.reduce((acc, curr) => acc + curr.estimatedDriveTimeMinutes, 0),
      totalDayCostCAD: items.reduce((acc, curr) => acc + curr.estimatedCostCAD, 0),
    });
  }

  return {
    tripId: `trip-${Date.now()}`,
    destinationSummary: `Personalized ${nights}-night Canadian Rockies itinerary curated for ${criteria.adults} adult(s)${criteria.children > 0 ? ` and ${criteria.children} child(ren)` : ""}. Designed for a ${criteria.pace} travel pace originating from ${criteria.departureCity || "Calgary"}.`,
    calgaryDepartureGuide: {
      recommendedDepartureTime: "08:00 AM (to beat Highway 1 weekend traffic and secure prime parking)",
      estimatedDriveDurationMinutes: 70,
      suggestedRoute: "Trans-Canada Highway 1 West from Calgary through Cochrane foothills into Bow Valley",
      groceryStop: "Safeway Canmore (1200 Railway Ave) or Save-On-Foods Canmore for fresh supplies & snacks",
      coffeeStop: "Le Marché Bistro Cochrane or Eclipse Coffee Roasters Canmore",
      fuelStop: "Petro-Canada Cochrane or Shell Dead Man's Flats (cheaper fuel before Banff park boundaries)",
      evChargers: ["FLO Fast Charger Cochrane", "Tesla Supercharger Canmore (1702 Bow Valley Trail)", "Banff Train Station EV Hub"],
      roadWarning: "Check Alberta 511 for winter/spring road conditions; winter tires or M+S tires mandatory on Hwy 93N between Oct 1 and Apr 30.",
      parkEntryGuidance: "If staying in Banff, purchase Parks Canada Discovery Pass at East Gate lanes or buy online prior to travel.",
    },
    days,
    totalEstimatedActivitiesCostCAD: days.reduce((acc, day) => acc + day.totalDayCostCAD, 0),
  };
}
