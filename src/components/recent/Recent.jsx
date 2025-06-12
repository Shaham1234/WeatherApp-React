import { useEffect, useState } from "react";
import "./recent.css";
import { useSelector, useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "../../redux/favouritesSlice";
import heartIconActive from "../../assets/icons/icon_favourite_Active.png";
import heartIconInactive from "../../assets/icons/icon_favourite.png";
import noFavLogo from "../../assets/icons/icon_nothing.png";

function Recent() {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

  const handleClearAll = () => {
    localStorage.removeItem("recentSearches");
    window.location.reload();
  };

  const isFavourite = (city) => {
    return favourites.some((fav) => fav.name === city.name);
  };

  const toggleFavourite = (city) => {
    if (isFavourite(city)) {
      dispatch(removeFavourite(city));
    } else {
      dispatch(addFavourite(city));
    }
  };

  return (
    <div className="recentPage">
      {recentSearches.length === 0 ? (
        <div className="emptyState">
          <img src={noFavLogo} alt="No Recent Searches" className="emptyIcon" />
          <p>No Recent Search</p>
        </div>
      ) : (
        <>
          <div className="recentHeader">
            <span>You recently searched for</span>
            <button className="clearAllBtn" onClick={handleClearAll}>
              Clear All
            </button>
          </div>

          <div className="recentList">
            {recentSearches.map((city, index) => (
              <div
                className={`recentItem ${
                  index === 0 ? "highlightBackGround" : ""
                }`}
                key={index}
              >
                <div className="recentCityDetails">
                  <div
                    className={`recentCityName ${
                      index === 0 ? "highlight" : ""
                    }`}
                  >
                    {city.name}, {city.region}
                  </div>
                </div>

                <div className="recentWeatherDetails">
                  <div className="recentWeatherInfo">
                    <img
                      src={city.icon}
                      alt="weather"
                      className="recentWeatherIcon"
                    />
                    <div className="recentTemp">
                      <span className="recentTempValue">{city.temp_c}</span>
                      <span className="recentTempUnit">°C</span>
                    </div>
                    <span className="recentText">{city.text}</span>
                  </div>
                  <img
                    src={
                      isFavourite(city) ? heartIconActive : heartIconInactive
                    }
                    alt="favourite"
                    className="recentHeart"
                    onClick={() => toggleFavourite(city)}
                    title="Toggle favourite"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Recent;
