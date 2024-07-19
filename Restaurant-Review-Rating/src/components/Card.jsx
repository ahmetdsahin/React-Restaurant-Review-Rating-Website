import React from "react";
import { useQuery } from "react-query";
import { Cards } from "../pages/container/Cards";
import { getAllPosts } from "../services/index/post";
import { toast } from "react-hot-toast";

// Card bileşenini tanımlıyor
const Card = () => {
  // useQuery hook'u ile veri çekme işlemi yapıyor
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(), // Verileri çekmek için kullanılan fonksiyon
    queryKey: ["posts"], // Query anahtarı, cache kontrolü için kullanılır
    onError: (error) => { // Hata durumunda çalışacak fonksiyon
      toast.error(error.message); // Hata mesajını gösterir
      console.log(error); // Hata detaylarını konsola yazdırır
    },
  });

  return (
    <section className="container mx-auto flex flex-wrap md:gap-x-5 py-5 px-5 justify-center items-center">
      {/* Başlık */}
      <h1 className="mt-2 lg:text-3xl text-xl font-bold font-poppins text-center text-red-600 underline decoration-black">
        Öne Çıkanlar
      </h1>
      <div className="container mx-auto flex flex-wrap md:gap-x-5 gap-y-5 px-5 py-10 justify-center items-center">
        {/* Veriler yüklenmiş ve hata yoksa kartları göster */}
        {!isLoading && !isError && data.map((post) => (
          <Cards
            key={post._id} // Her bir post için benzersiz anahtar
            post={post} // Post objesi
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(27.27%)]"
          />
        ))}
      </div>
    </section>
  );
};

// Card bileşenini dışa aktarır
export default Card;
