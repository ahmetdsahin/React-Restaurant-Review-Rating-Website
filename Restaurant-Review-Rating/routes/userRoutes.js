import express from "express";
import { registerUser, loginUser, userProfile } from "../controllers/userControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

// Kullanıcı kaydı için POST isteği tanımlıyorum
router.post('/register', registerUser);

// Kullanıcı girişi için POST isteği tanımlıyorum
router.post('/login', loginUser);

// Kullanıcı profilini almak için GET isteği tanımlıyorum, önce kullanıcı doğrulaması yapıyorum
router.get('/profile', authGuard, userProfile); // "/profile" yolunu düzeltiyorum, başında eksik olan "/" işaretini ekliyorum

// Router'ı dışa aktarıyorum
export default router;
