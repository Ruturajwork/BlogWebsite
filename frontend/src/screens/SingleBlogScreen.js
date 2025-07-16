import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Image, Flex, Heading, Text, Spacer } from "@chakra-ui/react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getBlogDetails } from "../actions/blogActions";

const SingleBlogScreen = () => {
  const [zoomed, setZoomed] = useState(false); // State to track zooming

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };
  const { id } = useParams();
  //   console.log(id);
  const dispatch = useDispatch();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const contentLength = blog?.content?.length;
  //   console.log(contentLength);
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

  useEffect(() => {
    dispatch(getBlogDetails(id));
  }, [dispatch, id]);

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="1">
      <Box
        w="full"
        maxW="7xl" // Increase the max width to make the box larger
        p="8" // Increase padding for more space inside the box
        bgColor="white"
        borderRadius="md"
        boxShadow="lg" // Use larger shadow for better visual effect
        m="5" // Add margin to create some space around the box
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <>
            <Heading as="h1" size="2xl" mb="4">
              {blog.title}
            </Heading>
            <Flex justifyContent="space-between" mb="6">
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                Author: {blog?.author?.name}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                {readingTime}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                {new Date(blog.createdAt).toLocaleDateString()}
              </Text>
            </Flex>

            {blog.content?.map((item, index) => (
              <Box key={index} mb="8">
                {item.heading && (
                  <Heading as="h3" size="lg" mb="4">
                    {item.heading}
                  </Heading>
                )}
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.heading}
                    mb="4"
                    maxH={zoomed ? "auto" : "200px"} // Toggle max height for zoom effect
                    cursor="pointer"
                    onClick={toggleZoom} // Toggle zoom state on click
                    transition="transform 0.3s ease-in-out" // Smooth zoom transition
                    _hover={{ transform: "scale(1.1)" }} // Optional hover effect
                  />
                )}
                {item.paragraph && (
                  <Text
                    fontSize="md"
                    color="gray.700"
                    dangerouslySetInnerHTML={{ __html: item.paragraph }}
                  />
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Flex>
  );
};

export default SingleBlogScreen;
