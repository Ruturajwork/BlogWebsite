import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import axios from "axios";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createBlog } from "../actions/blogActions"; // Ensure this action is defined
import { BLOG_CREATE_RESET } from "../constants/blogConstants";

const CreateBlogScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState([
    { heading: "", image: "", paragraph: "" },
  ]);
  const [message, setMessage] = useState(null);
  const [update, setUpdate] = useState(false);

  const blogCreate = useSelector((state) => state.blogCreate);
  const { loading, error, success } = blogCreate;

  useEffect(() => {
    if (success && update) {
      dispatch({ type: BLOG_CREATE_RESET });
      navigate(-1);
    }
  }, [navigate, success, update, dispatch]);

  const addContent = () => {
    setContent([...content, { heading: "", image: "", paragraph: "" }]);
  };

  const removeContent = (index) => {
    const newContent = content.filter((_, idx) => idx !== index);
    setContent(newContent);
  };

  const handleContentChange = (index, field, value) => {
    const newContent = content.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setContent(newContent);
  };

  const handleFileUpload = async (index, file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming backend returns a relative path like `/uploads\image-1718221873440..jpg`
      const imageUrl = data;
      console.log("Image URL:", imageUrl);

      // Update content state with the complete image URL
      const newContent = content.map((item, idx) =>
        idx === index ? { ...item, image: imageUrl } : item
      );
      setContent(newContent);
    } catch (error) {
      setMessage("Image upload failed");
      console.error("Image upload error:", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setMessage("Title cannot be empty");
      return;
    }

    dispatch(createBlog({ title, content }));
    setUpdate(true);
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Create New Blog Post
        </Heading>

        {error && <Message type="error">{error}</Message>}
        {message && <Message type="error">{message}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="title">
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
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(index, e.target.files[0])}
                />
                {item.image && (
                  <Box mt="2">
                    <img
                      src={item.image}
                      alt={`Uploaded image ${index + 1}`}
                      style={{ width: "100%", maxHeight: "200px" }}
                    />
                  </Box>
                )}
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

              <Button
                onClick={() => removeContent(index)}
                colorScheme="red"
                mt="4"
              >
                Remove
              </Button>
            </Box>
          ))}

          <Button onClick={addContent} mt="4" mr="7">
            Add More Content
          </Button>

          <Button type="submit" colorScheme="teal" mt="4" isLoading={loading}>
            Create Blog Post
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default CreateBlogScreen;
