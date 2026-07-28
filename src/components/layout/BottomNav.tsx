"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Sparkles, ShieldAlert, Calculator } from "lucide-react";

const BOTTOM_NAV_ITEMS = [
  { href: "/",           label: "Plan",        icon: Home },
  { href: "/search",     label: "Stays",       icon: Compass },
  { href: "/itinerary",  label: "AI Trip",     icon: Sparkles },
  { href: "/advisories", label: "Rules",       icon: ShieldAlert },
  { href: "/budget",     label: "Budget",      icon: Calculator },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-[var(--z-drawer)] lg:hidden bg-[#080808]/97 border-t border-[#C49A10]/15 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch">
        {BOTTOM_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[56px] transition-all ${
                active
                  ? "text-[#C49A10]"
                  : "text-[#5C5852] hover:text-[#ADA89F]"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${active ? "scale-110" : "scale-100"}`}
                  aria-hidden="true"
                />
                {active && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C49A10]"
                    aria-hidden="true"
                  />
                )}
              </div>
              <span
                className={`text-[9px] font-mono uppercase tracking-wider leading-none ${
                  active ? "text-[#C49A10] font-bold" : ""
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
