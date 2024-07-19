import jwt from 'jsonwebtoken';
import User from "../models/User.js";
const { verify } = jwt;

// Kullanıcı kimliğini doğrulamak için bu middleware'i kullanıyorum
export const authGuard = async (req, res, next) => {
    // Authorization başlığı olup olmadığını ve Bearer ile başlayıp başlamadığını kontrol ediyorum
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Bearer'dan sonraki token kısmını alıyorum
            const token = req.headers.authorization.split(" ")[1];
            // Token'ı doğruluyorum ve içindeki kullanıcı ID'sini alıyorum
            const { id } = verify(token, process.env.JWT_SECRET);
            // Kullanıcıyı veritabanından ID ile buluyorum ve şifre bilgisini çıkartıyorum
            req.user = await User.findById(id).select("-password");
            next(); // İşleme devam ediyorum
        } catch (error) {
            // Token doğrulama başarısız olursa hata fırlatıyorum
            let err = new Error("Yetkisiz erişim, token hatası");
            err.statusCode = 401;
            next(err);
        }
    } else {
        // Authorization başlığı yoksa veya Bearer ile başlamıyorsa hata fırlatıyorum
        let error = new Error("Yetkisiz erişim, token yok");
        error.statusCode = 401;
        next(error);
    }
}

// Kullanıcının admin olup olmadığını kontrol etmek için bu middleware'i kullanıyorum
export const adminGuard = (req, res, next) => {
    // Kullanıcının admin olup olmadığını kontrol ediyorum
    if (req.user && req.user.admin) {
      next(); // Eğer kullanıcı admin ise işleme devam ediyorum
    } else {
      // Kullanıcı admin değilse hata fırlatıyorum
      let error = new Error("Yetkisiz erişim, admin değil");
      error.statusCode = 401;
      next(error);
    }
};
