import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const pdfsPropsSlice = createSlice({
  name: "pdfsProps",
  initialState,
  reducers: {
    updatePdfProps(state, action) {
      const { index, pdfProps } = action.payload;

      const temp = state;
      temp[index] = pdfProps;
    },
  },
});

export default pdfsPropsSlice.reducer;
