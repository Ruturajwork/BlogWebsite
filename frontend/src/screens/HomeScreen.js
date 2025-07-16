import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Grid } from "@chakra-ui/react";
import { listBlogs } from "../actions/blogActions";

import Message from "../components/Message";
import Loader from "../components/Loader";
import Product from "../components/Product";

import fallbackBlogs from "../data.json";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [localBlogs, setLocalBlogs] = useState([]);

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setLocalBlogs(fallbackBlogs);
    }
  }, [error]);

  const blogData = error ? localBlogs : blogs;

  return (
    <>
      <Heading as="h2" mb="8" fontSize="3xl">
        New Blogs ..
      </Heading>

      {loading ? (
        <Loader />
      ) : (
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}
          gap="8"
        >
          {Array.isArray(blogData) &&
            blogData.map((Sproduct) => (
              <Product key={Sproduct._id} Oproduct={Sproduct} />
            ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
