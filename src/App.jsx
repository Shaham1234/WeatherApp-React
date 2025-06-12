import "./style.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import HomeNavBar from "./components/homeNavBar/HomeNavBar";
import { useState } from "react";

function App() {
  return (
    <div className="app">
      <Header />
      <HomeNavBar />
      <Outlet />
    </div>
  );
}

export default App;
