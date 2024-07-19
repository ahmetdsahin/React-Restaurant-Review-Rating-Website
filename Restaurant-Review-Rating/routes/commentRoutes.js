import express from "express";
const router = express.Router();
import { createComment, updateComment } from "../controllers/commentControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

// Yeni bir yorum oluşturmak için POST isteği tanımlıyorum, önce kullanıcı doğrulaması yapıyorum
router.post("/", authGuard, createComment);

// Var olan bir yorumu güncellemek için PUT isteği tanımlıyorum, önce kullanıcı doğrulaması yapıyorum
router.put("/:commentId", authGuard, updateComment); // "/:commentId" yolunu düzeltiyorum, ":" işaretinden sonra "/" ekliyorum

// Router'ı dışa aktarıyorum
export default router;
