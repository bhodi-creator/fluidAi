import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import {
  Box, Input, IconButton, SimpleGrid, Heading, Center, VStack, Spinner, useToast, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Button, Flex
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";
import Loading from "./Loading";
import MovieDetails from "./MovieDetails";
// import SideBar from "./SideBar";

const API_URL = "http://www.omdbapi.com/?apikey=6d468d2c";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState('sidebar');
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);
    searchMovies("batman");
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const searchMovies = async (title) => {
    setLoading(true);
    setButtonLoading(true);
    try {
      let url = `${API_URL}&s=${title}`;
      if (filter) {
        url += `&type=${filter}`;
      }
      if (category) {
        url += `&genre=${category}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); 
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      let sortedMovies = data.Search;
      if (sort) {
        sortedMovies = sortedMovies.sort((a, b) => {
          if (sort === "rating_high_low") {
            return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
          } else if (sort === "rating_low_high") {
            return parseFloat(a.imdbRating) - parseFloat(b.imdbRating);
          } else if (sort === "year_latest_oldest") {
            return parseInt(b.Year) - parseInt(a.Year);
          } else if (sort === "year_oldest_latest") {
            return parseInt(a.Year) - parseInt(b.Year);
          } else if (sort === "imdb_rank_high_low") {
            return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
          } else if (sort === "imdb_rank_low_high") {
            return parseFloat(a.imdbRating) - parseFloat(b.imdbRating);
          } else if (sort === "imdb_votes_high_low") {
            return parseInt(b.imdbVotes.replace(/,/g, '')) - parseInt(a.imdbVotes.replace(/,/g, ''));
          } else if (sort === "imdb_votes_low_high") {
            return parseInt(a.imdbVotes.replace(/,/g, '')) - parseInt(b.imdbVotes.replace(/,/g, ''));
          }
          return 0;
        });
      }
      setMovies(sortedMovies);
    } catch (error) {
      toast({
        position: "top-right",
        duration: 5000,
        render: () => (
          <Alert status="error" variant="solid" borderRadius="md" boxShadow="lg">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>An error occurred.</AlertTitle>
              <AlertDescription display="block">{error.message}</AlertDescription>
            </Box>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        ),
      });
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    searchMovies(searchTerm);
  };

  const handleSortChange = (value) => {
    setSort(value);
    searchMovies(searchTerm);
  };

  const handleCategorySearch = (value) => {
    setCategory(value);
    searchMovies(searchTerm);
  };

  if (isAppLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <MainContent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        movies={movies}
        loading={loading}
        buttonLoading={buttonLoading}
        searchMovies={searchMovies}
        toggleSidebar={toggleSidebar}
        isOpen={isOpen}
        variant={variant}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        handleCategorySearch={handleCategorySearch}
      />
    </Router>
  );
};

const MainContent = ({
  searchTerm,
  setSearchTerm,
  movies,
  loading,
  buttonLoading,
  searchMovies,
  toggleSidebar,
  isOpen,
  variant,
  handleFilterChange,
  handleSortChange,
  handleCategorySearch,
}) => {
  const location = useLocation();

  return (
    <Flex bg="beige">
      {/* {location.pathname === '/' && (
        // <Box position="fixed" left="0" top="0" zIndex="1000" p="4" >
        //   <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
        //   <SideBar 
        //     isOpen={isOpen}
        //     variant={variant}
        //     onClose={toggleSidebar}
        //     onFilterChange={handleFilterChange}
        //     onSortChange={handleSortChange}
        //     onCategorySearch={handleCategorySearch}
        //   />
        // </Box>
      )} */}
      <Box className="app" p={4} ml={location.pathname === '/' ? '250px' : '0'} mt="20px">
        <Heading as="h1" mb={4} textAlign="center">
          AmZoFix
        </Heading>

        {location.pathname === '/' && (
          <Box display="flex" mb={4} justifyContent="center">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies"
              size="md"
              width="300px"
            />
            <IconButton
              icon={buttonLoading ? <Spinner /> : <SearchIcon />}
              onClick={() => searchMovies(searchTerm)}
              ml={2}
            />
          </Box>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                {loading ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </SimpleGrid>
                ) : movies?.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {movies.map((movie) => (
                      <Card key={movie.imdbID} movie={movie} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Center mt={6}>
                    <VStack>
                      <Heading as="h2" size="lg">
                        No movies found
                      </Heading>
                    </VStack>
                  </Center>
                )}
              </>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default App;
