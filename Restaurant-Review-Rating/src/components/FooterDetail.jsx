import React from "react";
import Main from "../components/Main.jsx";

const FooterDetail = () => {
  return (
    <Main>
      <section>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-col justify-between items-center mt-4 mb-4 gap-y-8">
            <div className="lg:w-2/3 px-2 mb-4 lg:mb-0">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <h1 className="text-lg font-bold mb-4">Hakkmızda</h1>
                <p>
                  Merhaba, yemek severler! TasteTrail’e hoş geldiniz, burası
                  lezzet avcılarının buluşma noktası. Biz, yemek türüne ve
                  konuma göre restoran arayanların ilk tercihiyiz. TasteTrail
                  olarak, damak zevkinize uygun mükemmel restoranı bulmanız için
                  size rehberlik ediyoruz.
                  <br />
                  Yemek dünyasının keşfedilmemiş köşelerini keşfetmek isteyenler
                  için TasteTrail, kullanıcı dostu bir platform sunar. İster
                  baharatlı bir Hint yemeği, isterse hafif bir Akdeniz salatası
                  olsun, aradığınız lezzeti kolayca bulabilirsiniz. Konumunuzu
                  ve yemek tercihinizi girin, gerisini bize bırakın.
                  <br />
                  Restoranlar hakkında en güncel bilgilere erişim sağlayarak,
                  menüler ve kullanıcı yorumları gibi detayları tek bir tıkla
                  elde edebilirsiniz. Kullanıcılarımızın gerçek deneyimlerine
                  dayanan yorumlar sayesinde, restoran seçiminizi daha bilinçli
                  yapabilirsiniz.
                  <br />
                  <br />
                  Lezzet yolculuğunuzda size eşlik etmek için buradayız
                </p>
              </div>
            </div>
            <div className="lg:w-2/3 px-2 mb-4 lg:mb-0">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <h1 className="text-lg font-bold mb-4">Gizlilik ve Güvenlik</h1>
                <p>
                  Toplanan Kişisel Veriler Aydınlatma Metni kapsamında
                  kategorilendirilen kişisel verileriniz aşağıdaki gibidir;
                  <br />
                  Kullanıcı Üyelik (Profil) Bilgisi: Kullanıcı adı (isim -
                  soyisim), doğum tarihi (eğer ilettiyseniz).
                  <br />
                  <br /> İletişim Bilgisi: Telefon numarası, adres, e-mail
                  adresi Lokasyon Verisi: Kişisel veri sahibinin iş birimleri
                  tarafından yürütülen operasyonlar çerçevesinde, kullanıcının
                  kullanırken işaretlediği ve/veya cihaz bazlı aktive ettiği
                  lokasyonu
                  <br />
                  <br /> Müşteri İşlem Bilgisi: Ürün ve hizmetlerimizin
                  kullanımına yönelik kayıtlar ile kullanıcının ürün ve
                  hizmetleri kullanımı için gerekli olan talimatları/talepleri,
                  favori restoranları, favori mutfakları, sipariş ID, son bilgi
                  değişikliği tarihi, restoran ve siparişe ilişkin puanlar,
                  yorumlar ve notlar, üyelik tarihi, kullanılan kampanya bilgisi
                  İşlem <br />
                  <br />
                  Güvenliği Bilgisi: Ticari faaliyetlerimizi yürütürken teknik,
                  idari, hukuki ve ticari güvenliğimizi sağlamamız için işlenen
                  IP adresi,
                  <br />
                  <br /> Risk Yönetimi Bilgisi: Kişiyle ilişkilendirilen ve
                  şirketimizin ticari itibarını korumak maksatlı toplanan
                  bilgiler
                  <br />
                </p>
              </div>
            </div>
            <div className="lg:w-2/3 px-2 mb-4 lg:mb-0">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <h1 className="text-lg font-bold mb-4">İletişim</h1>
                <p>
                  Tüm TasteTrail süreçleriniz için 0850 222 5445 numaralı
                  restoran destek hattımızı arayabilirsiniz.<br/>
                  <b> E-posta:  </b>info@tastetrail.com<br/>
                  <b>Adres: </b> Kayışdağı, İnönü Mahallesi, Kayışdağı Cd.,
                  34755 Ataşehir/İstanbul<br/>
                  <b>Telefon: </b> (0216) 578 00 00
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </Main>
  );
};

export default FooterDetail;
