import express from "express";
import {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBlogPost).get(getBlogPosts);

router
  .route("/:id")
  .delete(protect, admin, deleteBlogPost)
  .get(getBlogPostById)
  .put(protect, admin, updateBlogPost);

export default router;
