import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listBlogs, deleteBlog } from "../actions/blogActions";

const BlogListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogDelete = useSelector((state) => state.blogDelete);
  const { success: successDelete } = blogDelete;

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listBlogs());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <>
      <Heading as="h1" fontSize="3xl" mb="5">
        Blogs
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box
          bgGradient="linear(red.100 20%, orange.100 25%, yellow.100 50%)"
          rounded="lg"
          shadow="lg"
          px="5"
          py="5"
          borderWidth="1px"
          borderColor="blackAlpha.400"
        >
          <Table variant="striped" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>TITLE</Th>
                <Th>AUTHOR</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogs?.map((blog) => (
                <Tr key={blog._id}>
                  <Td>{blog._id}</Td>
                  <Td>{blog.title}</Td>
                  <Td>{blog.author.name}</Td>{" "}
                  {/* Assuming 'author' has a 'name' property */}
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/blog/${blog._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(blog._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="sm" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default BlogListScreen;
