import { useCopyToClipboard, shortenAddress } from "@/util/util";
import { CopyIcon } from "@chakra-ui/icons";

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

export default function LoginPopover({
  userInfo,
  onClickTrigger,
  onClickLogout,
}: {
  userInfo: { address: string;  balance: string };
  onClickTrigger: () => void;
  onClickLogout: () => void;
}) {
  const copyTextToClipboard = useCopyToClipboard();

  return (
    <Popover placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <Button onClick={onClickTrigger}>{shortenAddress(userInfo.address)}</Button>
      </PopoverTrigger>

      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          <div>USERNAME</div>
        </PopoverHeader>

        <PopoverArrow bg="blue.800" />

        <PopoverBody>
          <div className="flex gap-2 items-center">
            <div>{shortenAddress(userInfo.address)}</div>{" "}
            <CopyIcon onClick={() => copyTextToClipboard(userInfo.address)}>
              복사
            </CopyIcon>
          </div>

          <div>{userInfo.balance} ETH</div>
        </PopoverBody>

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
