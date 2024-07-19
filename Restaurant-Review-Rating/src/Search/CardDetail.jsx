import { React, useEffect, useState } from "react";
import Main from "../components/Main";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getSinglePosts } from "../services/index/post";
import { TbStarFilled } from "react-icons/tb";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import CommentsContainer from "../comment/CommentsContainer";
import { useSelector } from "react-redux";

const CardDetail = () => {
  const userState = useSelector((state) => state.user); // Redux'tan kullanıcı bilgilerini alır
  const { slug } = useParams(); // URL'den slug parametresini alır
  const [userLocation, setUserLocation] = useState(null); // Kullanıcı konumunu tutmak için state
  const [menuUrl, setMenuUrl] = useState(""); // Menü URL'sini tutmak için state

  // Veriyi getirmek için react-query 
  const { data } = useQuery({
    queryFn: () => getSinglePosts({ slug }),
    queryKey: ["post", slug],
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // Kullanıcı konumunu almak için useEffect 
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

  
  const businessLatitude = 41.0060268;
  const businessLongitude = 28.9793084;

  // Haritayı ve markerları oluşturmak için useEffect 
  useEffect(() => {
    if (businessLatitude && businessLongitude && userLocation) {
      const yelpCoordinates = [businessLatitude, businessLongitude];
      const map = L.map("map-container").setView(yelpCoordinates, 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const defaultMarkerIcon = L.icon({
        iconUrl:
          "https://cdn0.iconfinder.com/data/icons/basic-11/97/49-1024.png",
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });

      const redMarker = L.icon({
        iconUrl: "https://pngimg.com/d/google_maps_pin_PNG4.png",
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });

      L.marker(yelpCoordinates, { icon: redMarker })
        .addTo(map)
        .bindPopup("Hedef Nokta")
        .openPopup();

      L.marker([userLocation.latitude, userLocation.longitude], {
        icon: defaultMarkerIcon,
      })
        .addTo(map)
        .bindPopup("Konumunuz")
        .openPopup();
    }
  }, [userLocation]);

  // Google Maps'te konumu açma fonksiyonu
  const handleGoToLocation = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${businessLatitude},${businessLongitude}`
    );
  };

  // Menü URL'sini ayarlamak için useEffect 
  useEffect(() => {
    if (data?.menu_url && Array.isArray(data.menu_url) && data.menu_url.length > 0) {
      setMenuUrl(data.menu_url[0]);
    }
  }, [data]);

  return (
    <Main>
      <section>
        <div className="bs-bg-pattern h-44 w-full p-16">
          {/* İşletme adı */}
          <h1 className="mt-2 lg:text-4xl text-2xl font-bold font-poppins text-center text-white">
            {data?.title}
          </h1>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between mt-4">
            <div className="lg:w-2/3 px-2 mb-4 lg:mb-0">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <div className="flex flex-row ">
                  <h1 className="text-lg font-bold mb-4 place-items-start">
                    Lokasyon
                  </h1>
                </div>
                <div
                  id="map-container"
                  style={{ height: "300px", width: "100%" }}
                ></div>
                <button
                  onClick={handleGoToLocation}
                  className="flex gap-x-1 items-center mb-2  mt-2 rounded-md px-5 py-2 bg-black text-white font-bold hover:bg-red-600  transition-all duration-400 place-items-end"
                >
                  Konuma Git
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 px-2">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <h1 className="text-lg font-semibold mb-4">{data?.title}</h1>
                <p className="text-gray-700 mb-2">
                  <b>Adres:</b> {data?.caption}
                </p>

                <p className="text-gray-700 mb-2">
                  <b>Telefon:</b>
                  {data?.tel}
                </p>
                <p className="flex items-center gap-x-1 text-gray-700 mb-2">
                  <b>Beğenme:</b>
                  <TbStarFilled className="text-yellow-400" size={16} />
                  {data?.like}{" "}
                  <span className="text-gray-500 text-xs">({data?.vote})</span>
                </p>

                <p className="text-gray-700 mb-2">
                  <b>Etiketler:</b>{" "}
                  <span className="bg-gray-200 rounded-md px-2">
                    {" "}
                    {data?.tags}
                  </span>
                </p>

                <p className="mb-2">
                  <b>Menü:</b>{" "}
                  {typeof menuUrl === "string" && menuUrl ? (
                    <a
                      href={
                        menuUrl.startsWith("http://") ||
                        menuUrl.startsWith("https://")
                          ? menuUrl
                          : `http://${menuUrl}`
                      }
                      className="text-red-600 rounded-md px-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {menuUrl}
                    </a>
                  ) : (
                    <span className="bg-gray-200 rounded-md px-2">
                      Menü yok
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between mt-4">
            <div className="lg:w-2/3 px-2 mb-4 lg:mb-0">
              <div className="p-6 rounded-lg shadow-md border border-1">
                <h1 className="text-lg font-semibold mb-4">Yorumlar</h1>
                <CommentsContainer
                  comments={data?.comments}
                  className="mt-10"
                  logginedUserId={userState?.userInfo?._id}
                  postSlug={slug}
                />
              </div>
            </div>
            <div className="lg:w-1/3 px-2">
              <div className="p-6 rounded-lg shadow-md border border-1 mb-4">
                <h1 className="text-lg font-bold mb-4 ">Görsel</h1>
                <img src={data?.photo} alt="" className="rounded-md mb-4 " />
                <h1 className="text-lg font-semibold mb-4">Saatler</h1>
                <b>Pazartesi:</b> 07:00 - 23:00 <br />
                <b> Salı:</b> 07:00 - 23:00 <br />
                <b> Çarşamba:</b> 07:00 -23:00
                <br />
                <b>Perşembe:</b> 07:00 - 23:00
                <br />
                <b>Cuma: </b> 07:00 - 23:00
                <br />
                <b>Cumartesi:</b> 08:00 - 23:30
                <br />
                <b>Pazar:</b> 08:00 - 23:30
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default CardDetail;
