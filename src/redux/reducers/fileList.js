import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {};

export const pdfsPropsSlice = createSlice({
  name: "pdfsProps",
  initialState,
  reducers: {
    updatePdfProps(state, action) {
      const { index, pdfProps } = action.payload;
      state[index] = pdfProps;
    },
  },
});

export default pdfsPropsSlice.reducer;
