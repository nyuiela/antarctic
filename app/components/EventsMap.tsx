"use client";

import { useEffect, useMemo, useRef, useState, useImperativeHandle, forwardRef } from "react";

export type LiveEvent = {
  id: string;
  title: string;
  username: string;
  lat: number;
  lng: number;
  isLive: boolean;
  avatarUrl: string;
  platforms?: string[];
};

type Props = {
  events: LiveEvent[];
};

export interface EventsMapRef {
  focusOnEvent: (event: LiveEvent) => void;
}

// Renders a real map when Mapbox GL is available and a token is set.
// Falls back to a static image background otherwise.
const EventsMap = forwardRef<EventsMapRef, Props>(({ events }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const center = useMemo(() => {
    if (events.length === 0) return [-73.957, 40.72];
    const avgLng = events.reduce((s, e) => s + e.lng, 0) / events.length;
    const avgLat = events.reduce((s, e) => s + e.lat, 0) / events.length;
    return [avgLng, avgLat] as [number, number];
  }, [events]);

  useImperativeHandle(ref, () => ({
    focusOnEvent: (event: LiveEvent) => {
      console.log("Focusing on event:", event);
      if (mapRef.current && mapReady) {
        try {
          mapRef.current.flyTo({
            center: [event.lng, event.lat],
            zoom: 15,
            duration: 1000,
          });
          console.log("Map flew to:", [event.lng, event.lat]);
        } catch (error) {
          console.error("Error focusing on event:", error);
        }
      } else {
        console.log("Map not ready or ref not available");
      }
    },
  }));

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mapboxgl: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let markers: any[] = [];

    async function init() {
      if (!containerRef.current) return;
      if (!token) return;
      try {
        mapboxgl = (await import("mapbox-gl")).default;
      } catch {
        return; // dependency not installed; fallback will render
      }

      mapboxgl.accessToken = token;
      map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center,
        zoom: 12,
      });

      mapRef.current = map;

      map.on("load", () => {
        setMapReady(true);
        console.log("Map loaded, creating markers for", events.length, "events");

        // Create markers for each event
        markers = events.map((ev) => {
          const el = document.createElement("div");
          el.className = `rounded-full ring-2 ring-white shadow-md overflow-hidden ${ev.isLive ? "ring-offset-2 ring-offset-red-500 animate-pulse" : ""
            }`;
          el.style.width = "36px";
          el.style.height = "36px";
          el.style.cursor = "pointer";

          const img = document.createElement("img");
          img.src = ev.avatarUrl;
          img.alt = ev.username;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          el.appendChild(img);

          // Add click handler to marker
          el.addEventListener("click", () => {
            console.log("Marker clicked for event:", ev.title);
            // Create popup on marker click
            const html = `
              <div style="min-width:160px">
                <div style="font-weight:600;margin-bottom:4px">${ev.title}</div>
                <div style="font-size:12px;opacity:.7">@${ev.username}</div>
                ${ev.isLive ? '<div style="color:#ef4444;font-size:11px;margin:4px 0">🔴 LIVE</div>' : ''}
                <button id="watch-${ev.id}" style="margin-top:8px;padding:6px 10px;border-radius:10px;background:#111827;color:#fff;font-size:12px">Watch</button>
              </div>
            `;
            const popup = new mapboxgl.Popup({ offset: 12 })
              .setLngLat([ev.lng, ev.lat])
              .setHTML(html)
              .addTo(map);

            setTimeout(() => {
              const btn = document.getElementById(`watch-${ev.id}`);
              if (btn) {
                btn.onclick = () => {
                  window.location.hash = `watch-${ev.id}`;
                  popup.remove();
                };
              }
            }, 0);
          });

          return new mapboxgl.Marker({ element: el })
            .setLngLat([ev.lng, ev.lat])
            .addTo(map);
        });

        // Add invisible click layer for better touch targets
        const geojson = {
          type: "FeatureCollection" as const,
          features: events.map((ev) => ({
            type: "Feature" as const,
            geometry: { type: "Point" as const, coordinates: [ev.lng, ev.lat] },
            properties: { id: ev.id },
          })),
        };

        if (!map.getSource("events")) {
          map.addSource("events", { type: "geojson", data: geojson });
          map.addLayer({
            id: "touch-points",
            type: "circle",
            source: "events",
            paint: {
              "circle-radius": 20,
              "circle-opacity": 0
            }
          });
        } else {
          const source = map.getSource("events");
          if (source) {
            source.setData(geojson);
          }
        }

        // Add click handler for invisible layer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map.on("click", "touch-points", (e: any) => {
          const feature = e.features?.[0];
          if (!feature) return;
          const id = feature.properties?.id;
          const ev = events.find((x) => x.id === id);
          if (!ev) return;

          console.log("Layer clicked for event:", ev.title);
          const html = `
            <div style="min-width:160px">
              <div style="font-weight:600;margin-bottom:4px">${ev.title}</div>
              <div style="font-size:12px;opacity:.7">@${ev.username}</div>
              ${ev.isLive ? '<div style="color:#ef4444;font-size:11px;margin:4px 0">🔴 LIVE</div>' : ''}
              <button id="watch-${ev.id}" style="margin-top:8px;padding:6px 10px;border-radius:10px;background:#111827;color:#fff;font-size:12px">Watch</button>
            </div>
          `;
          const popup = new mapboxgl.Popup({ offset: 12 })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(html)
            .addTo(map);

          setTimeout(() => {
            const btn = document.getElementById(`watch-${ev.id}`);
            if (btn) {
              btn.onclick = () => {
                window.location.hash = `watch-${ev.id}`;
                popup.remove();
              };
            }
          }, 0);
        });
      });
    }

    init();

    return () => {
      markers.forEach((m) => m.remove?.());
      if (map && map.remove) map.remove();
    };
  }, [center, events, token]);

  if (!token) {
    return (
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="map" className="w-full h-full object-cover opacity-95" />
        {/* Fallback event indicators */}
        {events.map((ev) => (
          <div
            key={ev.id}
            className="absolute w-9 h-9 rounded-full ring-2 ring-white shadow-md overflow-hidden cursor-pointer"
            style={{
              top: `${((ev.lat - 40.72) / 0.01) * 50 + 50}%`,
              left: `${((ev.lng + 73.957) / 0.01) * 50 + 50}%`,
              transform: 'translate(-50%, -50%)'
            }}
            title={`${ev.title} • @${ev.username}${ev.isLive ? ' • LIVE' : ''}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ev.avatarUrl}
              alt={ev.username}
              className="w-full h-full object-cover"
            />
            {ev.isLive && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return <div ref={containerRef} className="absolute inset-0" aria-label={mapReady ? "interactive map" : "loading map"} />;
});

EventsMap.displayName = "EventsMap";

export default EventsMap;
