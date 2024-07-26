import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Heading, Text, Badge, Spinner, Flex, Button } from "@chakra-ui/react";

const API_URL = "http://www.omdbapi.com/?apikey=6d468d2c";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerLoading, setTrailerLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}&i=${id}`);
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  const handleTrailerLoad = () => {
    setTrailerLoading(false);
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={5}>
      <Flex>
        <Image src={movie.Poster} alt={movie.Title} borderRadius="lg" boxSize="300px" objectFit="cover" />
        <Box ml={5}>
          <Heading>{movie.Title}</Heading>
          <Text mt={2}>
            <Badge colorScheme="yellow" mr={2}>
              {movie.imdbRating}
            </Badge>
            <Badge colorScheme="green" mr={2}>
              {movie.Year}
            </Badge>
            <Badge colorScheme="blue" mr={2}>
              {movie.Genre}
            </Badge>
            <Badge colorScheme="red" mr={2}>
              {movie.imdbVotes} Votes
            </Badge>
          </Text>
          <Text mt={2}>{movie.Plot}</Text>
          <Text mt={2}>Director: {movie.Director}</Text>
          <Text mt={2}>Writer: {movie.Writer}</Text>
          <Text mt={2}>Actors: {movie.Actors}</Text>
          <Text mt={2}>Awards: {movie.Awards}</Text>
          <Text mt={2}>Box Office: {movie.BoxOffice}</Text>
          <Button mt={4} colorScheme="teal">
            Watch Now
          </Button>
          <Button mt={4} ml={2} colorScheme="gray">
            My Wishlist
          </Button>
        </Box>
      </Flex>
      <Box mt={10}>
        <Heading size="lg">Trailer</Heading>
        {trailerLoading && (
          <Flex justifyContent="center" alignItems="center" height="500px">
            <Spinner size="xl" />
          </Flex>
        )}
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${movie.imdbID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleTrailerLoad}
          style={{ display: trailerLoading ? 'none' : 'block' }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default MovieDetails;
