"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import LoginPopover from "./login-popover";

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
