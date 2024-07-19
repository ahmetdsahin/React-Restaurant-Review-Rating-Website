import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const SearchBar = (props) => {
  // Burada props oluşturdum, girilen yemek ve konumu göndermek için
  const [term, setTerm] = useState(props.term || ""); // 'term' adında bir değişkeni ve onu düzenlemek için 'setTerm' fonksiyonunu oluşturdum
  const [location, setLocation] = useState(props.location || ""); // 'location' adında bir değişkeni ve onu düzenlemek için 'setLocation' fonksiyonunu oluşturdum

  function submit(e) {
    if (typeof props.search === "function") { // 'search' fonksiyonunu kontrol ediyorum
      props.search(term, location); // 'search' fonksiyonunu çağırıyorum
    }
    console.log(term, location); // Konsola term ve location değerlerini yazdırıyorum
    e.preventDefault(); // Fonksiyon çağrıldığında oluşan eventin işlevini geçersiz kılar
  }

  return (
    <section onSubmit={submit}>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 py-6">
        {/* Formlar */}
        
        <div className="w-80">
          <div className="relative h-12 w-full min-w-[200px]">
            <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
              <MdOutlineRestaurant />
            </div>
            <input
              type="text"
              placeholder="Ne yemek istersin"
              className="peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e) => setTerm(e.target.value)} // 'onChange' ile input üzerinde bir değişiklik olduğunda yakalıyor ve onu 'setTerm' üzerinden 'term'e atıyor
            />
          </div>
        </div>

        <div className="w-80">
          <div className="relative h-12 w-full min-w-[200px]">
            <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
              <FaLocationDot />
            </div>
            <input
              type="text"
              placeholder="Nerede yemek istersin"
              className="peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e) => setLocation(e.target.value)} // 'onChange' ile input üzerinde bir değişiklik olduğunda yakalıyor ve onu 'setLocation' üzerinden 'location'a atıyor
            />
          </div>
        </div>
        
        {/* Buton */}
        <button
          onClick={submit} // Butona tıklanınca 'submit' fonksiyonunu çağırır
          className="bg-black hover:bg-red-600 transition-all duration-400 text-white flex font-bold md:flex items-center py-2 px-6 rounded-md"
        >
          <FaSearch className="mr-2" /> Ara
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
