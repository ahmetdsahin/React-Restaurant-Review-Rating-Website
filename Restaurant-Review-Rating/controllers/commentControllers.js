import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Yeni bir yorum oluşturmak için bu fonksiyonu kullanıyorum
const createComment = async (req, res, next) => {
  try {
    // İstekten gelen bilgileri alıyorum
    const { desc, slug, parent, replyOnUser } = req.body;

    // Yorum yapılacak olan postu slug ile buluyorum
    const post = await Post.findOne({ slug: slug });

    // Eğer post bulunamazsa hata fırlatıyorum
    if (!post) {
      const error = new Error("Restoran Bulunmadı");
      return next(error);
    }

    // Yeni yorum oluşturuyorum
    const newComment = new Comment({
      user: req.user._id, // Yorum yapan kullanıcının ID'si
      desc, // Yorumun açıklaması
      post: post._id, // Yorumun ait olduğu postun ID'si
      parent, // Yorumun parent ID'si (varsa)
      replyOnUser, // Yorumun cevaplandığı kullanıcı (varsa)
    });

    // Yorum veritabanına kaydediyorum
    const savedComment = await newComment.save();
    return res.json(savedComment); // Kaydedilen yorumu geri döndürüyorum
  } catch (error) {
    next(error); // Hata durumunda hatayı bir sonraki middleware'e iletiyorum
  }
};

// Var olan bir yorumu güncellemek için bu fonksiyonu kullanıyorum
const updateComment = async (req, res, next) => {
  try {
    // İstekten gelen açıklamayı alıyorum
    const { desc } = req.body;

    // Güncellenecek yorumu ID ile buluyorum
    const comment = await Comment.findById(req.params.commentId);

    // Eğer yorum bulunamazsa hata gönderiyorum
    if (!comment) {
      const error = new Error("Yorum Bulunmadı");
      return next(error);
    }

    // Yorumun açıklamasını güncelliyorum
    comment.desc = desc || comment.desc;
    const updatedComment = await comment.save(); // Güncellenmiş yorumu kaydediyorum
    return res.json(updatedComment); // Güncellenmiş yorumu geri döndürüyorum
  } catch (error) {
    next(error); // Hata durumunda hatayı bir sonraki middleware'e iletiyorum
  }
};

export { createComment, updateComment };
