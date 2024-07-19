import React from "react";
import Main from "../components/Main";
import SearchResults from "./SearchResults";
import { useLocation } from "react-router-dom"; // useLocation hook'unu import ediyoruz
import { UseSearch } from "../hooks/api/UseSearch";
import SearchInfo from "./SearchInfo";
import SearchBar from "../components/SearchBar";
import { useNavigate} from 'react-router-dom';


const SearchPage = (props) => {
  const location = useLocation(); // useLocation hook'unu kullanarak location bilgisini alıyoruz
  const params = new URLSearchParams(location.search);
  const term = params.get("find_desc");
  const locationParam = params.get("find_loc");
  const [businesses, amountResults, searchParams, performSearch] = UseSearch(
    term,
    locationParam
  );


const navigate= useNavigate();
  if(!term || !locationParam){
    navigate('/');
  }

  function search(term, location) {
    performSearch({ term, location });
  }

  return (
    <Main>
      <SearchBar search={search} term={term} location={locationParam} />
      <SearchInfo
        term={searchParams.term}
        location={searchParams.location}
        amountResults={amountResults}
        shownResults={businesses ? businesses.length : 0}
      />

      <SearchResults businesses={businesses} key={businesses.id} />
    </Main>
  );
};

export default SearchPage;
