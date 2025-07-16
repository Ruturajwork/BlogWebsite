import { Box, Link, Image, Flex, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Product = ({ Oproduct }) => {
  const contentLength = Oproduct.content.length;
  let readingTime;

  if (contentLength <= 3) {
    readingTime = "10 min Read";
  } else if (contentLength >= 4 && contentLength <= 5) {
    readingTime = "15 min Read";
  } else if (contentLength > 5) {
    readingTime = "20 min Read";
  } else {
    readingTime = "5 min Read"; // default value or any other logic you want to implement
  }
  return (
    <Link
      as={RouterLink}
      to={`/blog/${Oproduct._id}`}
      _hover={{ textDecor: "none" }}
    >
      <Box
        maxW="sm"
        borderRadius="lg"
        overFlow="hiddden"
        bgColor="white"
        bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
        transition="all"
        _hover={{ shadow: "md" }}
      >
        <Image
          src={Oproduct.content[0].image}
          alt={Oproduct.content[0].image}
          minH="300px"
          objectFit="cover"
        />
        <Flex py="5" px="4" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="3">
            {Oproduct.title}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="1xl" fontWeight="bold" color="blue.600">
              {readingTime}
            </Text>
            <Text
              fontSize="1xl"
              fontWeight="bold"
              fontStyle="italic"
              color="blue.600"
            >
              -{Oproduct.author.name}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};
export default Product;
