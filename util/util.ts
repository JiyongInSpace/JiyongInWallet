import { useToast } from "@chakra-ui/react";

export function useCopyToClipboard() {
  const toast = useToast();

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        toast({
          title: "클립보드에 복사 성공",
          description: "클립보드에 복사되었습니다: " + text,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      function (err) {
        toast({
          title: "클립보드에 복사 실패",
          description: String(err),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
  };

  return copyTextToClipboard;
}

// 긴 텍스트의 첫 다섯글자와, 마지막 다섯글자만 보이는 함수
export const shortenAddress = (address: string) => {
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 5
  )}`;
};
