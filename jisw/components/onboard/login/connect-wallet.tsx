"use client";
import { signIn, useSession, signOut } from "next-auth/react";

function ConnectWallet() {
  const { data: session } = useSession();

  const onClickConnectWepin = async () => {};

  if (session) {
    return (
      <div>
        <button>지갑 연동 해제</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={onClickConnectWepin}>wepin 연결</button>
    </>
  );
}

export default ConnectWallet;
