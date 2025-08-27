"use client";

import { useState, useEffect, useRef } from "react";
import StreamHeader from "./StreamHeader";
import EventsMap, { type LiveEvent, type EventsMapRef } from "./EventsMap";
import EventSearch from "./EventSearch";
import { Camera, ChevronUp, Monitor, Plus, Eye } from "lucide-react";

type Mode = "map" | "camera" | "screen";

export default function StreamHome() {
  const [mode] = useState<Mode>("map");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [showDiscover, setShowDiscover] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(true);
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

  // Simulate more events for discover section
  const discoverEvents = [
    {
      id: "d1",
      title: "Brooklyn Bridge Walk",
      username: "cityexplorer",
      lat: 40.7061,
      lng: -73.9969,
      isLive: true,
      avatarUrl: "/icon.png",
      viewers: 156,
    },
    {
      id: "d2",
      title: "Central Park Picnic",
      username: "naturelover",
      lat: 40.7829,
      lng: -73.9654,
      isLive: false,
      avatarUrl: "/logo.png",
      viewers: 89,
    },
    {
      id: "d3",
      title: "Times Square Lights",
      username: "nycnight",
      lat: 40.7580,
      lng: -73.9855,
      isLive: true,
      avatarUrl: "/splash.png",
      viewers: 234,
    },
    {
      id: "d4",
      title: "High Line Walk",
      username: "urbanhiker",
      lat: 40.7484,
      lng: -74.0047,
      isLive: false,
      avatarUrl: "/hero.png",
      viewers: 67,
    },
  ];

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

  const handleMapDrag = (isDragging: boolean) => {
    setSearchBarVisible(!isDragging);
  };

  return (
    <div className="space-y-5 animate-fade-in w-full bg-red-00">
      <StreamHeader />

      {/* Main viewport card */}
      <div className="relative rounded-3xl overflow-hidden border border-[var(--app-card-border)] bg-[var(--app-card-bg)] bg-red-00 h-[30rem] w-full shadow-none">
        {/* Mode preview background */}
        <div className="relative h-full">
          {mode === "map" && (
            <div className="absolute inset-0">
              <EventsMap ref={mapRef} events={events} onMapDrag={handleMapDrag} />
            </div>
          )}

          {mode === "camera" && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white">
              <div className="flex flex-col items-center gap-2">
                <Camera className="w-8 h-8 opacity-80" />
                <span className="text-sm opacity-80">Camera preview</span>
              </div>
            </div>
          )}

          {mode === "screen" && (
            <div className="absolute inset-0 bg-[var(--app-gray)] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Monitor className="w-8 h-8 text-[var(--app-foreground-muted)]" />
                <span className="text-sm text-[var(--app-foreground-muted)]">Screen share</span>
              </div>
            </div>
          )}

          {/* Search bar - responsive to map dragging */}
          <div className={`absolute left-4 right-4 top-4 flex items-center gap-2 transition-all duration-300 ${searchBarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}>
            <EventSearch
              events={events}
              onEventSelect={handleEventSelect}
              onSearch={handleSearch}
            />
          </div>

          {/* Mode segmented control */}
          <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between">
            <div className="inline-flex items-center bg-black/70 text-white rounded-full p-1">
              <button
                onClick={() => setShowDiscover(!showDiscover)}
                className={`px-3 py-1.5 text-xs rounded-full transition-all flex items-center gap-1 
                  // $
                  // {showDiscover ? "bg-white text-black" : "text-white"}

                  `}
              >
                <ChevronUp className={`w-3 h-3 transition-transform ${showDiscover ? 'rotate-180' : ''}`} />
                discover
              </button>
            </div>

            <div className="flex items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs shadow-sm bg-white/60 dark:bg-black/40 text-foreground ${activeFilter === f ? " bg-background text-blue-600" : "text-foreground"
                    }`}
                >
                  {f}
                </button>
              ))}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white/90 text-black grid place-items-center hover:bg-white transition-colors"
                aria-label="more"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Events Section */}
      {
        showDiscover && (
          <section className="space-y-3 px-4">
            <h3 className="text-sm font-medium">discover events</h3>
            <div className="grid grid-cols-2 gap-3">
              {discoverEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl overflow-hidden border border-[var(--app-card-border)] bg-[var(--app-card-bg)] cursor-pointer hover:shadow-lg transition-shadow shadow-none relative h-32"
                  onClick={() => handleEventSelect(event)}
                >
                  {/* Background image covering the whole card */}
                  <div className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={event.avatarUrl} alt={event.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Live indicator */}
                  {event.isLive && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                      LIVE
                    </div>
                  )}

                  {/* Viewer count */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {event.viewers}
                  </div>

                  {/* Text content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                    <div className="font-medium text-sm truncate text-white drop-shadow-sm">{event.title}</div>
                    <div className="text-xs text-white/80 drop-shadow-sm">@{event.username}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      }

      {/* Curations for you */}
      <section className="space-y-3 px-4">
        <h3 className="text-sm font-medium">Events for you</h3>
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
      <section className="space-y-3 px-4">
        <h3 className="text-sm font-medium">Live Streams for you</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {curators.map((u) => (
            <div key={u.id} className="flex flex-col items-center min-w-[72px]">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs mt-1">{u.name}</div>
              <div className="text-[10px] text-[var(--app-foreground-muted)] flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {u.viewers}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div >
  );
}


