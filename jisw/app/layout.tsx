"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { WepinConnector, WepinConnectorOptions } from "@wepin/wagmi-connector";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "@/helpers/mumbai";
// import { polygonMumbai } from "viem/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const wepin_key = process.env.NEXT_PUBLIC_WEPIN_APP;
const wepin_app = process.env.NEXT_PUBLIC_WEPIN_APP_ID;

const connectorOptions: WepinConnectorOptions = {
  appId: wepin_app!,
  appKey: wepin_key!,
  defaultChainId: 80001,
  attributes: {
    type: "hide",
    defaultLanguage: 'ko',
  },
};

const config = createConfig({
  autoConnect: true,
  connectors: [
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: "Browser",
    //     shimDisconnect: true,
    //   },
    // }),
    // new Web3AuthConnector({
    //   chains: chains as any,
    //   // @ts-ignore
    //   options: { web3AuthInstance, name: "Social Login" },
    //   name: "Social Login",
    // }),
    new WepinConnector({
      chains,
      options: connectorOptions,
    }),
    //Web3AuthConnectorInstance(chains) as any,
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
        <WagmiConfig config={config}>
          <SessionProvider>{children}</SessionProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
