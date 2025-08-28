"use client";

import {
  useMiniKit,
  useAddFrame,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Features } from "./components/DemoComponents";
import StreamHome from "./components/StreamHome";
import WaitlistModal from "./components/WaitlistModal";
import { MapPin, Video, Users, Calendar, Star, Heart } from "lucide-react";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showWaitlist, setShowWaitlist] = useState(false);

  const addFrame = useAddFrame();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Check if user is first-time visitor
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedStream");
    if (!hasVisited) {
      setShowWaitlist(true);
    }
  }, []);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleJoinWaitlist = async (email: string) => {
    // Here you would typically send the email to your backend
    // For now, we'll just simulate the API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mark user as having visited
    localStorage.setItem("hasVisitedStream", "true");

    // You could also store the email in localStorage or send to your API
    localStorage.setItem("waitlistEmail", email);
  };

  const handleCloseWaitlist = () => {
    setShowWaitlist(false);
    // Mark user as having visited even if they don't join
    localStorage.setItem("hasVisitedStream", "true");
  };

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto p-0 ">
        <header className="flex justify-between items-center mb-0 h-0">
          <div>
            <div className="flex items-center space-x-2">
              {/* Wallet connect moved to StreamHeader */}
            </div>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1">
          {activeTab === "home" && <StreamHome />}
          {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
        </main>

        <footer className="pt-4 flex justify-center items-center w-full bg-red-00 flex-col">
          {/* <StreamHeader /> */}
          <div className="w-full flex justify-start px-4 p-2 items-center bg-red-00">
            Menu
          </div>
          <div className="px-4 flex justify-center items-center border-none border-gray-00 bg-gray-000  bg-background w-[90%] p-2 gap-4 overflow-x-auto mx-10 bg-red-00">

            <div className="h-10 w-fit px-4 flex justify-center items-center border-[1px] border-gray-300 rounded-full bg-gray-000  bg-background dark:border-gray-500 shrink-0 gap-2">
              <Video className="w-4 h-4" />
              Go live
            </div>
            <Link href="/e" className="h-10 w-fit px-4 flex justify-center items-center border-[1px] border-gray-300 rounded-full bg-gray-000  bg-background dark:border-gray-500 shrink-0 gap-2">
              <MapPin className="w-4 h-4" />
              Events
            </Link>
            <div className="h-10 w-fit px-4 flex justify-center items-center border-[1px] border-gray-300 rounded-full bg-gray-000  bg-background dark:border-gray-500 shrink-0 gap-2">
              <Users className="w-4 h-4" />
              Streamers
            </div>
            <div className="h-10 w-fit px-4 flex justify-center items-center border-[1px] border-gray-300 rounded-full bg-gray-000  bg-background dark:border-gray-500 shrink-0 gap-2">
              <Calendar className="w-4 h-4" />
              Schedule
            </div>
            <div className="h-10 w-fit px-4 flex justify-center items-center border-[1px] border-gray-300 rounded-full bg-gray-000  bg-background dark:border-gray-500 shrink-0 gap-2">
              <Star className="w-4 h-4" />
              Featured
            </div>
            <div className="h-10 w-fit px-4 flex justify-center items-center border-[1px] border-gray-300 rounded-full bg-gray-000  bg-background dark:border-gray-500 shrink-0 gap-2">
              <Heart className="w-4 h-4" />
              Favorites
            </div>
          </div>
          {/* <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button> */}
        </footer>
      </div>
      {showWaitlist && (
        <WaitlistModal
          isOpen={showWaitlist}
          onJoinWaitlist={handleJoinWaitlist}
          onClose={handleCloseWaitlist}
        />
      )}
    </div>
  );
}
