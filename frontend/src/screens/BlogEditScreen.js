import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Box,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import axios from "axios";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getBlogDetails, updateBlog } from "../actions/blogActions";
import {
  BLOG_DETAILS_RESET,
  BLOG_UPDATE_RESET,
} from "../constants/blogConstants";

const EditBlogScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([
    { heading: "", image: "", paragraph: "" },
  ]);
  const [message, setMessage] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [update, setUpdate] = useState(false);

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const { loading: updateLoading, error: errorUpdate, success } = blogUpdate;

  useEffect(() => {
    if (!blog || blog._id !== id) {
      dispatch(getBlogDetails(id));
    } else {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [dispatch, blog, id]);

  const handleContentChange = (index, field, value) => {
    const newContent = [...content];
    newContent[index][field] = value;
    setContent(newContent);
  };

  const handleFileUpload = async (index, file) => {
    const formData = new FormData();
    formData.append("image", file);
    setLoadingUpload(true);

    try {
      const { data } = await axios.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming backend returns a relative path like `/uploads/image-1718221873440..jpg`
      const imageUrl = data;
      console.log("Image URL:", imageUrl);

      // Update content state with the complete image URL
      const newContent = content.map((item, idx) =>
        idx === index ? { ...item, image: imageUrl } : item
      );
      setContent(newContent);
      setLoadingUpload(false);
    } catch (error) {
      setUploadError("Image upload failed");
      console.error("Image upload error:", error);
      setLoadingUpload(false);
    }
  };

  useEffect(() => {
    if (success && update) {
      dispatch({ type: BLOG_DETAILS_RESET });
      dispatch({ type: BLOG_UPDATE_RESET });
      navigate("/admin/bloglist");
    }
  }, [navigate, success, update, dispatch]);

  const addContentSection = () => {
    setContent([...content, { heading: "", image: "", paragraph: "" }]);
  };

  const removeContentSection = (index) => {
    const newContent = content.filter((_, idx) => idx !== index);
    setContent(newContent);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      title.trim() === ""
      // || content.some((item) => !item.heading || !item.paragraph)
    ) {
      setMessage("Title and content fields cannot be empty");
    } else {
      dispatch(updateBlog({ _id: id, title, content }));
      setUpdate(true);
    }
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Edit Blog Post
        </Heading>

        {error && <Message type="error">{error}</Message>}
        {message && <Message type="error">{message}</Message>}
        {uploadError && <Message type="error">{uploadError}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormControl>

          <Spacer h="3" />

          {content.map((item, index) => (
            <Box key={index} p="4" border="1px solid #ccc" mt="4">
              <FormControl id={`heading-${index}`}>
                <FormLabel>Heading</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter heading"
                  value={item.heading}
                  onChange={(e) =>
                    handleContentChange(index, "heading", e.target.value)
                  }
                />
              </FormControl>

              <Spacer h="3" />

              <FormControl id={`image-${index}`}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter image URL"
                  value={item.image}
                  onChange={(e) =>
                    handleContentChange(index, "image", e.target.value)
                  }
                />
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(index, e.target.files[0])}
                />
                {loadingUpload && <Message type="info">Uploading...</Message>}
              </FormControl>

              <Spacer h="3" />

              <FormControl id={`paragraph-${index}`}>
                <FormLabel>Paragraph</FormLabel>
                <Textarea
                  placeholder="Enter paragraph content"
                  value={item.paragraph}
                  onChange={(e) =>
                    handleContentChange(index, "paragraph", e.target.value)
                  }
                />
              </FormControl>

              <IconButton
                icon={<IoIosRemove />}
                colorScheme="red"
                mt="4"
                onClick={() => removeContentSection(index)}
                aria-label="Remove Section"
              />
            </Box>
          ))}

          <Button
            onClick={addContentSection}
            leftIcon={<IoIosAdd />}
            colorScheme="teal"
            mt="4"
            variant="outline"
          >
            Add Section
          </Button>

          <Button
            type="submit"
            colorScheme="teal"
            mt="4"
            isLoading={loading || updateLoading}
          >
            Update Blog Post
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default EditBlogScreen;
