import { Box, Flex } from "@chakra-ui/react";

export interface InfoColOptions {
  left: string;
  right: string;
}

interface InfoColProps {
  optionsArr: InfoColOptions[];
  isMint?: boolean;
  isBig?: boolean;
}

function InfoCol({ optionsArr, isMint, isBig }: InfoColProps) {
  return (
    <Flex
      direction="column"
      w="full"
      border="1px solid F7F7F7"
      borderRadius="8px"
      px={3}
      py={2}
      bg="rgba(97,106,97,0.04)"
    >
      {optionsArr.map(({ left, right }, idx) => (
        <Flex
          key={idx}
          justify="space-between"
          fontSize="11px"
          py={isBig ? 2 : 1}
          borderBottom={isBig && idx !== optionsArr.length - 1 ? "var(--border-main)" : null}
        >
          <Box color="gray.600">{left}</Box>
          <Box color={isMint ? "mint" : "gray.800"} fontWeight="medium">
            {right}
          </Box>
        </Flex>
      ))}
    </Flex>
  );
}

export default InfoCol;
