import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { getAppUrl } from "@/lib/config/appUrl";
import { Metadata } from "next";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Clock,
  ShieldCheck,
  Info,
  CheckCircle2,
  TreePine,
  CloudRain,
  Sun
} from "lucide-react";

interface PageProps {
  params: { shareId: string };
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { shareId } = params;
  const supabase = createAdminClient();
  const { data } = await supabase.from("trip_shares").select("trip_id").eq("share_id", shareId).eq("is_active", true).single();
  
  if (!data) return { title: "Trip Not Found | NexoraGo AI" };

  const { data: trip } = await supabase.from("trips").select("title, destination_summary").eq("id", data.trip_id).single();
  
  if (!trip) return { title: "Trip Not Found | NexoraGo AI" };

  return {
    title: `${trip.title} | NexoraGo AI`,
    description: trip.destination_summary || "View a personalized Canadian Rockies itinerary and budget plan.",
    robots: { index: false, follow: false }, // Privacy: do not index personal trips
    openGraph: {
      title: `${trip.title} | NexoraGo AI`,
      description: trip.destination_summary || "View a personalized Canadian Rockies itinerary and budget plan.",
      url: `${getAppUrl()}/trip/${shareId}`,
      siteName: "NexoraGo AI",
      images: [
        {
          url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=630&q=80", 
          width: 1200,
          height: 630,
          alt: "Canadian Rockies Trip"
        }
      ]
    }
  };
}

