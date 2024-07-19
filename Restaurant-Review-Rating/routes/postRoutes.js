import express from "express";
const router = express.Router();
import {createPost, getAllPosts, getPost} from "../controllers/postControllers.js";
import { authGuard ,adminGuard} from "../middleware/authMiddleware.js";

router.route("/").post(authGuard,adminGuard,createPost).get(getAllPosts);

router.route("/:slug").get(getPost);
export default router;