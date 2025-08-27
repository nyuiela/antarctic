import { NextResponse } from "next/server";

export async function GET() {
  const events = [
    {
      id: "e1",
      title: "Artists & Fleas",
      username: "remiere",
      lat: 40.7189,
      lng: -73.959,
      isLive: true,
      avatarUrl: "/icon.png",
      platforms: ["Farcaster"],
    },
    {
      id: "e2",
      title: "Devoción",
      username: "mochi",
      lat: 40.7225,
      lng: -73.9538,
      isLive: true,
      avatarUrl: "/logo.png",
      platforms: ["YouTube", "Farcaster"],
    },
    {
      id: "e3",
      title: "Domino Park",
      username: "sauced",
      lat: 40.718,
      lng: -73.967,
      isLive: false,
      avatarUrl: "/splash.png",
      platforms: [],
    },
  ];

  return NextResponse.json({ events });
}


