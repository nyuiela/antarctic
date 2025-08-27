"use client";

import { useState } from "react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { Name, Avatar } from "@coinbase/onchainkit/identity";

type Platform = {
  id: string;
  name: string;
  icon: string; // emoji for simplicity; swap for svg later
  connected: boolean;
  live: boolean;
};

export default function StreamHeader() {
  const [showModal, setShowModal] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: "fc", name: "Farcaster", icon: "🟣", connected: true, live: true },
    { id: "yt", name: "YouTube", icon: "▶️", connected: false, live: false },
    { id: "tw", name: "Twitch", icon: "💜", connected: false, live: false },
    { id: "x", name: "X", icon: "𝕏", connected: false, live: false },
  ]);

  const isAnyLive = platforms.some((p) => p.live);

  return (
    <>
      <div className="flex items-center justify-between py-1.5 px-3 gap-5">
        {/* Wallet connect compact pill */}
        <div className="flex items-center gap-1.3">
          <Wallet>
            <ConnectWallet className="rounded-md border-[1px] border-gray-300 bg-transparent text-black hover:text-black hover:bg-white *:text-black *:bg-white" text="Connect">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--app-card-bg)] border border-[var(--app-card-border)] text-xs">
                <Avatar className="w-4 h-4" />
                <Name className="text-[var(--app-foreground)]" />
              </div>
            </ConnectWallet>
            <WalletDropdown>
              <div className="px-2 py-1">
                <WalletDropdownDisconnect />
              </div>
            </WalletDropdown>
          </Wallet>
        </div>

        {/* Streaming platforms + live status pill */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 rounded-full border border-[var(--app-card-border)] bg-[var(--app-card-bg)] px-2 py-1"
        >
          <div className="flex -space-x-1">
            {platforms.slice(0, 3).map((p) => (
              <span
                key={p.id}
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] ring-1 ring-white ${p.connected ? "opacity-100" : "opacity-40"}`}
                title={`${p.name}${p.live ? " • live" : p.connected ? " • connected" : " • connect"}`}
              >
                {p.icon}
              </span>
            ))}
          </div>
          <span className={`text-[10px] ${isAnyLive ? "text-red-500" : "text-[var(--app-foreground-muted)]"}`}>
            {isAnyLive ? "LIVE" : "offline"}
          </span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-sm mx-auto bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-t-2xl sm:rounded-2xl shadow-xl p-3 bg-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Connect streaming platforms</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-xs px-1.5 py-0.5">✕</button>
            </div>

            <div className="space-y-1.5">
              {platforms.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-[var(--app-card-border)] p-2 bg-white/50">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 grid place-items-center text-sm rounded-full bg-[var(--app-gray)]">{p.icon}</span>
                    <div className="text-xs">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-[9px] text-[var(--app-foreground-muted)]">{p.live ? "live now" : p.connected ? "connected" : "not connected"}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setPlatforms((prev) =>
                        prev.map((x) =>
                          x.id === p.id ? { ...x, connected: !x.connected, live: x.live && !x.connected ? x.live : false } : x,
                        ),
                      )
                    }
                    className={`text-[10px] px-2 py-1 rounded-full border ${p.connected ? "bg-black text-white" : "bg-transparent"}`}
                  >
                    {p.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-[9px] text-[var(--app-foreground-muted)]">Toggle a platform to connect; going live will reflect here.</div>
              <button type="button" className="text-xs px-2 py-1 rounded-lg border" onClick={() => setShowModal(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


