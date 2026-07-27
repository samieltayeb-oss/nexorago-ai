import { NextResponse } from "next/server";
import { normalizeSerpApiResponse } from "@/lib/providers/liveProvider";
import { enrichPropertyWithCosts } from "@/lib/engine/costCalculator";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const destinations = searchParams.get("dests") || "Banff,Canmore";
  const checkIn = searchParams.get("in") || "2026-08-10";
  const checkOut = searchParams.get("out") || "2026-08-13";
  const adults = searchParams.get("adults") || "2";
  const children = searchParams.get("children") || "0";
  
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "SERPAPI_KEY is not configured on the server." }, { status: 500 });
  }

  // We take the first destination for the initial search query, 
  // or we can search for the broader region if multiple are specified.
  const primaryDestination = destinations.split(",")[0];
  const q = `hotels in ${primaryDestination}, Alberta`;

  try {
    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.append("engine", "google_hotels");
    url.searchParams.append("q", q);
    url.searchParams.append("check_in_date", checkIn);
    url.searchParams.append("check_out_date", checkOut);
    url.searchParams.append("adults", adults);
    url.searchParams.append("children", children);
    url.searchParams.append("currency", "CAD");
    url.searchParams.append("gl", "ca");
    url.searchParams.append("hl", "en");
    url.searchParams.append("api_key", apiKey);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch from SerpApi");
    }
    
    // Parse the check-in and checkout to calculate nights for cost calculation
    const dIn = new Date(checkIn);
    const dOut = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((dOut.getTime() - dIn.getTime()) / (1000 * 3600 * 24)));

    // Normalize raw SerpApi data to our platform's unified interface
    const normalized = normalizeSerpApiResponse(data, checkIn, checkOut, parseInt(adults), parseInt(children));
    
    // Enrich with true cost calculations
    const enriched = normalized.map(prop => enrichPropertyWithCosts(prop, nights, parseInt(adults), parseInt(children)));

    return NextResponse.json(enriched);
  } catch (error: any) {
    console.error("SerpApi Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
