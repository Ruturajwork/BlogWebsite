import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import CreateBlogScreen from "./screens/CreateBlogScreen";
import BlogListScreen from "./screens/BlogListScreen";
import EditBlogScreen from "./screens/BlogEditScreen";
import SingleBlogScreen from "./screens/SingleBlogScreen";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Flex
        as="main"
        mt="72px"
        direction="column"
        py="6"
        px="6"
        bgColor="gray.200"
      >
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="createblog" element={<CreateBlogScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/bloglist" element={<BlogListScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="/blog/:id" element={<SingleBlogScreen />} />
          <Route path="/admin/blog/:id/edit" element={<EditBlogScreen />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
