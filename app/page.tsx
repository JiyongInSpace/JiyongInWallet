"use client";

import SocialLogin from "@/components/onboard/login/social-login";
import ConnectWallet from "@/components/onboard/login/connect-wallet";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-10 flex-col flex gap-5 ">
      <div>
        <h2>1. 소셜로그인</h2>

        <SocialLogin />
      </div>

      <div>
        <h2>2. 지갑연결</h2>

        <ConnectWallet />
      </div>
    </main>
  );
}
