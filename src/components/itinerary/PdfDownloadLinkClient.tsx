"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TripPdfDocument } from "./TripPdfDocument";
import { Download, Loader2 } from "lucide-react";

export default function PdfDownloadLinkClient({ itinerary }: { itinerary: any }) {
  return (
    <PDFDownloadLink
      document={<TripPdfDocument itinerary={itinerary} />}
      fileName="NexoraGo_VIP_Trip.pdf"
      className="btn-nexora-fill py-3 px-6 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-transform hover:scale-105"
    >
      {/* @ts-ignore */}
      {({ blob, url, loading, error }) =>
        loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Rendering PDF...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" /> Download Offline Trip
          </>
        )
      }
    </PDFDownloadLink>
  );
}
