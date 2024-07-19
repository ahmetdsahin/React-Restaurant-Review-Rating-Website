import React from "react";
import { images } from "../assets/apposition/images.js";

// Comment bileşenini tanımlıyor
const Comment = ({
  comment, // Yorum objesi
  logginedUserId, // Giriş yapmış kullanıcının ID'si
  affectedComment, // Etkilenen yorum
  setAffectedComment, // Etkilenen yorumu ayarlamak için fonksiyon
  addComment, // Yorum eklemek için fonksiyon
  parentId = null, // Üst yorumun ID'si, varsayılan olarak null
  replies = [], // Yanıtlar, varsayılan olarak boş dizi
}) => {
  return (
    <div className="flex flex-nowrap items-start gap-x-3 rounded-lg bg-[#F2F4F5] p-3">
      <div className="flex-1 flex flex-col">
        {/* Kullanıcı profil resmi */}
        <img
          src={images.PostProfileImage}
          alt="kullanıcı profil"
          className="w-9 h-9 object-cover rounded-full"
        />

        {/* Kullanıcı adı */}
        <h5 className="font-bold text-xs">{comment.user.name}</h5>

        {/* Yorumun oluşturulma tarihi */}
        <span className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>

        {/* Yorum açıklaması */}
        <p className="font-roboto mt-[10px]">{comment.desc}</p>

        {/* Yanıtlar varsa alt yorumları göster */}
        {replies.length > 0 && (
          <div>
            <Comment
              key={comment._id}
              addComment={addComment}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              logginedUserId={logginedUserId}
              parentId={comment._id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Comment bileşenini dışa aktarır
export default Comment;
