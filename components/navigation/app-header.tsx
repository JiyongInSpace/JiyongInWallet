"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import LoginPopover from "./login-popover";

import { supabase } from "@/lib/supabaseClient";

export default function AppHeader() {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const connectedAddress = localStorage.getItem("connectedAddress");
    if (connectedAddress) {
      setUserAddress(connectedAddress);
    }
  }, []);

  const onClickConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = ethers.getAddress(accounts[0]);
        setUserAddress(account);
        localStorage.setItem("connectedAddress", account); // 상태 저장

        const { data, error } = await supabase.from("users").upsert(
          {
            id: account, // 고유한 지갑 주소를 사용자 ID로 사용
            updated_at: new Date(),
          },
          {
            onConflict: "id", // 'id' 필드에서 충돌이 발생하는 경우 기존 데이터를 업데이트
          }
        );

        if (error) throw error;
        console.log("Logged in with Supabase using wallet!");

      } catch (error) {
        console.error(error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  const disconnectWalletHandler = () => {
    setUserAddress("");
    localStorage.removeItem("connectedAddress"); // 상태 업데이트
  };

  return (
    <header className="px-4 py-3 shadow-md flex justify-between items-center">
      <Image src="/favicon.png" alt="logo" width="8" height="8" />

      {userAddress ? (
        <LoginPopover
          userAddress={userAddress}
          onClickLogout={disconnectWalletHandler}
        />
      ) : (
        <Button colorScheme="blue" onClick={onClickConnectWallet}>
          지갑 연결
        </Button>
      )}
    </header>
  );
}
