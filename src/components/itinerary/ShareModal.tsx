"use client";

import React, { useState } from "react";
import { X, Copy, Share2, MessageCircle, Mail, Loader2, ShieldOff, CheckCircle2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripData: any; // The full trip context from the search dashboard
}

export function ShareModal({ isOpen, onClose, tripData }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [tripId, setTripId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // Generate the share link if not already generated
  const generateShare = async () => {
    if (shareUrl) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: tripData.itinerary?.summary || "Canadian Rockies Trip",
          destinationSummary: "Personalized Banff & Canmore Itinerary",
          checkIn: "2026-08-10", // Fallbacks for demo
          checkOut: "2026-08-13",
          adults: 2,
          children: 2,
          tripData: {},
          itineraryData: tripData.itinerary || {},
          budgetData: tripData.budget || {},
          hotelData: tripData.hotel || {}
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate link");

      setTripId(data.tripId);
      
      // Construct full URL (use window.location.origin as base for client-side)
      setShareUrl(`${window.location.origin}/trip/${data.shareId}`);
      setIsDisabled(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically trigger generation when opened if not yet generated
  React.useEffect(() => {
    if (isOpen && !shareUrl && !isLoading) {
      generateShare();
    }
  }, [isOpen]);

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleNativeShare = async () => {
    if (!shareUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Our Canadian Rockies Trip",
          text: "Here's our customized Canadian Rockies trip plan from NexoraGo AI.",
          url: shareUrl
        });
      } catch (err) {
        console.error("Native share cancelled or failed");
      }
    }
  };

  const handleDisable = async () => {
    if (!tripId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/trips/${tripId}/share`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: false })
      });
      if (res.ok) {
        setIsDisabled(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#080808]/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111111] border border-[#C49A10]/30 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative text-[#F2EDE4]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A1A1A]">
          <h3 className="text-xl font-serif text-[#F2EDE4]">Share Trip</h3>
          <button onClick={onClose} className="p-2 bg-[#1A1A1A] hover:bg-[#333333] rounded-full transition-colors">
            <X className="w-4 h-4 text-[#ADA89F]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <Loader2 className="w-8 h-8 text-[#C49A10] animate-spin" />
              <p className="text-sm font-mono text-[#ADA89F] uppercase">Securing Trip Link...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-rose-500 text-sm">{error}</div>
          ) : isDisabled ? (
            <div className="text-center py-10 space-y-4">
              <ShieldOff className="w-12 h-12 text-rose-500 mx-auto" />
              <p className="text-[#F2EDE4] font-bold">Link Disabled</p>
              <p className="text-sm text-[#ADA89F]">This link has been deactivated and can no longer be viewed by anyone.</p>
            </div>
          ) : (
            <>
              {/* URL Display & Copy */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#ADA89F] uppercase">Public Link</label>
                <div className="flex items-center gap-2 bg-[#080808] border border-[#1A1A1A] rounded-xl p-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={shareUrl || ""} 
                    className="flex-grow bg-transparent border-none text-sm text-[#F2EDE4] focus:ring-0 outline-none px-2"
                  />
                  <button 
                    onClick={handleCopy}
                    className="bg-[#1A1A1A] hover:bg-[#333333] p-2 rounded-lg transition-colors flex shrink-0 text-[#C49A10]"
                    aria-label="Copy link"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={handleNativeShare}
                  className="flex flex-col items-center justify-center gap-2 bg-[#080808] hover:bg-[#1A1A1A] border border-[#1A1A1A] p-3 rounded-xl transition-colors"
                >
                  <Share2 className="w-5 h-5 text-[#C49A10]" />
                  <span className="text-[10px] font-mono uppercase text-[#ADA89F]">Share</span>
                </button>
                <a 
                  href={`https://wa.me/?text=Here's our Canadian Rockies trip plan from NexoraGo AI: ${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 bg-[#080808] hover:bg-[#1A1A1A] border border-[#1A1A1A] p-3 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-mono uppercase text-[#ADA89F]">WhatsApp</span>
                </a>
                <a 
                  href={`mailto:?subject=Our Canadian Rockies Trip&body=Here's our customized Canadian Rockies trip plan from NexoraGo AI:%0D%0A%0D%0A${shareUrl}`}
                  className="flex flex-col items-center justify-center gap-2 bg-[#080808] hover:bg-[#1A1A1A] border border-[#1A1A1A] p-3 rounded-xl transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#C49A10]" />
                  <span className="text-[10px] font-mono uppercase text-[#ADA89F]">Email</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A] flex justify-end">
                <button 
                  onClick={handleDisable}
                  className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1.5"
                >
                  <ShieldOff className="w-3.5 h-3.5" /> Disable Link
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
