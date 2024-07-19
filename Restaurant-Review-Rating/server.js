import express from "express"; // Express modülünü içe aktarıyorum
import dotenv from "dotenv"; // Dotenv modülünü içe aktarıyorum
import connectDB from "./config/db.js"; // Veritabanı bağlantısını içe aktarıyorum
import { errorResponserHandler } from "./middleware/errorHandler.js"; // Hata yönetimi için middleware'i içe aktarıyorum
import { invalidPathHandler } from "./middleware/errorHandler.js"; // Geçersiz yol hatası için middleware'i içe aktarıyorum
import cors from "cors"; // CORS desteği eklemek için CORS modülünü içe aktarıyorum

// Rota dosyalarını içe aktarıyorum
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Dotenv'i yapılandırıyorum
dotenv.config();
// Veritabanına bağlanıyorum
connectDB();

const app = express(); // Express uygulamasını oluşturuyorum

app.use(express.json()); // JSON veri tipini işlemek için middleware ekliyorum
app.use(express.json({ limit: '50mb' })); // JSON veri boyutu limitini 50 MB olarak belirliyorum
app.use(express.urlencoded({ limit: '50mb', extended: true })); // URL kodlamalı veri limitini 50 MB olarak belirliyorum
app.use(cors()); // CORS desteği ekliyorum

// Ana rota tanımlıyorum ve çalıştığını kontrol ediyorum
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Rota gruplarını uygulamaya ekliyorum
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Geçersiz yol hatasını yakalıyorum
app.use(invalidPathHandler);
// Genel hata yönetimi
app.use(errorResponserHandler);

const PORT = process.env.PORT || 8000; // Port numarasını alıyorum, yoksa varsayılan olarak 8000 kullanıyorum

// Sunucuyu başlatıyorum ve çalıştığını konsola yazdırıyorum
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
