import {
  Box,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function LoginPopover({
  userAddress,
  onClickLogout,
}: {
  userAddress: string;
  onClickLogout: () => void;
}) {
  const initialFocusRef = useRef();

  // 긴 텍스트의 첫 다섯글자와, 마지막 다섯글자만 보이는 함수
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 5)}...${address.substring(
      address.length - 5
    )}`;
  };

  return (
    <Popover
      //   initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button>{shortenAddress(userAddress)}</Button>
      </PopoverTrigger>

      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
            <div>
                Hi!
            </div>
          {userAddress}
        </PopoverHeader>

        <PopoverArrow bg="blue.800" />

        <PopoverCloseButton />

        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="end"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button colorScheme="blue" onClick={onClickLogout}>
              지갑 연결 해제
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
