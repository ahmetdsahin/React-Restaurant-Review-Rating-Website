import User from "../models/User.js";

// Kullanıcı kaydetmek için bu fonksiyonu kullanıyorum
export const registerUser = async (req, res, next) => {
  try {
    // İstekten gelen bilgileri alıyorum
    const { name, email, password } = req.body;

    // E-posta ile zaten kayıtlı bir kullanıcı var mı diye kontrol ediyorum
    let user = await User.findOne({ email });

    // Eğer kullanıcı zaten kayıtlıysa hata fırlatıyorum
    if (user) {
      throw new Error("Kullanıcı zaten kayıtlı");
    }

    // Yeni kullanıcı oluşturuyorum ve veritabanına kaydediyorum
    user = await User.create({
      name,
      email,
      password,
    });

    // Oluşturulan kullanıcı bilgilerini JSON olarak döndürüyorum
    return res.status(201).json({
      _id: user.id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(), // JWT token oluşturuyorum
    });
  } catch (error) {
    next(error); // Hata durumunda hatayı bir sonraki middleware'e iletiyorum
  }
};

// Kullanıcı giriş yapmak için bu fonksiyonu kullanıyorum
export const loginUser = async (req, res, next) => {
  try {
    // İstekten gelen e-posta ve şifreyi alıyorum
    const { email, password } = req.body;

    // E-posta ile kullanıcıyı buluyorum
    let user = await User.findOne({ email });

    // Eğer kullanıcı bulunamazsa hata fırlatıyorum
    if (!user) {
      throw new Error("Email bulunmadı");
    }

    // Kullanıcının şifresini kontrol ediyorum
    if (await user.comparePassword(password)) {
      // Şifre doğruysa kullanıcı bilgilerini JSON olarak döndürüyorum
      return res.status(201).json({
        _id: user.id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(), // JWT token oluşturuyorum
      });
    } else {
      // Şifre yanlışsa hata fırlatıyorum
      throw new Error("Geçersiz email ya da şifre");
    }
  } catch (error) {
    next(error); // Hata durumunda hatayı bir sonraki middleware'e iletiyorum
  }
};

// Kullanıcı profilini görüntülemek için bu fonksiyonu kullanıyorum
export const userProfile = async (req, res, next) => {
  try {
    // Kullanıcıyı ID ile buluyorum
    let user = await User.findById(req.user._id);
    if (user) {
      // Kullanıcı bulunursa bilgilerini JSON olarak döndürüyorum
      return res.status(201).json({
        _id: user.id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      // Kullanıcı bulunamazsa hata fırlatıyorum
      let error = new Error("Kullanıcı Bulunmadı");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error); // Hata durumunda hatayı bir sonraki middleware'e iletiyorum
  }
};
