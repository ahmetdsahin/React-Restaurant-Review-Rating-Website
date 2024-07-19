import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown, MdLogout } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setProfileDropdown] = useState(false);

  //burada props oluşturdum girilen yemek ve konumu göndermek için
  const [term, setTerm] = useState(props.term || "");
  // term adında bir değişkeni ve onu düzenlemek için setTerm fonksiyonunu oluşturdum.
  const [location, setLocation] = useState(props.location || "");

  function submit(e) {
    if (typeof props.search === "function") {
      props.search(term, location);
    }
    console.log(term, location);
    e.preventDefault(); //fonksiyon çağrıldığında oluşan eventin işlevini geçersiz kılar.
  }

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section onSubmit={submit}>
      <header className="container max-w-[1140px] mx-auto flex justify-between items-center p-4 font-roboto">
        <div className="flex items-center">
          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer md:hidden "
          >
            <AiOutlineMenu size={20} />
          </div>

          {/* Logo */}
          <div>
            <Link to="/">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 ">
                <span className="font-bold">Taste</span>
                <span className="text-red-600 font-medium">Trail</span>
              </h1>
            </Link>
          </div>
        </div>

        <div className=" flex gap-x-5">
          {/* Butonlar  */}
          {userState.userInfo ? (
            <div className="text-white items-center gap-y-5  flex flex-col lg:flex-row gap-x-2 font-semibold">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex gap-x-1 items-center mt-5 lg:mt-0 rounded-sm px-6 py-2 bg-black text-white font-bold hover:bg-red-600  transition-all duration-400"
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  >
                    <span>Hesabınız </span> <MdKeyboardArrowDown size={20} />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-400  lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                  >
                    <ul className=" text-center flex flex-col  overflow-hidden">
            
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="flex gap-x-1 items-center mt-5 lg:mt-0   px-6 py-2  text-white font-semibold bg-black hover:bg-red-600  transition-all duration-400"
                      >
                        <MdLogout size={20} className="mr-1" /> Çıkış Yap
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className=" bg-black text-white hidden  md:flex items-center rounded-md px-6 py-2 hover:bg-gray-900"
            >
              <FaUser size={16} className="mr-2" />
              Giriş Yap
            </button>
          )}

          {/* Responsive  */}
          <div
            className={
              nav
                ? "fixed top-0 left-0 w-full h-screen bg-white z-10 duration-300"
                : "fixed top-0 left-[-100%] w-full h-screen bg-white z-10 duration-300"
            }
          >
            <AiOutlineClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            />
            {/*LOGO*/}
            <div>
              <h1 className="text-4xl text-center p-4">
                <span className="font-bold">Taste</span>
                <span className="text-red-600 font-medium">Trail</span>
              </h1>
            </div>
            <hr className="border-gray-900 " />

            <nav className=" mt-6 grid justify-items-center gap-y-6">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-5   mt-2 py-3 ">
                {/* Formlar */}
                <div className="w-80">
                  <div className="relative h-12 w-full min-w-[200px] ">
                    <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                      <MdOutlineRestaurant />
                    </div>
                    <input
                      type="text"
                      placeholder="Ne yemek istersin"
                      className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                      onChange={(e) => setTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-80">
                  <div className="relative h-12 w-full min-w-[200px] ">
                    <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                      <FaLocationDot />
                    </div>
                    <input
                      type="text"
                      placeholder="Nerede yemek istersin"
                      className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                {/* Buton  */}
                <button
                  onClick={submit}
                  className=" w-full mx-10 bg-black text-white flex  md:flex items-center rounded-md py-2 px-6 "
                >
                  <FaSearch className="mr-2" />
                  Ara
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <hr className="border-gray-900 " />
    </section>
  );
};

export default Header;
