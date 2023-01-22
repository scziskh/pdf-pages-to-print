import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const pdfPropsSlice = createSlice({
  name: "pdfProps",
  initialState,
  reducers: {
    changePdfProps(state, action) {
      const { index, pdfProps } = action;
      state[index] = pdfProps;
    },
  },
});

export default pdfPropsSlice.reducer;
