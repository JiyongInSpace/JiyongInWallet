"use client";
import { useSession } from "next-auth/react";
import { useAccount, useConnect } from "wagmi";

function ConnectWallet() {
  const { data: session } = useSession();
  const { connect, connectors, connectAsync  } = useConnect();
  const { isConnected, status  } = useAccount();

  const onClickConnectWepin = async () => {
    connect({ connector: connectors[0] });
    // console.log(connectors);
  };

  // const onClickConnectWeb3auth = async () => {
  //   const result = await connectAsync({ connector: connectors[1] });
  //   console.log(result);
  // };

  const onClickConnectMetamask = async () => {
    console.log(connectors);
    connect({ connector: connectors[2] });
    // console.log(result);
  };

  if(!session){
    return <div>로그인이 필요합니다</div>
  }

  if (isConnected) {
    return (
      <div>
        {JSON.stringify(status)}
        {/* <button>지갑연결</button> */}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-5">
      {JSON.stringify(status)}

      <button onClick={onClickConnectWepin}>wepin 연결</button>


      <button onClick={onClickConnectMetamask}>metamask 연결</button>
      </div>
    </>
  );
}

export default ConnectWallet;
