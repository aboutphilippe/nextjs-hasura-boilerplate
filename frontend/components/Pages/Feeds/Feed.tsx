import { Avatar, Box, Flex, Stack, Link, Image, useColorModeValue, Badge } from "@chakra-ui/react";
import timeFromNow from "lib/timeFromNow";
import React, { FC } from "react";
import IFeed from "types/feed";
import { StarIcon } from "@chakra-ui/icons";

interface IProps {
  feed: IFeed;
}

const Feed: FC<IProps> = ({ feed }) => {
  const cardNode = () => {
    return (
      <Flex
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Link href={feed.url} isExternal sx={{ '&:hover': { textDecoration: "none" }, '&:focus': { outline: "none" }}}>
          <Box
              bg={useColorModeValue("white", "gray.800")}
              maxW="lg"
              borderWidth="1px"
              rounded="lg"
            >
              
            <Image
              src={feed.image}
              alt={feed.title}
              roundedTop="lg"
              />

            <Box p="6">
              <Box d="flex" alignItems="baseline">
                {feed.owned &&
                  <Badge rounded="full" px="2" mr="2" colorScheme="teal">
                    Owned
                  </Badge>
                }
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                >
                  {feed.author.name}
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {feed.title}
              </Box>

              <Box>
                <Box as="span" color="gray.600" fontSize="sm">
                  {feed.body}
                </Box>
              </Box>
            </Box>
          </Box>
        </Link>
      </Flex>
    );
  }

  return (
    <Box rounded="lg">
      <Stack spacing={0}>
        {cardNode()}
      </Stack>
    </Box>
  );
};

export default Feed;
