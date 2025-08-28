"use client"
import React from 'react'
import Link from 'next/link'
import { MapPin, Users, Calendar } from "lucide-react"

// Mock events data
const events = [
  {
    id: "1",
    title: "Crypto Gaming Championship 2024",
    description: "The premier global esports event powered by blockchain",
    date: "December 15, 2024",
    time: "2:00 PM - 10:00 PM EST",
    location: "Miami Beach Convention Center, FL",
    image: "/hero.png",
    category: "Gaming & Esports",
    isLive: true,
    currentParticipants: 342,
    maxParticipants: 500,
  },
  {
    id: "2",
    title: "Web3 Developer Meetup",
    description: "Join us for networking and learning with fellow Web3 developers",
    date: "December 20, 2024",
    time: "6:00 PM - 9:00 PM EST",
    location: "Tech Hub Downtown, 123 Innovation Street",
    image: "/screenshot.png",
    category: "Technology",
    isLive: false,
    currentParticipants: 32,
    maxParticipants: 50,
  },
  {
    id: "3",
    title: "NFT Art Gallery Opening",
    description: "Exclusive showcase of digital art and NFT collections",
    date: "December 25, 2024",
    time: "7:00 PM - 11:00 PM EST",
    location: "Digital Art Museum, 456 Creative Ave",
    image: "/logo.png",
    category: "Art & Culture",
    isLive: false,
    currentParticipants: 89,
    maxParticipants: 200,
  },
  {
    id: "4",
    title: "DeFi Summit 2024",
    description: "The future of decentralized finance and trading",
    date: "January 5, 2025",
    time: "9:00 AM - 6:00 PM EST",
    location: "Financial District Conference Center",
    image: "/splash.png",
    category: "Finance",
    isLive: false,
    currentParticipants: 156,
    maxParticipants: 300,
  }
]

const EventsPage = () => {
  return (
    <div className="min-h-screen text-[var(--app-foreground)] bg-black/80 relative z-[20] pt-10">
      {/* Header */}
      <div className="top-0 z-40 bg-transparent border-none">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Events</h1>
          <Link
            href="/e/create"
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--app-accent)] rounded-lg hover:bg-[var(--app-accent)]/90 transition-colors"
          >
            Create Event
          </Link>
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/e/${event.id}`}
            className="block border-b-[1px] border-[var(--app-card-border)] rounded-xl p-4 bg-transparent hover:bg-black/40 transition-colors"
          >
            <div className="flex gap-4">
              {/* Event Image */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {event.isLive && (
                  <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                    LIVE
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold truncate">{event.title}</h3>
                  <span className="px-2 py-1 bg-[var(--app-accent)] text-white text-xs rounded-full ml-2 flex-shrink-0">
                    {event.category}
                  </span>
                </div>

                <p className="text-[12px] text-[var(--app-foreground-muted)] mb-3 line-clamp-2 text-ellipsis">
                  {event.description}
                </p>

                <div className="flex items-end gap-4 text-xs text-[var(--app-foreground-muted)] bg-red-00">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 overflow-hidden line-clamp-1 text-ellipsis" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {event.currentParticipants}/{event.maxParticipants}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>


    </div>
  )
}

export default EventsPage