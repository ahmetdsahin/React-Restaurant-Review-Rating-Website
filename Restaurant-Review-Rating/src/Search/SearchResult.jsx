import React from "react";
import { Link } from "react-router-dom"; // React Router'dan Link bileşeni ekleyin
import { TbStarFilled } from "react-icons/tb";

const SearchResult = (props) => {
  const b = props.business;
  if (!props.business) {
    return <div />;
  }

  const tags = b.categories.map((category) => (
    <span
      className="tag mr-1 bg-gray-100 text-gray-500 font-roboto text-sm font-medium px-2  rounded "
      key={b.id + category.title}
    >
      {category.title}
    </span>
  ));

  return (
    <section className="flex  lg:flex-row  lg:max-w-[800px] flex-col gap-y-2 max-w-[350px] w-full gap-x-4 mx-auto px-8 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <Link to={`/business/${b.id}`}> {/* Ayrıntı sayfasına yönlendiren Link */}
        <img src={b.image_url} alt="" className="w-full  lg:w-52 h-52 rounded-md" />
      </Link>
      
      <div className="flex flex-col gap-y-3">
        <h1 className="font-roboto font-semibold text-2xl text-gray-900">
          {b.name}
        </h1>
        <p className="flex items-center gap-x-1 text-sm">
          <TbStarFilled className="text-yellow-400" size={16} />
          {b.rating}{" "}
          <span className="text-gray-500 text-xs">
            ({b.review_count} Gösterim)
          </span>
        </p>
        <p>{tags}</p>
        <div className="text-sm text-gray-500 ml-1 ">
          <p>{b.location.address1}</p>
          <p>{b.location.city}</p>
          
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
