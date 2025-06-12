import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 12.98,
  lon: 77.58,
};

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export const { setCoordinates } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
