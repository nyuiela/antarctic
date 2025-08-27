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
      <div className="flex items-center justify-between py-2 px-4">
        {/* Wallet connect compact pill */}
        <div className="flex items-center gap-2">
          <Wallet>
            <ConnectWallet>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--app-card-bg)] border border-[var(--app-card-border)] text-sm">
                <Avatar className="w-5 h-5" />
                <Name className="text-[var(--app-foreground)]" />
              </div>
            </ConnectWallet>
            <WalletDropdown>
              <div className="px-3 py-2">
                <WalletDropdownDisconnect />
              </div>
            </WalletDropdown>
          </Wallet>
        </div>

        {/* Streaming platforms + live status pill */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-full border border-[var(--app-card-border)] bg-[var(--app-card-bg)] px-3 py-1.5"
        >
          <div className="flex -space-x-1">
            {platforms.slice(0, 3).map((p) => (
              <span
                key={p.id}
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ring-1 ring-white ${p.connected ? "opacity-100" : "opacity-40"}`}
                title={`${p.name}${p.live ? " • live" : p.connected ? " • connected" : " • connect"}`}
              >
                {p.icon}
              </span>
            ))}
          </div>
          <span className={`text-xs ${isAnyLive ? "text-red-500" : "text-[var(--app-foreground-muted)]"}`}>
            {isAnyLive ? "LIVE" : "offline"}
          </span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-white/50 backdrop-blur-sm top-0 left-0">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-md mx-auto bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-t-2xl sm:rounded-2xl shadow-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">Connect streaming platforms</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-sm px-2 py-1">✕</button>
            </div>

            <div className="space-y-2">
              {platforms.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-[var(--app-card-border)] p-3 bg-white/50">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 grid place-items-center text-base rounded-full bg-[var(--app-gray)]">{p.icon}</span>
                    <div className="text-sm">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-[10px] text-[var(--app-foreground-muted)]">{p.live ? "live now" : p.connected ? "connected" : "not connected"}</div>
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
                    className={`text-xs px-3 py-1.5 rounded-full border ${p.connected ? "bg-black text-white" : "bg-transparent"}`}
                  >
                    {p.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-[11px] text-[var(--app-foreground-muted)]">Toggle a platform to connect; going live will reflect here.</div>
              <button type="button" className="text-sm px-3 py-1.5 rounded-lg border" onClick={() => setShowModal(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


