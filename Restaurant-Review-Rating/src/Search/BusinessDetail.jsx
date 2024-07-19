import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../hooks/api/api";
import Loading from "./Loading";
import Main from "../components/Main";
import { TbStarFilled } from "react-icons/tb";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

const BusinessDetailPage = () => {
  const { id } = useParams(); // URL'den işletme ID'sini al
  const userState = useSelector((state) => state.user); // Redux'tan kullanıcı durumunu al
  const [business, setBusiness] = useState(null); // İşletme detaylarını tutmak için state
  const [loading, setLoading] = useState(true); // Yüklenme durumunu tutmak için state
  const [userLocation, setUserLocation] = useState(null); // Kullanıcı konumunu tutmak için state

  // İşletme detaylarını API'den çekiyor
  useEffect(() => {
    const fetchBusinessDetail = async () => {
      try {
        const response = await api.get(`/businesses/${id}`);
        if (!response.ok) {
          throw new Error("İşletme bilgileri alınamadı");
        }
        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error("İşletme bilgileri alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetail();
  }, [id]);

  // Kullanıcı konumunu alıyor
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Kullanıcı konumu alınırken hata oluştu:", error);
        }
      );
    } else {
      console.error("Coğrafi konum bu tarayıcı tarafından desteklenmiyor");
    }
  }, []);

  // İşletme ve kullanıcı konumunu haritada gösterir
  useEffect(() => {
    if (business && userLocation) {
      const yelpCoordinates = [
        business.coordinates.latitude,
        business.coordinates.longitude,
      ];
      const map = L.map("map-container").setView(yelpCoordinates, 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const defaultMarkerIcon = L.icon({
        iconUrl: "https://cdn0.iconfinder.com/data/icons/basic-11/97/49-1024.png",
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });

      const redMarker = L.icon({
        iconUrl: "https://pngimg.com/uploads/pin/pin_PNG62.png",
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });

      // İşletme konumunu haritaya ekler
      L.marker(yelpCoordinates, { icon: redMarker })
        .addTo(map)
        .bindPopup(business.name)
        .openPopup();

      // Kullanıcı konumunu haritaya ekler
      L.marker([userLocation.latitude, userLocation.longitude], {
        icon: defaultMarkerIcon,
      })
        .addTo(map)
        .bindPopup("Konumunuz")
        .openPopup();
    }
  }, [business, userLocation]);

  const handleGoToLocation = () => {
    if (business && business.coordinates) {
      const { latitude, longitude } = business.coordinates;
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      );
    }
  };

  if (loading) {
    return <Loading />; // Yüklenme durumunda Loading bileşenini gösterir
  }

  if (!business) {
    return <div>Mekan Bulunmadı</div>; // İşletme bulunamazsa mesaj gösterir
  }

  // İşletme kategorilerini etiket olarak gösterir
  const tags = business.categories.map((category) => (
    <span
      className="tag mr-1 bg-gray-100 text-gray-500 font-roboto text-sm font-medium px-2  rounded "
      key={business.id + category.title}
    >
      {category.title}
    </span>
  ));

  // Açılış saatlerini düzenleme
  const renderBusinessHours = () => {
    if (!business.hours || !business.hours[0] || !business.hours[0].open) {
      return <div>Çalışma saatleri mevcut değil</div>;
    }

    return business.hours[0].open.map((schedule, index) => {
      const startHour = schedule.start.slice(0, 2);
      const startMinute = schedule.start.slice(2);
      const endHour = schedule.end.slice(0, 2);
      const endMinute = schedule.end.slice(2);
      const day = schedule.day;
      return (
        <div key={index}>
          <strong>{getDayName(day)}:</strong> {startHour}:{startMinute} - {endHour}:{endMinute}
        </div>
      );
    });
  };

  // Gün ismini alma fonksiyonu
  const getDayName = (dayIndex) => {
    const days = [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
      "Pazar",
    ];
    return days[dayIndex];
  };

  return (
    <Main>
      <section>
        <div className="bs-bg-pattern h-44 w-full p-16">
          {/* Slogan */}
          <h1 className="mt-2 lg:text-4xl text-2xl font-bold font-poppins text-center text-white">
            {business.name}
          </h1>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between mt-4">
            <div className="lg:w-2/3 px-2 mb-4 lg:mb-0">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <div className="flex flex-row">
                  <h1 className="text-lg font-bold mb-4 place-items-start">Lokasyon</h1>
                </div>

                <div id="map-container" style={{ height: "300px", width: "100%" }}></div>
                <button
                  onClick={handleGoToLocation}
                  className="flex gap-x-1 items-center mb-2 mt-2 rounded-md px-5 py-2 bg-black text-white font-bold hover:bg-red-600 transition-all duration-400 place-items-end"
                >
                  Konuma Git
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 px-2">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <h1 className="text-lg font-bold mb-4">{business.name}</h1>
                <p className="text-gray-700 mb-2">
                  <b>Adres:</b> {business.location.address1}
                </p>
                <p className="text-gray-700 mb-2">{business.location.address2}</p>
                <p className="text-gray-700 mb-2">{business.location.address3}</p>
                <p className="text-gray-700 mb-2">
                  {business.location.city} {business.location.country}
                </p>
                <p className="text-gray-700 mb-2">
                  <b>Telefon:</b> {business.display_phone}
                </p>
                <p className="flex items-center gap-x-1 text-gray-700 mb-2">
                  <b>Beğenme:</b>
                  <TbStarFilled className="text-yellow-400" size={16} />
                  {business.rating}{" "}
                  <span className="text-gray-500 text-xs">
                    ({business.review_count} oy)
                  </span>
                </p>
                <p className="text-gray-700 mb-2">Etiketler: {tags}</p>
                {business.attributes?.menu_url && (
                  <p className="text-base text-red-600 font-semibold font-roboto mt-1">
                    <a href={business.attributes.menu_url} target="blank">
                      <b>Menü</b>
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between mt-4">
            <div className="lg:w-2/3 px-2 mb-4 lg:mb-0">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <h1 className="text-lg font-bold mb-4">Yorumlar</h1>
                {/* Yorumlar buraya eklenecek */}
              </div>
            </div>
            <div className="lg:w-1/3 px-2">
              <div className="p-6 rounded-lg shadow-md border border-1 mb-4">
                <h1 className="text-lg font-bold mb-4">Görsel</h1>
                <img src={business.image_url} alt="" className="rounded-md mb-4" />
                <h1 className="text-lg font-bold mb-4">Saatler</h1>
                {renderBusinessHours()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default BusinessDetailPage;
