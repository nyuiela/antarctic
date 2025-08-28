"use client";

import {
  Calendar,
  MapPin,
  Users,
  Eye,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { EventCam } from "./eventcam";
import Image from "next/image";

type EventParticipant = {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  role: "streamer" | "viewer" | "organizer";
  contribution: number;
  isLive?: boolean;
  platform?: string;
  tokenName?: string;
  tokenTicker?: string;
  tokenContract?: string;
  marketCap?: number;
  volume?: number;
  earnings?: number;
  volume24h?: number;
  earnings24h?: number;
  social?: {
    discord?: string;
    twitter?: string;
    website?: string;
    twitch?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    telegram?: string;
  },
};

type EventMedia = {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  title: string;
  uploadedBy: string;
  uploadedAt: string;
  likes: number;
};

type EventReward = {
  id: string;
  name: string;
  description: string;
  value: number;
  currency: string;
  totalPool: number;
  distributed: number;
  icon: string;
};

type EventAgenda = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  speakers?: string[];
};

type EventDetails = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coordinates: { lat: number; lng: number };
  image: string;
  category: string;
  maxParticipants: number;
  currentParticipants: number;
  isLive: boolean;
  platforms: string[];
  totalRewards: number;
  participants: EventParticipant[];
  media: EventMedia[];
  rewards: EventReward[];
  agenda: EventAgenda[];
  hosts?: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  }[];
  sponsors?: {
    name: string;
    logo: string;
    link: string;
  }[],
  tickets?: {
    available: boolean;
    types: { type: string; price: number; currency: string; perks?: string[] }[];
  },
  socialLinks?: {
    twitter?: string;
    discord?: string;
    website?: string;
  };
};

type Props = {
  eventId: string;
  onBack?: () => void;
};

