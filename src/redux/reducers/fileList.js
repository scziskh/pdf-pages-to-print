import { createAction, createReducer } from "@reduxjs/toolkit";

const addFile = createAction("files/add");
const removeFile = createAction("files/remove");

const initialState = { files: undefined };

const fileList = createReducer(initialState, (builder) => {
  builder
    .addCase(addFile, (state, action) => {
      const { name, pages } = action;
      state[name] = pages;
    })
    .addCase(removeFile, (state, action) => {
      const { name } = action;
      state[name] = undefined;
    });
});