export default async function SharedTripPage({ params }: PageProps) {
  const { shareId } = params;
  const supabase = createAdminClient();

  // 1. Fetch share config
  const { data: shareRow } = await supabase
    .from("trip_shares")
    .select("trip_id, is_active, expires_at")
    .eq("share_id", shareId)
    .single();

  if (!shareRow) notFound();

  if (!shareRow.is_active) {
    return (
      <div className="min-h-screen bg-nexora-dark flex flex-col items-center justify-center p-8 text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-rose-500 mb-4" />
        <h1 className="text-3xl font-serif text-nexora-cream">Link Disabled</h1>
        <p className="text-nexora-cream-muted max-w-md">
          This shared trip is no longer available. Ask the trip organizer for a new NexoraGo link.
        </p>
      </div>
    );
  }

  if (shareRow.expires_at && new Date(shareRow.expires_at) < new Date()) {
    return (
      <div className="min-h-screen bg-nexora-dark flex flex-col items-center justify-center p-8 text-center space-y-4">
        <Clock className="w-12 h-12 text-amber-500 mb-4" />
        <h1 className="text-3xl font-serif text-nexora-cream">Link Expired</h1>
        <p className="text-nexora-cream-muted max-w-md">
          This shared trip link has expired.
        </p>
      </div>
    );
  }

  // 2. Fetch Trip Data (Public Projection)
  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", shareRow.trip_id)
    .single();

  if (!trip) notFound();

  // Async tracking (fire and forget)
  void (async () => {
    try {
      await supabase.rpc('increment_view_count', { row_id: shareId });
    } catch {
      await supabase.from("trip_shares").update({ last_viewed_at: new Date().toISOString() }).eq("share_id", shareId);
    }
  })();

  const itinerary = trip.itinerary_data;
  const budget = trip.budget_data;
  const totalTravellers = trip.adults + trip.children;

  return (
    <div className="min-h-screen bg-nexora-dark py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-nexora-card text-nexora-cream rounded-3xl p-6 sm:p-8 shadow-nexora border border-nexora-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <TreePine className="w-32 h-32 text-nexora-gold" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Shared VIP Itinerary
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-serif leading-snug text-nexora-cream">
                {trip.title}
              </h1>
              <p className="text-sm text-nexora-cream-muted leading-relaxed font-normal">
                {trip.destination_summary}
              </p>
            </div>
          </div>
          
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-nexora-border/50 text-sm">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-nexora-cream-muted flex items-center gap-1.5"><Calendar className="w-3 h-3 text-nexora-gold"/> Dates</span>
              <span className="font-bold text-nexora-cream block">{trip.check_in} – {trip.check_out}</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-nexora-cream-muted flex items-center gap-1.5"><Users className="w-3 h-3 text-nexora-gold"/> Group</span>
              <span className="font-bold text-nexora-cream block">{totalTravellers} people ({trip.adults}A, {trip.children}C)</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-nexora-cream-muted flex items-center gap-1.5"><MapPin className="w-3 h-3 text-nexora-gold"/> Base Town</span>
              <span className="font-bold text-nexora-gold block">{itinerary?.bestBase || "Banff"}</span>
            </div>
          </div>
        </div>

        {/* Budget Summary Grid */}
        {budget && (
          <div className="bg-[#111111] p-6 rounded-3xl border border-[#C49A10]/20 shadow-nexora">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-[#F2EDE4]">Estimated Trip Budget</h2>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-500/30">
                Total: ${Math.round(budget.grandTotal)} CAD
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="p-3 bg-[#080808] border border-[#1A1A1A] rounded-xl space-y-1">
                 <span className="text-[10px] uppercase font-mono text-[#ADA89F]">Accommodation</span>
                 <strong className="block text-[#C49A10]">${Math.round(budget.accommodationTotal + budget.taxesAndFees)}</strong>
               </div>
               <div className="p-3 bg-[#080808] border border-[#1A1A1A] rounded-xl space-y-1">
                 <span className="text-[10px] uppercase font-mono text-[#ADA89F]">Activities</span>
                 <strong className="block text-[#C49A10]">${Math.round(budget.activitiesTotal)}</strong>
               </div>
               <div className="p-3 bg-[#080808] border border-[#1A1A1A] rounded-xl space-y-1">
                 <span className="text-[10px] uppercase font-mono text-[#ADA89F]">Food</span>
                 <strong className="block text-[#C49A10]">${Math.round(budget.foodTotal)}</strong>
               </div>
               <div className="p-3 bg-[#080808] border border-[#1A1A1A] rounded-xl space-y-1">
                 <span className="text-[10px] uppercase font-mono text-[#ADA89F]">Transport & Passes</span>
                 <strong className="block text-[#C49A10]">${Math.round(budget.fuelTotal + budget.parkPassesTotal)}</strong>
               </div>
            </div>
            <div className="mt-4 flex justify-between items-center text-xs text-[#ADA89F]">
               <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Estimates are in CAD and subject to dynamic pricing.</span>
               <span className="font-bold">~${Math.round(budget.costPerAdult)} / adult</span>
            </div>
          </div>
        )}

        {/* Itinerary */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-[#F2EDE4] px-2 pt-4">Daily Itinerary</h2>
          {itinerary?.dailyItinerary?.map((day: any) => (
            <div key={day.dayNumber} className="bg-nexora-surface border border-nexora-border p-6 rounded-3xl space-y-6 shadow-nexora">
              <div className="border-b border-nexora-border pb-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-serif text-nexora-gold">Day {day.dayNumber}: {day.theme}</h3>
                  <p className="text-xs font-mono text-nexora-cream-muted mt-1">{day.date}</p>
                </div>
                
                {/* Weather Intelligence */}
                {day.weatherIntelligence && (
                  <div className="bg-[#111111] border border-sky-500/30 rounded-xl p-4 max-w-sm shrink-0 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-50" />
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                        {day.weatherIntelligence.forecastSummary.toLowerCase().includes("rain") ? (
                          <CloudRain className="w-4 h-4" />
                        ) : (
                          <Sun className="w-4 h-4 text-amber-400" />
                        )}
                        Weather Intelligence
                      </div>
                      <p className="text-sm text-[#F2EDE4] font-semibold">{day.weatherIntelligence.forecastSummary}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-nexora-cream-muted uppercase tracking-wider flex items-center gap-2">Morning</span>
                  <div className="space-y-3">
                    {Array.isArray(day.morning) ? day.morning.map((act: any, i: number) => (
                      <div key={i} className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#F2EDE4]">{act.title}</span>
                          <span className="text-nexora-gold font-mono">{act.time}</span>
                        </div>
                        <p className="text-xs text-[#ADA89F]">{act.description}</p>
                      </div>
                    )) : <p className="text-sm text-[#ADA89F]">{day.morning}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold text-nexora-cream-muted uppercase tracking-wider flex items-center gap-2">Afternoon</span>
                  <div className="space-y-3">
                    {Array.isArray(day.afternoon) ? day.afternoon.map((act: any, i: number) => (
                      <div key={i} className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#F2EDE4]">{act.title}</span>
                          <span className="text-nexora-gold font-mono">{act.time}</span>
                        </div>
                        <p className="text-xs text-[#ADA89F]">{act.description}</p>
                      </div>
                    )) : <p className="text-sm text-[#ADA89F]">{day.afternoon}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold text-nexora-cream-muted uppercase tracking-wider flex items-center gap-2">Evening</span>
                  <div className="space-y-3">
                    {Array.isArray(day.evening) ? day.evening.map((act: any, i: number) => (
                      <div key={i} className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#F2EDE4]">{act.title}</span>
                          <span className="text-nexora-gold font-mono">{act.time}</span>
                        </div>
                        <p className="text-xs text-[#ADA89F]">{act.description}</p>
                      </div>
                    )) : <p className="text-sm text-[#ADA89F]">{day.evening}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
