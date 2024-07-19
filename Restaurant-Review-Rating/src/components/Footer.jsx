import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class=" mt-25 bottom-0 left-0 z-20 w-full p-4 bg-red-600 text-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 font-roboto">
      <a
        href="/"
        class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
      >
        <h1 className="text-3xl text-center ">
          <span className="font-bold ">Taste</span>Trail
        </h1>
      </a>

      <span class="text-sm font-medium sm:text-center lg:ml-5 ">
        2024 © TasteTrail. Tüm Hakları Saklıdır.
      </span>
    <Link to="/footer-detail">
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium   sm:mt-0">
          <li class="hover:underline me-4 md:me-6">Hakımızda</li>
          <li class="hover:underline me-4 md:me-6">Gizlilik</li>
          <li class="hover:underline me-4 md:me-6">Güvenlik</li>
          <li class="hover:underline me-4 md:me-6">İletişim</li>
        </ul>
        </Link>
    </footer>
  );
};

export default Footer;
