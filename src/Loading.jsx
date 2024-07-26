import React from "react";
import { Box, Heading, keyframes } from "@chakra-ui/react";

const animationKeyframes = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  50% { opacity: 0.5; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
`;


const animation = `${animationKeyframes} 1.5s ease-in-out`;

const Loading = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor="black"
      color="white"
    >
      <Heading
        as="h1"
        size="4xl"
        textAlign="center"
        animation={animation}
      >
        AmZoFix
      </Heading>
    </Box>
  );
};

export default Loading;
