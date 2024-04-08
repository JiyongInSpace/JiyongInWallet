"use client";
import { SessionProvider } from "next-auth/react";

import { polygonMumbai } from "@/helpers/mumbai";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { WepinConnector, WepinConnectorOptions } from "@wepin/wagmi-connector";

import { InjectedConnector } from "wagmi/connectors/injected"; 

import "./globals.css";
// import { polygonMumbai } from "viem/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const wepin_key = process.env.NEXT_PUBLIC_WEPIN_APP;
const wepin_app = process.env.NEXT_PUBLIC_WEPIN_APP_ID;

const wepinConnectorOptions: WepinConnectorOptions = {
  appId: wepin_app!,
  appKey: wepin_key!,
  defaultChainId: 80001,
  attributes: {
    type: "hide",
    defaultLanguage: "ko",
  },
};


const config = createConfig({
  autoConnect: true,
  connectors: [
    new WepinConnector({
      chains,
      options: wepinConnectorOptions,
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Browser",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Hi! */}
        <WagmiConfig config={config}>
          <SessionProvider>{children}</SessionProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
