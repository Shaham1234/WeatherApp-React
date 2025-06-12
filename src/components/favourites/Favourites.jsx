import "./favourites.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFavourite } from "../../redux/favouritesSlice";
import heartIconActive from "../../assets/icons/icon_favourite_Active.png";
import noFavLogo from "../../assets/icons/icon_nothing.png";

function Favourites() {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const handleRemove = (city) => {
    dispatch(removeFavourite(city));
  };

  const handleRemoveAll = () => {
    favourites.forEach((fav) => {
      dispatch(removeFavourite(fav));
    });
  };

  return (
    <div className="favouritesPage">
      {favourites.length === 0 ? (
        <div className="emptyState">
          <img src={noFavLogo} alt="No favourites" className="emptyIcon" />
          <p>No Favourites added</p>
        </div>
      ) : (
        <>
          <div className="favouritesHeader">
            <span>{favourites.length} City added as favourite</span>
            <button className="removeAllBtn" onClick={handleRemoveAll}>
              Remove All
            </button>
          </div>

          <div className="favouritesList">
            {[...favourites].reverse().map((fav, index) => (
              <div
                className={`favouriteItem ${
                  index === 0 ? "highlightBackGround" : ""
                }`}
                key={index}
              >
                <div className="favCityDetails">
                  <div
                    className={`favCityName ${index === 0 ? "highlight" : ""}`}
                  >
                    {fav.name}, {fav.region}
                  </div>
                </div>

                <div className="favWeatherDetails">
                  <div className="favWeatherInfo">
                    <img
                      src={fav.icon}
                      alt="weather"
                      className="favWeatherIcon"
                    />
                    <div className="favTemp">
                      <span className="favTempValue">{fav.temp_c}</span>
                      <span className="favTempUnit">°C</span>
                    </div>
                    <span className="favText">{fav.text}</span>
                  </div>
                  <img
                    src={heartIconActive}
                    alt="favourite"
                    className="favHeart"
                    onClick={() => handleRemove(fav)}
                    title="Remove from favourites"
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

export default Favourites;
