// import React from 'react';
// import {
//   Box,
//   VStack,
//   Radio,
//   RadioGroup,
//   Stack,
//   Select,
//   Input,
//   Drawer,
//   DrawerOverlay,
//   DrawerCloseButton,
//   DrawerHeader,
//   DrawerBody,
//   DrawerContent
// } from '@chakra-ui/react';

// const SidebarContent = ({ onFilterChange, onSortChange, onCategorySearch }) => (
//   <VStack spacing={4}>
//     <Box>
//       <Box fontWeight="bold" mb={2}>Filter by Type</Box>
//       <RadioGroup onChange={(value) => onFilterChange(value)}>
//         <Stack direction="column">
//           <Radio value="drama">Drama</Radio>
//           <Radio value="romantic">Romantic</Radio>
//           <Radio value="comics">Comics</Radio>
//           <Radio value="fantasy">Fantasy</Radio>
//           <Radio value="adventure">Adventure</Radio>
//         </Stack>
//       </RadioGroup>
//     </Box>

//     <Box>
//       <Box fontWeight="bold" mb={2}>Sort By</Box>
//       <Select onChange={(e) => onSortChange(e.target.value)}>
//         <option value="year_latest_oldest">Year: Latest to Oldest</option>
//         <option value="year_oldest_latest">Year: Oldest to Latest</option>
//         <option value="imdb_rank_high_low">IMDb Rank: High to Low</option>
//         <option value="imdb_rank_low_high">IMDb Rank: Low to High</option>
//         <option value="imdb_votes_high_low">IMDb Votes: High to Low</option>
//         <option value="imdb_votes_low_high">IMDb Votes: Low to High</option>
//         <option value="rating_high_low">Rating: High to Low</option>
//         <option value="rating_low_high">Rating: Low to High</option>
//       </Select>
//     </Box>

//     <Box>
//       <Box fontWeight="bold" mb={2}>Search by Category</Box>
//       <Input
//         placeholder="Enter category"
//         onChange={(e) => onCategorySearch(e.target.value)}
//       />
//     </Box>
//   </VStack>
// );

// const SideBar = ({ isOpen, variant, onClose, onFilterChange, onSortChange, onCategorySearch }) => {
//   return variant === 'sidebar' ? (
//     <Box
//       position="fixed"
//       left={0}
//       p={5}
//       w="250px"
//       top={0}
//       h="100%"
//       bg="#dfdfdf"
//       zIndex="999"
//     >
//       <SidebarContent onFilterChange={onFilterChange} onSortChange={onSortChange} onCategorySearch={onCategorySearch} />
//     </Box>
//   ) : (
//     <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//       <DrawerOverlay>
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Filters and Sort</DrawerHeader>
//           <DrawerBody>
//             <SidebarContent onFilterChange={onFilterChange} onSortChange={onSortChange} onCategorySearch={onCategorySearch} />
//           </DrawerBody>
//         </DrawerContent>
//       </DrawerOverlay>
//     </Drawer>
//   );
// };

// export default SideBar;
