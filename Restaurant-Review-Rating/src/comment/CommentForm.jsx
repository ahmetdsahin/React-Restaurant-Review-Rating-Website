import React, { useState } from "react";

// CommentForm bileşenini tanımlıyor
const CommentForm = ({
  formSubmitHandler, // Formun gönderilmesi için fonksiyon
  formCancelHandler = null, // Formun iptali için fonksiyon, varsayılan olarak null
  initialText = "", // Başlangıçtaki metin, varsayılan olarak boş
  loading = false, // Yüklenme durumu, varsayılan olarak false
}) => {
  // Yorum metnini yönetmek için state tanımlıyor
  const [value, setValue] = useState(initialText);

  // Form gönderme işlemi için handler fonksiyonu
  const sumbitHandler = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    formSubmitHandler(value); // Form gönderme işlemini gerçekleştirir
    setValue(""); // Yorum alanını temizler
  };

  return (
    <form onSubmit={sumbitHandler}>
      <div className="flex flex-col items-end border border-black rounded-lg p-4">
        {/* Yorum yazma alanı */}
        <textarea
          className="w-full focus:outline-none bg-transparent"
          rows="3"
          placeholder="Yorum Yazınız..."
          value={value}
          onChange={(e) => setValue(e.target.value)} // Yorum metnini günceller
        />
        <div className="flex items-center gap-x-2 pt-2">
          {/* İptal butonu, eğer formCancelHandler tanımlanmışsa gösterilir */}
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              type="button"
              className="flex gap-x-1 items-center mb-2 lg:mt-0 rounded-md px-5 py-2 bg-black text-white font-bold hover:bg-red-600 transition-all duration-400 place-items-end"
            >
              İptal
            </button>
          )}
          {/* Gönder butonu */}
          <button
            disabled={loading} // Yüklenme durumunda butonu devre dışı bırakır
            type="submit"
            className="flex gap-x-1 items-center mb-2 lg:mt-0 rounded-md px-5 py-2 bg-black text-white font-bold hover:bg-red-600 transition-all duration-400 place-items-end disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Gönder
          </button>
        </div>
      </div>
    </form>
  );
};

// CommentForm bileşenini dışa aktarır
export default CommentForm;
