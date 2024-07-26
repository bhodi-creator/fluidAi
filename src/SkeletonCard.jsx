import React from "react";
import { Box, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="lg"
      className="movie"
    >
      <Skeleton height="300px" borderRadius="md" />
      <Box mt="4" display="flex" alignItems="center">
        <SkeletonCircle size="10" />
        <Box ml="4">
          <Skeleton height="20px" width="150px" />
          <SkeletonText mt="2" noOfLines={1} width="100px" />
        </Box>
      </Box>
      <SkeletonText mt="4" noOfLines={3} spacing="4" />
    </Box>
  );
};

export default SkeletonCard;
