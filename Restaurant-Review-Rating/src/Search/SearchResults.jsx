import React from "react";
import SearchResult from "./SearchResult";
import Loading from "./Loading";
import { Link } from "react-router-dom";


const SearchResults = (props) => {
  let searchResults = <Loading />;
  if (props.businesses && props.businesses.length) {
    searchResults = props.businesses.map((b) => (
      
     <Link to={`/business/${b.id}`}> 
     <SearchResult key={b.id} business={b} />
     </Link>
    ));
  }

  return (
    <div className="py-6  flex flex-col gap-y-4 mx-auto items-center justify-center">
       {searchResults} 
    </div>
  );
};

export default SearchResults;
