"use client";
import { signIn, useSession, signOut } from "next-auth/react";

function SocialLogin() {
  const { data: session } = useSession();

  const onClickGoogle = async () => {
    const result = await signIn("google", );

    if (result?.error) {
      // 로그인 실패 처리
      console.error("로그인 실패:", result.error);
    } else {
      console.log("성공!");
      // 로그인 성공 처리
      // 필요한 경우 추가적인 로직 수행
    }
  };

  return (
    <>
      <button onClick={onClickGoogle}>Google로 로그인</button>
    </>
  );
}

export default SocialLogin;
