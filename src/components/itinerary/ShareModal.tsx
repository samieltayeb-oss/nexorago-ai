"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Copy, Share2, MessageCircle, Mail, Loader2, ShieldOff, CheckCircle2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripData: any;
}

export function ShareModal({ isOpen, onClose, tripData }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [tripId, setTripId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
          checkIn: "2026-08-10",
          checkOut: "2026-08-13",
          adults: 2,
          children: 2,
          tripData: {},
          itineraryData: tripData.itinerary || {},
          budgetData: tripData.budget || {},
          hotelData: tripData.hotel || {},
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate link");
      setTripId(data.tripId);
      setShareUrl(`${window.location.origin}/trip/${data.shareId}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate on open
  useEffect(() => {
    if (isOpen && !shareUrl && !isLoading) {
      generateShare();
    }
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("scroll-locked");
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.classList.remove("scroll-locked");
    }
    return () => document.body.classList.remove("scroll-locked");
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the input text
    }
  };

  const handleNativeShare = async () => {
    if (!shareUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Our Canadian Rockies Trip",
          text: "Here's our customized trip plan from NexoraGo AI.",
          url: shareUrl,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const handleDisable = async () => {
    if (!tripId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/trips/${tripId}/share`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: false }),
      });
      if (res.ok) setIsDisabled(true);
    } catch {}
    finally { setIsLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/75 animate-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet — slides up on mobile, centered modal on desktop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share trip"
        className={[
          "fixed z-[var(--z-modal)] bg-[#111111] border border-[#C49A10]/25 text-[#F2EDE4] w-full",
          // Mobile: full-width bottom sheet
          "bottom-0 left-0 right-0 rounded-t-3xl animate-slide-up-sheet",
          // Desktop: centered modal
          "sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md sm:rounded-3xl sm:animate-none",
        ].join(" ")}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
      >
        {/* Drag handle (mobile only) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-[#333]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
          <h2 className="text-lg font-serif text-[#F2EDE4]">Share Trip</h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="touch-target rounded-full bg-[#1A1A1A] hover:bg-[#333] transition-colors"
            aria-label="Close share dialog"
          >
            <X className="w-4 h-4 text-[#ADA89F]" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <Loader2 className="w-8 h-8 text-[#C49A10] animate-spin" aria-hidden="true" />
              <p className="text-sm font-mono text-[#ADA89F] uppercase tracking-widest" aria-live="polite">
                Securing Trip Link...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-rose-400 text-sm" role="alert">{error}</p>
              <button onClick={generateShare} className="btn-nexora-line text-xs">
                Try Again
              </button>
            </div>
          ) : isDisabled ? (
            <div className="text-center py-10 space-y-4">
              <ShieldOff className="w-12 h-12 text-rose-500 mx-auto" aria-hidden="true" />
              <p className="text-[#F2EDE4] font-bold">Link Disabled</p>
              <p className="text-sm text-[#ADA89F]">
                This link has been deactivated and can no longer be accessed.
              </p>
            </div>
          ) : (
            <>
              {/* Link display */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#ADA89F] uppercase tracking-wide" htmlFor="share-url">
                  Public Link
                </label>
                <div className="flex items-center gap-2 bg-[#080808] border border-[#1A1A1A] rounded-xl p-2">
                  <input
                    id="share-url"
                    type="url"
                    readOnly
                    value={shareUrl || ""}
                    className="flex-grow bg-transparent border-none text-sm text-[#F2EDE4] focus:ring-0 outline-none px-2 min-w-0"
                    style={{ fontSize: "14px" }}
                    onFocus={(e) => e.target.select()}
                    aria-label="Shareable trip URL"
                  />
                  <button
                    onClick={handleCopy}
                    className="shrink-0 bg-[#1A1A1A] hover:bg-[#333] p-2.5 rounded-lg transition-colors touch-target"
                    aria-label={copied ? "Link copied!" : "Copy link"}
                  >
                    {copied
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      : <Copy className="w-4 h-4 text-[#C49A10]" aria-hidden="true" />
                    }
                  </button>
                </div>
                {copied && (
                  <p className="text-xs text-emerald-400 font-mono" role="status" aria-live="polite">
                    ✓ Copied to clipboard
                  </p>
                )}
              </div>

              {/* Primary actions */}
              <button
                onClick={handleCopy}
                className="btn-nexora-fill-full"
                aria-label="Copy share link"
              >
                <Copy className="w-4 h-4" aria-hidden="true" />
                Copy Link
              </button>

              {/* Secondary share actions */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleNativeShare}
                  className="flex flex-col items-center justify-center gap-2 bg-[#080808] hover:bg-[#1A1A1A] border border-[#1A1A1A] p-4 rounded-2xl transition-colors min-h-[72px]"
                  aria-label="Share via device"
                >
                  <Share2 className="w-5 h-5 text-[#C49A10]" aria-hidden="true" />
                  <span className="text-[10px] font-mono uppercase text-[#ADA89F]">Share</span>
                </button>
                <a
                  href={`https://wa.me/?text=Here's our Canadian Rockies trip plan from NexoraGo AI: ${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 bg-[#080808] hover:bg-[#1A1A1A] border border-[#1A1A1A] p-4 rounded-2xl transition-colors min-h-[72px]"
                  aria-label="Share on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  <span className="text-[10px] font-mono uppercase text-[#ADA89F]">WhatsApp</span>
                </a>
                <a
                  href={`mailto:?subject=Our Canadian Rockies Trip&body=Here's our trip plan from NexoraGo AI:%0D%0A%0D%0A${shareUrl}`}
                  className="flex flex-col items-center justify-center gap-2 bg-[#080808] hover:bg-[#1A1A1A] border border-[#1A1A1A] p-4 rounded-2xl transition-colors min-h-[72px]"
                  aria-label="Share via email"
                >
                  <Mail className="w-5 h-5 text-[#C49A10]" aria-hidden="true" />
                  <span className="text-[10px] font-mono uppercase text-[#ADA89F]">Email</span>
                </a>
              </div>

              {/* Danger zone */}
              <div className="pt-3 border-t border-[#1A1A1A] flex justify-end">
                <button
                  onClick={handleDisable}
                  className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-rose-500/10 transition-colors"
                  aria-label="Disable share link so nobody can view it"
                >
                  <ShieldOff className="w-3.5 h-3.5" aria-hidden="true" />
                  Disable Link
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
