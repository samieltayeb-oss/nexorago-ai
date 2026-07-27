"use client";

import React, { useState } from "react";
import { DEMO_PROPERTIES } from "@/lib/providers/mockProvider";
import { DEMO_ADVISORIES } from "@/lib/providers/advisoryProvider";
import {
  ShieldCheck,
  Building,
  ShieldAlert,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "properties" | "advisories" | "affiliates">("overview");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full w-fit mb-2 border border-gold-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> RockyGo AI System Admin Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Platform Management & API Monitoring
          </h1>
        </div>

        <button
          onClick={() => alert("Syncing provider pricing and Parks Canada advisory feeds...")}
          className="bg-alpine-800 hover:bg-alpine-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-alpine-600 shadow transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-gold-400" /> Trigger System Sync
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: "overview", label: "Dashboard & Health" },
          { id: "properties", label: "Accommodation Catalog" },
          { id: "advisories", label: "Parks Canada Rules" },
          { id: "affiliates", label: "Commercial & Affiliates" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${
              activeTab === tab.id
                ? "bg-alpine-800 text-white border border-gold-400/40"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Verified Properties</span>
              <div className="text-3xl font-extrabold text-white font-display">{DEMO_PROPERTIES.length}</div>
              <span className="text-[11px] text-emerald-400">100% data freshness verified</span>
            </div>

            <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Advisories</span>
              <div className="text-3xl font-extrabold text-white font-display">{DEMO_ADVISORIES.length}</div>
              <span className="text-[11px] text-gold-400">Parks Canada directives synced</span>
            </div>

            <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Provider API Status</span>
              <div className="text-xl font-extrabold text-emerald-400 font-display flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-5 h-5" /> Operational
              </div>
              <span className="text-[11px] text-slate-400">Booking.com & Expedia Adapters</span>
            </div>

            <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Est. Affiliate Clicks</span>
              <div className="text-3xl font-extrabold text-white font-display">1,482</div>
              <span className="text-[11px] text-emerald-400">+18% week over week</span>
            </div>
          </div>

          {/* System Health */}
          <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700 space-y-4">
            <h3 className="font-bold font-display text-lg text-white">Provider Integration Status</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Mock Demo Accommodation Adapter</span>
                  <span className="text-slate-400">Verified realistic Rockies dataset</span>
                </div>
                <span className="text-emerald-400 font-bold">Active (100% Uptime)</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Environment Canada Weather Adapter</span>
                  <span className="text-slate-400">Public JSON RSS Feed</span>
                </div>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Parks Canada Knowledge Engine</span>
                  <span className="text-slate-400">Admin Curated Directives</span>
                </div>
                <span className="text-emerald-400 font-bold">Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROPERTIES TAB */}
      {activeTab === "properties" && (
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-display text-lg text-white">Accommodation Inventory ({DEMO_PROPERTIES.length})</h3>
            <button
              onClick={() => alert("Open Property Creator Modal...")}
              className="bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Property
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase border-b border-slate-700">
                <tr>
                  <th className="p-3">Property Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Nightly Base</th>
                  <th className="p-3">True Total</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {DEMO_PROPERTIES.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-750">
                    <td className="p-3 font-bold text-white">{prop.propertyName}</td>
                    <td className="p-3">{prop.destination}</td>
                    <td className="p-3 capitalize">{prop.propertyType}</td>
                    <td className="p-3">${prop.nightlyBaseRate} CAD</td>
                    <td className="p-3 font-bold text-gold-400">${Math.round(prop.totalStayCost || prop.nightlyBaseRate * 3)} CAD</td>
                    <td className="p-3 capitalize">{prop.priceConfidence.replace("_", " ")}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button className="text-slate-400 hover:text-white" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-rose-400" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADVISORIES TAB */}
      {activeTab === "advisories" && (
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-display text-lg text-white">Parks Canada & Regional Advisories ({DEMO_ADVISORIES.length})</h3>
            <button
              onClick={() => alert("Open Advisory Creator Modal...")}
              className="bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Directive
            </button>
          </div>

          <div className="space-y-3">
            {DEMO_ADVISORIES.map((adv) => (
              <div key={adv.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white text-sm block">{adv.title}</span>
                  <span className="text-slate-400">{adv.destination} • {adv.severity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-200">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AFFILIATES TAB */}
      {activeTab === "affiliates" && (
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-4 text-xs">
          <h3 className="font-bold font-display text-lg text-white">Affiliate Networks & Sponsored Partners</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-gold-400 block">Booking.com Demand API</span>
              <p className="text-slate-300">Commission rate: 4.5% - 8.0% per completed stay.</p>
              <span className="text-[11px] text-emerald-400 block font-bold">Status: Deep link mode active</span>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-gold-400 block">Expedia Rapid API</span>
              <p className="text-slate-300">Commission rate: 5.0% - 9.0% per completed stay.</p>
              <span className="text-[11px] text-emerald-400 block font-bold">Status: Deep link mode active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
