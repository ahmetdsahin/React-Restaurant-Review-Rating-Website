import React from "react";
import SearchBar from "../../components/SearchBar";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation hook'unu import ediyoruz
 const Caresoul = () => {

  const location = useLocation(); // useLocation hook'unu kullanarak location bilgisini alıyoruz
  const params = new URLSearchParams(location.search);
  const term = params.get('find_desc');
  const locationParam = params.get('find_loc');


  const navigate = useNavigate();

  function search(term, location) {
    const EncodedTerm = encodeURI(term);
    const EncodedLocation = encodeURI(location);
    navigate(`/search?find_desc=${EncodedTerm}&find_loc=${EncodedLocation}`);
  }



  return (
    <div className="bg-pattern h-96 w-full bg-cover bg-center p-20">
      <div className="flex flex-col items-center justify-center lg:py-10">
        {/* Slogan  */}
        <h1 className="mt-2 lg:text-4xl text-2xl font-bold font-poppins text-center text-white">
          Her yerde enfes lezzetlerle buluş
        </h1>
        
        {/* Arama Formu  */}
        <SearchBar search={search} term={term} location={locationParam}/>
      </div>
    </div>
  );
};

export default Caresoul;