export default function EventPage({ eventId, }: Props) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show button when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsScrolling(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrolling(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // const [selectedMedia, setSelectedMedia] = useState<EventMedia | null>(null);
  // const [selectedStreamer, setSelectedStreamer] = useState<EventParticipant | null>(null);
  // const [buyAmount, setBuyAmount] = useState("0.01");
  // const [isBuyMode, setIsBuyMode] = useState(true);

  // Mock data - replace with actual API call
  const event: EventDetails = {
    id: eventId,
    title: "Crypto Gaming Championship 2024",
    description:
      "The Crypto Gaming Championship 2024 is the premier global esports event powered by blockchain. Join pro gamers, streamers, and fans for an action-packed day of gameplay, NFT collectibles, and decentralized rewards. Watch live streams across Twitch, YouTube, and Farcaster, with real-time prize distribution via smart contracts. Compete, collect, and connect with the future of gaming!",
    date: "December 15, 2024",
    time: "2:00 PM - 10:00 PM EST",
    location: "Miami Beach Convention Center, FL",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    image: "/hero.png",
    category: "Gaming & Esports",
    maxParticipants: 500,
    currentParticipants: 342,
    isLive: true,
    platforms: ["Twitch", "YouTube", "Farcaster"],
    totalRewards: 25000,

    // ✅ Sessions & Agenda
    agenda: [
      {
        id: "session1",
        title: "Opening Ceremony & Keynote",
        description: "Kick-off with keynote from Blockchain Pro on the future of crypto gaming.",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
        speakers: ["Blockchain Pro"]
      },
      {
        id: "session2",
        title: "Qualifier Matches",
        description: "Streamers face off in elimination rounds streamed live with interactive polls.",
        startTime: "3:00 PM",
        endTime: "6:00 PM",
        speakers: ["Alex Gaming", "Crypto Queen"]
      },
      {
        id: "session3",
        title: "Community Challenge",
        description: "Fans compete in live mini-games for on-chain rewards and NFTs.",
        startTime: "6:00 PM",
        endTime: "7:30 PM"
      },
      {
        id: "session4",
        title: "Grand Finals & Award Ceremony",
        description: "Final showdown of the top 2 teams, followed by prize distribution.",
        startTime: "8:00 PM",
        endTime: "10:00 PM"
      }
    ],

    // ✅ Participants
    participants: [
      {
        id: "1",
        name: "Alex Gaming",
        avatar: "/hero.png",
        role: "streamer",
        bio: "Top Twitch streamer known for strategy-based crypto games.",
        contribution: 1500,
        isLive: true,
        platform: "Twitch",
        tokenName: "lofi_deep_sleep",
        tokenTicker: "LOFI",
        tokenContract: "0x1234567890123456789012345678901234567890",
        marketCap: 1000000,
        volume: 12000,
        earnings: 500,
        volume24h: 8000,
        earnings24h: 300,
        social: {
          twitter: "https://x.com/alexgaming",
          twitch: "https://twitch.tv/alexgaming"
        }
      },
      {
        id: "2",
        name: "Crypto Queen",
        avatar: "/hero.png",
        role: "streamer",
        bio: "YouTube personality bringing crypto insights and esports commentary.",
        contribution: 1200,
        isLive: true,
        platform: "YouTube",
        tokenName: "crypto_queen_token",
        tokenTicker: "CQ",
        tokenContract: "0x9876543210987654321098765432109876543210",
        marketCap: 500000,
        volume: 5000,
        earnings: 200,
        volume24h: 3000,
        earnings24h: 100,
        social: {
          twitter: "https://x.com/cryptoqueen",
          youtube: "https://youtube.com/cryptoqueen"
        }
      },
      {
        id: "3",
        name: "Blockchain Pro",
        avatar: "/hero.png",
        role: "organizer",
        bio: "Industry veteran and co-founder of the Crypto Gaming Alliance.",
        contribution: 800
      },
      {
        id: "4",
        name: "Gamer123",
        avatar: "/hero.png",
        role: "viewer",
        bio: "Longtime esports fan and active NFT collector.",
        contribution: 450
      }
    ],

    // ✅ Media
    media: [
      {
        id: "1",
        type: "image",
        url: "/hero.png",
        title: "Event Setup",
        uploadedBy: "Event Team",
        uploadedAt: "2 hours ago",
        likes: 24
      },
      {
        id: "2",
        type: "video",
        url: "/hero.png",
        thumbnail: "/hero.png",
        title: "Opening Ceremony",
        uploadedBy: "Live Stream",
        uploadedAt: "1 hour ago",
        likes: 156
      }
    ],

    // ✅ Rewards
    rewards: [
      {
        id: "1",
        name: "Grand Prize",
        description: "First place in the championship",
        value: 10000,
        currency: "USD",
        totalPool: 10000,
        distributed: 0,
        icon: "🏆"
      },
      {
        id: "2",
        name: "Streamer Rewards",
        description: "Top performing streamers",
        value: 5000,
        currency: "USD",
        totalPool: 10000,
        distributed: 2500,
        icon: "🎥"
      },
      {
        id: "3",
        name: "Community Rewards",
        description: "Most engaged participants",
        value: 2500,
        currency: "USD",
        totalPool: 5000,
        distributed: 1200,
        icon: "👥"
      }
    ],

    // ✅ Sponsors & Partners
    sponsors: [
      {
        name: "Yield Finance",
        logo: "/yield.png",
        link: "https://yield.xyz"
      },
      {
        name: "Polygon Labs",
        logo: "/polygon.png",
        link: "https://polygon.technology"
      }
    ],

    // ✅ Ticket Info
    tickets: {
      available: true,
      types: [
        { type: "General Admission", price: 50, currency: "USD" },
        { type: "VIP", price: 200, currency: "USD", perks: ["Backstage access", "Exclusive NFT"] }
      ]
    },

    // ✅ Hosts
    hosts: [
      {
        name: "Sarah Chen",
        avatar: "/hero.png",
        role: "Event Director & Co-Founder",
        bio: "Blockchain gaming enthusiast with 8+ years in esports. Former professional gamer and current advocate for Web3 gaming adoption.",
        social: {
          twitter: "https://x.com/sarahchen",
          linkedin: "https://linkedin.com/in/sarahchen",
          website: "https://sarahchen.dev"
        }
      },
      {
        name: "Marcus Rodriguez",
        avatar: "/hero.png",
        role: "Technical Lead",
        bio: "Full-stack developer specializing in blockchain integration and smart contract development for gaming platforms.",
        social: {
          twitter: "https://x.com/marcusrodriguez",
          linkedin: "https://linkedin.com/in/marcusrodriguez"
        }
      },
      {
        name: "Crypto Gaming Alliance",
        avatar: "/hero.png",
        role: "Organizing Partner",
        bio: "Leading organization dedicated to advancing blockchain gaming and fostering community growth in the Web3 gaming space."
      }
    ],

    // ✅ Social Links
    socialLinks: {
      twitter: "https://x.com/cryptogamingchamps",
      discord: "https://discord.gg/cryptogaming",
      website: "https://cryptogamingchampionship.com"
    }
  };


  // const topContributors = [...event.participants]
  //   .sort((a, b) => b.contribution - a.contribution)
  //   .slice(0, 10);

  const liveStreamers = event.participants.filter(p => p.isLive && p.role === "streamer");

  // const handleQuickAmount = (amount: string) => {
  //   if (amount === "Reset") {
  //     setBuyAmount("0.01");
  //   } else if (amount === "Max") {
  //     setBuyAmount("1"); // Assuming max is 1 ETH for simplicity
  //   } else {
  //     setBuyAmount(amount);
  //   }
  // };

  // const copyToClipboard = (text: string) => {
  //   navigator.clipboard.writeText(text).then(() => {
  //     alert("Contract address copied to clipboard!");
  //   }).catch(() => {
  //     alert("Failed to copy contract address.");
  //   });
  // };

  return (
    <div className="min-h-screen text-[var(--events-foreground)] bg-black/80 relative z-[20]">

      {/* Header */}
      {/* <div className="sticky top-0 z-40 bg-[var(--app-background)] border-b border-[var(--app-card-border)]">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--app-gray)] flex items-center justify-center">
              ←
            </div>
            Back to Events
          </button>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--app-card-border)] bg-[var(--app-card-bg)] hover:bg-[var(--app-gray)] transition-colors">
              <Heart className="w-4 h-4" />
              Save Event
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--app-card-border)] bg-[var(--app-card-bg)] hover:bg-[var(--app-gray)] transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="relative h-[25rem] md:h-[25rem] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            {event.isLive && (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE NOW
              </div>
            )}
            <span className="px-2 py-1 bg-[var(--events-accent)] text-white text-xs rounded-full">
              {event.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {event.title}
          </h1>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {event.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-0 max-w-7xl mx-auto space-y-4 mt-4 bg-red-transparent">

        {/* Live Streamers */}
        {liveStreamers.length > 0 && (
          <div className="border border-[var(--events-card-border)] rounded-xl p-6 border-none bg-transparent">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              Live Now
            </h2>
            <div className="gap-4 flex">
              {liveStreamers.map((streamer) => (
                <div key={streamer.id} className="flex flex-col items-center min-w-[72px]">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-red-500 shadow">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={streamer.avatar} alt={streamer.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs mt-1">{streamer.name}</div>
                  <div className="text-[10px] text-[var(--events-foreground-muted)] flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {streamer.earnings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview Content - All Sections Combined */}
        <div className="space-y-2">
          {/* Description */}
          <div className="border border-[var(--events-card-border)] rounded-xl p-6 border-none bg-transparent">
            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <p className="text-[var(--events-foreground-muted)] leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Location Section */}
          <div className="border border-[var(--events-card-border)] rounded-xl p-6 border-none bg-transparent">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">{event.location}</h3>
                <div className="text-[var(--events-foreground-muted)] space-y-1">
                  <p>📍 {event.location}</p>
                  {/* <p>📅 {event.date}</p> */}
                  {/* <p>🕒 {event.time}</p> */}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-transparent border border-[var(--events-card-border)] rounded-lg p-4 text-center">
                <div className="w-full h-32 bg-transparent border-none border-[var(--events-card-border)] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-[var(--events-foreground-muted)] mx-auto mb-2" />
                    <p className="text-sm text-[var(--events-foreground-muted)]">Interactive Map</p>
                    <p className="text-xs text-[var(--events-foreground-muted)]">Coordinates: {event.coordinates.lat}, {event.coordinates.lng}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Hosts Section */}
          {event.hosts && event.hosts.length > 0 && (
            <div className="border border-[var(--events-card-border)] rounded-xl p-6 border-none bg-transparent">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                Hosts
              </h2>
              <div className="space-y-2">
                {event.hosts.map((host, index) => (
                  <div key={index} className="flex items-start gap-4 p-2 border-none border-[var(--events-card-border)] rounded-lg">
                    <div className="flex-shrink-0">
                      <Image
                        width={0}
                        height={0}
                        src={host.avatar}
                        alt={host.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className=" font-medium text-[14px]">{host.name}</h3>
                        {host.social && (
                          <div className="flex items-center gap-2">
                            {host.social.twitter && (
                              <a
                                href={host.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--events-foreground-muted)] hover:text-[var(--events-foreground)] transition-colors"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              </a>
                            )}
                            {host.social.linkedin && (
                              <a
                                href={host.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--events-foreground-muted)] hover:text-[var(--events-foreground)] transition-colors"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </a>
                            )}
                            {host.social.website && (
                              <a
                                href={host.social.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--events-foreground-muted)] hover:text-[var(--events-foreground)] transition-colors"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[var(--events-accent)] font-medium mb-2">{host.role}</p>
                      {/* {host.bio && (
                        <p className="text-sm text-[var(--events-foreground-muted)] leading-relaxed">
                          {host.bio}
                        </p>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agenda Section */}
          <div className="border border-[var(--events-card-border)] rounded-xl p-6 border-none bg-transparent">
            <h2 className="text-xl font-semibold mb-4">Agenda</h2>
            <div className="text-[var(--events-foreground-muted)] leading-relaxed">
              {event.agenda.map((agenda) => (
                <div key={agenda.id}>
                  <h3 className="text-lg font-medium mb-2">{agenda.title}</h3>
                  <p className="text-sm text-[var(--events-foreground-muted)] mb-2">{agenda.description}</p>
                  <p className="text-sm text-[var(--events-foreground-muted)] mb-2">{agenda.startTime} - {agenda.endTime}</p>
                </div>
              ))}
            </div>
          </div>

          <EventCam setActiveTab={() => { }} />


          {/* Participants Section */}
          <div className="border border-[var(--events-card-border)] rounded-xl p-6 border-none bg-transparent">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              All Participants ({event.participants.length})
            </h2>
            <div className="space-y-3">
              {event.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between p-3 rounded-lg bg-transparent border border-[var(--events-card-border)]">
                  <div className="flex items-center gap-3">
                    <Image
                      width={0}
                      height={0}
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{participant.name}</div>
                      <div className="text-sm text-[var(--events-foreground-muted)] capitalize">
                        {participant.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {participant.isLive && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                    )}
                    <div className="text-right">
                      <div className="font-medium">${participant.contribution.toLocaleString()}</div>
                      <div className="text-xs text-[var(--events-foreground-muted)]">contribution</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* Sticky Registration Button */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out bg-black/40 border-none ${isScrolling ? 'translate-y-full' : 'translate-y-0'
          }`}
      >
        <div className="bg-transparent backdrop-blur-sm border-t border-[var(--events-card-border)] p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--events-foreground)]">
                  {event.title}
                </div>
                <div className="text-xs text-[var(--events-foreground-muted)]">
                  {event.date} • {event.time}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-[var(--events-foreground)] border border-[var(--events-card-border)] rounded-lg hover:bg-[var(--events-accent)]/10 transition-colors">
                  Share
                </button>
                <button className="px-6 py-2 text-sm font-medium text-white bg-[var(--events-accent)] rounded-lg hover:bg-[var(--events-accent-hover)] transition-colors">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div >
  );
}


//    {/* Buy/Sell Interface */}
//    <div className="bg-[var(--app-gray)] rounded-xl p-6">
//    <h3 className="text-lg font-semibold mb-4">Trade Token</h3>

//    {/* Buy/Sell Toggle */}
//    <div className="flex gap-2 mb-4">
//      <button
//        onClick={() => setIsBuyMode(true)}
//        className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${isBuyMode
//          ? "bg-green-600 text-white"
//          : "bg-[var(--app-card-bg)] text-[var(--app-foreground-muted)]"
//          }`}
//      >
//        Buy
//      </button>
//      <button
//        onClick={() => setIsBuyMode(false)}
//        className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${!isBuyMode
//          ? "bg-red-600 text-white"
//          : "bg-[var(--app-card-bg)] text-[var(--app-foreground-muted)]"
//          }`}
//      >
//        Sell
//      </button>
//    </div>

//    {/* Balance */}
//    <div className="text-center mb-4">
//      <div className="text-sm text-[var(--app-foreground-muted)]">Balance</div>
//      <div className="font-medium">0 ETH</div>
//    </div>

//    {/* Quick Amount Selection */}
//    <div className="flex gap-2 mb-4">
//      {["Reset", "0.1 ETH", "0.5 ETH", "1 ETH", "Max"].map((amount) => (
//        <button
//          key={amount}
//          onClick={() => handleQuickAmount(amount)}
//          className="px-3 py-2 text-sm bg-[var(--app-card-bg)] text-[var(--app-foreground-muted)] rounded-lg hover:bg-[var(--app-card-border)] transition-colors"
//        >
//          {amount}
//        </button>
//      ))}
//    </div>

//    {/* Amount Input */}
//    <div className="flex items-center gap-3 mb-4">
//      <input
//        type="text"
//        value={buyAmount}
//        onChange={(e) => setBuyAmount(e.target.value)}
//        className="flex-1 px-4 py-3 bg-[var(--app-card-bg)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)]"
//        placeholder="0.01"
//      />
//      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--app-card-bg)] rounded-lg">
//        <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
//        <span className="font-medium">ETH</span>
//      </div>
//    </div>

//    {/* Swap Button */}
//    <div className="flex justify-center">
//      <button className="w-12 h-12 bg-[var(--app-card-bg)] rounded-full flex items-center justify-center hover:bg-[var(--app-card-border)] transition-colors">
//        <ArrowUpDown className="w-5 h-5 text-[var(--app-foreground-muted)]" />
//      </button>
//    </div>
//  </div>




// {/* Streamer Token Section */}
// <div className="bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl p-6 border-none">
//   <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
//     Streamer Tokens
//   </h2>

//   <div className="mb-6">
//     <h3 className="text-lg font-medium mb-4">Select Streamer Token</h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {event.participants.filter(p => p.tokenName).map((streamer) => (
//         <div
//           key={streamer.id}
//           className={`cursor-pointer p-4 rounded-lg border transition-colors ${selectedStreamer?.id === streamer.id
//             ? "border-[var(--app-accent)] bg-[var(--app-accent)]/10"
//             : "border-[var(--app-card-border)] bg-[var(--app-gray)] hover:border-[var(--app-accent)]/50"
//             }`}
//           onClick={() => setSelectedStreamer(streamer)}
//         >
//           <div className="flex items-center gap-3">
//             <img
//               src={streamer.avatar}
//               alt={streamer.name}
//               className="w-12 h-12 rounded-full"
//             />
//             <div>
//               <div className="font-medium">{streamer.name}</div>
//               <div className="text-sm text-[var(--app-foreground-muted)]">
//                 @{streamer.tokenName}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>

//   {/* Streamer Token Profile */}
//   {selectedStreamer && selectedStreamer.tokenName && (
//     <div className="space-y-6">
//       {/* Profile Section */}
//       {/* <div className="bg-[var(--app-gray)] rounded-xl p-6">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <img
//                 src={selectedStreamer.avatar}
//                 alt={selectedStreamer.name}
//                 className="w-20 h-20 rounded-full"
//               />
//               <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
//                 <span className="text-white text-xs font-bold">N</span>
//               </div>
//             </div>
//             <div>
//               <div className="text-xl font-bold">{selectedStreamer.name}</div>
//               <div className="text-[var(--app-foreground-muted)]">@{selectedStreamer.tokenName}</div>
//               <div className="text-sm text-[var(--app-foreground-muted)] mt-1">Lofi deep sleep</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
//               TIP
//             </button>
//             <div className="flex items-center gap-1 text-[var(--app-foreground-muted)]">
//               <Eye className="w-4 h-4" />
//               <span>0</span>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Financial Metrics */}
//       {/* <div className="bg-[var(--app-gray)] rounded-xl p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Financial Metrics</h3>
//           <div className="text-right">
//             <div className="text-sm text-[var(--app-foreground-muted)]">Market Cap</div>
//             <div className="font-bold">${selectedStreamer.marketCap?.toLocaleString()}</div>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex items-center gap-2">
//             <Info className="w-4 h-4 text-[var(--app-foreground-muted)]" />
//             <div>
//               <div className="text-sm text-[var(--app-foreground-muted)]">Volume</div>
//               <div className="font-medium">${selectedStreamer.volume}</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Info className="w-4 h-4 text-[var(--app-foreground-muted)]" />
//             <div>
//               <div className="text-sm text-[var(--app-foreground-muted)]">Earnings</div>
//               <div className="font-medium">${selectedStreamer.earnings}</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Info className="w-4 h-4 text-[var(--app-foreground-muted)]" />
//             <div>
//               <div className="text-sm text-[var(--app-foreground-muted)]">Volume 24h</div>
//               <div className="font-medium">${selectedStreamer.volume24h}</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Info className="w-4 h-4 text-[var(--app-foreground-muted)]" />
//             <div>
//               <div className="text-sm text-[var(--app-foreground-muted)]">Earnings 24h</div>
//               <div className="font-medium">${selectedStreamer.earnings24h}</div>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Token Details */}
//       {/* <div className="bg-[var(--app-gray)] rounded-xl p-6">
//         <h3 className="text-lg font-semibold mb-4">Token Details</h3>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img
//               src={selectedStreamer.avatar}
//               alt={selectedStreamer.tokenName}
//               className="w-12 h-12 rounded-full"
//             />
//             <div>
//               <div className="text-sm text-[var(--app-foreground-muted)]">Name: {selectedStreamer.tokenName}</div>
//               <div className="text-sm text-[var(--app-foreground-muted)]">Ticker: {selectedStreamer.tokenTicker}</div>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-sm text-[var(--app-foreground-muted)] font-mono">
//                   0x{selectedStreamer.tokenContract}...
//                 </span>
//                 <button
//                   onClick={() => copyToClipboard(`0x${selectedStreamer.tokenContract}`)}
//                   className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] transition-colors"
//                 >
//                   <Copy className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//           <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
//             BaseScan
//           </button>
//         </div>
//       </div> */}


//     </div>
//   )}
// </div>
