import { Schema, model } from "mongoose";

// Yorum şemasını tanımlıyorum
const CommentSchema = new Schema(
  {
    // Yorum yapan kullanıcının referansı
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // Yorum açıklaması
    desc: { type: String, required: true },
    // Yorumun ait olduğu postun referansı
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    // Yorumun kontrol durumu, varsayılan olarak true
    check: { type: Boolean, default: true },
    // Parent yorumun referansı (varsa), varsayılan olarak null
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    // Yanıtlanan kullanıcının referansı (varsa), varsayılan olarak null
    replyOnUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  // Otomatik olarak createdAt ve updatedAt alanlarını ekliyorum, JSON çıktısında sanal alanları dahil ediyorum
  { timestamps: true, toJSON: { virtuals: true }}
);

// Yorumun alt yorumlarını (replies) sanal olarak tanımlıyorum
CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parent",
});

// Yorum modelini oluşturuyorum ve dışa aktarıyorum
const Comment = model("Comment", CommentSchema);
export default Comment;
