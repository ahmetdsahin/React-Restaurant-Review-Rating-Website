import { useState, useEffect } from "react"; 
import * as api from "./api"; 

// 'UseSearch' adlı özel bir kanca tanımlıyorum
export function UseSearch(term, location) {
  const [businesses, setBusinesses] = useState([]); // İşletmeleri saklamak için bir durum oluşturuyorum
  const [amountResults, setAmountResults] = useState(); // Toplam sonuç sayısını saklamak için bir durum oluşturuyorum
  const [searchParams, setSearchParams] = useState({ term, location }); // Arama parametrelerini saklamak için bir durum oluşturuyorum
  const [loading, setLoading] = useState(true); // Yüklenme durumunu saklamak için bir durum oluşturuyorum

  // useEffect ile bileşen yüklendiğinde veya 'searchParams' değiştiğinde çalışacak bir etki tanımlıyorum
  useEffect(() => {
    setBusinesses([]); // İşletmeler listesini temizliyorum
    setLoading(true); // Yüklenme durumunu true yapıyorum

    // Veri çekme fonksiyonunu tanımlıyorum
    const fetchData = async () => {
      try {
        // API'den veri çekiyorum
        const response = await api.get("/businesses/search", searchParams);
        if (!response.ok) {
          throw new Error("Failed to fetch businesses"); // Eğer yanıt başarısızsa hata fırlatıyorum
        }
        const data = await response.json(); // Yanıtı JSON olarak çözümlüyorum
        console.log("Fetched data:", data); // Veriyi konsola yazdırıyorum
        setBusinesses(data.businesses); // İşletmeler durumunu güncelliyorum
        setAmountResults(data.total); // Toplam sonuç sayısını güncelliyorum
      } catch (err) {
        console.error(err); // Hata varsa konsola yazdırıyorum
      } finally {
        setLoading(false); // Yüklenme durumunu false yapıyorum
      }
    };

    fetchData(); // Veri çekme fonksiyonunu çağırıyorum
  }, [searchParams]); // 'searchParams' değiştiğinde bu etkiyi yeniden çalıştırıyorum

  // Kancanın döndüreceği değerleri belirtiyorum
  return [businesses, amountResults, searchParams, setSearchParams, loading];
}
