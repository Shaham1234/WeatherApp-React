import "./header.css";
import logo from "../../assets/images/logo_web.png";
import searchIcon from "../../assets/icons/icon_search_white.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCoordinates } from "../../redux/coordinatesSlice";

function Header() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const geoResponse = await axios.get(
        "https://weatherapi-com.p.rapidapi.com/search.json",
        {
          params: { q: query },
          headers: {
            "x-rapidapi-key":
              "b635b89285msh7e621ce456ab0e0p140c30jsn9129da24560f",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );

      const result = geoResponse.data[0];

      if (!result) {
        alert("Location not found!");
        return;
      }

      const weatherResponse = await axios.get(
        "https://weatherapi-com.p.rapidapi.com/current.json",
        {
          params: { q: `${result.lat},${result.lon}` },
          headers: {
            "x-rapidapi-key":
              "b635b89285msh7e621ce456ab0e0p140c30jsn9129da24560f",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );

      const weather = weatherResponse.data.current;

      const newSearch = {
        name: weatherResponse.data.location.name,
        region: weatherResponse.data.location.region,
        icon: weather.condition.icon,
        temp_c: weather.temp_c,
        text: weather.condition.text,
      };

      console.log(newSearch);

      const existing = JSON.parse(localStorage.getItem("recentSearches")) || [];

      const filtered = existing.filter((item) => item.name !== newSearch.name);

      const updated = [newSearch, ...filtered].slice(0, 10);

      localStorage.setItem("recentSearches", JSON.stringify(updated));

      const { lat, lon } = geoResponse.data[0];
      dispatch(setCoordinates({ lat, lon }));
    } catch (error) {
      console.log(error);
      alert("Failed to fetch location");
    }
  };

  return (
    <div className="header">
      <div className="headerLogo">
        <img src={logo} alt="" />
      </div>
      <form className="headerSearch" onSubmit={handleSearch}>
        <input
          type="text"
          className="headerSearchInput"
          placeholder="Search city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="headerSearchSubmit" type="submit">
          <img className="headerSearchIcon" src={searchIcon} alt="Search" />
        </button>
      </form>
    </div>
  );
}

export default Header;
