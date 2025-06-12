import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./homeNavBar.css";

function HomeNavBar() {
  const [date, setDate] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="homeNavBar">
      <ul className="navTabs">
        <li
          className={`navLink ${location.pathname === "/" ? "activeTab" : ""}`}
        >
          <Link to="/">HOME</Link>
        </li>
        <li
          className={`navLink ${
            location.pathname === "/fav" ? "activeTab" : ""
          }`}
        >
          <Link to="/fav">FAVOURITE</Link>
        </li>
        <li
          className={`navLink ${
            location.pathname === "/recent" ? "activeTab" : ""
          }`}
        >
          <Link to="/recent">RECENT SEARCH</Link>
        </li>
      </ul>
      <div className="navDateTime">
        <span>
          {" "}
          {date.toLocaleString("en-us", {
            weekday: "short",
          })}
          , {date.getDate()}{" "}
          {date.toLocaleString("en-us", {
            month: "short",
          })}{" "}
          {date.getFullYear()}
          &nbsp;&nbsp;&nbsp;
          {date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
}

export default HomeNavBar;
