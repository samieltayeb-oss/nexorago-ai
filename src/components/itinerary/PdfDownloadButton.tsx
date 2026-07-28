"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the component that imports @react-pdf/renderer
// to ensure it never runs on the server.
const PdfDownloadLinkClient = dynamic(
  () => import("./PdfDownloadLinkClient"),
  { 
    ssr: false,
    loading: () => (
      <button disabled className="btn-nexora-fill py-3 px-6 rounded-xl flex items-center gap-2 opacity-50 cursor-not-allowed">
        <Loader2 className="w-5 h-5 animate-spin" /> Preparing PDF...
      </button>
    )
  }
);

export const PdfDownloadButton = ({ itinerary }: { itinerary: any }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button disabled className="btn-nexora-fill py-3 px-6 rounded-xl flex items-center gap-2 opacity-50 cursor-not-allowed">
        <Loader2 className="w-5 h-5 animate-spin" /> Preparing PDF...
      </button>
    );
  }

  return <PdfDownloadLinkClient itinerary={itinerary} />;
};
