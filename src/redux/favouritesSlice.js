import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("favourites")) || [];

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const exists = state.find((f) => f.name === action.payload.name);
      if (!exists) {
        const updated = [...state, action.payload];
        localStorage.setItem("favourites", JSON.stringify(updated));
        return updated;
      }
      return state;
    },
    removeFavourite: (state, action) => {
      const updated = state.filter((f) => f.name !== action.payload.name);
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
