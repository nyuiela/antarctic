"use client";

import { useState, useEffect, useRef } from "react";
import StreamHeader from "./StreamHeader";
import EventsMap, { type LiveEvent, type EventsMapRef } from "./EventsMap";
import EventSearch from "./EventSearch";

type Mode = "map" | "camera" | "screen";

export default function StreamHome() {
  const [mode] = useState<Mode>("map");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const mapRef = useRef<EventsMapRef>(null);

  const filters = ["all", "eat", "café", "bar"]; // exact labels per screenshot

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/events");
        const json = await res.json();
        if (!cancelled) setEvents(json.events || []);
      } catch {
        // noop; keep placeholders empty
      }
    }
    load();
    const t = setInterval(load, 20000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  const curations = [
    {
      id: "c1",
      title: "chinatown & les",
      image: "/screenshot.png",
      author: "@atasha",
    },
    {
      id: "c2",
      title: "nyc",
      image: "/hero.png",
      author: "@ayman",
    },
  ];

  const curators = [
    { id: "u1", name: "eliza", viewers: 92, avatarUrl: "/icon.png" },
    { id: "u2", name: "gndclouds", viewers: 68, avatarUrl: "/logo.png" },
    { id: "u3", name: "michelle", viewers: 44, avatarUrl: "/splash.png" },
    { id: "u4", name: "weber", viewers: 42, avatarUrl: "/hero.png" },
  ];

  const handleEventSelect = (event: LiveEvent) => {
    console.log("Event selected from search:", event);
    console.log("Map ref available:", !!mapRef.current);
    mapRef.current?.focusOnEvent(event);
  };

  const handleSearch = (searchQuery: string) => {
    // You can add additional search logic here
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="space-y-5 animate-fade-in w-full bg-red-00">
      <StreamHeader />

      {/* Main viewport card */}
      <div className="relative rounded-3xl overflow-hidden border border-[var(--app-card-border)] bg-[var(--app-card-bg)] shadow-lg bg-red-00 h-[30rem] w-full">
        {/* Mode preview background */}
        <div className="relative h-full">
          {mode === "map" && (
            <div className="absolute inset-0">
              <EventsMap ref={mapRef} events={events} />
            </div>
          )}

          {mode === "camera" && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white">
              <span className="text-sm opacity-80">Camera preview</span>
            </div>
          )}

          {mode === "screen" && (
            <div className="absolute inset-0 bg-[var(--app-gray)] flex items-center justify-center">
              <span className="text-sm text-[var(--app-foreground-muted)]">Screen share</span>
            </div>
          )}

          {/* Search bar */}
          <div className="absolute left-4 right-4 top-4 flex items-center gap-2">
            <EventSearch
              events={events}
              onEventSelect={handleEventSelect}
              onSearch={handleSearch}
            />
          </div>

          {/* Search here chip */}
          <div className="absolute left-4 bottom-24">
            <button
              type="button"
              className="bg-white/90 text-black rounded-full px-3 py-1 text-xs shadow"
            >
              🔎 search here
            </button>
          </div>

          {/* Mode segmented control */}
          <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between">
            <div className="inline-flex items-center bg-black/70 text-white rounded-full p-1">
              {(["discover"] as const).map((label) => (
                <span
                  key={label}
                  className="px-3 py-1.5 text-xs rounded-full bg-white text-black"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs backdrop-blur bg-white/90 ${activeFilter === f ? "bg-black text-white" : "text-black"
                    }`}
                >
                  {f}
                </button>
              ))}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white/90 text-black grid place-items-center"
                aria-label="more"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Curations for you */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">curations for you</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {curations.map((c) => (
            <div
              key={c.id}
              className="min-w-[72%] rounded-2xl overflow-hidden border border-[var(--app-card-border)] bg-[var(--app-card-bg)] shadow"
            >
              <div className="relative h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <div className="text-xs opacity-90">{c.author}</div>
                  <div className="text-base font-semibold leading-tight">{c.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curators for you */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">curators for you</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {curators.map((u) => (
            <div key={u.id} className="flex flex-col items-center min-w-[72px]">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs mt-1">{u.name}</div>
              <div className="text-[10px] text-[var(--app-foreground-muted)]">👁️ {u.viewers}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


