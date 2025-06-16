import "./home.css";
import { useEffect, useState } from "react";
import favIcon from "../../assets/icons/icon_favourite.png";
import activefavIcon from "../../assets/icons/icon_favourite_Active.png";
// import sunnyIcon from "../../assets/icons/icon_mostly_sunny.png";
import tempIcon from "../../assets/icons/icon_temperature_info.png";
import precipitationIcon from "../../assets/icons/icon_precipitation_info.png";
import humidityIcon from "../../assets/icons/icon_humidity_info.png";
import windIcon from "../../assets/icons/icon_wind_info.png";
import visibilityIcon from "../../assets/icons/icon_visibility_info.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "../../redux/favouritesSlice";

function Home() {
  const coordinates = useSelector((state) => state.coordinates);
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [selectedUnit, setSelectedUnit] = useState("C");

  const fetchData = async (lat, lon) => {
    try {
      const response = await axios.get(
        "https://weatherapi-com.p.rapidapi.com/current.json",
        {
          params: { q: `${lat},${lon}` },
          headers: {
            "x-rapidapi-key":
              "b635b89285msh7e621ce456ab0e0p140c30jsn9129da24560f",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      console.log(response.data);
      setData({
        name: response?.data?.location?.name,
        region: response?.data?.location?.region,
        temp_c: response?.data.current?.temp_c,
        temp_f: response?.data?.current?.temp_f,
        text: response?.data?.current?.condition.text,
        icon: response?.data?.current?.condition.icon,
        wind: response?.data?.current?.wind_mph,
        precip: response?.data?.current?.precip_in,
        humidity: response?.data?.current?.humidity,
        visibility: response?.data?.current?.vis_miles,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isFavourite = favourites.some((fav) => fav.name === data.name);

  const handleFavouriteClick = () => {
    if (!data.name) return;

    if (isFavourite) {
      dispatch(removeFavourite(data));
    } else {
      dispatch(addFavourite(data));
    }
  };

  useEffect(() => {
    fetchData(coordinates.lat, coordinates.lon);
  }, [coordinates]);

  return (
    <div className="homePage">
      <div className="homePageTop">
        <div className="homePagePlace">
          {data ? `${data.name}, ${data.region}` : "Loading..."}
        </div>
        <div className="homePageFavItems" onClick={handleFavouriteClick}>
          <img
            src={!isFavourite ? favIcon : activefavIcon}
            alt="Favourite Icon"
            className="homePageFavIcon"
          />
          <div
            className="favIconText"
            style={{
              color: isFavourite ? "goldenrod" : "inherit",
            }}
          >
            {isFavourite ? "Added to favourite" : "Add to favourite"}
          </div>
        </div>
      </div>
      <div className="homePageWeatherWrapper">
        <div className="homePageWeather">
          {data && (
            <>
              <img
                src={data.icon}
                alt="Weather Condition Icon"
                className="weatherIcon"
              />
              <div className="weatherTemperature">
                <div className="weatherTemperatureDegree">
                  {selectedUnit === "C"
                    ? Math.round(data.temp_c)
                    : Math.round(data.temp_f)}
                </div>
                <div className="weatherTemperatureUnit">
                  <button
                    className={`weatherTemperatureButton ${
                      selectedUnit === "C" ? "active" : ""
                    }`}
                    onClick={() => setSelectedUnit("C")}
                  >
                    &deg;C
                  </button>
                  <button
                    className={`weatherTemperatureButton ${
                      selectedUnit === "F" ? "active" : ""
                    }`}
                    onClick={() => setSelectedUnit("F")}
                  >
                    &deg;F
                  </button>
                </div>
              </div>
              <div className="weatherText">
                <p>{data.text}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="homePageFooter">
        <div className="footerItem">
          <div className="footerIcon">
            <img src={tempIcon} alt="Temperature Icon" className="icon" />
          </div>
          <div className="footerInfo">
            <div className="footerValueText">Min - Max</div>
            <div className="footerValueNumber">75&deg;-90&deg;</div>
          </div>
        </div>
        <div className="footerItem">
          <div className="footerIcon">
            <img src={precipitationIcon} alt="" className="icon" />
          </div>
          <div className="footerInfo">
            <div className="footerValueText">Precipitation</div>
            <div className="footerValueNumber">
              {data.precip_in ? `${data.precip_in}%` : "--"}
            </div>
          </div>
        </div>
        <div className="footerItem">
          <div className="footerIcon">
            <img src={humidityIcon} alt="" className="icon" />
          </div>
          <div className="footerInfo">
            <div className="footerValueText">Humidity</div>
            <div className="footerValueNumber">
              {data.humidity ? `${data.humidity}%` : "--"}
            </div>
          </div>
        </div>
        <div className="footerItem">
          <div className="footerIcon">
            <img src={windIcon} alt="" className="icon" />
          </div>
          <div className="footerInfo">
            <div className="footerValueText">Wind</div>
            <div className="footerValueNumber">
              {data.wind_mph ? `${data.wind_mph} mph` : "--"}
            </div>
          </div>
        </div>
        <div className="footerItem">
          <div className="footerIcon">
            <img src={visibilityIcon} alt="" className="icon" />
          </div>
          <div className="footerInfo">
            <div className="footerValueText">Visibility</div>
            <div className="footerValueNumber">
              {data.visibility ? `${data.visibility} mph` : "--"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
