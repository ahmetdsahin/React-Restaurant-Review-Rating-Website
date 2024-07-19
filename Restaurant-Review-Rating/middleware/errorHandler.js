// Hata durumunda yanıt vermek için bu middleware'i kullanıyorum
export const errorResponserHandler = (err, req, res, next) => {
    // Hata durumunda yanıtın durum kodunu belirliyorum, eğer belirlenmemişse 400 olarak ayarlıyorum
    const statusCode = err.statusCode || 400;
    // Hata mesajını ve stack bilgisini JSON formatında yanıt olarak gönderiyorum
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Stack bilgisini sadece production değilse gönderiyorum
    });
}

// Geçersiz yollar için bu middleware'i kullanıyorum
export const invalidPathHandler = (req, res, next) => {
    // Yeni bir hata oluşturuyorum ve mesajını belirliyorum
    let error = new Error("Geçersiz Yol");
    error.statusCode = 404; // Durum kodunu 404 olarak ayarlıyorum
    next(error); // Hatalı yolu bir sonraki middleware'e iletiyorum
}
