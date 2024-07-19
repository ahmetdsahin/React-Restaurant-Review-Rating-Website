import React, { useState } from "react";
import CommentForm from "./CommentForm.jsx";
import Comment from "./Comment.jsx";
import { useMutation, useQueryClient } from "react-query";
import { createNewComment } from "../services/index/comment.js";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';

// CommentsContainer bileşenini tanımlıyor
const CommentsContainer = ({ className, logginedUserId, comments = [], postSlug }) => {
  const queryClient = useQueryClient(); // React Query'nin queryClient'ını kullanarak query'leri yönetiyor
  const userState = useSelector((state) => state.user); // Redux'tan kullanıcı durumunu alıyor
  const [affectedComment, setAffectedComment] = useState(null); // Etkilenen yorumu yönetmek için state

  // Yeni yorum oluşturma işlemi için useMutation hook'u kullanıyor
  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } = useMutation({
    // Yorum oluşturma fonksiyonunu tanımlıyor
    mutationFn: ({ token, desc, slug, parent }) => {
      return createNewComment({ token, desc, slug, parent });
    },
    // Başarılı olduğunda yapılacak işlemler
    onSuccess: () => {
      toast.success("Yorum başarıyla yapıldı"); // Başarılı mesajı göster
      queryClient.invalidateQueries([postSlug]); // İlgili query'yi yenile
    },
    // Hata durumunda yapılacak işlemler
    onError: (error) => {
      toast.error("Yorum yapılamadı"); // Hata mesajı göster
      console.log(error); // Hata detaylarını konsola yaz
    }
  });

  // Yorum ekleme işlemi için handler fonksiyonu
  const addCommentHandler = (value, parent = null) => {
    mutateNewComment({ token: userState.userInfo.token, desc: value, parent, slug: postSlug });
    setAffectedComment(null); // Etkilenen yorumu sıfırla
  };

  return (
    <div className={`${className}`}>
      {/* Yorum formu bileşeni */}
      <CommentForm 
        btnLabel="Gönder"
        formSubmitHandler={(value) => addCommentHandler(value)} 
        loading={isLoadingNewComment}
      />

      {/* Yorumların listelendiği alan */}
      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <Comment
            key={comment._id} // Her bir yorum için benzersiz anahtar
            comment={comment} // Yorum objesi
            logginedUserId={logginedUserId} // Giriş yapmış kullanıcının ID'si
            affectedComment={affectedComment} // Etkilenen yorum
            setAffectedComment={setAffectedComment} // Etkilenen yorumu ayarlamak için fonksiyon
            addComment={addCommentHandler} // Yorum ekleme fonksiyonu
            replies={comment.replies} // Yanıtlar
          />
        ))}
      </div>
    </div>
  );
};

// CommentsContainer bileşenini dışa aktarır
export default CommentsContainer;
