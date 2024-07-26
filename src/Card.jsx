import React, { useState, useEffect } from "react";
import { Box, Image, Text, Badge, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { px } from "framer-motion";

const API_URL = "http://www.omdbapi.com/?apikey=6d468d2c";

const Card = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await response.json();
      setDetails(data);
      setLoading(false);
    };

    fetchDetails();
  }, [imdbID]);

  return (
    <Link to={`/movie/${imdbID}`}>
      <Box
        height="600px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        position="relative"
        className="movie"
        _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s' }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" height="60%">
          <Image
            src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
            alt={Title}
            borderRadius="md"
            height="100%"
            width="80%"
            marginTop="20px"
          />
        </Box>
        <Box p="4">
        <Badge borderRadius="full" px="2" colorScheme="teal" mt="0" pr={2}>
                IMDb: {details.imdbRating}
              </Badge>
          <Badge borderRadius="full" px="2" colorScheme="purple"pr={2}>
            {Type}
          </Badge>
          <Text mt="2" fontWeight="bold" fontSize="md">
            {Title}
          </Text>
          <Text mt="2" fontSize="sm" color="gray.500">
            {Year}
          </Text>
          {loading ? (
            <Spinner size="md" mt={2} />
          ) : (
            <>
              <Text mt="2" fontSize="sm">
                <strong>Director:</strong> {details.Director}
              </Text>
              <Text mt="2" fontSize="sm">
                <strong>Cast:</strong> {details.Actors}
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
