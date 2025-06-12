import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "./coordinatesSlice";
import favouritesReducer from "./favouritesSlice";

const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
    favourites: favouritesReducer,
  },
});

export default store;
