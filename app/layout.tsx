"use client";
import { SessionProvider } from "next-auth/react";

import { polygonMumbai } from "@/helpers/mumbai";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { WepinConnector, WepinConnectorOptions } from "@wepin/wagmi-connector";

import { InjectedConnector } from "wagmi/connectors/injected"; 
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";


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

export const web3AuthInstance =
  typeof window !== "undefined"
    ? new Web3Auth({
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "",
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: `0x${polygonMumbai.id.toString(16)}`,
          rpcTarget: polygonMumbai.rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
          displayName: polygonMumbai.name,
          blockExplorer: polygonMumbai.blockExplorers?.default.url[0] as string,
          ticker: polygonMumbai.nativeCurrency?.symbol,
          tickerName: polygonMumbai.nativeCurrency?.name,
        },
      })
    : null;

const config = createConfig({
  autoConnect: true,
  connectors: [
    new WepinConnector({
      chains,
      options: wepinConnectorOptions,
    }),
    // new Web3AuthConnector({
    //   chains: chains as any,
    //   // @ts-ignore
    //   options: { web3AuthInstance, name: "Social Login" },
    //   name: "Social Login",
    // }),
    new InjectedConnector({
      chains,
      options: {
        name: "Browser",
        shimDisconnect: true,
      },
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
        {/* Hi! */}
        <WagmiConfig config={config}>
          <SessionProvider>{children}</SessionProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
